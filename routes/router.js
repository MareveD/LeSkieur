const express = require('express');
const route = express.Router();
const homeController = require("../controllers/homeController");
const api = require("../controllers/api");

route.get("/", api.sendIndex);
route.get("/index", api.getRedirect);
route.get("/signup", api.sendSignup);
route.get("/signin", api.sendSignin);
route.get("/spotform", api.sendSpotForm);
route.get("/error", api.sendError);

route.get("/profile", homeController.sendProfile);
route.post("/signin", homeController.postSignin);
route.post("/signup", homeController.postSignup);

route.get("/spotAdded", homeController.sendSpot);
route.post("/spotform", homeController.postSpotForm);
route.get("/allspot", homeController.getAllSpot);
route.put("/allspot:id", homeController.editSpot);
route.delete("/allspot:id", homeController.deleteSpot);
route.get("/spotdetail/:id", homeController.getAnID_spot);
route.get('/editSpot:id', homeController.renderEdit);

//---------------------------------------------------------------------------------------//
//3E FONCTIONNALITE//
route.get("/resultSearch", homeController.getSearchResult);
route.get("/searchFriends", api.searchFriends);
route.get("/friendAdded", api.friendAdded);
route.get("/profilSkieur", homeController.getUserProfile);

route.post("/profilSkieur", homeController.addAFriend);
route.get("/profilSkieur/:id", homeController.getAnID_user);
//---------------------------------------------------------------------------------------//

module.exports = route;