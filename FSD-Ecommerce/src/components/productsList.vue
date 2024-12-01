<template>
  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6">
    <!-- Individual product items -->
    <ProductsListItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @remove="handleRemove"
    />
  </div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue';
import ProductsListItem from './productsListItem.vue';

// Define props
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

// Define emits
const emit = defineEmits(['remove']);

// Handle remove action
const handleRemove = (productId) => {
  emit('remove', productId);
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.text-gray-600 {
  color: #4a5568;
}
</style>
