import ProductRepository from "../repositories/Product.mjs";

class ProductController {
    async getProducts(req, res) {
        req.session.visited = true;
        const category = req.query.category;
        if (!category) {
            const products = await ProductRepository.getProducts();
            return res.send(products);
        } else {
            const products = await ProductRepository.getProductsByCategory(category);
            return res.send(products);
        }
    }

    async addProduct(req, res) {
        const product = await ProductRepository.addProduct(req.body);
        res.status(201).send(product);
    }

    async getProductById(req, res) {
        if (!req.session.visited) {
            return res.sendStatus(400);
        }
        console.log(req.session.id);
        const id = req.params.id;
        const product = await ProductRepository.getProductById(id);
        if (!product) {
            return res.status(400).send("Product not found");
        }
        res.status(200).send(product);
    }

    async getProductsByCategory(req, res) {
        const category = req.params.category;
        const products = await ProductRepository.getProductsByCategory(category);
        res.send(products);
    }

    async updateProduct(req, res) {
        const id = req.params.id;
        const product = await ProductRepository.updateProduct(req.body, id);
        res.send(product);
    }

    async deleteProduct(req, res) {
        const id = req.params.id;
        const product = await ProductRepository.deleteProduct(id);
        res.send(product);
    }
}

export default ProductController;