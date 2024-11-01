import express from 'express'
import dotenv from 'dotenv'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import { hostname } from 'os'
import axios from 'axios'

dotenv.config({path: './.env'})
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
const port = process.env.PORT
const host = process.env.HOST
const API_URL = `http://${host}:8080`

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public', 'static')))

app.get('/', async (req, res)=>{
    let response = await axios.get(`${API_URL}/`);
    // console.log(response.data[0])
    try{
        res.render("index.ejs", {content:response.data})
    }catch(err){
        res.render("index.ejs", {content: JSON.stringify(err.message)})
    }
})

app.listen(port, host, ()=>{
    console.log(`${API_URL} server started on ${process.env.NODE_ENV} mode. Visit: http://${host}:${port}`)
})