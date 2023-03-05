import jwt from 'jsonwebtoken'

const fakeDb = [
    { name: 'Natalie', password: 'hund' }
]

function matchUserAndPassword (userName, password) {
    const found = fakeDb.find(user => user.name === userName && user.password === password )
    return Boolean(found)
}

function createToken(name) {
    const user = { name: name }
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h'})
    user.token = token
    return user
}

export { createToken, matchUserAndPassword }
