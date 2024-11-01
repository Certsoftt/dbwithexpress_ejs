import express from 'express'
import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config({path: './.env'})
const app = express()
const port = process.env.PORT
const host = process.env.HOST
const input = 'U'
const db = new pg.Client({
    user: 'postgres',
    password: 'Ubsimple123%',
    database: 'store',
    host: 'localhost',
    port: 5432
});
db.connect()
const result = await  db.query("SELECT * FROM users WHERE username LIKE $1 || '%'", [input])
if(result.rows.length !== 0){
    app.get('/', (req, res)=>{
        res.json(result.rows)
    })
}
app.listen(port, host, ()=>{
    console.log(`${JSON.stringify(result.rows.length)} server started on ${process.env.NODE_ENV} mode. Visit: http://${host}:${port}`)
})