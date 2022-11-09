import 'cypress-plugin-api'
import spok from 'cy-spok'

it('does not complete an item', () => {
  // reset all todos on the backend by making
  // an API call "POST /reset"
  cy.api('POST', '/reset', { todos: [] })
  // visit the home page
  // https://on.cypress.io/visit
  cy.visit('/')
  // confirm the application has finished loading
  // by checking for the existence of an element
  // with class "loaded"
  cy.get('.loaded')
  // type into the input field "New test" plus Enter
  cy.get('.new-todo').type('New test{enter}')
  // there should be 1 todo item on the page
  // click the ".toggle" element of the first item
  cy.get('li.todo').should('have.length', 1).first().find('.toggle').click()
  // the first todo item on the page should have CSS class "completed"
  cy.contains('li.todo', 'New test').should('have.class', 'completed')
  // fetch all todo items from the backed
  // there should be only one item
  // grab the first returned item
  // and confirm the property "completed" still remains false
  // Our web application is NOT updating the item
  // when we toggle the page element :(
  cy.api('/todos')
    .its('body')
    .should('have.length', 1)
    .its(0)
    .should(
      spok({
        id: spok.string,
        title: 'New test',
        completed: false,
      }),
    )
})
