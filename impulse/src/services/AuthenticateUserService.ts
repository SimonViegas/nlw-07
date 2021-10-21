interface IAcessTokenResponse {
  access_token: string,
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string,
}

import axios from "axios";

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
          authorization: `Bearer ${accessTokenResponse.access_token}`
        }
      });

      console.log("AuthenticateUserService | Returning response.data");
      return response.data;
    }
  }

  export { AuthenticateUserService };
