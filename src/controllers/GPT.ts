import { NextFunction, Request, Response } from "express";
import { OpenaiChatGPTService } from "../services/GPT";

export class OpenaiChatGPTController {
  public generateOpenaiChatGPTChatCompletions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const openaiChatGPTService = new OpenaiChatGPTService();
      const generatedCompletions =
        await openaiChatGPTService.generateChatCompletions(
          req.body.text_message
        );

      res.status(200).json(generatedCompletions);
    } catch (error) {
      next(error);
    }
  };
}
