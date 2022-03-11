//On require mongoose car on va créer des Modèles à partir de mongoose
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

//On compile le modèle "Product" à partir du productSchema
//Compiler un modèle signifie créer un constructeur qui nous permettra à la fois  de créer des instances de ce Modèle.
//Les instances des modèles sont appelés 'documents'

const Product = mongoose.model('Product', productSchema);

module.exports = Product;