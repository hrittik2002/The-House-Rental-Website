const mongoose = require('mongoose');
const House = require('../models/house.js')
const data = require('./data')

mongoose.connect('mongodb://localhost:27017/house-rent')
const db = mongoose.connection;
db.on("error" , console.error.bind(console , "connection error:"))
db.once("open" , () =>{
    console.log("Database connected")
});


// putting dummy data
const seedDB = async () => {
    await House.deleteMany({});
    for(let i = 0; i < 10; i++){
        //const random10 = Math.floor(Math.random() * 10)
        const base = new House({
            owner : `${data[i].owner}`,
            price : `${data[i].price}`,
            description :`${data[i].description}`,
            city : `${data[i].city}`,
            locality : `${data[i].locality}`,
            phoneNumber :`${data[i].phoneNumber}`
        })
        await base.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})