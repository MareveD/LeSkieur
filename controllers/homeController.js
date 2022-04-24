const axios = require('axios');

exports.sendProfile = (request, response) => {
    const data = request.session.profileData;
    if (data === undefined) {
        response.redirect("signin");
    } else {
        console.log("Rendering profile with token: " + data.token);
        response.render("profile", {
            'data': data
        });
    }
};

exports.sendSpot = (request, response) => {
    const data = request.session.spotData;
    if (data === undefined) {
        response.redirect("spotform");
    } else {
        response.render("spotAdded", {
            'data': data
        });
    }
};

exports.postSpotForm = (req, rep) => {
    const name = req.body.name;
    const description = req.body.description;
    const address = req.body.address;
    const difficulty = req.body.difficulty;
    const longitude = Number(req.body.longitude);
    const latitude = Number(req.body.latitude);

    const data = {
        name: name,
        description: description,
        address: address,
        difficulty: difficulty,
        coordinates: [longitude, latitude]
    };
    let token = req.session.skiApiToken;
    const config = {
        method: "post",
        url: "https://ski-api.herokuapp.com/ski-spot",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
        },
        data: data,
    };
    axios(config)
        .then(function (response) {
            req.session.spotData = response.data.skiSpot;
            rep.redirect("spotAdded");
        })
        .catch(error => {
            rep.redirect("error");
        });
};

exports.getAllSpot = (req, rep) => {
    let token = req.session.skiApiToken;
    let pageNB = Number(req.query.page || 1);

    const config = {
        method: "get",
        url: "https://ski-api.herokuapp.com/ski-spot?limit=10&page=" + pageNB,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token
        },
    };
    axios(config)
        .then(function (resultat) {
            req.session.spotData = resultat.data.skiSpots;

            let showSpots = resultat.data.skiSpots;
            let paginationSpot = resultat.data.totalPages;

            let pagePrevious = pageNB - 1;
            let pageNext = pageNB + 1;

            rep.render("allspot", {
                showSpots,
                paginationSpot,
                pageNB,
                pagePrevious,
                pageNext
            });
        })
        .catch(error => {
            rep.redirect("error");
        });
};

exports.getAnID_spot = (req, rep) => {
    let token = req.session.skiApiToken;
    const id = req.params.id;

    const config = {
        method: "get",
        url: "https://ski-api.herokuapp.com/ski-spot/" + id,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token
        }
    };
    axios(config)
        .then(function (resultat) {
            let showSpot = resultat.data.skiSpot;
            rep.render("spotdetail", {
                showSpot
            });
        })
        .catch(error => {
            rep.redirect("error");
        });
};

exports.renderEdit = (req, res) => {
    let token = req.session.skiApiToken;
    const id = req.params.id;

    const config = {
        method: "get",
        url: "https://ski-api.herokuapp.com/ski-spot/" + id,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token
        }
    };
    axios(config)
        .then(function (resultat) {
            let data = resultat.data.skiSpot;
            res.render("editSpot", {
                'data': data
            });
        })
        .catch(error => {
            res.redirect("error");
        });
};

exports.editSpot = (req, res) => {
    let token = req.session.skiApiToken;

    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const address = req.body.address;
    const difficulty = req.body.difficulty;
    const longitude = Number(req.body.longitude);
    const latitude = Number(req.body.latitude);

    const data = {
        name: name,
        description: description,
        address: address,
        difficulty: difficulty,
        coordinates: [longitude, latitude],

    };
    const config = {
        method: "put",
        url: "http://ski-api.herokuapp.com/ski-spot/" + id,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token
        },
        data: data
    };
    axios(config)
        .then(() => {
            res.redirect('allspot');
        })
        .catch(error => {
            res.redirect("error");
        });
};

exports.deleteSpot = (req, res) => {
    const token = req.session.skiApiToken;
    const id = req.params.id;

    const config = {
        method: "delete",
        url: "http://ski-api.herokuapp.com/ski-spot/" + id,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token
        }
    };
    axios(config)
        .then(() => {
            res.redirect('allspot');
        })
        .catch(error => {
            res.redirect("error");
        });
};

exports.postSignin = ("/signin", (req, rep) => {
    const email = req.body.email;
    const password = req.body.password;

    const data = {
        email: email,
        password: password,
    };
    const config = {
        method: "post",
        url: "https://ski-api.herokuapp.com/login",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        data: data,
    };
    axios(config)
        .then(function (response) {
            let token = response.data.token;

            const data = {
                token: token,
            };
            req.session.skiApiToken = token;
            const config = {
                method: "get",
                url: "https://ski-api.herokuapp.com/tokenInfo",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                    Accept: "application/json",
                },
                data: data,
            };
            axios(config)
                .then(function (response) {
                    req.session.profileData = response.data;
                    rep.redirect("profile");
                })
                .catch(error => rep.redirect("error"));
        })
        .catch(error => rep.redirect("error"));
});

exports.postSignup = ("/signup", (req, rep) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const initialData = {
        name: name,
        email: email,
        password: password,
    };
    const config = {
        method: "post",
        url: "https://ski-api.herokuapp.com/signup",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        data: initialData,
    };
    axios(config)
        .then(function () {
            const config = {
                method: "post",
                url: "https://ski-api.herokuapp.com/login",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                data: initialData,
            };
            axios(config)
                .then(function (response) {
                    let token = response.data.token;
                    const data = {
                        token: token,
                    };
                    req.session.skiApiToken = token;
                    const config = {
                        method: "get",
                        url: "https://ski-api.herokuapp.com/tokenInfo",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                            Accept: "application/json",
                        },
                        data: data,
                    };
                    axios(config)
                        .then(function (response) {
                            req.session.profileData = response.data;
                            rep.redirect("profile");
                        })
                        .catch(error => rep.redirect("error"));
                })
                .catch(error => rep.redirect("error"));
        })
        .catch(error => rep.redirect("error"));
});