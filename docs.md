this is documentation for horse tinder made by Kam4T0r

project was made and tested using NODE.js version 21.6.1
libraries used for this project are express, mysql, path and body parser

to run it simply run 'npm i' to download 'node_modules', then run 'node entry.js' modifying it according to your needs preferences, consider configuring mysql

project consists of 'public' directory, 'entry.js', 'test.js' and other files and folders like 'node_modules/', 'package-lock.json' and 'package.json'

'public/':
    contains 'index.html' which is registration page, it's made of 2 parts, 1 - HTML which has POST method form and 2 - style which contains CSS code for this website

'public/home/':
    home directory for registered user, it contains file named home.html which will be used later, role of this file is testing main page of this application

'test.js':
    file made for testing new features of this app and learning js functions used in this project

entry.js:
    this file is main application file, at the beginning we import node modules and declare our values that we will use later
    after this we declare otherUsers[] - array that will be holding data of other registered users later

    setup is boolean that declares if we want to set up db first or not, 'true' means that configuration will be executed and 'false' means that app will be launched directly, it is recommended to launch setup twice and then disable it
    next we declare 2 functions - 'setup1()' and 'setup2()', these will create db and table that we will be using in this project !(read code comments)!
    if you skip setup then app will connect to already existing db (you should check db info in 'var con = mysql.createConnection()')

    after this we use 'app' variable to host our app on port '4500' (you can change that), it means that to connect to our app via web browser we will need to send request on port '4500'

    next we tell 'express' to use 'body-parser' which will make it possible for us to show front-end to our users in web browser

    next we tell out app to make get request to 'public/index.html' - this will show 'public/index.html' in browser on 'localhost:4500'

    next we make POST request to our front-end file 'public/index.html' using 'app.post('/',(req,res))', this gives us 'req' (request) and 'res' (response)
    we declare variables 'name', 'passwd' and 'choice'
        'name' - fetches data from 'name' input
        'passwd' - fetches data from 'password' input
        'choice' - fetches data from 'choice' checkbox 
    
    then we have loop that checks if 'choice' was checked or not
    if choice was checked then 'sx' is "Yes", else 'sx' is "Well, that's complicated"
        'sx2' is just different 'sx' version that will be displayed for user
    
    after this we push 'name', 'passwd' and 'sx' to 'horkk' db, to table named 'users'
        'name' goes to 'login'
        'passwd' goes to 'password'
        'sx' goes to 'choice'
    
    next part is fetching data from our database and displaying it on user's screen
    
    you will be met with a loop that checks every position in 'users' table
    it basically checks if position is null, if it is then loop will break because that indicates end of data, else it will add to otherUsers login and choice of user at this particular position

    then app will display on screen HTML code, the same code that you can find in 'public/home/home.html', it displays data that user has been registered with and then displays other users in our db

    rest is just for pure knowledge

if you have any questions then dm me