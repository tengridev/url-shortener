import { IP } from '../../../../utils/db/ip'
import { URLs } from '../../../../utils/db/urls'
import { regex } from '../../../../utils/regex'

const StatisticsURLs = async (req, res) => {
  if (req.method === 'GET') {
    const ip = new IP(req)
    await ip.autoBan()
    const getIp = await ip.ip()

    if (!getIp.ban) {
      const hash = req.query.hash

      if (regex.md5.test(hash)) {
        const urls = new URLs()
        const getURLs = await urls.get(getIp, hash, {
          delete: false
        })

        res.status(200).json(getURLs)
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

export default StatisticsURLs
