//Ce fichier me permet de créer des données de test afin de travailler avec une BDD qui n'est pas vide

const res = require('express/lib/response');
const mongoose = require('mongoose');
const Product = require('./models/product');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmStand')
        .then(() => {
            console.log("Mongo connection open")
        })
        .catch(err => {
            console.log("Oh no, mongo connection error!");
            console.log(err);
        })
}

//Voilà une première manière d'ajouter un simple produit
// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save().then(p => {
//     console.log(p);
// }).catch(e => {
//     console.log(e);
// })

//Une deuxième manière plus rapide si l'on veut ajouter plusieurs produits en même temps
const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

Product.insertMany(seedProducts)
.then(res => {
    console.log(res);
})
.catch(e => {
    console.log(e);
})

