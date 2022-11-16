import 'cypress-each'

beforeEach(() => {
  // reset the backend data before each test
  cy.request('POST', '/reset', { todos: [] })
})

describe('Viewports', () => {
  // type each number in the arguments arrays [w, h]
  const resolutions: TestCaseObject2<number, number> = {
    desktop: [1280, 1024], // [w, h]
    tablet: [700, 500],
    mobile: [300, 500],
  }

  it.each(resolutions)((w, h) => {
    cy.viewport(w, h)
    cy.visit('/')
    cy.get('.new-todo')
      .type('one{enter}')
      .type('two{enter}')
      .type('three{enter}')
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
  })
})
