import jwt from "jsonwebtoken"
export const generateToken= (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "7d"
    })
    res.cookie("jwt", token,{
        maxAge: 7 * 24 * 60 * 60 * 60 * 1000, // Formula of calculating 7days expiry date using miliseconds,
        httpOnly: true, // Prevent Xss cross-site Scripting attacks
        sameSite: "strict", // Prevent CSRF attack cross site request forgery attack
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}