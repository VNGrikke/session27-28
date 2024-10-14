import { addToCart, getAllProduct } from "@/api/listProductApi";

const products = {
    state: {
        products: [],
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        }
    },
    actions: {
        async getAllProduct({ commit }) {
            const products = await getAllProduct();
            commit("setProducts", products);
        },
        async addToCart({ commit }, { productId, quantity }) {
            await addToCart(productId, quantity);

        }
    },
    getters: {
        products: state => state.products,
    }
};

export default products;
