var mysql = require('mysql');
const bodyParser = require('body-parser')
const path = require('path')
var express = require('express')
const app = express();

const otherUsers = []; //just empty array that will be used later

var setup = false //if true then db will be set up if you don't have one then don't change it, else make it false
// run setup 2 times to make sure it works and then make it false

function setup1() //setup function
{    
    var con = mysql.createConnection( //declare db to connect to
    {
        host: "localhost", //host name
        user: "root", //name of mysql user
        password: "" //if you have one then put it in here
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
    console.log("first stage of setup is done")
}

function setup2(){
    var con = mysql.createConnection( //declare db to connect to
        {
            host: "localhost", //host name
            user: "root", //name of mysql user
            password: "", //if you have one then put it in there
            database: "horkk" //name of created db
        });

    con.connect(function (err) //connect to created database
    {
        if (err) throw err
        con.query("CREATE TABLE users (login VARCHAR(255), password VARCHAR(255), choice VARCHAR(255))", function (err) //create table users with login and password
        {
            if (err) throw err
            console.log("created table users");
        })
    });
    console.log("2nd stage of setup is done")
}

if (setup)
    {
        setup1();
        setup2();
    } else
    {
        console.log("launching without setup...");
        var con = mysql.createConnection( //declare db to connect to
            {
                host: "localhost", //host name
                user: "root", //name of mysql user
                password: "", //if you have password then put it here
                database: "horkk" //db name if created
            });
            
        con.connect(function (err) //connect to db
        {
            if (err) throw err;
            console.log("connected");
        })
    }

//uncomment below to run setup first
//first setup and then setup2 or it may (will fucking) break
//setup();
//setup2();  
//update - just use auto method at the beginning of the file  

app.listen(4500) //make it run on localhost:4500

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>
    {
        res.sendFile('index.html',{root: path.join(__dirname,'public')}); //load index.html
    });
    

app.post('/',(req,res)=>
    {
    var name = JSON.stringify(req.body.name); //get name
    var passwd = JSON.stringify(req.body.password); //get password
    var choice = JSON.stringify(req.body.choice) //i don't have to tell you what it gets...
    if (choice)
        {
            var sx = JSON.stringify("Yes");
            var sx2 = "You want to have sex";
        } 
    else
        {
            var sx = JSON.stringify("Well, it's complicated"); //just like me and her
            var sx2 = "You don't want to have sex"
        }
    var command = `INSERT INTO users (login, password, choice) VALUES (${name}, ${passwd}, ${sx}) `; //add name, password and choice to db
    con.query(command, function (err) 
    {
        if (err) throw err;
        console.log("added login and password to db"); //just to be sure
    })
    //get usernames and user preferences from db
    con.query("SELECT login, choice FROM users",function(err,result,fields)
    {
        if (err) throw err;
        for (let i=0;i<20000;i++)
            {
                if (result[i] != undefined)
                    {
                        //console.log(`login: ${result[i].login}, choice: ${result[i].choice}`);
                        otherUsers[i] = `username: ${result[i].login}, sex: ${result[i].choice}`; //adds data to otherUsers so it can be displayed
                    }
                else{break} //avoid empty db
            }
            // lesson 1 - node.js has asynchronous functions
            res.send(` 
        <!DOCTYPE html>
        <html>
            <head>
                <title>Tinder For Horses</title>
            </head>
            <body>
                <h1 style="margin-top: 15vh;">thank you for using our services!</h1>
                <br>
                <h2>you have been registered using following data: </h2>
                <p>username/login: ${name}</p>
                <p>password: ${passwd}</p>
                <p>${sx2}</p>
                <br>
                <h1>other registered users:</h1>
                <p style="font-size: 1.5rem; color: black">${otherUsers.join(`<br><br>`)}</p>
            </body>
            <style>
                body
                {
                    font-family: sans-serif;
                    background-color: snow;
                    text-align: center;
                    color:crimson;
                }
                p
                {
                    font-size: 1.3rem;
                }
            </style>
        </html>
        `) 
    });
});
/*
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