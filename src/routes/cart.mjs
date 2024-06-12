import { Router } from "express";
import CartController from "../controllers/Cart.mjs";

const router = Router();
const controller = new CartController();

router.get("/cart", controller.getCart);
router.post("/cart/:id", controller.addProductToCart);
router.put("/cart/:id",  controller.updateProductQuantity);
router.delete("/cart/:id",  controller.deleteProductFromCart);
router.delete("/cart", controller.clearCart)

export default router;