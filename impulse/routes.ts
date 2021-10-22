import { Router } from "express";
import { AuthenticateUserController } from "./src/controler/AuthenticateUserController";
import { CreateMessageController } from "./src/controler/CreateMessageControle";
import { GetLast3MessagesController } from "./src/controler/GetLast3MessagersController";
import { ensureAuthenticated } from "./src/middleware/ensureAuthenticated";
import { GetLast3MessagesService } from "./src/services/GetLast3MessagesService";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);

router.get("/messages/last3", new GetLast3MessagesController().handle)

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