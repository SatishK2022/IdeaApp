const express = require('express');
const serverConfig = require('./configs/server.config.js')
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config.js')
const userModel = require('./models/user.model.js')
const bcrypt = require('bcrypt')

const app = express();

// Logic to connect ot mongoDB and create an Admin
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to DB");
})

db.once("open", () => {
    console.log("DB is Connected");

    init();
})

async function init() {
    // Check if the admin user is already present
    let admin = await userModel.findOne({
        userId : "admin"
    })

    if(admin){
        console.log("Admin user already present");
        return;
    }

    admin = await userModel.create( {
        name: "Satish Kumar",
        userId: "admin",
        email: "sk7399052@gmail.com",
        userType: "ADMIN",
        password: bcrypt.hashSync("Welcome1", 8)
    });
    console.log(admin);
}

// Starting the Server
app.listen(serverConfig.PORT, () => {
    console.log(`Server Started on the port Number ${serverConfig.PORT}`);
})