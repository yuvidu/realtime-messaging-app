import mongoose from "mongoose";

export const connctDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongodb is connected ${conn.connection.host}`);
    }catch (error){
        console.log("error connecting to mongodb",error)
    }
}

