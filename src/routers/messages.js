import express from 'express'

const router = express.Router()

const messagePublic = [
    { chatName: 'Alice', chatMessage: 'Hur mår alla idag?', id: 1 },
    { chatName: 'Emma', chatMessage: 'Det är bra själv?', id: 2 },
    { chatName: 'Björn', chatMessage: 'När skall uppgiften vara inlämmnad?', id: 3 }
]

const messagePrivate = [
    { chatName: 'Emil', chatMessage: 'Hemligheten är hundvalp', id: 1 },
    { chatName: 'Pål', chatMessage: 'Okej', id: 2 },
    { chatName: 'Hannah', chatMessage: 'Visst', id: 3 }
]


// get messages array

router.get('/public/message', (req, res) => { 
    res.send(messagePublic)
})

router.get('/public/message/:id', (req, res) => {
    const id = req.params.id
 
    let maybeMessage = messagePublic.find(message => message.id === Number(id))
        if(maybeMessage) {
            res.send(maybeMessage)
        } else {
            res.sendStatus(404)
        }
})

router.get('/private/message', (req, res) => { 
    res.send(messagePrivate)
})

router.get('/private/message/:id', (req, res) => {
    const id = req.params.id
  
    let maybeMessage = messagePrivate.find(message => message.id === Number(id))
    if(maybeMessage) {
        res.send(maybeMessage)
    } else {
        res.sendStatus(404)
    }
   
})

router.post('/public/message/', (req, res) => {
    const newMessage = req.body
    messagePublic.push(newMessage)
    res.sendStatus(200)

})

router.post('/private/message/', (req, res) => {
    const newMessage = req.body
    messagePrivate.push(newMessage)
    res.sendStatus(200)
})


export default router