import 'cypress-plugin-api'

describe('Create and delete', () => {
  it('deletes the created item', () => {
    // create a new item by sending a POST request
    // to /todos endpoint. Send an object with
    // the "title: API test" property
    cy.api({
      method: 'POST',
      url: '/todos',
      body: {
        title: 'API test',
      },
    })
      // confirm the response body has "id"
      // created by the server, it should be a string
      .its('body.id')
      .should('be.a', 'string')
      // pass the id into a cy.then callback so we can make
      // additional calls
      .then((id) => {
        // Bonus: confirm the item can be fetched
        // using GET /todos/:id endpoint
        // Can you confirm the entire response body?
        cy.api(`/todos/${id}`).its('body').should('deep.equal', {
          id,
          title: 'API test',
        })

        // make a DELETE call to remove the item
        // the response status should be 200
        cy.api({
          method: 'DELETE',
          url: `/todos/${id}`,
        }).should('have.property', 'status', 200)

        // confirm the item has been deleted
        // by trying to fetch it again
        // the response status should be 404
        cy.api({
          url: `/todos/${id}`,
          failOnStatusCode: false,
        }).should('have.property', 'status', 404)
      })
  })
})
