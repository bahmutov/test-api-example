import 'cypress-map'
import spok from 'cy-spok'

it('confirms several elements at once', () => {
  cy.visit('/')
  cy.get('[data-cy=app-title],.filters a')
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
