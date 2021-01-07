const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

app.get("/",(req,res)=>{
    res.render('home');
});

app.get("/cargame",(req,res)=>{
    res.render('cargame')
});

app.get("/simonsays",(req,res)=>{
    res.render('simonsays');
});

app.listen( process.env.PORT||3000,(req,res)=>{
    console.log('server started at port 3000!');
});