const env = process.env.NODE_ENV || 'dev'

const globalConfig = {
  development: {
    api: 'http://localhost:8080',
  },
  stage: {
    api: 'https://admin.breastwecan.app',
  },
  production: {
    api: 'https://admin.breastwecan.app',
  },
}
export default globalConfig[env]