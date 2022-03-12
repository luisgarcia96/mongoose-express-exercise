const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

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

//Configuration d'Express pour définir le chemin d'accès vers les views ou templates 
app.set('views', path.join(__dirname, 'views'));

//Configuration d'Express pour définir EJS comme moteur de templates
app.set('view engine', 'ejs');

/**Cette configuration me permet de traduire l'information envoyé dans la POST request (qui est en format url-encoded) à un objet js 
 * compréhensible pour le serveur et qui est disponible dans le req.body
 * 
 * https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
 * https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar
 */
app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method'))

app.listen(3000, () => {
    console.log("App is listening on port 3000");
})




app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index.ejs', {products})
})

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products/new', (req, res) => {
    res.render('products/new.ejs', {categories})
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show.ejs', {product})
})

app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit.ejs', {product, categories})
})

app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators : true, new : true});
    res.redirect(`/products/${product._id}`); 
})

app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})