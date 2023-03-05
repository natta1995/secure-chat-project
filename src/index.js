import { app } from './server.js'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { matchUserAndPassword } from './auth.js'

dotenv.config()
const PORT = process.env.PORT
const SECRET = process.env.SECRET

app.use( (req, res, next) => {
    console.log(`${req.method} ${req.url} ${req.body}`)
    next()
})

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

function createToken(name) {
    const user = { name: name }
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h'})
    user.token = token
    return user
}

app.listen(PORT, () => {
    console.log('server is listening to port ' + PORT)
})