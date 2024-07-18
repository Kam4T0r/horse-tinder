const bodyParser = require('body-parser');
var express = require('express');
const app = express();
const path = require('path');

app.listen(42069);
app.use(bodyParser.urlencoded({extended: true}));
app.get('/',(req,res)=>
    {
        res.sendFile('home.html',{root: path.join(__dirname,'public/home')});
    })