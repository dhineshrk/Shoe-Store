// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

// Import models
import { productModel as Product } from '../productModel';
import { userModel as User } from '../userModel';

// Sample product data to insert initially
const sampleProducts = [
    { id: '123', name: 'Running Shoes', price: '60.00', description: 'Perfect for running on any terrain.', imageUrl: '/src/assets/shoes-1.jpg', averageRating: '5.0' },
    { id: '234', name: 'Basketball Shoes', price: '120.00', description: 'High performance shoes for the court.', imageUrl: '/src/assets/shoes-2.jpg', averageRating: '5.0' },
    { id: '345', name: 'Bright Red Shoes', price: '90.00', description: 'Stand out with these bright red shoes.', imageUrl: '/src/assets/shoes-3.jpg', averageRating: '5.0' },
    { id: '456', name: 'Fancy Shoes', price: '190.00', description: 'Elegant shoes for formal occasions.', imageUrl: '/src/assets/shoes-4.jpg', averageRating: '5.0' },
    { id: '567', name: 'Skateboard Shoes', price: '75.00', description: 'Durable shoes for skating enthusiasts.', imageUrl: '/src/assets/shoes-5.jpg', averageRating: '5.0' },
    { id: '678', name: 'High Heels', price: '200.00', description: 'Stylish high heels for every outfit.', imageUrl: '/src/assets/shoes-6.jpg', averageRating: '5.0' },
    { id: '7891', name: 'Dark Shoes', price: '100.00', description: 'Classic dark shoes for everyday wear.', imageUrl: '/src/assets/shoes-7.jpg', averageRating: '5.0' },
    { id: '8901', name: 'Classic Shoes', price: '40.00', description: 'Timeless design for casual outings.', imageUrl: '/src/assets/shoes-8.jpg', averageRating: '5.0' },
    { id: '901', name: 'Plain Shoes', price: '54.00', description: 'Simple and versatile shoes for all occasions.', imageUrl: '/src/assets/shoes-9.jpg', averageRating: '5.0' },
    { id: '912', name: 'Teal Dress Shoes', price: '330.00', description: 'Stunning teal shoes for formal wear.', imageUrl: '/src/assets/shoes-10.jpg', averageRating: '5.0' }
];


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dhineshrk77')
    .then(() => console.log("Database Connected"))
    .catch(error => console.error("Database connection error:", error));

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '../assets')));

// Function to insert sample products if needed
const insertSampleProducts = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(sampleProducts);
            console.log("Sample products inserted successfully.");
        }
    } catch (error) {
        console.error("Error inserting sample products:", error);
    }
};
insertSampleProducts();

// Endpoint to create a new user
app.post('/api/users', async (req, res) => {
    try {
        const { id, name } = req.body;
        let user = await User.findOne({ id });

        if (!user) {
            user = new User({ id, name, cartItems: [] });
            await user.save();
            res.status(201).json({ message: "User created successfully", user });
        } else {
            res.status(400).json({ message: "User already exists" });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the user." });
    }
});

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching products." });
    }
});

// GET a specific product by ID
app.get('/api/products/:productId', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.productId });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the product." });
    }
});

// GET user’s cart items

app.get('/api/users/:userId/cart', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Fetch all products in the user's cart
        const cartItems = await Product.find({ id: { $in: user.cartItems } });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching cart items." });
    }
});


// POST a product to the user’s cart
app.post('/api/users/:userId/cart/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params; // Use params, not body

        // Find the user
        const user = await User.findOne({ id: userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if the product exists
        const product = await Product.findOne({ id: productId });
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Add product ID to user's cart if not already added
        if (!user.cartItems.includes(productId)) {
            user.cartItems.push(productId);
            await user.save();
        }

        // Fetch the updated cart items
        const cartItems = await Product.find({ id: { $in: user.cartItems } });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while adding to the cart." });
    }
});


// DELETE a product from the user’s cart by ID
app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.cartItems = user.cartItems.filter(item => item !== req.params.productId);
        await user.save();

        const cartItems = await Product.find({ id: { $in: user.cartItems } });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while removing from the cart." });
    }
});

// Start the server
app.listen(8000, () => {
    console.log("Server running on port 8000");
});