import { IP } from '../../../utils/db/ip'
import { URLs } from '../../../utils/db/urls'
import { regex } from '../../../utils/regex'

const URLsAPI = async (req, res) => {
  if (req.method === 'GET') {
    const ip = new IP(req)
    await ip.autoBan()
    const getIp = await ip.ip()

    if (!getIp.ban) {
      const hash = req.query.hash

      if (regex.md5.test(hash)) {
        const urls = new URLs()

        res.status(200).json(
          await urls.get(getIp, hash, {
            visit: true,
            delete: false
          })
        )
      } else {
        res.status(200).json({
          error: {
            key: 'hash_invalid'
          }
        })
      }
    } else {
      res.status(200).json({
        error: {
          key: 'ip_ban'
        }
      })
    }
  } else if (req.method === 'DELETE') {
    const ip = new IP(req)
    await ip.autoBan()
    const getIp = await ip.ip()

    if (!getIp.ban) {
      const hash = req.query.hash

      if (regex.md5.test(hash)) {
        const urls = new URLs()

        res.status(200).json(await urls.delete(hash))
      } else {
        res.status(200).json({
          error: {
            key: 'hash_invalid'
          }
        })
      }
    } else {
      res.status(200).json({
        error: {
          key: 'ip_ban'
        }
      })
    }
  } else {
    res.status(200).json({
      error: {
        key: 'invalid_request_method'
      }
    })
  }
}

export default URLsAPI
