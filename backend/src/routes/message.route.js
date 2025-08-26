import express from "express";
import {protectedroute} from "../middleware/auth.middleware.js";
import {getusersforsidebar,getmessages,sendmessage} from "../controllers/message.controller.js";

const Router = express.Router();

export default Router;

Router.get("/getusers", protectedroute,getusersforsidebar);
Router.get("/:id" , protectedroute,getmessages);
Router.post("/send/:receiverid", protectedroute,sendmessage);
