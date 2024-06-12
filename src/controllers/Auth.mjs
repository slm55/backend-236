import UserRepository from "../repositories/User.mjs";
// import { comparePassword } from "../helpers/hash.mjs";

class AuthController {
    async login(req, res) {
        // const { email, password } = req.body;
        // const user = await UserRepository.getUserByEmail(email);
        // if (!user) {
        //     return res.status(401).send("User not found");
        // }
        // if (!(await comparePassword(password, user.password))) {
        //     return res.status(401).send("Invalid password");
        // }
        // req.session.user = user;
        res.sendStatus(200);
    }

    async register(req, res) {
        const newUser = await UserRepository.addUser(req.body);
        req.login(newUser, function(err) {
            if (err) { return res.sendStatus(400) }
            return res.sendStatus(200);
          });
        // req.session.user = newUser;
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