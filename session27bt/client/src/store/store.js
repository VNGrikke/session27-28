import { createStore } from "vuex";
import employee from './modules/emlpoyee';

const store = createStore({
    modules: {
        employee
    }
});

export default store;
