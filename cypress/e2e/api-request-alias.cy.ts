import 'cypress-data-session'

beforeEach(() => {
  cy.dataSession({
    // name of the session is the alias name
    name: 'todoId',
    setup() {
      // reset the existing todos
      cy.request('POST', '/reset', { todos: [] })
      // create the todo and yield the id
      // that will be the aliased value
      return cy
        .request('POST', '/todos', {
          title: 'test todo',
        })
        .its('body.id')
    },
    validate(todoId: string) {
      // validate the potential id
      // by requesting it from the server
      // and checking the response
      return cy
        .request({
          url: '/todos/' + todoId,
          failOnStatusCode: false,
        })
        .then((res) => {
          if (!res.isOkStatusCode) {
            return false
          }
          return res.body.completed !== true
        })
    },
  })
})

it('created the correct todo', function () {
  // request the Todo item
  // confirm the response body includes the correct title
  cy.request('/todos/' + this.todoId)
})

it('completes the created todo', function () {
  // update the created todo item, set the "completed: true"
  // using the "PATCH /todos/:id" request
  cy.request('PATCH', '/todos/' + this.todoId, {
    completed: true,
  })
})
