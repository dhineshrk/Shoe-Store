<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Import useRouter for navigation
import axios from 'axios';

// Reactive variables
const route = useRoute(); // To extract the product ID from the route
const router = useRouter(); // To navigate between pages
const product = ref(null); // Holds the product details
const loading = ref(true); // Tracks the loading state
const errorMessage = ref(''); // Error message for UI

// Fetch product details
onMounted(async () => {
  const productId = route.params.id; // Get product ID from the route
  console.log('Fetching product with ID:', productId); // Debugging

  try {
    const response = await axios.get(`http://localhost:8000/api/products/${productId}`); // Call the backend
    product.value = response.data; // Assign the fetched product to the reactive variable
    console.log('Product fetched:', product.value); // Debugging
  } catch (error) {
    console.error('Error fetching product:', error);
    errorMessage.value = 'Could not fetch product details. Please try again later.';
  } finally {
    loading.value = false; // Stop loading spinner
  }
});

// Add to cart functionality
const addToCart = async () => {
  const productId = route.params.id; // Get product ID from route
  try {
    await axios.post(`http://localhost:8000/api/users/12345/cart/${productId}`); // API call to add product to cart
    alert('Product added to cart successfully!');

    // Navigate to the ProductPage
    router.push('/products'); // Replace '/products' with the actual path for your ProductPage
  } catch (error) {
    console.error('Error adding product to cart:', error);
    alert('Failed to add product to cart. Please try again.');
  }
};
</script>

<template>
  <!-- Show loading state -->
  <div v-if="loading" class="text-center text-lg font-semibold">Loading...</div>

  <!-- Show error state -->
  <div v-else-if="errorMessage" class="text-center text-red-500 font-semibold">
    {{ errorMessage }}
  </div>

  <!-- Show product details -->
  <div v-else class="container mx-auto p-4">
    <div class="flex flex-col md:flex-row gap-8 items-center justify-center">
      <!-- Product Image -->
      <img
        :src="product.imageUrl"
        alt="Product Image"
        class="w-64 h-72 rounded-lg shadow-lg object-cover"
      />

      <!-- Product Details -->
      <div class="flex flex-col space-y-4">
        <h1 class="text-3xl font-bold">{{ product.name }}</h1>
        <p class="text-lg text-gray-600">{{ product.description }}</p>
        <p class="text-xl font-semibold text-blue-500">Price: ${{ product.price }}</p>
        <p class="text-md text-gray-500">Rating: {{ product.averageRating }} / 5</p>

        <!-- Add to Cart Button -->
        <button
          @click="addToCart"
          class="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling here if necessary */
</style>
