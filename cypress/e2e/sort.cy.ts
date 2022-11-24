import { recurse } from 'cypress-recurse'

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

// utility function that extracts the text contents
// of multiple elements in the given jQuery object
function getTexts($el: JQuery) {
  return Cypress._.map($el, 'innerText')
}

it('sorts items', () => {
  // reset the backend data by making an API call
  // https://on.cypress.io/request
  cy.request('POST', '/reset', { todos })
  // visit the application
  // https://on.cypress.io/visit
  cy.visit('/')
  // confirm the application shows the loaded todo items
  cy.get('li.todo').should('have.length', todos.length)
  // sort the items quickly
  cy.get('[data-cy=sort]').click()
  // extract the text from each todo label
  // and confirm the labels are sorted alphabetically
  // Hint: use the utility "getTexts" function
  // before "deep.equal" assertion
  cy.get('li.todo label')
    .then(getTexts)
    .should('deep.equal', ['apple', 'ball'])
  // confirm the server has the sorted data
  // by requesting it ourselves
  // and confirming the returned items are the same
  // as the original "todos" list but in the reverse order
  cy.request('/todos')
    .its('body')
    .should('deep.equal', [todos[1], todos[0]])
  // reload the page and confirm the todo labels are still sorted
  // https://on.cypress.io/reload
  cy.reload()
  cy.get('li.todo label')
    .then(getTexts)
    .should('deep.equal', ['apple', 'ball'])
})

// fails on purpose to show the test not retrying
it.skip('sorts items slowly', () => {
  // reset the backend data by making an API call
  // https://on.cypress.io/request
  cy.request('POST', '/reset', { todos })
  // visit the application
  // https://on.cypress.io/visit
  cy.visit('/')
  // confirm the application shows the loaded todo items
  cy.get('li.todo').should('have.length', todos.length)
  // sort the items slowly
  cy.get('[data-cy=sort-slowly]').click()
  // extract the text from each todo label
  // and confirm the labels are sorted alphabetically
  // Hint: use the utility "getTexts" function
  // before "deep.equal" assertion
  cy.get('li.todo label')
    .then(getTexts)
    .should('deep.equal', ['apple', 'ball'])
  // confirm the server has the sorted data
  // by requesting it ourselves
  // and confirming the returned items are the same
  // as the original "todos" list but in the reverse order
  cy.request('/todos')
    .its('body')
    .should('deep.equal', [todos[1], todos[0]])
  // reload the page and confirm the todo labels are still sorted
  // https://on.cypress.io/reload
  cy.reload()
  cy.get('li.todo label')
    .then(getTexts)
    .should('deep.equal', ['apple', 'ball'])
})

it('sorts items slowly and checks using recurse', () => {
  // reset the backend data by making an API call
  // https://on.cypress.io/request
  cy.request('POST', '/reset', { todos })
  // visit the application
  // https://on.cypress.io/visit
  cy.visit('/')
  // confirm the application shows the loaded todo items
  cy.get('li.todo').should('have.length', todos.length)
  // sort the items slowly
  cy.get('[data-cy=sort-slowly]').click()
  // extract the text from each todo label
  // and confirm the labels are sorted alphabetically
  // Hint: use the utility "getTexts" function
  // before "deep.equal" assertion
  recurse(
    () => cy.get('li.todo label').then(getTexts),
    (list) => expect(list).to.deep.equal(['apple', 'ball']),
    {
      log: 'Sorted!',
      timeout: 10_000,
      delay: 500,
    },
  )
  // confirm the server has the sorted data
  // by requesting it ourselves
  // and confirming the returned items are the same
  // as the original "todos" list but in the reverse order
  cy.request('/todos')
    .its('body')
    .should('deep.equal', [todos[1], todos[0]])
  // reload the page and confirm the todo labels are still sorted
  // https://on.cypress.io/reload
  cy.reload()
  cy.get('li.todo label')
    .then(getTexts)
    .should('deep.equal', ['apple', 'ball'])
})

it('items are sorted after the network call', () => {
  // reset the backend data by making an API call
  // https://on.cypress.io/request
  cy.request('POST', '/reset', { todos })
  // visit the application
  // https://on.cypress.io/visit
  cy.visit('/')
  // confirm the application shows the loaded todo items
  cy.get('li.todo').should('have.length', todos.length)
  // spy on the "POST /reset" network call the application makes
  cy.intercept('POST', '/reset').as('reset')
  // sort the items slowly
  cy.get('[data-cy=sort-slowly]').click()
  // wait for the network call - this means the page
  // has been updated
  cy.wait('@reset')
  // extract the text from each todo label
  // and confirm the labels are sorted alphabetically
  // Hint: use the utility "getTexts" function
  // before "deep.equal" assertion
  cy.get('li.todo label')
    .then(getTexts)
    .should('deep.equal', ['apple', 'ball'])
  // confirm the server has the sorted data
  // by requesting it ourselves
  // and confirming the returned items are the same
  // as the original "todos" list but in the reverse order
  cy.request('/todos')
    .its('body')
    .should('deep.equal', [todos[1], todos[0]])
  // reload the page and confirm the todo labels are still sorted
  // https://on.cypress.io/reload
  cy.reload()
  cy.get('li.todo label')
    .then(getTexts)
    .should('deep.equal', ['apple', 'ball'])
})
