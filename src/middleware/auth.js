import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const tokenKey = process.env.TOKEN_KEY;

const verifyToken = (req, res, next) => {
    const authorization = req.headers["authorization"];
    const token = authorization?.split(' ')[1];
    const email = req.body.email;


    try {
        const decoded = jwt.verify(token, tokenKey);

        if(decoded?.email === email) {
            return next();
        } else {
            return res.status(403).json({
                message: "error",
                error: "Invalid token or token is required for authentication"
            });
        }
        
    } catch (error) {

        return res.status(403).json({
            message: "error",
            error:  "An error occurred while verifying token, token has expired"
        });

    }

};

export default verifyToken;