const express = require('express'); // npm i express
const mongoose = require('mongoose');
const House = require('./models/house.js')
const methodOverride = require('method-override'); // npm i method-override

/**********************  connecting to DATA BASE   ***************************/
mongoose.connect('mongodb://localhost:27017/house-rent')

/**** If there is error the print connection error else print Database connected*/
const db = mongoose.connection;
db.on("error" , console.error.bind(console , "connection error:"))
db.once("open" , () =>{
    console.log("Database connected")
});

const app = express();
const path = require('path');

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'))


/************************  Middlewares ****************************/
app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'));

/************************  ROUTES  *****************************/

app.get('/' , (req ,res)=>{
    res.render('home.ejs')
})

// create a new house
app.get('/houses/new' , (req , res) => {
    res.render('houses/new.ejs');
})

app.post('/houses' , async (req , res) => {
    const house = new House(req.body.house);
    await house.save();
    res.redirect(`houses/${house._id}`)
})


// read houses
app.get('/houses' ,async (req ,res)=>{
    const houses = await House.find({});
    res.render('houses/index.ejs' , { houses })
})

app.get('/houses/:id' , async( req , res) => {
    const house = await House.findById(req.params.id)
    res.render('houses/show.ejs' , { house });
})

// Updating houses
app.get('/houses/:id/edit' , async( req , res) => {
    const house = await House.findById(req.params.id)
    res.render('houses/edit.ejs' , { house });
})

app.put('/houses/:id' , async(req , res) =>{
    const { id } = req.params;
    const house = await House.findByIdAndUpdate(id , { ...req.body.house });
    res.redirect(`/houses/${house._id}`)
})

// Deleting a house
app.delete('/houses/:id' , async(req , res) =>{
    const { id } = req.params;
    await House.findByIdAndDelete(id);
    res.redirect('/houses')
})



app.listen(3000 , () => {
    console.log("Serving port at 3000")
})

