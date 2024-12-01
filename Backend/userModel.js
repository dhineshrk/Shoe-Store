// Import Mongoose
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    cartItems: [String] // Array of product IDs representing the user’s cart items
});

const User = mongoose.model('User', userSchema);

export { User as userModel };
