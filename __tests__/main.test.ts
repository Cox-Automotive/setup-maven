import {jest, describe, expect, test} from '@jest/globals'
import * as path from 'path'

jest.mock('../src/main', () => ({
  __esModule: true,
  getMaven: jest.fn()
}))

import {getMaven} from '../src/main'

const cachePath = path.join(__dirname, 'CACHE')
const tempPath = path.join(__dirname, 'TEMP')

// Set temp and tool directories -- "mocking"
process.env['RUNNER_TEMP'] = tempPath
process.env['RUNNER_TOOL_CACHE'] = cachePath

describe('Download Maven Version', () => {
  test('with invalid string', async () => {
    ;(getMaven as jest.Mock).mockImplementation(() => {
      throw new Error('invalid')
    })
    const input = 'invalid.version.input'

    expect(() => {
      getMaven(input)
    }).toThrow()
  })

  test('with invalid symver', async () => {
    ;(getMaven as jest.Mock).mockImplementation(() => {
      throw new Error('invalid')
    })
    const input = '382'

    expect(() => {
      getMaven(input)
    }).toThrow()
  })

  test('with non-existent version', async () => {
    ;(getMaven as jest.Mock).mockImplementation(() => {
      throw new Error('does not exist')
    })
    const input = '100.1.2'

    expect(() => {
      getMaven(input)
    }).toThrow()
  })

  test('with a valid version', async () => {
    ;(getMaven as jest.Mock).mockImplementation(() => 'Download Success')
    const input = '3.0.5'

    expect(() => {
      getMaven(input)
    }).toBeTruthy()
  })
})
