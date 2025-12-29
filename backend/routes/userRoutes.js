import express from "express";
import { getCurrentUser } from "../controllers/user.Controllers.js";
import isAuth from "../middleware/isAuth.js";

const userRouter = express.Router();

userRouter.get("/current_user",isAuth, getCurrentUser);

export default userRouter;     