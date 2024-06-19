const mongoose = require('mongoose');

const postForSaleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true }
});

const PostForSale = mongoose.model('PostForSale', postForSaleSchema);

module.exports = PostForSale;
