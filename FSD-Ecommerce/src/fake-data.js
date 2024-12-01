import { ref } from 'vue';
import shoesImage1 from './assets/shoes-1.jpg';
import shoesImage2 from './assets/shoes-2.jpg';
import shoesImage3 from './assets/shoes-3.jpg';
import shoesImage4 from './assets/shoes-4.jpg';
import shoesImage5 from './assets/shoes-5.jpg';
import shoesImage6 from './assets/shoes-6.jpg';
import shoesImage7 from './assets/shoes-7.jpg';
import shoesImage8 from './assets/shoes-8.jpg';
import shoesImage9 from './assets/shoes-9.jpg';
import shoesImage10 from './assets/shoes-10.jpg';
import shoesImage11 from './assets/shoes-11.jpg';
import shoesImage12 from './assets/shoes-12.jpg';

// Function to handle products data
export function useProducts() {
  const products = ref([
    { id: '123', name: 'Running Shoes', price: '60.00', description: 'Perfect for running on any terrain.', imageUrl: shoesImage1, averageRating: '5.0' },
    { id: '234', name: 'Basketball Shoes', price: '120.00', description: 'High performance shoes for the court.', imageUrl: shoesImage2, averageRating: '5.0' },
    { id: '345', name: 'Bright Red Shoes', price: '90.00', description: 'Stand out with these bright red shoes.', imageUrl: shoesImage3, averageRating: '5.0' },
    { id: '456', name: 'Fancy Shoes', price: '190.00', description: 'Elegant shoes for formal occasions.', imageUrl: shoesImage4, averageRating: '5.0' },
    { id: '567', name: 'Skateboard Shoes', price: '75.00', description: 'Durable shoes for skating enthusiasts.', imageUrl: shoesImage5, averageRating: '5.0' },
    { id: '678', name: 'High Heels', price: '200.00', description: 'Stylish high heels for every outfit.', imageUrl: shoesImage6, averageRating: '5.0' },
    { id: '7891', name: 'Dark Shoes', price: '100.00', description: 'Classic dark shoes for everyday wear.', imageUrl: shoesImage7, averageRating: '5.0' },
    { id: '8901', name: 'Classic Shoes', price: '40.00', description: 'Timeless design for casual outings.', imageUrl: shoesImage8, averageRating: '5.0' },
    { id: '901', name: 'Plain Shoes', price: '54.00', description: 'Simple and versatile shoes for all occasions.', imageUrl: shoesImage9, averageRating: '5.0' },
    { id: '912', name: 'Teal Dress Shoes', price: '330.00', description: 'Stunning teal shoes for formal wear.', imageUrl: shoesImage10, averageRating: '5.0' },
    { id: '7892', name: 'Fancy Boots', price: '230.00', description: 'Stylish boots for colder seasons.', imageUrl: shoesImage11, averageRating: '5.0' },
    { id: '8902', name: 'Gold Shoes', price: '180.00', description: 'Shiny gold shoes for special occasions.', imageUrl: shoesImage12, averageRating: '5.0' },
  ]);

  return { products };
}

// Function to handle cart data
export function useCart() {
  const { products } = useProducts();

  const cartItems = ref([
    products.value[0], // Running Shoes
    products.value[1], // Basketball Shoes
    products.value[4], // Skateboard Shoes
  ]);

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    const index = cartItems.value.findIndex(item => item.id === itemId);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
    }
  };

  return { cartItems, removeFromCart };
}
