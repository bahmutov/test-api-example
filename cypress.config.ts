import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on) {
      let startedAt: number
      let allowToFail: boolean

      on('task', {
        startProcess(canFail = false) {
          startedAt = Date.now()
          allowToFail = canFail
          console.log(
            'Long process started at %d, allowed to fail? %j',
            startedAt,
            allowToFail,
          )
          return null
        },
        checkProcess() {
          if (!startedAt) {
            throw new Error('No process started')
          }

          const now = Date.now()
          const elapsed = now - startedAt
          console.log(
            'Checking process, elapsed %d ms',
            elapsed,
          )
          if (elapsed > 10_000) {
            console.log('returning success')
            return { status: 'success' }
          }
          if (allowToFail) {
            const shouldFail = Math.random() < 0.25
            if (shouldFail) {
              console.log('returning failing status')
              return { status: 'failed' }
            }
          }

          return { status: 'pending' }
        },
      })
    },
  },
})
