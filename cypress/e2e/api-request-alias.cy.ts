import 'cypress-aliases'

before(() => {
  // reset all current todo items
  // by requesting "POST /reset" with the { todos: [] } object
  // https://on.cypres.io/request
  //
  // add a new todo item by making "POST /todos"
  // with the title "test todo"
  cy.request('POST', '/reset', { todos: [] })
  cy.request('POST', '/todos', { title: 'test todo' })
    .its('body.id')
    .as('todoId', { keep: true })
})

it('created the correct todo', () => {
  // request the Todo item
  // confirm the response body includes the correct title
  cy.request('/todos/@todoId')
})

it('completes the created todo', () => {
  // update the created todo item, set the "completed: true"
  // using the "PATCH /todos/:id" request
  cy.request('PATCH', '/todos/@todoId', { completed: true })
})
