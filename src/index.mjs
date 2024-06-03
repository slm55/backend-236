import express from "express";
import cors from "cors"
import productRouter from "./routers/product.mjs"

const app = express();
app.use(cors());
app.use(productRouter);


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
