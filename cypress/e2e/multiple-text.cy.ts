import 'cypress-map'
import spok from 'cy-spok'
import * as chaiEach from 'chai-each'

chai.use(chaiEach)

it('confirms several elements at once', () => {
  cy.visit('/')
  // confirm the title and the filters text
  cy.get('h1, .filters a')
    .map('innerText')
    .should(
      spok([
        'todos',
        'All',
        spok.string,
        spok.test(/completed/i),
      ]),
    )
})

it('confirms several elements are visible at once', () => {
  cy.visit('/')
  cy.get('h1, .filters a')
    .map(Cypress.dom.isVisible)
    .should('deep.equal', [true, true, true, true])
})

it('maps to an array', () => {
  expect([1, 2, 3]).to.be.an.instanceOf(Array)
  cy.wrap(['one', 'a', 'four'])
    .should('be.an.instanceOf', Array)
    .map('length')
    .should('deep.equal', [3, 1, 4])
    .and('be.an', 'array')
    .and('be.an.instanceOf', Array)
})

it('confirms each element is visible', () => {
  cy.visit('/')
  cy.get('h1, .filters a')
    .map(Cypress.dom.isVisible)
    .should('each.equal', true)
})
