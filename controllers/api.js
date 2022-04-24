exports.getRedirect = (request, response) => {
    response.redirect("/");
};

exports.sendIndex = (request, response) => {
    response.render("index");
};

exports.sendSignup = (request, response) => {
    response.render("signup");
};

exports.sendSignin = (request, response) => {
    response.render("signin");
};

exports.sendError = (request, response) => {
    response.render("error");
};

exports.sendSpotForm = (request, response) => {
    response.render("spotform");
};