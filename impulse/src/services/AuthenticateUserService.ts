import axios from "axios";
import { sign } from "jsonwebtoken";
import prismaClient from "../prisma";

interface IAcessTokenResponse {
  access_token: string,
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string,
}

class AuthenticateUserService {
  async execute(code: string) {
    console.log("AuthenticateUserService | Accessed execute()");
    const url = "https://github.com/login/oauth/access_token";

    console.log("AuthenticateUserService | Running authentication promise on GitHub");
    const { data: accessTokenResponse } = await axios.post<IAcessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
        headers: {
          "Accept": "application/json",
        }
    });
    
    console.log("AuthenticateUserService | Running get user promisse on GitHub");
    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    });

    console.log("AuthenticateUserService | Destructuring response.data");
    const { login, id, avatar_url, name } = response.data;

    console.log(response.data);

    console.log("AuthenticateUserService | Searching user by id");
    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    })

    console.log(user);

    if(!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      })
      
      console.log(`Do id" ${user}`);
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        }
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    console.log("AuthenticateUserService | Returning response.data");
    return { token, user };
  }
}

export { AuthenticateUserService };
