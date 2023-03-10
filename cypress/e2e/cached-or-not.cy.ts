interface Todo {
  title: string
}

it('uses the data from the response if available', () => {
  // spy on the GET request to "/todos"
  // and give the intercept an alias "todos"
  // https://on.cypress.io/intercept
  //
  // visit the application
  cy.visit('/')
  // wait for the intercept "@todos"
  // https://on.cypress.io/wait
  // and get its response property
  // https://on.cypress.io/its
  //
  // pass the response object to the cy.then(callback)
  //
  // check the response status code,
  // we expect it to be either 200 or 304
  //
  // if the status code is 200, then the server
  // sent the list of todos in the response body
  // log a message to the Command Log
  // https://on.cypress.io/log
  //
  // iterate over todos, and check that the application
  // shows every todo title at its right position in the list
  // https://on.cypress.io/get
  // https://on.cypress.io/eq
  // https://on.cypress.io/contains
  //
  // if the status code is 304, then the browser
  // has the todos cached, and there is nothing for us to do
  // just log a message to the Command Log
  // https://on.cypress.io/log
})
