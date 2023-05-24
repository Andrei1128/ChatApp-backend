/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateChatCompletionRequest } from "openai";
import { Openai } from "../utilities/openai";

export class OpenaiChatGPTService {
  public generateChatCompletions = async (message: string) => {
    const reqData: CreateChatCompletionRequest = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: message,
        },
      ],
    };

    return await Openai.generateChatCompletions(reqData);
  };
}
