import '@bahmutov/cy-api'
import spok from 'cy-spok'

describe('Adding todos', () => {
  it('adds a new todo object with id', () => {
    // send this request object
    // where you create a random ID
    // to the /todos endpoint
    // using the cy.api command
    // https://github.com/bahmutov/cy-api
    const body = {
      id: Cypress._.random(1e6),
      title: 'Api test',
      extra: 1,
      bonus: true,
    }
    cy.api({
      method: 'POST',
      url: '/todos',
      body,
    })
      // verify the request is successful using cy-spok
      // you now control the entire response body
      // and can confirm the status code is 201
      .should(
        spok({
          status: 201,
          body,
        }),
      )
  })
})
