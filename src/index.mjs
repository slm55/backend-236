import express from "express";
import cors from "cors";
import session from "express-session";
import pool from "./database.mjs";
import pgSimpleSession from "connect-pg-simple";
const pgSession = pgSimpleSession(session);
import productRouter from "./routes/product.mjs";
import authRouter from "./routes/auth.mjs";
import cartRouter from "./routes/cart.mjs"
import "./helpers/local-strategy.mjs";
import passport from "passport";

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
    secret: "secretislam",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: new pgSession({
      pool: pool,
      tableName: "session",
    })
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(productRouter);
app.use(authRouter);
app.use(cartRouter);


const appStart = () => {
    try {
        app.listen(8000, () => {
            console.log(`Server running on port 8000`);
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

appStart();
