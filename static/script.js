//import { question } from 'readline-sync'
const addMessage = document.querySelector('#send-message')
const chatInput = document.querySelector('.form-container input')
const chatHistory = document.querySelector('.chat-history')
const startChatPublic = document.querySelector('#getChat1')
const chatInput2 = document.querySelector('.form-container2 input')
const startChatprivate = document.querySelector('#getChat2')
const chatHistoryPrivate = document.querySelector('.chat-history2')
const addMessage2 = document.querySelector('#send-message2')
const login = document.querySelector('#logIn')
const logout = document.querySelector('#logOut')
const inputUsername = document.querySelector('#userName')
const inputPassword = document.querySelector('#password')


const JWT_KEY = 'secure-chat-login'
let isLoggedin = false


function uppdateLogginStatus(){
    login.disabled = isLoggedin
    logout.disabled = !isLoggedin
    addMessage2.disabled = !isLoggedin
    startChatprivate.disabled = !isLoggedin
}

login.addEventListener('click', async () => {

    const user = {
        name: inputUsername.value, 
        password: inputPassword.value
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json"
        }
    }
    
    const response = await fetch('/login', options)
    if( response.status === 200 ){
        console.log('You are logged in')
        const userToken = await response.json()
        console.log('Usertoken', userToken)
        localStorage.setItem(JWT_KEY, userToken.token)
        isLoggedin = true
    } else {
        console.log("fail" + response.status)
    }
    uppdateLogginStatus()
})

logout.addEventListener('click', () => {
    window.location.reload()
})


async function getMessages() {

    let privateData = null
    try {
        const response = await fetch('/private/message')
        if ( response.status !== 200 ){
            console.log('Could not find server: ', response.status)
            return
        }
        privateData = await response.json()
        console.log('data from server ', privateData)
    } catch(error) {
        console.log('something whent wrong! ' + error.message)
    }

    chatHistoryPrivate.innerHTML = ''

    privateData.forEach(messages => {

        let li = document.createElement('li')
        li.innerText = `${messages.chatName} ${messages.chatMessage}`
        chatHistoryPrivate.appendChild(li)
    })

}
startChatprivate.addEventListener('click', getMessages)

function userId(){
    let userId 
    if(isLoggedin){
        userId = inputUsername.value
    } else {
        userId = "Gäst "
    }
    return userId
}


addMessage2.addEventListener('click', async () => {
    const valueFromUser = chatInput2.value

   
        const newMessages = {
            chatName: userId() + " ",
            chatMessage: valueFromUser,
            id: nextMessageId
        }
        nextMessageId++
    
        const element = createChatElement(newMessages)
        chatHistoryPrivate.appendChild(element)
    
       
    })
    
    function createChatElement(newMessages) {
        const element = document.createElement('li')
        const label = document.createElement('label')
        const span = document.createElement('span')
        label.innerText = newMessages.chatName
        span.innerText = newMessages.chatMessage + "  Skickat:  " + Date()
    
        label.appendChild(span).style.color = "black"
        element.appendChild(label)
        return element
    }



//const key = 'secure-chat'
let nextMessageId = 4


async function getMessage() {

    let publicData = null
    try {
        const response = await fetch('/public/message')
        if ( response.status !== 200 ){
            console.log('Could not find server: ', response.status)
            return
        }
        publicData = await response.json()
        console.log('data from server ', publicData)
    } catch(error) {
        console.log('something whent wrong! ' + error.message)
    }

    chatHistory.innerHTML = ''

    publicData.forEach(message => {

        let li = document.createElement('li')
        li.innerText = `${message.chatName} ${message.chatMessage}`
        chatHistory.appendChild(li)
        
    })

}

startChatPublic.addEventListener('click', getMessage)




/*chatInput2.addEventListener('keyup', event => {
    let userText = chatInput2.value
    if( userText.length > 0 ) {
        addMessage.disabled = false
    } else {
        addMessage.disabled = true
    }
})

*//*

chatInput.addEventListener('keyup', event => {
    let userText = chatInput.value
    if( userText.length > 0 ) {
        addMessage.disabled = false
    } else {
        addMessage.disabled = true
    }
})*/


addMessage.addEventListener('click', async () => {
const valueFromUser = chatInput.value
    
    const newMessage = {
        chatName: userId() + " ",
        chatMessage: valueFromUser,
        id: nextMessageId
    }
    nextMessageId++

    const element = createChatElement(newMessage)
    chatHistory.appendChild(element)

   
})

function createChatElement(newMessage) {
    const element = document.createElement('li')
    const label = document.createElement('label')
    const span = document.createElement('span')
    label.innerText = newMessage.chatName
    span.innerText = newMessage.chatMessage + "  Skickat:  " + Date()

    label.appendChild(span).style.color = "black"
    element.appendChild(label)
    return element
}