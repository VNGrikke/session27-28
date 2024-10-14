import axios from "axios";

export const getAllCart = async () => {
    const response = await axios.get("http://localhost:3000/cart");
    return response.data;
};

export const removeFromCart = async (productId) => {
    const cartItemResponse = await axios.get(`http://localhost:3000/cart/${productId}`);
    const quantityInCart = cartItemResponse.data.quantity;

    await axios.delete(`http://localhost:3000/cart/${productId}`);

    const productResponse = await axios.get(`http://localhost:3000/product/${productId}`);
    const currentStoreQuantity = productResponse.data.quantity;

    const newQuantity = currentStoreQuantity + quantityInCart;

    await axios.patch(`http://localhost:3000/product/${productId}`, { quantity: newQuantity });

};
export const updateProductQuantity = async (productId, quantity) => {
    const cartItemResponse = await axios.get(`http://localhost:3000/cart/${productId}`);
    const oldQuantity = cartItemResponse.data.quantity;

    const disparityQuantity = oldQuantity - quantity;

    if (disparityQuantity >= 0) {
        await axios.patch(`http://localhost:3000/cart/${productId}`, { quantity: quantity });

        const productResponse = await axios.get(`http://localhost:3000/product/${productId}`);
        const currentStoreQuantity = productResponse.data.quantity;

        const quantityInStore = currentStoreQuantity + disparityQuantity;
        await axios.patch(`http://localhost:3000/product/${productId}`, { quantity: quantityInStore });

    } else {
        const productResponse = await axios.get(`http://localhost:3000/product/${productId}`);
        const currentStoreQuantity = productResponse.data.quantity;

        if (currentStoreQuantity >= -disparityQuantity) {
            await axios.patch(`http://localhost:3000/cart/${productId}`, { quantity: quantity });

            await axios.patch(`http://localhost:3000/product/${productId}`, { quantity: currentStoreQuantity + disparityQuantity });
        } else {
            console.log("Số lượng trong kho không đủ.");
        }
    }

};

