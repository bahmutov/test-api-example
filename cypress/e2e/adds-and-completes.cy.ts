it('adds and completes todos', () => {
  cy.request('POST', '/reset', { todos: [] })
  cy.visit('/')
  cy.get('.new-todo').type('one{enter}').type('two{enter}')
  cy.get('li.todo').should('have.length', 2)
})
