console.log('Hi WebSocket!')
const ws = new WebSocket('ws://localhost:8080')

formChat.addEventListener('submit', (e) => {
  e.preventDefault()
  ws.send(textField.value)
})

ws.onopen = function (e) {
  console.log('Open ws connect')
}

ws.onmessage = function (e) {
  const message = JSON.parse(e.data)
  console.log(message)
  let text = ''
  switch (message.type) {
    case 'info':
      text = message.message
      break
    case 'message':
      text = `${message.author}: ${message.message}`
      break
    default:
      alert(message.message)
      break
  }
  const newElement = document.createElement('DIV')
  newElement.textContent = text
  subscribe.appendChild(newElement)
}
