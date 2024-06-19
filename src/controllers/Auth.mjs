import { validationResult } from "express-validator";
import UserRepository from "../repositories/User.mjs";

class AuthController {
    async login(req, res) {
        res.sendStatus(200);
    }

    async register(req, res) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send(result.array());
        }
        const newUser = await UserRepository.addUser(req.body);
        req.login(newUser, function(err) {
            if (err) { return res.sendStatus(400) }
            return res.sendStatus(200);
          });
    }

    async logout(req, res) {
        if (!req.user) return res.sendStatus(401);
        req.logout((err) => {
          if (err) return res.sendStatus(400);
          res.sendStatus(200);
        });
    }

    async status(req, res) {
        if (!req.user) {
            return res.sendStatus(401);
        }
        const user = req.user;
        res.status(200).send({email: user.email, fullname: user.fullname});
    }
}

export default AuthController;