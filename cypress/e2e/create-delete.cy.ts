describe('Create and delete', () => {
  it('deletes the created item', () => {
    // create a new item by sending a POST request
    // to /todos endpoint. Send an object with
    // the "title: API test" property
    //
    // confirm the response body has "id"
    // created by the server, it should be a string
    //
    // pass the id into a cy.then callback so we can make
    // additional calls
    //
    // Bonus: confirm the item can be fetched
    // using GET /todos/:id endpoint
    // Can you confirm the entire response body?
    //
    // make a DELETE call to remove the item
    // the response status should be 200
    //
    // confirm the item has been deleted
    // by trying to fetch it again
    // the response status should be 404
  })
})
