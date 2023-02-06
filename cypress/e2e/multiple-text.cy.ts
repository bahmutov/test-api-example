import 'cypress-map'
import spok from 'cy-spok'

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
