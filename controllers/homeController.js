const express = require('express');
const app = express();
const axios = require('axios');
app.set('view engine', 'ejs');

exports.getRedirect = (req, rep) => {rep.redirect("/");}
exports.sendIndex = (request, response) => {response.render("index");};