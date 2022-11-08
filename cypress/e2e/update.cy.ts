it('updates an item', () => {
  // reset all items by making a "POST /reset" call
  // with an empty list of todos
  //
  // create a new Todo item with the title text "Write more tests"
  //
  // confirm the new item has id 1 (a number)
  // because our backend is pretty simple
  // and assigns natural numbers when starting from empty
  //
  // visit the page and confirm the single item is present
  // and does not have CSS class completed
  //
  // make another API call to update the todo with ID 1
  // change the "completed" property to true
  // Tip: you can use PATCH HTTP method
  // and pass just the changed object properties
  //
  // now reload the page and confirm the only item
  // has the CSS class "completed"
  // https://on.cypress.io/reload
})
