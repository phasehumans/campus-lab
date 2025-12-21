import jwt from 'jsonwebtoken';
import {db} from "../libs/db.js" 
export const authMiddleware = async(req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await db.user.findUnique({
            where : {
                id : verified.id
            },
            select : {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })

        if(!user){
            return  res.status(404).json({ message: 'User Not Found' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token', error: error.message });
    }
}
   