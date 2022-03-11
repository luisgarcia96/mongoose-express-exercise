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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("App is listening on port 3000");
})

app.get('/dog', (req, res) => {
    res.send('Woof!')
})