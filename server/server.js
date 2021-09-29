import express from 'express'
import http from 'http';
import bodyParser from 'body-parser';
import routing from './routes.js'
import dotenv from 'dotenv';
import cors from 'cors'


dotenv.config()
const app = express()
const httpServer = http.createServer(app)

app.use(cors({
    origin : 'http://localhost:3000'
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routing)


httpServer.listen(5000, (err)=>{
    if(err){
        console.log("Error in starting the server")
    }
    console.log("Server running at port 5000")
})

