import path from "path"

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(" ")}`

/** @type {import('lint-staged').Configuration} */
const config = {
  "*.{js,jsx,ts,tsx,mjs}": [buildEslintCommand],
}

export default config
