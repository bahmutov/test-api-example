export const resolutions = [
  [1440, 1024], // [w, h]
  [1280, 1024],
  [800, 600],
  [700, 500],
  [300, 500],
  [240, 300],
]

export const resetData = () => {
  // reset the backend data before each test
  cy.request('POST', '/reset', { todos: [] })
}

export const testViewport = (w: number, h: number) => {
  cy.viewport(w, h)
  cy.visit('/')
  cy.get('.new-todo').type('one{enter}').type('two{enter}').type('three{enter}')
  cy.get('li.todo').should('have.length', 3)
  cy.contains('.todo-count', '3')
  cy.contains('li.todo', 'two').find('.toggle').click()
  cy.contains('li.todo', 'two').should('have.class', 'completed')
  cy.contains('.todo-count', '2')
  cy.intercept('DELETE', '/todos/*').as('delete')
  cy.contains('button', 'Clear completed').click()
  cy.get('li.todo').should('have.length', 2)
  cy.wait('@delete').its('response.statusCode').should('equal', 200)
  cy.request('GET', '/todos').its('body').should('have.length', 2)
}
