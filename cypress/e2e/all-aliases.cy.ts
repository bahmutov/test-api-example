// import commands and queries from cypress-aliases plugin
// https://github.com/bahmutov/cypress-aliases

beforeEach(() => {
  // before each test reset everything on the server
  // by loading the fixture file
  cy.fixture('three.json')
    .its('todos')
    .as('three')
    .then((todos) => {
      cy.request('POST', '/reset', { todos })
    })
})

it('has two registered aliases', () => {
  // spy on the network call "GET /todos"
  // and give the spy alias "load"
  // https://on.cypress.io/intercept
  // https://on.cypress.io/as
  //
  // visit the home page
  // https://on.cypress.io/visit
  //
  // get all registered aliases
  // and confirm there are only aliases with names "three" and "load"
})
