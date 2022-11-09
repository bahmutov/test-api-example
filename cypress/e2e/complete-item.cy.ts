import spok from 'cy-spok'

it('does not complete an item', () => {
  // reset all todos on the backend by making
  // an API call "POST /reset"
  //
  // visit the home page
  // https://on.cypress.io/visit
  //
  // confirm the application has finished loading
  // by checking for the existence of an element
  // with class "loaded"
  //
  // type into the input field "New test" plus Enter
  //
  // there should be 1 todo item on the page
  // click the ".toggle" element of the first item
  //
  // the first todo item on the page should have CSS class "completed"
  //
  // fetch all todo items from the backed
  // there should be only one item
  // grab the first returned item
  // and confirm the property "completed" still remains false
  // Our web application is NOT updating the item
  // when we toggle the page element :(
})
