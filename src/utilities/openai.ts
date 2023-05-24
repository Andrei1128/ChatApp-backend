/* eslint-disable @typescript-eslint/no-explicit-any */
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai";

const openaiConfiguration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openaiInstance = new OpenAIApi(openaiConfiguration);

export class Openai {
  public static generateChatCompletions = async (
    data: CreateChatCompletionRequest
  ) => {
    try {
      const completion = await openaiInstance.createChatCompletion(data);
      return { result: completion.data.choices[0].message };
    } catch (error: any) {
      if (error.response) {
        // console.log(error.response);
        console.log(error.response.data);
        throw new error.DatabaseError(error.response.data.error.message);
      } else {
        console.log(error.message);
        throw new error.TooManyRequestsError(error.message);
      }
    }
  };
}
