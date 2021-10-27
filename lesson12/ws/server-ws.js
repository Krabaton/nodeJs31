const WebSocketServer = require('ws')

const wss = new WebSocketServer.Server({ port: 8080 })

const clients = []

wss.on('connection', function connection(ws) {
  const id = clients.length
  clients[id] = ws

  clients[id].send(
    JSON.stringify({ type: 'hello', message: `Hi your id = ${id}`, data: id }),
  )

  clients.forEach((client) =>
    client.send(
      JSON.stringify({
        type: 'info',
        message: `We have new connection ${id}`,
        data: id,
      }),
    ),
  )

  ws.on('message', function incoming(message) {
    clients.forEach((client) =>
      client.send(
        JSON.stringify({
          type: 'message',
          message: message.toString(),
          author: id,
        }),
      ),
    )
  })

  ws.on('close', () => {
    delete clients[id]
    clients.forEach((client) =>
      client.send(
        JSON.stringify({
          type: 'info',
          message: `We lost connection ${id}`,
        }),
      ),
    )
  })

  ws.on('error', (err) => {
    console.log(err.message)
  })
})
