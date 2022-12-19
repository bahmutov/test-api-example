import 'cypress-soft-assertions'

beforeEach(() => {
  cy.intercept('GET', '/todos').as('todos')
  cy.visit('/')
  cy.wait('@todos')
    .its('response.body.length')
    .better('equal', 0)
})

it('adds two todos', () => {
  cy.get('.new-todo')
    .type('first{enter}')
    .type('second{enter}')
  cy.get('.todo-list li').should('have.length', 2)
})
