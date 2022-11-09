// import an API plugin if plan to use something
// other than cy.request command
import 'cypress-plugin-api'
// import cypress-each plugin
// https://github.com/bahmutov/cypress-each
import 'cypress-each'

// this is the list of title edge cases we want to
// create on the backend. Some of these are impossible
// to create through the page UI itself
const invalidTodos = {
  empty: {
    title: '',
  },
  whitespace: {
    title: '  ',
  },
  emoji: {
    title: '🤣🎉',
  },
}

const testData = Cypress._.toPairs(invalidTodos)

// before each test, reset the backend data
// by making a "POST /reset" call with "todos: []"
beforeEach(() => {
  cy.api('POST', '/reset', { todos: [] })
})

// for each edge case, write a test that
// creates a single todo item by making a "POST /todos" API call
// then the test should visit the home page "/"
// and confirm there is only one todo shown
// and the label text is exactly the same as
// what we used to create the todo
//
// Tip: cypress-each automatically splits an array argument
// into individual arguments passed to the test callback function
it.each(testData)('title is %s', (caseName, todo) => {
  cy.log(`creating todo with ${caseName} title`)
  cy.api('POST', '/todos', todo).wait(0)
  cy.visit('/')
  cy.get('li.todo label')
    .should('have.length', 1)
    .first()
    .should('have.text', todo.title)
})
