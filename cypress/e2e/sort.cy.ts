import { map, tap, really } from 'cypress-should-really'

// the initial Todo items are NOT sorted alphabetically
const todos = [
  {
    id: '1',
    title: 'ball',
  },
  {
    id: '2',
    title: 'apple',
  },
]

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
  cy.get('li.todo label').should(
    really(
      tap(console.log),
      map('innerText'),
      tap(console.log),
      'deep.equal',
      ['apple', 'ball'],
    ),
  )
})
