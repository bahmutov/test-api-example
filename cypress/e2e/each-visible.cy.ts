// https://www.chaijs.com/plugins/chai-each/
import * as chaiEach from 'chai-each'
chai.use(chaiEach)

it('confirms each element', () => {
  const items = [{ value: 4 }, { value: 11 }, { value: 15 }]
  expect(items)
    .to.each.have.property('value')
    .that.is.below(20)
})

it('confirms each element (should)', () => {
  const items = [{ value: 4 }, { value: 11 }, { value: 15 }]
  cy.wrap(items).should('each.have.property', 'value')
})

it('confirms each element is visible', () => {
  cy.visit('/')
  // confirm the title and the filters text
  cy.get('h1, .filters a').should('each.be.visible')
})
