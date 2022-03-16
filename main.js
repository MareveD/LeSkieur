const express = require('express');
const app = express();
const path = require("path"); 
const homeController = require("./controllers/homeController");

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, "public")));

app.get('/', homeController.sendIndex);
app.get("/index", homeController.getRedirect);
app.get("/signup", homeController.sendSignup);
app.get("/signin", homeController.sendSignin);
app.get("/profile", homeController.sendProfile);

app.listen(3000,()=>{
    console.log("Le serveur est sur le port 3000");
});



//testAPI//

//Info retournées via mon compte sur l'API du prof//
/*{"address":"",
"phone":"",
"_id":"622a511e48a79e00040c98af",
"name":"Marie-Eve Frechette",
"email":"marevski",
"password":"$2a$08$2YYZLtxCndq4oRM3A/GZLuqzvSXFtmCi/E2KcdnDJQ6g2pJZDv5wS",
"__v":0,
"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MjJhNTExZTQ4YTc5ZTAwMDQwYzk4YWYiLCJleHAiOjE2NDcyNzAwNDQ3NTF9.0GYRNrIEJbxdoyYH7HqPoPH6q97k0TA9S9dclXb0ExU"}*/