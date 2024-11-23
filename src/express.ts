import { Channel } from "amqplib"
import express, { Application, Response, Request, NextFunction } from "express"
import { createChannel } from "./utils/index.js"
import userRouter from "./routes/user_route.js"



const expressApp = (app: Application) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    app.use("/", userRouter)



}
export  default expressApp