module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  verbose: true
}
