const express = require('express');
const res = require('express/lib/response');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product')

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

//Configuration d'express pour définir le chemin d'accès vers les views ou templates 
app.set('views', path.join(__dirname, 'views'));

//Configuration d'express pour définir EJS comme moteur de templates
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("App is listening on port 3000");
})

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index.ejs', {products})
})