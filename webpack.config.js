const path = require('path')

module.exports = {
  entry: './src/vue.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue.js'
  }
}