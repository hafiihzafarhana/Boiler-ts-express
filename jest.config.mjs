export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['./dist/'], // Abaikan folder dist jika ada
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,js}', 'tests/**/*.{ts,js}'], // Sertakan direktori tes untuk laporan cakupan
  coverageDirectory: 'coverage', // Direktori untuk laporan cakupan
  // setupFilesAfterEnv: ['./jest.setup.js'], // File setup opsional
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1' // Sesuaikan dengan alias yang Anda gunakan
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.[jt]s$' // Tentukan pola pencarian file tes
};
