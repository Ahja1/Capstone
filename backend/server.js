import express from "express";
import dotenv from "dotenv";
import { connectionDB } from './config/db.js';
import Product from '../models/product.js'; // Correct relative path

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.post('/api/products', async (req, res) => {
    const product = req.body; // User will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(5000, () => {
    connectionDB(); // Correct function name
    console.log("Server started at http://localhost:5000");
});
