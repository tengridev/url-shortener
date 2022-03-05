import { IP } from '../../../utils/db/ip'
import { Statistics } from '../../../utils/db/statistics'

const StatisticsAll = async (req, res) => {
  if (req.method === 'GET') {
    const ip = new IP(req)
    await ip.autoBan()
    const getIp = await ip.ip()

    if (!getIp.ban) {
      const statistics = new Statistics()
      const urls = await statistics.urls()
      const visits = await statistics.visits()

      res.status(200).json({
        urls,
        visits
      })
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

export default StatisticsAll
