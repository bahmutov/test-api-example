import 'cypress-plugin-api'

it('updates an item', () => {
  // reset all items by making a "POST /reset" call
  // with an empty list of todos
  cy.api('POST', '/reset', { todos: [] })
  // create a new Todo item with the title text "Write more tests"
  cy.api('POST', '/todos', { title: 'Write more tests' })
    .wait(0)
    // confirm the new item has id 1 (a number)
    // because our backend is pretty simple
    // and assigns natural numbers when starting from empty
    .its('body.id')
    .should('equal', 1)
  // visit the page and confirm the single item is present
  // and does not have CSS class completed
  cy.visit('/')
  cy.get('li.todo')
    .should('have.length', 1)
    .first()
    .should('include.text', 'Write more tests')
    .and('not.have.class', 'completed')
  // make another API call to update the todo with ID 1
  // change the "completed" property to true
  // Tip: you can use PATCH HTTP method
  // and pass just the changed object properties
  cy.api('PATCH', '/todos/1', { completed: true })
  // now reload the page and confirm the only item
  // has the CSS class "completed"
  // https://on.cypress.io/reload
  cy.reload()
  cy.get('li.todo')
    .should('have.length', 1)
    .first()
    .should('include.text', 'Write more tests')
    .and('have.class', 'completed')
})
