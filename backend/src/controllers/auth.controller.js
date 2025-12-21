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
    const {email, password} = req.body

    try {
        const user = await db.user.findUnique({
            where : {
                email : email
            }
        }) 
        if(!user){
            return  res.status(401).json({
                message : "invalid credentials"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({
                message : "invalid credentials"
            })
        }
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
    
        res.cookie('jwt', token, {
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV !== "development",
            maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
        })
    
        res.status(200).json({
            message : "user logged in successfully",
            user : {
                id : user.id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })  
    
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }

}

export const logoutUser = async (req, res) => { 
    try {
        res.clearCookie('jwt', {
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV !== "development",
        })

        res.status(200).json({
            message : "user logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        const user = await db.user.findUnique({
            where : {
                id : userId
            }
        })
        if(!user){
            return res.status(404).json({
                message : "user not found"
            })
        }
        res.status(200).json({
            user : {
                id : user.id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }
}