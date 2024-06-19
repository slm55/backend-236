import { Router } from "express";
import CartController from "../controllers/Cart.mjs";
import { param } from "express-validator";

const router = Router();
const controller = new CartController();

router.get("/cart", controller.getCart);
router.post("/cart/:id", param("id").notEmpty().withMessage("Product ID should be specified"), controller.addProductToCart);
router.put("/cart/:id",  controller.updateProductQuantity);
router.delete("/cart/:id",  controller.deleteProductFromCart);
router.delete("/cart", controller.clearCart)

export default router;