import ProductRepository from "../repositories/Product.mjs";

class ProductController {
    async getProducts(req, res) {
        const products = await ProductRepository.getProducts();
        res.send(products);
    }
}

export default ProductController;