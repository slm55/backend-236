import { Router } from "express";
import ProductController from "../controllers/Product.mjs";

const router = new Router();
const controller = new ProductController();

router.get("/products", controller.getProducts);

export default router;