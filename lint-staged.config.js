export default {
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '**/*.{ts,tsx,js,jsx}': ['eslint --fix']
}
