var mysql = require('mysql');
const bodyParser = require('body-parser')
const path = require('path')
var express = require('express')
const app = express();

function setup() //setup function
{    
    var con = mysql.createConnection( //declare db to connect to
    {
        host: "localhost", //localhost
        user: "root", //name of mysql user, if you have password then add password: "your password"
    });

    con.connect(function (err) //connect to db
    {
        if (err) throw err;
        console.log("connected");
        con.query("CREATE DATABASE horkk", function (err) //create db
        {
            if (err) throw err
            console.log("db horkk created");
        })
    })

    setup2(); //call 2nd stage setup
}

function setup2(){
    var con = mysql.createConnection( //declare db to connect to
        {
            host: "localhost", //localhost
            user: "root", //name of mysql user, if you have password then add password: "your password"
            database: "horkk" //name of created db
        });

    con.connect(function (err) //connect to created database
    {
        if (err) throw err
        con.query("CREATE TABLE users (login VARCHAR(255), password VARCHAR(255))", function (err) //create table users with login and password
        {
            if (err) throw err
            console.log("created table users");
        })
    });
}

//uncomment below to run setup first
//setup();
    

app.listen(42069) //make it run on localhost:42069

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>
    {
        res.sendFile('index.html',{root: path.join(__dirname,'public')});
    });
    

app.post('/',(req,res)=>
    {
    res.sendFile('index.html',{root: path.join(__dirname,'public')});
    var name = JSON.stringify(req.body.name); //get name
    var passwd = JSON.stringify(req.body.password); //get password
    var command = "INSERT INTO users (login, password) VALUES (" + name + "," + passwd + ")"; //add name and password to db
    con.query(command, function (err) 
    {
        if (err) throw err
        console.log("ok");
    })
    
    app.get('/home.html',(req,res)=> //go to the next page
    {
        res.sendFile('index.html',{root: path.join(__dirname,'public')});
        var list = document.getElementById('data_list');
        list.innerHTML += `<li>name: ${name}</li>`;
        list.innerHTML += `<li>password: ${passwd}</li>`;
    });
});

var con = mysql.createConnection( //declare db to connect to
{
    host: "localhost", //localhost
    user: "root", //name of mysql user, if you have password then add password: "your password"
    database: "horkk" //db name if created
});
    
con.connect(function (err) //connect to db
{
    if (err) throw err;
    console.log("connected");
})

/* 
commands:
insert "INSERT INTO users (login, password) VALUES ('test', 'test')"
create db "CREATE DATABASE horkk"
create table "CREATE TABLE users (login VARCHAR(255), password VARCHAR(255))"
delete from table "DELETE FROM users WHERE login = 'test'"
*/