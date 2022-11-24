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

function getTexts($el: JQuery) {
  return Cypress._.map($el, 'innerText')
}

it('sorts items', () => {
  cy.request('POST', '/reset', { todos })
  cy.visit('/')
  cy.get('li.todo').should('have.length', todos.length)
  cy.get('[data-cy=sort]').click()
  cy.get('li.todo label')
    .then(getTexts)
    .should('deep.equal', ['apple', 'ball'])
  // confirm the server has the sorted data
  cy.request('/todos')
    .its('body')
    .should('deep.equal', [todos[1], todos[0]])
  cy.reload()
  cy.get('li.todo label')
    .then(getTexts)
    .should('deep.equal', ['apple', 'ball'])
})
