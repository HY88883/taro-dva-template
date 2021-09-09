'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json','.jsx','scss'],
    alias: {
      '@/components': resolve('src/components'),
      '@/utils': resolve('src/utils'),
      '@/services': resolve('src/services'),
      '@/actions': resolve('src/actions'),
      '@/assets': resolve('src/assets'),
      '@/config': resolve('src/config'),
      '@/models': resolve('src/models'),
      '@/pages': resolve('src/pages'),
    }
  }
}
