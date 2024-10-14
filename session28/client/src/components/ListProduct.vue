<template>
  <div class="list-product">
    <h1>List Product</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <img :src="product.image" alt="Product Image" />
        <div>
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <p class="total">Total: {{ product.quantity }}</p>
        </div>
        <div class="quantity-price-container">
          <input
            type="number"
            v-model.number="product.selectedQuantity"
            :max="product.quantity"
            :min="1"
          />
          <p class="price">Price: ${{ product.price }}</p>
          <button @click="addProductToCart(product)">Add to cart</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const products = computed(() => store.getters.products);

onMounted(() => {
  store.dispatch("getAllProduct");
});

const addProductToCart = async (product) => {
  if (product.selectedQuantity && product.selectedQuantity > 0) {
    if (product.selectedQuantity > product.quantity) {
      console.log("khong du so luong");
    } else {
      await store.dispatch("addToCart", {
        productId: product.id,
        quantity: product.selectedQuantity,
      });

      console.log("them thanh cong");
      store.dispatch("getAllProduct");
    }
  } else {
    console.log("nhap so luong");
  }
};
</script>

<style>
.list-product {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #ddd;
}

li > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 1.2rem;
  margin: 0;
  color: #333;
  font-weight: bold;
}

p {
  font-size: 0.9rem;
  color: #777;
  margin: 5px 0;
}

.total {
  font-weight: bold;
  margin-top: 5px;
  color: #007bff;
}

.quantity-price-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.quantity-price-container p.price {
  margin-bottom: 10px;
}

input[type="number"] {
  width: 60px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 15px;
  font-size: 1rem;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
