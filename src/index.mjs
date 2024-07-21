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
import todoRouter from "./routes/todo.mjs"
// import {data} from "./helpers/data.js"

const app = express();
app.use(cors({ origin: true, credentials: true }));
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
app.use("/auth", authRouter);
app.use(cartRouter);
app.use(todoRouter);


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

// addProducts(data)

// async function addProducts(products) {

//     const queryText = 'INSERT INTO products(title, description, category, brand, size, price, stock, images, suggestion, allegations) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

//     for (let product of products) {

//       await pool.query(queryText, [
//         product.title,
//         product.description,
//         product.category,
//         product.brand,
//         product.size,
//         product.price,
//         product.stock,
//         product.images,
//         product.suggestion,
//         product.allegations
//       ]);
//     }

//     console.log("complete")
// }