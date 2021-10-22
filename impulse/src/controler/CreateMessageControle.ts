import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  async handle(request: Request, response: Response) {
    console.log("AuthenticateUserController | Accessed handle()");
    const { message } = request.body;
    const { user_id } = request;
    console.log("AuthenticateUserController | Accessed handle()");
    const service = new CreateMessageService();
    const result = await service.execute(message, user_id);

    return response.json(result);
  }
}

export { CreateMessageController }