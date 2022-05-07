const express = require('express');
const route = express.Router();
const homeController = require("../controllers/homeController");
const api = require("../controllers/api");

//---------------------------------------------------------------------------------------//
//1.0 PROFILE//
route.get("/", api.sendIndex);
route.get("/home", api.home);
route.get("/index", api.getRedirect);
route.get("/signup", api.sendSignup);
route.get("/signin", api.sendSignin);
route.get("/spotform", api.sendSpotForm);
route.get("/error", api.sendError);
route.get("/profile", homeController.sendProfile);
route.post("/signin", homeController.postSignin);
route.post("/signup", homeController.postSignup);

//---------------------------------------------------------------------------------------//
//2.0 SPOTS//
route.get("/spotAdded", homeController.sendSpot);
route.post("/spotform", homeController.postSpotForm);
route.get("/allspot", homeController.getAllSpot);
route.put("/allspot:id", homeController.editSpot);
route.delete("/allspot:id", homeController.deleteSpot);
route.get("/spotdetail/:id", homeController.getAnID_spot);
route.get('/editSpot:id', homeController.renderEdit);

//---------------------------------------------------------------------------------------//
//3.0 SEARCH//
route.get("/resultSearch", homeController.getSearchResult);
route.get("/searchFriends", api.searchFriends);
route.get("/profilSkieur", homeController.getUserProfile);
route.get("/profilSkieur/:id", homeController.getAnID_user);

//3.1 ADD & DELETE FRIENDS//
route.get("/friendAdded", api.pageFriendAdded);
route.post("/profilSkieur", homeController.addAFriend);
route.post("/resultSearch", homeController.addAFriend);
route.delete("/resultSearch:id", homeController.deleteFriend);

//3.2 SEE FRIENDS//
route.get("/showFriend", homeController.showFriend);
route.get("/showFriendPage", homeController.showFriendPage);
//---------------------------------------------------------------------------------------//

module.exports = route;