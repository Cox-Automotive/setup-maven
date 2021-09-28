import {getMaven} from '../src/main'
import {jest, describe, expect, test} from '@jest/globals'
import * as path from 'path'

const cachePath = path.join(__dirname, 'CACHE')
const tempPath = path.join(__dirname, 'TEMP')

// Set temp and tool directories -- "mocking"
process.env['RUNNER_TEMP'] = tempPath
process.env['RUNNER_TOOL_CACHE'] = cachePath

describe('Download Maven Version', () => {
  test('with invalid input', async () => {
    const input = 'invalid.version.number'
    await expect(getMaven(input)).rejects.toThrow('invalid version input')
  })
  //
  // test('with invalid string', async () => {
  //   const input = 382
  //   await expect(getMaven(String(input))).rejects.toThrow()
  // })
  //
  // test('with non-existent version', async () => {
  //   const input = '100.1.2'
  //   await expect(getMaven(input)).rejects.toThrow()
  // })
})
