import { IP } from '../../../utils/db/ip'
import { URLs } from '../../../utils/db/urls'
import { settings } from '../../../data/settings'
import { regex } from '../../../utils/regex'

const URLsAPI = async (req, res) => {
  if (req.method === 'POST') {
    const ip = new IP(req)
    await ip.autoBan()
    const getIp = await ip.ip()

    if (!getIp.ban) {
      const slug = req.query.slug
        ? req.query.slug.replace(regex.replace.slug, '')
        : false
      const redirect =
        req.query.redirect &&
        settings.redirects.default.includes(req.query.redirect)
          ? req.query.redirect
          : settings.redirects.default[0]
      const service = req.query.service
        ? req.query.service.replace(regex.replace.service, '')
        : false
      const address = req.query.address ? req.query.address : false

      if (address && service) {
        if (regex.url.test(address)) {
          const parseURL = new URL(address).hostname

          const urls = new URLs()

          if (!settings.services.banned.includes(parseURL)) {
            let isContinue = true

            if (slug) {
              if (
                settings.slugs.banned.includes(slug.toLocaleLowerCase('en-US'))
              ) {
                isContinue = false

                res.status(200).json({
                  error: {
                    key: 'slug_ban'
                  }
                })
              } else if (await urls.slugControl(service, slug)) {
                isContinue = false

                res.status(200).json({
                  error: {
                    key: 'slug_used'
                  }
                })
              }
            }

            if (isContinue) {
              res
                .status(200)
                .json(await urls.add(getIp, service, address, redirect, slug))
            }
          } else {
            res.status(200).json({
              error: {
                key: 'url_ban'
              }
            })
          }
        } else {
          res.status(200).json({
            error: {
              key: 'url_invalid'
            }
          })
        }
      } else {
        res.status(200).json({
          error: {
            key: 'parameter_deficient'
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
