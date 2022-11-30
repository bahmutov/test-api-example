import 'cypress-if'

type Todo = {
  title: string
  completed: boolean
}

beforeEach(() => {
  // create a list of 20 random todos
  // half should be completed
  // Tip: use Math.random() to flip a coin
  // Once you have a list of Todo items
  // call "POST /reset { todos }" to set the backend data
  // https://on.cypress.io/request
  const todos: Todo[] = []
  Cypress._.times(20, (k) => {
    todos.push({
      title: `todo ${k + 1}`,
      completed: Boolean(Math.random() < 0.5),
    })
  })
  cy.request('POST', '/reset', { todos })
})

it(
  'completes every todo one by one',
  { viewportHeight: 1600 },
  () => {
    cy.visit('/')
    // confirm the Todos have finished loading
    // by checking the presence of an element with class "loaded"
    // https://on.cypress.io/get
    cy.get('.loaded')
    // confirm we have 20 todos
    // and iterate over each Todo element
    // https://on.cypress.io/each
    // if the element does not have class "completed"
    // click on its ".toggle" child element
    // https://on.cypress.io/wrap
    // https://on.cypress.io/find
    // https://on.cypress.io/click
    // and confirm the Todo element gets the class "completed"
    cy.get('li.todo')
      .should('have.length', 20)
      .each(($li) => {
        if ($li.hasClass('completed')) {
          return
        }
        cy.wrap($li).find('.toggle').click()
        cy.wrap($li).should('have.class', 'completed')
      })
    // confirm there are now 20 completed Todo items
    cy.get('li.todo.completed').should('have.length', 20)
    // and there are no Todo elements without class "completed"
    cy.get('li.todo:not(.completed)').should('not.exist')
  },
)

it.only(
  'completes every todo one by one',
  { viewportHeight: 1600 },
  () => {
    cy.visit('/')
    // confirm the Todos have finished loading
    // by checking the presence of an element with class "loaded"
    // https://on.cypress.io/get
    cy.get('.loaded')
    // confirm we have 20 todos
    // and iterate over each Todo element
    // https://on.cypress.io/each
    // if the element does not have class "completed"
    // click on its ".toggle" child element
    // https://on.cypress.io/wrap
    // https://on.cypress.io/find
    // https://on.cypress.io/click
    // and confirm the Todo element gets the class "completed"
    cy.get('li.todo')
      .should('have.length', 20)
      .each(($li) => {
        cy.wrap($li)
          .if('not.have.class', 'completed')
          .find('.toggle')
          .click()
        cy.wrap($li).should('have.class', 'completed')
      })
    // confirm there are now 20 completed Todo items
    cy.get('li.todo.completed').should('have.length', 20)
    // and there are no Todo elements without class "completed"
    cy.get('li.todo:not(.completed)').should('not.exist')
  },
)
