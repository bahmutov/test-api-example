interface Todo {
  title: string
}

it('uses the data from the response if available', () => {
  cy.intercept('/todos').as('todos')
  cy.visit('/')
  cy.wait('@todos')
    .its('response')
    .then((res) => {
      expect(res?.statusCode).to.be.oneOf([200, 304])
      if (res?.statusCode === 200) {
        cy.log('**have response data**')
        res?.body?.forEach((item: Todo, k: number) => {
          cy.get('li.todo')
            .eq(k, { log: false })
            .contains(item.title)
        })
      } else {
        cy.log('**cached data, nothing changed**')
      }
    })
})
