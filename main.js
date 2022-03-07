const express = require('express');
const app = express();
const path = require("path"); 
const homeController = require("./controllers/homeController");

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, "public")));

app.get('/', homeController.sendIndex);
app.get("/index", homeController.getRedirect);

app.listen(3000,()=>{
    console.log("Le serveur est sur le port 3000");
});