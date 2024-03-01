// https://github.com/bahmutov/cypress-recurse
import { recurse } from 'cypress-recurse'

// look at the task definitions in the cypress.config.ts file

describe('Check status', () => {
  it('completes without failures', () => {
    // start the background process by calling task "startProcess"
    // https://on.cypress.io/task
    cy.task('startProcess')
    // wait for the process to finish
    // by calling task "checkProcess" repeatedly
    // until its "status" field is "success"
    // it can take up to 10 seconds, use 1 second delay
    recurse(
      () => cy.task('checkProcess').its('status'),
      (status) => status === 'success',
      {
        delay: 1000,
        timeout: 15_000,
        log: 'Task finished successfully',
      },
    )
  })

  it('can fail', () => {
    // start the background process by calling task "startProcess"
    // with the argument "true" to allow it to fail
    // https://on.cypress.io/task
    cy.task('startProcess', true)
    // wait for the process to finish
    // by calling task "checkProcess" repeatedly
    // until its "status" field is "success"
    // it can take up to 10 seconds, use 1 second delay
    // BUT: if at any point the status is neither
    // "success" nor "pending" - fail the test right away
    recurse(
      () =>
        cy
          .task('checkProcess')
          .its('status', { timeout: 0 })
          .should('be.oneOf', ['success', 'pending']),
      (status) => status === 'success',
      {
        delay: 1000,
        timeout: 15_000,
        log: 'Task finished successfully',
      },
    )
  })
})
