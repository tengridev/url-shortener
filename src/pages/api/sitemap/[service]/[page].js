import { IP } from '../../../../utils/db/ip'
import { Sitemap } from '../../../../utils/db/sitemap'
import { settings } from '../../../../data/settings'
import { regex } from '../../../../utils/regex'

const SitemapPagination = async (req, res) => {
  if (req.method === 'GET') {
    const ip = new IP(req)
    await ip.autoBan()
    const getIp = await ip.ip()

    if (!getIp.ban) {
      let service = req.query.service
        .toLocaleLowerCase('en-US')
        .replace(regex.replace.service, '')
      service = settings.services.default.includes(service)
        ? service
        : settings.services.default[0]
      const page =
        Number.isInteger(parseInt(req.query.page)) &&
        parseInt(req.query.page) > 0
          ? parseInt(req.query.page)
          : 1

      const sitemap = new Sitemap()
      res.status(200).json(await sitemap.pagination({ service, page }))
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

export default SitemapPagination
