// https://github.com/typicode/json-server
const jsonServer = require('json-server')
const jsonReset = require('json-server-reset')

const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults({
  static: '.',
})

server.use(jsonReset)
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})
