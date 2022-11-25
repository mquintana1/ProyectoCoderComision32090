const socket = io();
const chatButton = document.querySelector('#chatButton');

// UPDATE WEB CHAT
socket.on('updateChat', data => {
    const chatBox = document.querySelector('#chatBox');
    const messages = data.payload;
    if (messages.length > 0) {
        messages.map(item => {
            chatBox.appendChild(addMessageChat(item.author.email, item.createdAt, item.text))
        })
    } else {
        createMessage(chatBox, 'No hay mensajes de chat.')
    }
})

socket.on('webChat', (message) => {
    const chatBox = document.querySelector('#chatBox');
    const list = message;
    if (list) return chatBox.appendChild(addMessageChat(list.author.email,list.createdAt, list.text))
})

// EVENT LISTENER WEB CHAT
chatButton.addEventListener('click', (event) => {
    event.preventDefault();
    const chatInputMessage = document.querySelector('#messageChat');
    const chatInputEmail = document.querySelector('#emailChat');
    const chatInputFirstName = document.querySelector('#firstNameChat');
    const chatInputLastName = document.querySelector('#lastNameChat');
    const chatInputAge = document.querySelector('#ageChat');
    const objMessage = {
        email: chatInputEmail.value,
        firstName: chatInputFirstName.value,
        lastName: chatInputLastName.value,
        age: chatInputAge.value,
        message: chatInputMessage.value,
    }
    socket.emit('webChat', objMessage);
    chatInputMessage.value = '';
})


// Utils
const addMessageChat = (user, date, message) => {
    const body = document.createElement('p');
    const userSpan = document.createElement('span');
    const dateSpan = document.createElement('span');
    const messageSpan = document.createElement('span');

    userSpan.innerText = `${user} `;
    dateSpan.innerText = `${formatDate(date)} `;
    messageSpan.innerText = `${message}`;

    userSpan.setAttribute('style', 'color: blue; font-weight: bold;');
    dateSpan.setAttribute('style', 'color: brown;');
    messageSpan.setAttribute('style', 'color: green; font-style: italic;');

    body.appendChild(userSpan);
    body.appendChild(dateSpan);
    body.appendChild(messageSpan);

    return body;
}

const formatDate = date => {
    const data = new Date(date)
    const arr = {
        day: data.getDate(),
        month: data.getMonth() + 1,
        year: data.getFullYear(),
        hours: data.getHours(),
        minutes: data.getMinutes(),
        seconds: data.getSeconds()
    }
    const newDate = `[${arr.day}/${arr.month}/${arr.year} ${arr.hours}:${arr.minutes}:${arr.seconds}]`;
    return newDate;
}