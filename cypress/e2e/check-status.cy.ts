// https://github.com/bahmutov/cypress-recurse
import { recurse } from 'cypress-recurse'

// look at the task definitions in the cypress.config.ts file

describe('Check status', () => {
  it('completes without failures', () => {
    // start the background process by calling task "startProcess"
    // https://on.cypress.io/task
    //
    // wait for the process to finish
    // by calling task "checkProcess" repeatedly
    // until its "status" field is "success"
    // it can take up to 10 seconds, use 1 second delay
  })

  it('can fail', () => {
    // start the background process by calling task "startProcess"
    // with the argument "true" to allow it to fail
    // https://on.cypress.io/task
    //
    // wait for the process to finish
    // by calling task "checkProcess" repeatedly
    // until its "status" field is "success"
    // it can take up to 10 seconds, use 1 second delay
    // BUT: if at any point the status is neither
    // "success" nor "pending" - fail the test right away
  })
})
