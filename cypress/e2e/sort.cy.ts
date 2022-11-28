import { map, really } from 'cypress-should-really'
import chaiSorted from 'chai-sorted'

chai.use(chaiSorted)

// the initial random list of todo titles
const titles = Cypress._.shuffle(
  'several random words shuffled using lodash helper'.split(
    ' ',
  ),
)
// create the Todo items list to be sent to the server
const todos = titles.map((title) => {
  return { id: String(Cypress._.random(1e6)), title }
})

it('sorts items', () => {
  // reset the backend data by making an API call
  // https://on.cypress.io/request
  cy.request('POST', '/reset', { todos })
  // visit the application
  // https://on.cypress.io/visit
  cy.visit('/')
  // confirm the application shows the loaded todo items
  cy.get('li.todo').should('have.length', todos.length)
  cy.get('[data-cy="sort-slowly"]').click()
  // confirm the list of labels has been sorted
  // in ascending order
  // https://www.chaijs.com/plugins/chai-sorted/
  cy.get('li.todo label').should(
    really(map('innerText'), 'be.ascending'),
  )
})
