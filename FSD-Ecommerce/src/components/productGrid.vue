<script setup>
import ProductGridItem from './productGridItem.vue';

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
      <ProductGridItem v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>
