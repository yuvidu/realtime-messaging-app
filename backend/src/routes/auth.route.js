import express from "express";
import {login,signup,logout,updateprofile,checkauth} from "../controllers/auth.controller.js";
import {protectedroute} from "../middleware/auth.middleware.js";

const Router = express.Router();

export default Router;

Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/logout", logout);
Router.put("/updateprofile",protectedroute,updateprofile);
Router.get("/check",protectedroute,checkauth);
