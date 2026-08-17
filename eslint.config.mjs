import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import eslintConfigPrettier from 'eslint-config-prettier' // 1. Import it

const eslintConfig = defineConfig([
  ...nextVitals,
  eslintConfigPrettier, // 2. Add it to the end of the array
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
