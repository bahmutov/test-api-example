import 'cypress-data-session'

beforeEach(() => {
  // create a Todo item with text "Write more code"
  // the data session validates the item
  // and saves the item's "id" under the alias "todo"
  cy.dataSession({
    name: 'todo',
    setup() {
      cy.request('POST', '/todos', {
        title: 'Write more code',
      }).its('body.id')
    },
    validate(id) {
      return cy
        .request({
          method: 'GET',
          url: '/todos/' + id,
          failOnStatusCode: false,
        })
        .its('isOkStatusCode')
    },
  })
})

beforeEach(function () {
  // call cy.dataSession to complete the item
  // created by the data session "todo"
  // Tip: think why we are using the "function () { ... }"
  // in this beforeEach hook
  cy.dataSession({
    name: 'completedTodo',
    setup: () => {
      cy.request('PATCH', '/todos/' + this.todo, {
        completed: true,
      })
    },
    validate: () => {
      return (
        cy
          .request('/todos/' + this.todo)
          .its('body')
          // the "completed" property might not even be there
          .then((body) => Boolean(body.completed))
      )
    },
    dependsOn: 'todo',
  })
})

it('has one finished and one unfinished todo', function () {
  // visit the page and confirm there is an item "Write more code"
  // that has the class "completed"
  cy.visit('/')
  cy.contains('li.todo', 'Write more code').should(
    'have.class',
    'completed',
  )
})
