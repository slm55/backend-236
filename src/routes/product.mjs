import { Router } from "express";
import ProductController from "../controllers/Product.mjs";
import { validateId, resolveProductById } from "../helpers/middlewares.mjs";

const router = new Router();
const controller = new ProductController();

router.get("/products", controller.getProducts);
router.get("/products/:id", validateId, resolveProductById, controller.getProductById);
router.post("/products", controller.addProduct);
router.put("/products/:id", validateId, resolveProductById, controller.updateProduct);
router.delete("/products/:id", validateId, resolveProductById, controller.deleteProduct);


export default router;