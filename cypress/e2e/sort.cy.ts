import { recurse } from 'cypress-recurse'

type Todo = {
  id: string
  title: string
}

// the initial Todo items are NOT sorted alphabetically
const todos: Todo[] = [
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
  cy.get('[data-cy="sort-slowly"]').click()
  recurse(
    () => cy.request('/todos').its('body'),
    (todos) =>
      expect(Cypress._.map(todos, 'title')).to.deep.equal([
        'apple',
        'ball',
      ]),
    {
      log: 'Sorted!',
      delay: 500,
      timeout: 10_000,
    },
  ).then((todos) => {
    todos.forEach((todo: Todo, k: number) => {
      // use a single jQuery index to pick the label at position K
      cy.contains(`li.todo label:eq(${k})`, todo.title)
    })
  })
})
