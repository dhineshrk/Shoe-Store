<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});
console.log(props.product.imageUrl);
</script>

<template>
  <div class="flex flex-col items-center border p-4 rounded-lg shadow-xl">
    <img :src="product.imageUrl" alt="Product Image" class="w-48 h-52 rounded-lg mb-4 object-cover" />
    <router-link :to="'/products/' + product.id" class="block text-lg font-semibold text-blue-600 text-center">
      {{ product.name }}
    </router-link>
    <p class="mt-2 text-gray-600">Price: ${{ product.price }}</p>
    <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
      <router-link :to="'/products/' + product.id" class="text-white">View Details</router-link>
    </button>
  </div>
</template>

