const express=require('express');
const path=require('path');
const session=require("express-session");
const{v4:uuidv4}=require("uuid");

const nocache = require("nocache")
const cookieParser=require('cookie-parser');

const router=require('./router');

const app=express();

const port=9000;

app.use(express.json())
app.use(express.urlencoded(({extended:true})))

app.set('view engine','ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
app.use(cookieParser())
app.use(nocache())

app.use(session({
    secret:uuidv4(),// 'fb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    //cookie:{maxAge:60000},
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:60*60*7*21,
    }
}));



app.use('/',router); 

//home route


app.listen(port,()=>(console.log("Listening to the server on http://localhost:9000")));
