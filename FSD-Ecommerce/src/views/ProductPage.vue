<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ProductGrid from '@/components/productGrid.vue';

const products = ref([]); // Create a reactive variable for products

const fetchProducts = async () => {
  try {
    const result = await axios.get('http://localhost:8000/api/products');
    products.value = result.data; // Update the reactive variable with the fetched data
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

fetchProducts();
</script>

<template>
  <div class="container mx-auto max-w-fit">
    <ProductGrid :products="products" />
  </div>
</template>
