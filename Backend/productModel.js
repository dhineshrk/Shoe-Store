// productModel.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: String,
    description: String,
    imageUrl: String,
    averageRating: String
});

const Product = mongoose.model('Product', productSchema);

export { Product as productModel };
