import { settings } from '../../data/settings'
import { sitemap } from '../../data/sitemap'
import { regex } from '../../utils/regex'
import moment from 'moment'
import axios from 'axios'

const SitemapIndex = () => {}

export async function getServerSideProps(context) {
  let content = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${
    settings.main.URL
  }${
    context.locale === context.defaultLocale ? '' : '/' + context.locale
  }/sitemap/xsl/main"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  if (sitemap.active.short || sitemap.active.statistics) {
    let short = ''
    let statistics = ''
    let total = 1

    for (let i = 1; i <= total; i++) {
      await axios
        .get(
          `${settings.main.API}/sitemap/${settings.main.parse.hostname}/${i}`
        )
        .then((res) => {
          total = res.data.sitemap.page.total

          if (sitemap.active.short) {
            short += `    <sitemap>
        <loc>${settings.main.URL}${
              context.locale === context.defaultLocale
                ? ''
                : '/' + context.locale
            }/sitemap/short-sitemap/${i}</loc>
        <lastmod>${moment
          .utc(
            res.data.sitemap.data[res.data.sitemap.data.length - 1].created_at
          )
          .format('YYYY-MM-DDTHH:mm:ss+00:00')}</lastmod>
    </sitemap>\n`
          }

          if (sitemap.active.statistics) {
            statistics += `    <sitemap>
        <loc>${settings.main.URL}${
              context.locale === context.defaultLocale
                ? ''
                : '/' + context.locale
            }/sitemap/statistics-sitemap/${i}</loc>
        <lastmod>${moment
          .utc(
            res.data.sitemap.data[res.data.sitemap.data.length - 1].created_at
          )
          .format('YYYY-MM-DDTHH:mm:ss+00:00')}</lastmod>
    </sitemap>\n`
          }
        })
    }

    content += short + statistics
  }

  if (sitemap.additionals.index && Array.isArray(sitemap.additionals.index)) {
    sitemap.additionals.index.map((item) => {
      content += `    <sitemap>
        <loc>${
          regex.url.test(item.loc)
            ? item.loc
            : settings.main.URL +
              (context.locale === context.defaultLocale
                ? ''
                : '/' + context.locale) +
              item.loc
        }</loc>
        <lastmod>${moment
          .utc(item.lastmod, 'DD.MM.YYYY HH:mm:ss')
          .format('YYYY-MM-DDTHH:mm:ss+00:00')}</lastmod>
    </sitemap>\n`
    })
  }

  content += `</sitemapindex>`

  context.res.setHeader('Content-Type', 'text/xml; charset=UTF-8')
  context.res.write(content)
  context.res.end()

  return {
    props: {}
  }
}

export default SitemapIndex
