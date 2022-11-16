import { resetData, resolutions, testViewport } from './utils'
import 'cypress-each'

beforeEach(resetData)

describe('Viewports', () => {
  it.each(
    resolutions,
    3,
    2,
  )(
    'works in resolution %d x %d',
    // @ts-ignore
    testViewport,
  )
})
