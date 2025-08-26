import User from "../models/user.model.js";
import message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import {getReceiverSocketId} from "../lib/socket.js";
import {io} from "../lib/socket.js";

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
            senderID:{ $in: [currentuserid, usertochatid]},
            receiverID:{ $in: [currentuserid, usertochatid]}
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
        const newmessage = new message({
            senderID,
            receiverID,
            text,
            image: imageURL
        })   
        const savestatus = await newmessage.save();

        if(!savestatus){
            return res.status(400).json({"message":"message not sent"});
        }

        // Try to emit socket event
        try {
            const receiverSocketId = getReceiverSocketId(receiverID);
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage", newmessage);
            }
        } catch (socketError) {
            console.error("Error in socket emission:", socketError);
            // Don't send response here, just log the error
        }

        // Send single response
        return res.status(200).json({
            _id: newmessage._id,
            senderID: newmessage.senderID,
            receiverID: newmessage.receiverID,
            text: newmessage.text,
            image: newmessage.image,
            createdAt: newmessage.createdAt
        });
        
    } catch (error) {
        console.error("Error in sendmessage:", error);
        return res.status(500).json({"message":"internal server error"});
    }
}