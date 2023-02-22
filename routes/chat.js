import { Router } from "express";
import authMW from "../middlewares/auth.js";
import path from "path";

const chatRouter = Router();

//* Chat
chatRouter.get("/", authMW, (req, res) => {
    res.render(path.join(process.cwd(), "/public/views/chat.ejs"));
});

export default chatRouter;