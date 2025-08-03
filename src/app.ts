import { Application, Request, Response } from "express"
import { booksRouter } from "./app/controllers/book.controller"
import { borrowBooksRouter } from "./app/controllers/borrowbook.controller"

const express = require('express')
const app:Application = express()
app.use(express.json())

app.use('/api/books',booksRouter)
app.use('/api/borrow',borrowBooksRouter)

app.get('/',(req:Request,res:Response)=>{
    console.log(`Welcome To Library management System`);
    res.send({
        message:'Welcome to Library Management System',
        succes:'true'
    })
})

export default app