import express from "express";
import {signIn, signUp} from "../controllers/auth.js";

const router = express.Router();


//CREATE a user
router.post("/signUp", signUp);
//SIGN IN
router.post("/signIn", signIn)
//GOOGLE AUTH
router.post("/google", )

export default router;