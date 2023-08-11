const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const port = 80;

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

}
//mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});
const Contact = mongoose.model('Contact', contactSchema);


// app.use(express.static('static',Option));
app.use('/static', express.static('static'));//static file
app.use(express.urlencoded());

//pug
app.set('view engine', 'pug');// set the template engine for using pug

app.set('views', path.join(__dirname, 'views'));// set directory

//End point
app.get("/", (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
});

app.get("/contact", (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params)
});

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send('items has been saved into the database');
    }).catch(() => {
       return res.status(404).send("Item has not been saved into the database");
    });
    // res.status(200).render('contact.pug')
});


//Start the server

app.listen(port, () => {
    console.log(`The application started sucessfully on port ${port}`)
});