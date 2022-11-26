import { todos } from '../fixtures/three.json'

it('copies the todos to clipboard', () => {
  cy.request('POST', '/reset', { todos })
  cy.visit('/')
  cy.get('li.todo').should('have.length', todos.length)
  cy.document().then((doc) => {
    cy.stub(doc, 'execCommand')
      .withArgs('copy')
      .as('writeText')
      .returns(true)
  })
  // cy.window()
  //   .its('navigator.clipboard')
  //   .then((clipboard) => {
  //     cy.stub(clipboard, 'writeText').as('writeText').resolves()
  //   })
  cy.get('[title="Copy todos to clipboard"]').click()
  cy.get('@writeText')
    .should(
      'have.been.calledOnceWith',
      'copy',
      false,
      Cypress.sinon.match.string,
    )
    .its('firstCall.args.2')
    .should('include', 'write code')
    .and('include', 'write tests')
})
