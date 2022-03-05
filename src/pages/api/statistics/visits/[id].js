import { IP } from '../../../../utils/db/ip'
import { Statistics } from '../../../../utils/db/statistics'
import { regex } from '../../../../utils/regex'

const StatisticsVisits = async (req, res) => {
  if (req.method === 'GET') {
    const ip = new IP(req)
    await ip.autoBan()
    const getIp = await ip.ip()

    if (!getIp.ban) {
      let urlId = parseInt(req.query.id)

      if (regex.id.test(urlId)) {
        const statistics = new Statistics()
        const visits = await statistics.visit({ urlId })

        res.status(200).json({
          visits
        })
      } else {
        res.status(200).json({
          error: {
            key: 'id_invalid'
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

export default StatisticsVisits
