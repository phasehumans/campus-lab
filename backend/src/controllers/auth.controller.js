import bcrypt from "bcrypt"
import {db} from "../libs/db.js"
import jwt from "jsonwebtoken"
import {z} from "zod"

import pkg from "@prisma/client";
const { PrismaClient, Prisma } = pkg;

const prisma = new PrismaClient();
const Role = Prisma.Role;


export const registerUser = async (req, res) => {
    const registerUserSchema = z.object({
        name : z.string(),
        email : z.string(),
        password : z.string()
    })
    
    const parseData = registerUserSchema.safeParse(req.body)

    if(!parseData.success){
        return res.status(400).json({
            success : false,
            message : "invalid data",
            errors : parseData.error.flatten()
        })
    }

    const {name, email, password} = parseData.data

    try {
        const existingUser = await db.user.findUnique({
            where : {
                email : email
            }
        })
    
        if(existingUser){
            return res.status(400).json({
                success : false,
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
    
        return res.status(201).json({
            success : true,
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
        return res.status(500).json({
            success : false,
            message : "internal server error",
            error : error.message
        })
    }
}

export const loginUser = async (req, res) => {
    const loginUserSchema = z.object({
        email : z.string(),
        password : z.string()
    })

    const parseData = loginUserSchema.safeParse(req.body)

    if(!parseData.success){
        return res.status(400).json({
            success : false,
            message : "invalid inputs",
            errors : parseData.error.flatten()
        })
    }
    const {email, password} = parseData.data

    try {
        const user = await db.user.findUnique({
            where : {
                email : email
            }
        }) 
        if(!user){
            return  res.status(401).json({
                success : false,
                message : "invalid credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({
                success : false,
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
    
        return res.status(200).json({
            success : true,
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
        return res.status(500).json({
            success : false,
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

        return res.status(200).json({
            success : true,
            message : "user logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
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
                success : false,
                message : "user not found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "USER PROFILE",
            user : {
                id : user.id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            success : true,
            message : "internal server error",
            error : error.message
        })
    }
}