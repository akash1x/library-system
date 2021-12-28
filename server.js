if(process.env.NODE_ENV !=='production'){
require('dotenv').config();
  
}

const express = require('express');
const app = express();
const expressLayouts=require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

//Setting view engine
app.set('view engine','ejs');

//Setting from where our views will come. __dirname :give current directory
app.set('views', __dirname+'/views');

//hooking up express layouts
app.set('layout','layouts/layout');
app.use(expressLayouts);

//Setting static files
app.use(express.static('public'));

//Setting up the database

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL).then(()=> console.log('DB connected')).catch(err=>console.log(err));


//Seting up the route
app.use('/',indexRouter);


app.listen(process.env.PORT||3000, (err)=>{
    console.log("Server started");
})