import config from '@/config'
const devPusher = {
  key: '73b0202a5bb9d80e63cb',
  wsHost: config[config.env].push,
  wsPort: '8080',
  wssPort: '443',
  encrypted: false,
}
const pusher = process.env.NODE_ENV === 'production' ? window.gon.pusher : devPusher

export default { pusher }
