import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser, loginUser, logoutUser} from "../controllers/user.controller.js"

const userRouter = Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/signup").post(registerUser);
userRouter.route("/logout").post(logoutUser);

export default userRouter;