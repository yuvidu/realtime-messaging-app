import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectedroute = async (req, res ,next)=> {
    try {
        const cookietoken = req.cookies.jwt;
        if(!cookietoken){
            return res.status(401).json({message:"unauthorized access coookie are not here"});
        }
        const decoded = jwt.verify(cookietoken, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"do not decode the token due to invalid secret"})
        }
        const user = await User.findById(decoded.userid).select("-password");
        if(!user){
            return res.status(401).json({message:"user not in database according to decoded tokenvalue"})
        }
        req.user = user;
        next();


    } catch (error) {
        console.log("error in protected route", error);
        res.status(500).json({message:"internal server error"});
        
    }
} 