import { Router } from "express";
import AuthController from "../controllers/Auth.mjs";
import passport from "passport";

const router = Router();
const controller = new AuthController();

router.post("/login", passport.authenticate("local"), controller.login);
router.post("/register", controller.register);
router.post("/logout", controller.logout);
router.get("/status", controller.status);

export default router;