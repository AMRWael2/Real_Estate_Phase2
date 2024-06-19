const express = require('express');
const path = require('path');
const PostForSale = require('../models/PostForSale');
const router = express.Router();

// POST route for form submission
router.post('/', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    try {
        const { title, description, price, location } = req.body;
        const images = [];

        if (Array.isArray(req.files.image)) {
            // Multiple files uploaded
            for (let file of req.files.image) {
                const uploadPath = path.join(__dirname, '../uploads/', file.name);
                await file.mv(uploadPath);
                images.push(uploadPath);
            }
        } else {
            // Single file uploaded
            const file = req.files.image;
            const uploadPath = path.join(__dirname, '../uploads/', file.name);
            await file.mv(uploadPath);
            images.push(uploadPath);
        }

        const newPost = new PostForSale({
            title,
            description,
            price,
            location,
            images
        });

        await newPost.save();
        res.status(201).send('Post created successfully');
    } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
