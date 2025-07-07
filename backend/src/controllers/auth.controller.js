import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async(req,res) => {
    const {email,fullName,password,profilePicture} = req.body;
    try {
        if(password.length < 6){
            console.log("password is not long enough");
            return res.status(201).json({message:"password is not long enough"});
            
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"user already exists"});
        }    
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword =  await bcrypt.hash(password,salt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
            profilePicture
        })
        if (newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePicture: newUser.profilePicture,
            })

        }
        else{
            console.log("user not created");
            res.status(400).json({message:"user not created"});

        }


    } catch (error) {
        console.log("error in signup",error);
        res.status(500).json({message:"internal server error"});
        
    }
}

export const login = async(req,res) =>{
    const {email,password} = req.body;
    
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"user does not exist"});
        }
        const ispasswordcorrect = await bcrypt.compare(password,user.password)
        if(!ispasswordcorrect){
            console.log("invalid password or username");
            return res.status(400).json({message:"invalid credentials"})
        }
        generateToken(user._id,res);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
        })

    } catch (error) {
        console.log("error in login",error);
        res.status(500).json({message:"internal server error"});
        
    }
}

export const updateprofile = async(req,res) =>{
    try {
        const {profilePicture} = req.body;
        const userID = req.user._id;
        if(!userID){
            return res.status(400).json({message:"user not found"})
        }
        if(!profilePicture){
            return res.status(400).json({message:"profile picture is required"})
        }
        const uploadstatus = await cloudinary.uploader.upload(profilePicture)

        if(!uploadstatus){
            return res.status(400).json({message:"profile picture upload failed"})
        }
        const pictureupdatestatus = await User.findByIdAndUpdate(userID,{
            profilePicture: uploadstatus.secure_url
        },{new: true})

        res.status(200).json({message:"profile picture updated successfully",profilePicture: uploadstatus.secure_url})
        if(!pictureupdatestatus){
            return res.status(400).json({message:"profile picture update failed"})
        }


    } catch (error) {
        res.status(500).json({message:"internal server error while updating profile picture"});
    }    
}

export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{
            maxAge: 1
        })
        
    } catch (error) {
        console.log("error in logout",error);
        res.status(500).json({message:"internal server error"});
    }
}

export const checkauth = (req,res) => {
    try {

        res.status(200).json(req.user);
        
    } catch (error) {
        console.log("error in checkauth",error);
        res.status(500).json({message:"internal server error"});
    }
}