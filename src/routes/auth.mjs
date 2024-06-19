import { Router } from "express";
import AuthController from "../controllers/Auth.mjs";
import passport from "passport";
import { body } from "express-validator";

const router = Router();
const controller = new AuthController();

router.post("/login", passport.authenticate("local"), controller.login);
router.post("/register", body("email").isEmail().withMessage("Email should be valid"), body("password").isLength({min: 8}).withMessage("Password should contain at least 8 symbols"), controller.register);
router.post("/logout", controller.logout);
router.get("/status", controller.status);

export default router;