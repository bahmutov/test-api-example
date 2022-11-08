import 'cypress-plugin-api'

// a TS interface to make the loaded fixture data understood
interface Todo {
  id: string
  title: string
  completed?: boolean
}

it('resets the todos', () => {
  // make an API call to "POST /reset"
  // sending an object with "todos: []" property
  // https://github.com/bahmutov/json-server-reset
  cy.api('POST', '/reset', { todos: [] })
  // confirm the data has been cleared
  // by fetching it using "GET /todos" and
  // confirming the body is an empty list
  cy.api('GET', '/todos').its('body').should('deep.equal', [])
})

it('resets the todos to a fixture', () => {
  // load the fixture file "three.json"
  // https://on.cypress.io/fixture
  // The loaded data is an object with "todos: [...]"
  cy.fixture('three').then((data) => {
    // make an API call to reset the backend data
    // "POST /reset data"
    cy.api('POST', '/reset', data)
    // confirm the backend now has 3 todos
    // (or as many as the data.todos list has)
    // by fetching it from the backend
    const { todos } = data
    cy.api('GET', '/todos')
      .its('body')
      .should('deep.equal', todos)
      // Tip: to make sure the response is shown in the iframe
      // if you use cypress-plugin-api, chain the ".wait(0)" command
      .wait(0)
    // visit the application page
    // https://on.cypress.io/visit
    cy.visit('/')
    // confirm the number of shown todos is equal
    // to the number of todos loaded from the fixture file
    cy.get('li.todo').should('have.length', todos.length)
    // verify the todos loaded from the fixture file
    // are correctly shown on the web page
    // - the order is correct
    // - the right title text is there
    // - the completed todos are marked correctly
    todos.forEach((todo: Todo, k: number) => {
      cy.get('li.todo').eq(k).find('label').should('have.text', todo.title)
      cy.get('li.todo')
        .eq(k)
        .should(todo.completed ? 'have.class' : 'not.have.class', 'completed')
    })
  })
})
