import express from "express";
import User from "../models/user.model.js";
import message from "../models/message.model.js";

export const getusersforsidebar = async (req, res) => {

    try {

        const loggedinuserid = req.user._id;
        const filteredusers = await User.find({
            _id: { $ne: loggedinuserid }
        }).select("-password");
        res.status(200).json(filteredusers);
        
    } catch (error) {
        res.status(500).json({"message":"internal server error"});
        console.log("error in getusersforsidebar", error);
    }
    
}

export const getmessages = async (req,res) => {
    try {
        const {id: usertochatid} = req.params;
        const currentuserid = req.user._id;
        const messages = await message.find({
            $or: [
                { senderID: currentuserid, receiverID: usertochatid },
                { senderID: usertochatid, receiverID: currentuserid }
            ]
        })
        res.status(200).json(messages);
        
    } catch (error) {
        res.status(500).json({"message":"internal server error"});
        console.log("error in getmessages", error);
    }
}

export const sendmessage = async (req,res) => {
    try {

        const {receiverid:receiverID} = req.params;
        const {text,image} = req.body;
        const senderID = req.user._id;
        let imageURL;
        if(image){

            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;

        }
        const newmessage = new Message({
            senderID,
            receiverID,
            text,
            image: imageURL
            
        })   
        const savestatus = await newmessage.save();
        if(!savestatus){
            return res.status(400).json({"message":"message not sent"});
        }
        res.status(200).json({
            _id: newmessage._id,
            senderID: newmessage.senderID,
            receiverID: newmessage.receiverID,
            text: newmessage.text,
            image: newmessage.image,
            createdAt: newmessage.createdAt
        })

        
    } catch (error) {
        res.status(500).json({"message":"internal server error"});
        console.log("error in sendmessage", error);
        
    }
}