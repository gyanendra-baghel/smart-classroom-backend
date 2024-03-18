import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser, loginUser, logoutUser} from "../controllers/user.controller.js"

const userRouter = Router();

quizRouter.route("/:id").get(verifyJWT, registerUser);
quizRouter.route("/submit").post(verifyJWT, logoutUser);

export default userRouter;