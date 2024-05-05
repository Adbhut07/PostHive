import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) =>{
    try {
      const token = req.cookies.jwt;   
      if (!token) {
        return next(errorHandler(401, "Unauthorized - No Token Provided"));
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return next(errorHandler(401, "Unauthorized - No Token Provided"));
        }
        req.user = user;
        next();
      });
    } catch (error) {
        console.log("Error in protectRoute middleware: ",error.message);
        return next(errorHandler(500, "Internal Server Error"));
    }
}