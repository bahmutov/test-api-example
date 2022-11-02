import spok from 'cy-spok'

describe('Adding todos', () => {
  it('adds a new todo object', () => {
    // make a request to post a new todo item
    // to the server using cy.request command
    // https://on.cypress.io/request
    // POST /todos
    // You need to include at least the "title" property
    cy.request({
      method: 'POST',
      url: '/todos',
      body: {
        title: 'Api test',
      },
    })
      // verify the request succeeded by checking
      // its "status" property, it should be 201
      .then((r) => {
        expect(r).to.have.property('status', 201)
      })
      // how to verify the response body?
      // it should include fields "id" and "title"
      .its('body')
      .should('have.keys', ['id', 'title'])
  })

  it('adds a new todo object and checks using cy-spok', () => {
    // make a request to post a new todo item
    // to the server using cy.request command
    // https://on.cypress.io/request
    // POST /todos
    // You need to include at least the "title" property
    cy.request({
      method: 'POST',
      url: '/todos',
      body: {
        title: 'Api test',
      },
    })
      // verify the yielded result using the cy-spok plugin
      // status code should be 201
      // body should include the title you send
      // and the "id" should be assigned by the server
      // and should be a random string
      .should(
        spok({
          status: 201,
          body: {
            id: spok.string,
            title: 'Api test',
          },
        }),
      )
  })

  it('adds a new todo object with extra fields', () => {
    // send the following body with your request
    // to the /todos endpoint
    // https://on.cypress.io/request
    const body = {
      title: 'Api test',
      extra: 1,
      bonus: true,
    }
    cy.request({
      method: 'POST',
      url: '/todos',
      body,
    })
      // using cy-spok verify the request is successful
      // and returns the same object plus a string "id"
      .should(
        spok({
          status: 201,
          body: {
            id: spok.string,
            ...body,
          },
        }),
      )
  })

  it('adds a new todo object with id', () => {
    // send this request object
    // where you create a random ID
    // to the /todos endpoint
    // https://on.cypress.io/request
    const body = {
      id: Cypress._.random(1e6),
      title: 'Api test',
      extra: 1,
      bonus: true,
    }
    cy.request({
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
