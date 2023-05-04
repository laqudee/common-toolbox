/* eslint-env node */

module.exports = {
  root: true,
  ignorePatterns: ['iconfont/*', 'iconfont.js'], // 忽略对assets/iconfont/* 下所有文件进行检查
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-restricted-imports': [2, 'lodash'], // 项目中只能引入一个工具函数库"lodash"
    eqeqeq: ['error', 'always'] // 必须全等===
  }
}
