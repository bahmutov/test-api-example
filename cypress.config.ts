import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    env: {
      resolutions: [
        [1280, 1024],
        [700, 500],
        [300, 500],
      ],
    },
  },
})
