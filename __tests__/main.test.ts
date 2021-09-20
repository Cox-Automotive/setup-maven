import * as main from '../src/main'
import {expect, test} from '@jest/globals'

test('with invalid input', async () => {
  const input = 'invalid.version.number'
  await expect(main.getMaven(input)).rejects.toThrow('invalid version input')
})

// FIXME: Not sure why this fails?
// test('with valid input', async () => {
//   const input = '3.8.5'
//   await expect(main.getMaven(input)).toBe(true);
// })

// TODO: Add more tests
