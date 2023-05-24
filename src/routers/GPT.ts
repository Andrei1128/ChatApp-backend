import { Router } from "express";
import { OpenaiChatGPTController } from "../controllers/GPT";

const router: Router = Router();
const openaiChatGPTController = new OpenaiChatGPTController();

router.post("", openaiChatGPTController.generateOpenaiChatGPTChatCompletions);

export default router;
