import { prepareMyTodo } from './utils'

beforeEach(prepareMyTodo)

it('has creates a todo item', function () {
  expect(this['my todo X'], 'todo id').to.be.a('number')
  cy.visit('/')
  cy.contains('li.todo', 'my todo X')
})
