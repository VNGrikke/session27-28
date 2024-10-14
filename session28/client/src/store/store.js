import { createStore } from "vuex";
import product from "./modules/ListProduct";
import cart from "./modules/Cart";

const store = createStore({
  modules: {
    product,
    cart
  }
});

export default store;
