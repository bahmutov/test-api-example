import { todos } from '../fixtures/three.json'
import {
  really,
  map,
  its,
  pipe,
} from 'cypress-should-really'

it('has the checked', () => {
  cy.intercept('/todos', todos)
  cy.visit('/')

  // from the list of "todos" objects
  // get the list of completed boolean values
  // as an array called "completed"
  // that should be [true, false, false]
  // Tip: there are several ways you can do it
  // If you use cypress-should-really
  // you can use things like "map", "pipe", "its"
  // const completed = map(Boolean)(map('completed')(todos))
  // const completed = pipe(
  //   map('completed'),
  //   map(Boolean),
  // )(todos)
  // const completed = map(pipe(its('completed'), Boolean))(
  //   todos,
  // )
  const completed = todos.map((todo) =>
    Boolean(todo.completed),
  )
  expect(completed, 'completed list').to.deep.equal([
    true,
    false,
    false,
  ])

  // confirm the item checkboxes has the checked state
  // matching the "completed" array
  cy.get('li.todo input:checkbox').should(
    really(map('checked'), 'deep.equal', completed),
  )
  // grab the remaining count, convert the text to a number
  // and then confirm it is equal to number 2
  cy.get('[data-cy=remaining-count]').should(
    really(its('0.innerText'), parseInt, 'equal', 2),
  )
})
