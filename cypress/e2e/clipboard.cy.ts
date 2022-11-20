import 'cypress-real-events'
import { todos } from '../fixtures/three.json'

it('copies the todos to clipboard', () => {
  cy.request('POST', '/reset', { todos })
  cy.visit('/')
  cy.get('li.todo').should('have.length', todos.length)
  cy.get('[title="Copy todos to clipboard"]').realClick()
})
