import devConf from './config.dev'
import proConf from './config.prod'

let config = {}
let env = __NODE_ENV__
if (env === 'dev') {
  config = devConf
} else if (env === 'prod') {
  config = proConf
}
export default config
