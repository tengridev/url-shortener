import { regex } from '../../../utils/regex'
import { settings } from '../../../data/settings'
import { sitemap } from '../../../data/sitemap'
import moment from 'moment'
import axios from 'axios'

const StatisticsSitemap = () => {}

export async function getServerSideProps(context) {
  const id = context.params.id.replace(regex.replace.id, '')

  if (id <= 0 || id.length <= 0) return { notFound: true }

  let isNotFound = false

  let content = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${
    settings.main.URL
  }${
    context.locale === context.defaultLocale ? '' : '/' + context.locale
  }/sitemap/xsl/main"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  if (sitemap.active.statistics) {
    await axios
      .get(
        settings.api.sitemap.pagination({
          service: settings.main.parse.hostname,
          page: id
        })
      )
      .then((res) => {
        if (res.data.sitemap.data) {
          res.data.sitemap.data.map((item) => {
            content += `    <url>
        <loc>${settings.main.URL}${
              context.locale === context.defaultLocale
                ? ''
                : '/' + context.locale
            }/statistics/${item.url_slug}</loc>
        <lastmod>${moment
          .utc(item.created_at)
          .format('YYYY-MM-DDTHH:mm:ss+00:00')}</lastmod>
    </url>\n`
          })
        } else {
          isNotFound = true
        }
      })
  }

  content += `</urlset>`

  if (isNotFound) return { notFound: true }

  context.res.setHeader('Content-Type', 'text/xml; charset=UTF-8')
  context.res.write(content)
  context.res.end()

  return {
    props: {}
  }
}

export default StatisticsSitemap
