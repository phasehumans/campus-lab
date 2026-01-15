import jwt from 'jsonwebtoken';
import {db} from "../libs/db.js" 
import { success } from 'zod';

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
            return  res.status(404).json({
                message : 'User Not Found' 
            });
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(400).json({ 
            success : false,
            message : 'Invalid Token', 
            error : error.message 
        });
    }
}

// RBAC - Check if user is admin
export const checkAdmin = (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = db.user.findUnique({
            where : {
                id : userId
            },select : {
                role : true
            }
        })

        if(!user || user.role !== 'ADMIN'){
            return res.status(403).json({
                message : 'Access Denied: Admins Only'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : 'Server Error', 
            error : error.message
        }); 
    }
}
