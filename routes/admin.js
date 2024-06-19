const express = require('express');
const PostForSale = require('../models/PostForSale');
const router = express.Router();

router.get('/sellRequests', async (req, res) => {
    try {
        const posts = await PostForSale.find(); 
        res.render('sellRequests', { posts }); 
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
