// https://github.com/bahmutov/cypress-data-session
import 'cypress-data-session'

beforeEach(() => {
  // clear all todos using cy.dataSession command
  // -> the session name could be any string
  // -> the setup command should use cy.request
  //    to clear all todos on the server
  // .  cy.request('POST', '/reset', { todos: [] })
  // -> the validate command should get all
  //    todos and return true if there are none
  // Tip: use the options syntax for simplicity
  // cy.dataSession({ name: ..., ... })
  cy.dataSession({
    name: 'reset all todos',
    setup() {
      cy.log('in setup')
      return cy.request('POST', '/reset', { todos: [] })
    },
    validate() {
      cy.log('in validate')
      return cy
        .request('GET', '/todos')
        .then((r) => r.body.length === 0)
    },
    recreate() {
      cy.log('in recreate')
    },
  })
})

it('starts with zero todos', () => {
  cy.visit('/')
  cy.get('.loaded')
  cy.get('li.todo').should('not.exist')
})
