import bcrypt from "bcrypt"
import {db} from "../libs/db.js"
import jwt from "jsonwebtoken"

import pkg from "@prisma/client";
const { PrismaClient, Prisma } = pkg;

const prisma = new PrismaClient();
const Role = Prisma.Role;


export const registerUser = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const existingUser = await db.user.findUnique({
            where : {
                email : email
            }
        })
    
        if(existingUser){
            return res.status(400).json({
                message : "user already exists"
            })
        }
    
        const hashPassword = await bcrypt.hash(password, 5)
    
        const newUser = await db.user.create({
            data: {
                email : email,
                name : name,
                password : hashPassword,
                role : Prisma.Role.USER
            }
        })
    
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
    
        res.cookie('jwt', token, {
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV !== "development",
            maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
        })
    
        res.status(201).json({
            message : "user registered successfully",
            user : {
                id : newUser.id,
                name : newUser.name,
                email : newUser.email,
                role : newUser.role
            }
        })
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }
}

export const loginUser = async (req, res) => {
}

export const logoutUser = async (req, res) => { 

}
