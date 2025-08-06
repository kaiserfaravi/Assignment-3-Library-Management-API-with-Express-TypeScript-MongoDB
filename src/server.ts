import mongoose from "mongoose";
import express from 'express';
import { Server } from "http";
import app from "./app";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const db = process.env.MONGODB_URI;

// const PORT =5000;
let server:Server;

async function main(){
    try {
        // await mongoose.connect(`mongodb+srv://mongoDB:mongoDB@cluster0.nbhtrh3.mongodb.net/Library_management_system?retryWrites=true&w=majority&appName=Cluster0`)
        await mongoose.connect(db)
        server =app.listen(port,()=>{
            console.log(`Listening on Port Number   ${port}`)
        })

    } catch (error) {
        console.log(error,"error khaisi")
    }
}
main() 