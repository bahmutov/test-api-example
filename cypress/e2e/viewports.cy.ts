import 'cypress-each'

const resolutions = Cypress.env('resolutions')

beforeEach(() => {
  // reset the backend data before each test
  cy.request('POST', '/reset', { todos: [] })
})

describe('Viewports', () => {
  it.each(resolutions)(
    'works in resolution %d x %d',
    // @ts-ignore
    (w: number, h: number) => {
      cy.viewport(w, h)
      cy.visit('/')
      cy.get('.new-todo')
        .type('one{enter}')
        .type('two{enter}')
        .type('three{enter}')
      cy.get('li.todo').should('have.length', 3)
      cy.contains('.todo-count', '3')
      cy.contains('li.todo', 'two').find('.toggle').click()
      cy.contains('li.todo', 'two').should(
        'have.class',
        'completed',
      )
      cy.contains('.todo-count', '2')
      cy.intercept('DELETE', '/todos/*').as('delete')
      cy.contains('button', 'Clear completed').click()
      cy.get('li.todo').should('have.length', 2)
      cy.wait('@delete')
        .its('response.statusCode')
        .should('equal', 200)
      cy.request('GET', '/todos')
        .its('body')
        .should('have.length', 2)
    },
  )
})
