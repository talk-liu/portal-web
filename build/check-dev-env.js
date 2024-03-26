const config = require('../src/config').default

if (config.env === 'prod') {
  console.error('请勿将prod的session提交到仓库')
  process.exit(1)
} else {
  process.exit(0)
}
