import 'cypress-soft-assertions'

it('clears completed items', () => {
  cy.intercept('GET', '/todos').as('todos')
  cy.visit('/')
  cy.wait('@todos')
    .its('response.body.length')
    .better('be.above', 0)
    .then((n) => {
      if (n) {
        cy.get('.todo-list li .toggle').click({
          multiple: true,
        })
        cy.contains('button', 'Clear completed').click()
        cy.get('.todo-list li').should('have.length', 0)
      }
    })
})
