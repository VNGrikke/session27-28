
import { getAllCart, removeFromCart, updateProductQuantity } from "@/api/CartApi";
import { getAllProduct } from "@/api/listProductApi";

const cart = {
    state: {
        cart: [],
        products: [],
    },
    mutations: {
        setCart(state, cart) {
            state.cart = cart;
        },
        setProducts(state, products) {
            state.products = products;
        }
    },
    actions: {
        async fetchCart({ commit }) {
            const cart = await getAllCart();
            commit("setCart", cart);
        },
        async getAllProduct({ commit }) {
            const products = await getAllProduct();
            commit("setProducts", products);
        },
        async removeFromCart({ dispatch }, productId) {
            await removeFromCart(productId);
            dispatch("fetchCart");
        },
        async updateCartProduct({ dispatch }, { productId, quantity }) {
            await updateProductQuantity(productId, quantity);
            dispatch("fetchCart"); 
        }
    },
    getters: {
        cart: (state) => state.cart,
        product: (state) => state.products,
    }
};

export default cart;
