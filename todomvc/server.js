// https://github.com/typicode/json-server
const jsonServer = require('json-server')
const jsonReset = require('json-server-reset')

const server = jsonServer.create()
const router = jsonServer.router('data.json')
const defaults = jsonServer.defaults({
  static: '.',
  bodyParser: true,
  readOnly: false,
})

server.use(defaults)
server.use(jsonReset)
server.db = router.db
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})
