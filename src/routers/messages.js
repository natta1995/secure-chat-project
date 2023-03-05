import express from 'express'

const router = express.Router()

const date = new Date();

const messagePublic = [ 
    { chatName: 'Alice', chatMessage: 'Hur mår alla idag? Skickat: ' + date.toString(), id: 1 },
    { chatName: 'Emma', chatMessage: 'Det är bra själv? Skickat: ' + date.toString(), id: 2 },
    { chatName: 'Björn', chatMessage: 'När skall uppgiften vara inlämmnad? Skickat: ' + date.toString(), id: 3 }

]

const messagePrivate = [ 
    { chatName: 'Emil', chatMessage: 'Hemligheten är hundvalp. Skickat: ' + date.toString(), id: 1 },
    { chatName: 'Pål', chatMessage: 'Okej. Skickat: ' + date.toString(), id: 2 },
    { chatName: 'Hannah', chatMessage: 'Visst. Skickat: ' + date.toString(), id: 3 }

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
    const date = new Date();
    messagePublic.push({
        chatName: newMessage.chatName,
        chatMessage: newMessage.chatMessage + " Skickat: " + date.toString(),
        id: newMessage.id
    });
    res.sendStatus(200)
})

router.post('/private/message/', (req, res) => {
    const newMessage = req.body
    const date = new Date();
    messagePrivate.push({
        chatName: newMessage.chatName,
        chatMessage: newMessage.chatMessage + " Skickat: " + date.toString(),
        id: newMessage.id
    });
    res.sendStatus(200)
})

export default router