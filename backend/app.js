import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'


const app = express();

app.use(cors({
    origin:process.env.CORE_ORIGIN,
    credentials:true
}))

app.use(cookieParser())
app.use(express.json({limit:"50kb"}));
app.use(express.urlencoded({extended:true,limit:"50kb"}))
app.use(express.static("public"))

// import routers
import userRouter from './routes/user.route.js'
import todoRouter from './routes/todo.route.js'


// routers declaration
app.use('/api/v1/user',userRouter)
app.use('/api/v1/todo',todoRouter)

export {app}