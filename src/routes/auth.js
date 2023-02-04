import express from "express";
import {googleAuth, signIn, signOut, signUp} from "../controllers/auth.js";

const router = express.Router();


//CREATE a user
router.post("/signUp", signUp);
//SIGN IN
router.post("/signIn", signIn)
//SIGN OUT
router.get("/signOut", signOut);
//GOOGLE AUTH
router.post("/google", googleAuth)

export default router;