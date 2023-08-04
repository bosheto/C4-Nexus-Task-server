const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
        default: "N/A"
    },
    img_alt: {
        type: String,
        required: false,
        default: "Product image"
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    price_old: {
        type: Number,
        required: false, 
        default: -1.00
    },
    currency: {
        type: String,
        required: false,
        default: "$"
    },
    discounted: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ['bags', 'shoes', 'other'],
        default: 'other'
    }
})

module.exports = mongoose.model('Product', ProductSchema)