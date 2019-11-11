const path = require('path');

module.exports = {
  // Tailwind Paths
  configJS: path.resolve(__dirname, 'tailwind.config.js'),
  sourceCSS: path.join(__dirname, 'src', 'tailwind.css'),
  outputCSS: path.join(__dirname, 'src', 'styles.scss'),
  // Sass
  sass: true,
  // PurgeCSS Settings
  purge: false,
  keyframes: false,
  fontFace: false,
  rejected: false,
  whitelist: [],
  whitelistPatterns: [],
  whitelistPatternsChildren: [],
  extensions: [
    '.ts',
    '.html',
    '.js'
  ],
  extractors: [],
  content: []
}
