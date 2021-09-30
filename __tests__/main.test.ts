import {jest, describe, expect, test} from '@jest/globals'
import * as path from 'path'

jest.mock('../src/main', () => ({
  __esModule: true,
  getMaven: jest.fn()
}))

import {getMaven} from '../src/main'
import exp = require('constants')

const cachePath = path.join(__dirname, 'CACHE')
const tempPath = path.join(__dirname, 'TEMP')

// Set temp and tool directories -- "mocking"
process.env['RUNNER_TEMP'] = tempPath
process.env['RUNNER_TOOL_CACHE'] = cachePath

describe('Download Maven Version', () => {
  test('with invalid input', async () => {

    (getMaven as jest.Mock).mockImplementation(() => console.log("mocked getMaven"))
    await getMaven('invalid.version.input')
  })

  test('with invalid string', async () => {
    const input = 382
    await expect(getMaven(String(input))).rejects.toThrow()
  })

  test('with non-existent version', async () => {
    const input = '100.1.2'
    await expect(getMaven(input)).rejects.toThrow()
  })

  // test('with a valid version', async () => {
  //
  //   const input = '3.0.5'
  //   await expect(getMaven(input)).resolves.toBeTruthy()
  // })
})
