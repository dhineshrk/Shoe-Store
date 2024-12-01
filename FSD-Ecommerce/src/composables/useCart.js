// // src/composables/useCart.js
// import { ref, computed } from 'vue';
// import axios from 'axios';

// export function useCart() {
//   const cartItems = ref([]);
//   const loading = ref(true);

//   // Fetch cart items from the backend
//   const fetchCartItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/users/12345/cart');
//       cartItems.value = response.data;
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//     } finally {
//       loading.value = false;
//     }
//   };

//   // Remove an item from the cart
//   const removeFromCart = async (productId) => {
//     try {
//       await axios.delete(`/api/users/12345/cart/${productId}`);
//       cartItems.value = cartItems.value.filter(item => item.id !== productId);
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     }
//   };

//   // Proceed to checkout (stub function for now)
//   const proceedToCheckout = () => {
//     alert('Proceeding to checkout!');
//   };

//   // Compute the total price of items in the cart
//   const totalPrice = computed(() => 
//     cartItems.value.reduce((total, item) => total + Number(item.price), 0)
//   );

//   // Return the necessary values
//   return {
//     cartItems,
//     loading,
//     fetchCartItems,
//     removeFromCart,
//     proceedToCheckout,
//     totalPrice
//   };
// }
import { ref, computed } from 'vue';
import axios from 'axios';

export function useCart(userId) {
  const cartItems = ref([]);
  const loading = ref(true);

  // Fetch cart items from the backend
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${userId}/cart`);
      cartItems.value = response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      loading.value = false;
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}/cart/${productId}`);
      cartItems.value = cartItems.value.filter(item => item.id !== productId);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Proceed to checkout (stub function for now)
  const proceedToCheckout = () => {
    alert('Proceeding to checkout!');
  };

  // Compute the total price of items in the cart
  const totalPrice = computed(() => 
    cartItems.value.reduce((total, item) => total + Number(item.price), 0)
  );

  // Return the necessary values
  return {
    cartItems,
    loading,
    fetchCartItems,
    removeFromCart,
    proceedToCheckout,
    totalPrice
  };
}
