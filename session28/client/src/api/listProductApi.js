import axios from "axios";
import { getAllCart } from "@/api/CartApi";

export const getAllProduct = async () => {
    const response = await axios.get("http://localhost:3000/product");
    return response.data;
};

export const addToCart = async (productId, quantity) => {
    const products = await getAllProduct();
    const product = products.find(p => p.id === productId);

    if (!product || product.quantity < quantity) {
        console.log("không đủ số lượng");
        return;
    }

    const cart = await getAllCart();
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        const updatedProduct = {
            ...existingProduct,
            quantity: existingProduct.quantity + quantity,
        };
        await axios.put(`http://localhost:3000/cart/${existingProduct.id}`, updatedProduct);
    } else {
        const newProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        };
        await axios.post("http://localhost:3000/cart", newProduct);
    }

    // Cập nhật lại số lượng sản phẩm trong kho
    const updatedStockProduct = {
        ...product,
        quantity: product.quantity - quantity,
    };
    await axios.put(`http://localhost:3000/product/${productId}`, updatedStockProduct);
};

export const updateProductQuantity = async (productId, newQuantity) => {
    const response = await axios.get(`http://localhost:3000/product/${productId}`);
    const updatedProduct = {
        ...response.data,
        quantity: newQuantity,
    };
    await axios.put(`http://localhost:3000/product/${productId}`, updatedProduct);
};
