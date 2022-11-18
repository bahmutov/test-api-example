import 'cypress-aliases/commands/request'
import 'cypress-aliases/commands/should'

it('makes API requests using the previous value alias', () => {
  // reset all current todo items
  // by requesting "POST /reset" with the { todos: [] } object
  // https://on.cypres.io/request
  cy.request('POST', '/reset', { todos: [] })
  // add a new todo item by making "POST /todos"
  // with the title "test todo"
  // save the response body "id" property
  // under the alias "todoId"
  cy.request('POST', '/todos', { title: 'test todo' })
    .its('body.id')
    .as('todoId')
  // now confirm the returned object by requesting it
  // using the alias "@todoId" directly in the URL
  // passed to the cy.request command
  cy.request('/todos/@todoId')
    // confirm the response body includes the correct title
    .its('body')
    .should('deep.include', {
      title: 'test todo',
    })
  // update the created todo item, set the "completed: true"
  // using the "PATCH /todos/:id" request
  cy.request('PATCH', '/todos/@todoId', { completed: true })

  // bonus: how would you confirm the title, completed,
  // AND the item's id and no other properties?
  // You may not use ANY cy.then callbacks.
  cy.request('/todos/@todoId').its('body').as('todo')
  cy.get('@todo').should('have.keys', ['id', 'title', 'completed'])
  cy.get('@todo').should('have.property', 'id', '@todoId')
  cy.get('@todo').should('have.property', 'title', 'test todo')
  cy.get('@todo').should('have.property', 'completed', true)
})
