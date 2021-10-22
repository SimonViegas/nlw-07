import { Router } from "express";
import { AuthenticateUserController } from "./src/controler/AuthenticateUserController";
import { CreateMessageController } from "./src/controler/CreateMessageControle";
import { ensureAuthenticated } from "./src/middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);

router.get("/github", (request, response) => {
  console.log("route | /github");
  console.log(`route | Sending ${process.env.GITHUB_CLIENT_ID} to GitHub`);
   response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

router.get("/signin/callback", (request, response) => {
  console.log("route | /signin/callback");
  const { code } = request.query;

  console.log(`route | Returning ${code} to browser`);
  return response.json(code);
})

export { router };