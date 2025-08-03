import mongoose from "mongoose";
import express from 'express';
import { Server } from "http";
import app from "./app";

const PORT =5000;
let server:Server;

async function main(){
    try {
        await mongoose.connect(`mongodb+srv://mongoDB:mongoDB@cluster0.nbhtrh3.mongodb.net/Library_management_system?retryWrites=true&w=majority&appName=Cluster0`)
        server =app.listen(PORT,()=>{
            console.log(`Listening on Port Number  ${PORT}`)
        })

    } catch (error) {
        console.log(error,"error khaisi")
    }
}
main() 