<template>
  <div>
    <h1>Shopping Cart</h1>

    <ul>
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <img :src="item.image" alt="Product Image" />
        <div class="product-info">
          <h2>{{ item.name }}</h2>
          <p class="price">${{ item.price }}</p>
          <input
            type="number"
            v-model.number="item.updatedQuantity"
            :placeholder="`${item.quantity}`"
          />
        </div>

        <div>
          <button @click="updateProductInCart(item)">Update</button>
          <button @click="removeProductFromCart(item.id)">Remove</button>
        </div>
      </li>
    </ul>

    <h3>Subtotal: ${{ subtotal }}</h3>
  </div>
</template>
  
  <script setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const cart = computed(() => store.getters.cart);

const subtotal = computed(() => {
  return cart.value
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
});

onMounted(() => {
  store.dispatch("fetchCart");
  store.dispatch("getAllProduct");
});

const updateProductInCart = (product) => {
  const updatedQuantity = product.updatedQuantity;
  if (updatedQuantity > 0) {
    store.dispatch("updateCartProduct", {
      productId: product.id,
      quantity: updatedQuantity,
    });
  } else {
    console.log("so luong khong hop le");
  }
};

const removeProductFromCart = (productId) => {
  store.dispatch("removeFromCart", productId);
  console.log("xoa thanh cong");
};
</script>
  
<style>
ul {
  list-style: none;
  padding: 0;
  margin-left: 100px;
  max-width: 800px;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #ddd;
}

.product-info {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h2 {
  font-size: 1.2rem;
  margin: 0;
  color: #333;
}

.price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
}

input[type="number"] {
  width: 50px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 15px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease;
}

input[type="number"]:focus {
  border-color: #007bff;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-right: 5px;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.subtotal {
  max-width: 800px;
  margin: 20px auto;
  padding: 15px;
  text-align: right;
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  background-color: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
  