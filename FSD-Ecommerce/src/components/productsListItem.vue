<template>
  <div class="flex items-center justify-center">
    <div class="flex flex-col bg-white border rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 mx-auto">
    <!-- Product image -->
    <img
      :src="product.imageUrl"
      alt="Product Image"
      class="h-40 w-full object-cover"
    />
    
    <!-- Product details -->
    <div class="p-4 flex flex-col space-y-3">
      <h2 class="text-lg font-bold text-gray-800">
        {{ product.name }}
      </h2>
      <p class="text-gray-600">
        Price: <span class="text-green-500 font-semibold">$ {{ product.price }}</span>
      </p>
      <button
        @click="removeProduct"
        class="mt-auto bg-red-500 text-white text-sm py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
      >
        Remove from Cart
      </button>
    </div>
  </div>
  </div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue';

// Define props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Define emits
const emit = defineEmits(['remove']);

// Emit remove event with product ID
const removeProduct = () => {
  emit('remove', props.product.id);
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
