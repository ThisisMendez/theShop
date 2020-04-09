const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: { 
      type: String, 
      maxlength: 50
    }, 
    description: {
      type: String 
    }, 
    price: { 
      type: Number, 
      default: 0 //price starts at 0
    }, 
    images: {
      type: Array, //more than 1 images are being stored
      default: []
    }, 
    continents: { 
      type: Number, //type will be a number because of the key:
      default: 1 //It's 1 because it starts at key 1 
    }, 
    sold: { 
      type: Number, 
      maxlength: 100, // only 100 available 
      default: 0
    }, 
    views: { 
      type: Number, 
      default: 0
    }
}, {timestamps: true})


const Product = mongoose.model( 'Product', productSchema);

module.exports = { Product }