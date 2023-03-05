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

const key = "secure-chat"

// LOG IN & LOG OUT FUNCTIONS HERE !!!!

const JWT_KEY = 'secure-chat-login'
let isLoggedin = false

const token = localStorage.getItem(JWT_KEY)
if (token) {
    isLoggedin = true;
} else {
    isLoggedin = false;
}

uppdateLogginStatus();

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
        const userToken = await response.json()
        localStorage.setItem(JWT_KEY, userToken.token)
        isLoggedin = true
    } else {
        console.log('Bad login credentials');
    }
    uppdateLogginStatus()
})

logout.addEventListener('click', () => {
    localStorage.removeItem(JWT_KEY);
    window.location.reload()
})

// LOG IN & LOG OUT STOP !!!!

async function getMessagePrivate() {
    let privateData = null
    try {
        const response = await fetch('/private/message')
        if ( response.status !== 200 ){
            console.log('Could not find server: ', response.status)
            return
        }
        privateData = await response.json()
    } catch(error) {
        console.log('Error')
    }

    chatHistoryPrivate.innerHTML = ''

    privateData.forEach(messages => {
        let li = document.createElement('li')
        li.innerText = `${messages.chatName} ${messages.chatMessage}`
        chatHistoryPrivate.appendChild(li)
    })
}
startChatprivate.addEventListener('click', getMessagePrivate)

addMessage.addEventListener('click', addMessagePublic)
addMessage2.addEventListener('click', addMessagePrivate)

let nextMessageId = 4

function addMessagePublic() {
    const valueFromUser = chatInput.value
            
    const newMessage = {
        chatName: userId() + " ",
        chatMessage: valueFromUser,
        id: nextMessageId
    }
    nextMessageId++
        
    const element = createChatElement(newMessage)
    chatHistory.appendChild(element)
    fetch('/public/message', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessage)
    })
}

function addMessagePrivate() {
    const valueFromUser = chatInput2.value
   
    const newMessage = {
        chatName: userId() + " ",
        chatMessage: valueFromUser,
        id: nextMessageId
    }
    nextMessageId++
    
    const element = createChatElement(newMessage)
    chatHistoryPrivate.appendChild(element)
    fetch('/private/message', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessage)
    })
}

async function getMessagePublic() {

    let publicData = null
    try {
        const response = await fetch('/public/message')
        if ( response.status !== 200 ){
            console.log('Could not found')
            return
        }
        publicData = await response.json()
    } catch(error) {
        console.log('something whent wrong')
    }

    chatHistory.innerHTML = ''

    publicData.forEach(message => {
        let li = document.createElement('li')
        li.innerText = `${message.chatName} ${message.chatMessage}`
        chatHistory.appendChild(li)
    })
}

startChatPublic.addEventListener('click', getMessagePublic)

function userId(){
    let userId 
    if(isLoggedin){
        userId = inputUsername.value
    } else {
        userId = "Gäst "
    }
    return userId
}

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

function getFromLocalStorage() {
	let maybeJson = localStorage.getItem(key)
	if( !maybeJson ) {
		return
	}
	try {
		let actualData = JSON.parse(maybeJson)
		return actualData
	} catch {
		return
	}
}