import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../model/token.js";
import User from "../model/user.js";

dotenv.config()

export const signup = async(req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const {username, password, name} = req.body
        
        const checkUsername = await User.findOne({username})
        if(checkUsername){
            return res.status(400).json({message:"username exists, please sign in"})
        }

        await User.create({username, password, name})
        return res.status(200).json({message: "successfully signed In"})
        
    } catch (error) {
        return res.status(500).json({message: "an error occured while signing in"})
    }
}


export const login = async(req, res) => {
    const {username, password, name} = req.body
    const user = await User.findOne({username})
    if(!user){
        return res.status(400).json({message: "username does not exist"})
    }
     try {
        let match = bcrypt.compare(password, user.password)
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '60m'})
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({token:refreshToken});
            await newToken.save();

            res.status(200).json({accessToken: accessToken, refreshToken:refreshToken, name: user.name, username: user.username})
        } else{
            res.status(400).json({message: "passowrd does not match"})
        }
     } catch (error) {
        res.status(500).json({message: "error while login the user"})
     }
}

export const logoutUser = async (req, res) => {
    const {token } = req.body;
    await Token.deleteOne({token: token})
    res.status(204).json({message: "logout successful"})
}