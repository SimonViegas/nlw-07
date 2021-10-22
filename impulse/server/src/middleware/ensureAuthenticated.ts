import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction) {
  
  console.log("ensureAuthenticated | Accessed handle()");  
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  console.log("ensureAuthenticated | Separating token");
  const [,token] = authToken.split(" ");

  try {
    console.log("ensureAuthenticated | Verify token");
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload; 

    request.user_id = sub;

    console.log("ensureAuthenticated | Returning next()");
    return next(); //passa pra frente... mas não entendi direito (por atenção)

  } catch (err) {
    //return response.status(401).json({ errorCode: "token.expired" })
    return response.status(401).json({ err });
  }
}
