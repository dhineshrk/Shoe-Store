<script setup>
import { onMounted } from 'vue';
import { useCart } from '../composables/useCart';
import ProductsList from '../components/ProductsList.vue';

// Mock user ID
const userId = '12345';

// Use the useCart composable
const {
  cartItems,
  loading,
  fetchCartItems,
  removeFromCart,
  proceedToCheckout,
  totalPrice
} = useCart(userId);

// Fetch cart items when the component is mounted
onMounted(fetchCartItems);
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>

    <!-- Display loading message while fetching cart items -->
    <p v-if="loading" class="text-gray-500">Loading...</p>

    <!-- Display the product list -->
    <ProductsList
      :products="cartItems"
      @remove="removeFromCart"
    />

    <!-- Show total price and checkout button -->
    <div v-if="cartItems.length > 0" class="mt-8">
      <p class="text-xl font-semibold">Total Price: $ {{ totalPrice.toFixed(2) }}</p>
      <button
        @click="proceedToCheckout"
        class="mt-4 bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition-all"
      >
        Proceed to Checkout
      </button>
    </div>

    <!-- If the cart is empty -->
    <div v-else-if="!loading">
      <p class="text-xl text-gray-600">Your cart is empty.</p>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles if needed */
</style>
