<script setup>
import { RouterLink } from 'vue-router';


</script>

<template>
    <div class="navbar flex justify-between sticky top-0 bg-gray-800 p-5">
      <RouterLink to="/products" id="products-link">
        <h1 class="text-5xl text-white font-semibold">FREAKY FOOTWEARS</h1>
      </RouterLink>
      <RouterLink to="/cart" id="cart-link">
        <button class="text-lg font-semibold bg-white rounded-md p-3">SHOPPING CART</button>
      </RouterLink>
    </div>
  </template>
  
