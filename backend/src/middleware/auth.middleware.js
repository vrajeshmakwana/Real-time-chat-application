import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

export const protectRoute = async(req, res, next) =>{
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided"})
        }
        
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(404).json({ message: " user Not Found"})
        }
        req.user = user
        next()
    } 
    catch (error) {
        console.log("Error in protectroute middleware: ", error.message);
        res.status(500).json({message: "Internal Server Error"})   
    }
}