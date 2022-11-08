it('resets the todos', () => {
  // make an API call to "POST /reset"
  // sending an object with "todos: []" property
  // https://github.com/bahmutov/json-server-reset
  //
  // confirm the data has been cleared
  // by fetching it using "GET /todos" and
  // confirming the body is an empty list
})

it('resets the todos to a fixture', () => {
  // load the fixture file "three.json"
  // https://on.cypress.io/fixture
  // The loaded data is an object with "todos: [...]"
  //
  // make an API call to reset the backend data
  // "POST /reset data"
  //
  // confirm the backend now has 3 todos
  // (or as many as the data.todos list has)
  // by fetching it from the backend
  //
  // visit the application page
  // https://on.cypress.io/visit
  //
  // confirm the number of shown todos is equal
  // to the number of todos loaded from the fixture file
  //
  // verify the todos loaded from the fixture file
  // are correctly shown on the web page
  // - the order is correct
  // - the right title text is there
  // - the completed todos are marked correctly
})
