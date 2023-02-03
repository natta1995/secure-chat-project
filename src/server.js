import express from 'express'
import { get } from 'http'
import * as url from 'url'
import messageRoute from './routers/messages.js'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { matchUserAndPassword, createToken } from './auth.js'


const app = express()
const staticPath = url.fileURLToPath(new URL('../static', import.meta.url))

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body)
    next()
}

app.use( express.json() )
app.use( logger )
app.use( express.static(staticPath))


app.use( messageRoute )


app.post('/login', (req, res) => {
    const name = req.body.name
    const password = req.body.password

    if( matchUserAndPassword(name, password) ){
        const userToken = createToken(name) 
        res.status(200).send(userToken)

    } else {
        res.sendStatus(401) 
        return
    } 

})



/*const authexampel = (req, res, next) => {
    let path = req.url
    if ( path.startsWith('/private')) {
        res.sendStatus(403)
    } else {
        next()
    }
}*/





// get static files


app.get('/public', (req, res) => {
    let path = staticPath + '/index.html'
    //console.log('GET / path=', path)
    res.sendFile(path)
})


/*app.get('/private', (req, res) => {
    let path = staticPath + '/private.html'
    res.sendFile(path)
})*/



export { app }