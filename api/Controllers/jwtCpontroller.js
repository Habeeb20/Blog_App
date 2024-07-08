import  jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../model/token.js";
dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];
    if(token == null) {
        return res.status(401).json({message: 'token is missing'});
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if(error){
            return res.status(403).json({message: 'invalid token'})
        }
        req.user = user;
        next()

    })
}

export const createNewToken = async(req, res) => {
    const refreshToken= req.body.token.split("")[1];

    if(!refreshToken){
        return res.status(401).json({message: "refresh token is missing"})
    }

    const token = await Token.findOne({token: refreshToken});
    if(!token){
        return res.status(404).json({message: 'refresh token is missing'})
    }

    jwt.verify(token.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
        if (error) {
            response.status(500).json({ msg: 'invalid refresh token'});
        }
        const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});

        return response.status(200).json({ accessToken: accessToken })
    })
}