// https://github.com/bahmutov/cypress-recurse
import { recurse } from 'cypress-recurse'

// before each test, reset all todos
beforeEach(() => {
  // create a random number of todos, but have at least 3
  const todos = Cypress._.range(
    0,
    3 + Cypress._.random(5),
  ).map((k) => {
    return {
      id: k + 1,
      title: `todo ${k + 1}`,
    }
  })
  cy.log(`Creating ${todos.length} todos`)
  cy.request('POST', '/reset', { todos })
})

it('completes all todos until zero left', () => {
  // visit the application homepage
  // https://on.cypress.io/visit
  cy.visit('/')
  // confirm the items have finished loading
  // by checking the element with class "loaded" is present
  // https://on.cypress.io/get
  cy.get('.loaded')
  // use cypress-recurse to:
  // find the first Todo item
  // and if does not exist (jQuery element length zero)
  // we are done.
  // otherwise sleep one second, find the delete item
  // and click on it
  // Tip: use the "post" callback option, it provides
  // the value yielded by the first function
  // Tip 2: the yielded value in the "post" callback
  // is jQuery object. To properly click it while
  // respecting the Cypress queue of commands use cy.wrap
  // https://on.cypress.io/wrap
  recurse(
    () =>
      cy
        .get('.todo:first')
        // disable the built-in element existence
        // because when the list is empty, there won't be
        // any elements to find
        .should(Cypress._.noop),
    ($li) => $li.length === 0,
    {
      log: 'All todos deleted',
      delay: 1000,
      timeout: 10_000,
      post({ value }) {
        cy.wrap(value)
          .find('.destroy')
          .click({ force: true })
      },
    },
  )
})
