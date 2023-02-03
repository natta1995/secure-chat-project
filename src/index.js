import { app } from './server.js'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { matchUserAndPassword } from './auth.js'



dotenv.config()
const PORT = process.env.PORT
const SECRET = process.env.SECRET
console.log('port secret it', PORT, SECRET)


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
    console.log('create token', user)
    return user
}

app.get('/private', (req, res) => {
    let token = req.body.token || req.query.token 
    if( !token ) {
        let x = req.headers['authorization']
        if (x === undefined) {
        res.sendStatus(401)
        return
    }
    token = x.substring(7)
}

    console.log('token: ', token)
    if( token ){
        let decoded
        try {
            decoded = jwt.verify(token, process.env.SECRET)
        } catch(error){
            console.log('Felaktigt token!')
            res.sendStatus(401)
            return
        }
        
        console.log('decoded', decoded)
        let path = staticPath + '/private.html'
        res.send(path)
    } else {
        res.sendStatus(401)
    }
})


app.listen(PORT, () => {
    console.log('server is listening to port ' + PORT)
})