import 'cypress-data-session'

it('caches a Todo title', () => {
  // create a new Todo item with the title
  // "random " + some random number
  // store the random title in the data session
  // and either use an alias or yield the title
  // to the next block of commands
  cy.dataSession({
    name: 'title',
    setup() {
      const title = 'random ' + Cypress._.random(1e6)
      cy.request('POST', '/todos', { title })
      cy.wrap(title)
    },
    showValue: true,
  }).then((title) => {
    // visit the site
    // and confirm the random title is displayed
    cy.visit('/')
    cy.contains('li.todo', title)
  })
})

it('caches the Todo item ID', () => {
  // create a new Todo item with the title
  // "title " + some random number
  // store the Todo ID in the data session
  cy.dataSession({
    name: 'todoId',
    setup() {
      const title = 'title ' + Cypress._.random(1e6)
      cy.request('POST', '/todos', { title }).its('body.id')
    },
    showValue: true,
  })
    // use cy.then(function () { ... }) to access the aliased value
    .then(function () {
      // find the title of the Todo item by its id
      // and yield it to the next command
      cy.request('GET', '/todos/' + this.todoId).its(
        'body.title',
      )
    })
    // Tip: add an assertion into the chain to log
    // the title to the Cypress command log
    .should('be.a', 'string')
    .then((title) => {
      // visit the site
      // and confirm that title is displayed
      cy.visit('/')
      cy.contains('li.todo', title)
    })
})

type Todo = {
  title: string
  id: string
}

it('caches the title and the id', () => {
  // create a new Todo item with the title
  // "todo " + some random number
  // store { title, id } object in the data session
  // under the alias "todo"
  cy.dataSession({
    name: 'todo',
    setup() {
      const title = 'todo ' + Cypress._.random(1e6)
      cy.request('POST', '/todos', { title })
        .its('body')
        // explicitly pick only the "id" and the "title" properties
        .then((body) => {
          id: body.id
          title: body.title
        })
    },
    showValue: true,
  })
  // use the "cy.get('@todo').then((todo) => { ... })"
  // to access the aliased object
  // Tip: in TypeScript you might need to give cy.get a type parameter
  cy.get<Todo>('@todo').then((todo: Todo) => {
    // update the Todo item to set the "completed: true"
    // by making an API call
    cy.request('PATCH', '/todos/' + todo.id, {
      completed: true,
    })
    // visit the site
    cy.visit('/')
    // and confirm that title is displayed and the element
    // has class "completed"
    cy.contains('li.todo', todo.title).should(
      'have.class',
      'completed',
    )
  })
})
