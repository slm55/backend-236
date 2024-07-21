import CartRepository from "../repositories/Cart.mjs";
import ProductRepository from "../repositories/Product.mjs";

class ProductController {
  async getProducts(req, res) {
    let products = await ProductRepository.getProducts();
    if (req.user) {
        const cart = await CartRepository.getUserCart(req.user);
        products = products.map(p => ({...p, quantity: cart.find(c => c.id == p.id)?.quantity || 0 }));
    }
    res.send(products)
  }

  async addProduct(req, res) {
    const product = await ProductRepository.addProduct(req.body);
    res.status(201).send(product);
  }

  async getProductById(req, res) {
    const id = req.params.id;
    const product = await ProductRepository.getProductById(id);
    if (!product) {
      return res.status(400).send("Product not found");
    }
    if (req.user) {
        const cart = await CartRepository.getUserCart(req.user);
        product.quantity = cart.find(c => c.id == product.id)?.quantity || 0;
    }
    res.send(product);
  }

  async getProductsByCategory(req, res) {
    const category = req.params.category;
    const products = await ProductRepository.getProductsByCategory(category);
    if (!products.length) {
      return res.status(400).send("No products found in this category");
    }
    if (req.user) {
        const cart = await CartRepository.getUserCart(req.user);
        products = products.map(p => ({...p, quantity: cart.find(c => c.id == p.id)?.quantity || 0 }));
    }
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
