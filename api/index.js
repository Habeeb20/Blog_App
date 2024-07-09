import connectDb from "./database/connectDb.js";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import path from "path"
import router from "./routes/route.js";
import bodyParser from "body-parser";


//connecting to the database
connectDb();

const __dirname = path.resolve()
const port = 5000

const app = express();


app.use(cors())
app.use(express.json())
app.use(bodyParser.json({extended: true}))
app.use(cookieParser());
app.use('/', router);

app.use(express.static(path.join(__dirname, '/client/dist')))


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})


mongoose.connection.once('open', () => {
    console.log("connected")
    app.listen(port, () => console.log(`server is listening on port ${port}`))
})

