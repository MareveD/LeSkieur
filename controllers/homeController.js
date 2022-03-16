const express = require('express');
const app = express();
const axios = require('axios');

app.set('view engine', 'ejs');

exports.getRedirect = (req, rep) => {
    rep.redirect("/");
}
exports.sendIndex = (request, response) => {
    response.render("index");
};
exports.sendSignup = (request, response) => {
    response.render("signup");
};
exports.sendSignin = (request, response) => {
    response.render("signin");
};
exports.sendProfile = (request, response) => {
    response.render("profile");
};