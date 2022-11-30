import 'cypress-data-session'

it('caches a Todo title', () => {
  // create a new Todo item with the title
  // "random " + some random number
  cy.dataSession({
    name: 'title',
    setup() {
      const title = 'random ' + Cypress._.random(1e6)
      cy.request('POST', '/todos', { title })
      cy.wrap(title)
    },
    showValue: true,
  })
})
