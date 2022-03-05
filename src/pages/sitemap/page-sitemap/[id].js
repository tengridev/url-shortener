import { regex } from '../../../utils/regex'
import { settings } from '../../../data/settings'
import { sitemap } from '../../../data/sitemap'
import moment from 'moment'

const PageSitemap = () => {}

export async function getServerSideProps(context) {
  const id = context.params.id.replace(regex.replace.id, '')
  const isContinue =
    sitemap.active.page &&
    sitemap.additionals.page &&
    Array.isArray(sitemap.additionals.page)
      ? true
      : false
  const total = isContinue
    ? Math.ceil(sitemap.additionals.page.length / sitemap.limit) > 0
      ? Math.ceil(sitemap.additionals.page.length / sitemap.limit)
      : 1
    : 1

  if (id <= 0 || id.length <= 0 || id > total) return { notFound: true }

  let content = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${
    settings.main.URL
  }${
    context.locale === context.defaultLocale ? '' : '/' + context.locale
  }/sitemap/xsl/main"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  if (isContinue) {
    let i = sitemap.limit * (id - 1)
    let count =
      sitemap.limit * id > sitemap.additionals.page.length
        ? sitemap.additionals.page.length
        : sitemap.limit * id

    for (i; i < count; i++) {
      content += `    <url>\n`
      content += `        <loc>${
        regex.url.test(sitemap.additionals.page[i].loc)
          ? sitemap.additionals.page[i].loc
          : settings.main.URL +
            (context.locale === context.defaultLocale
              ? ''
              : '/' + context.locale) +
            sitemap.additionals.page[i].loc
      }</loc>\n`
      if (sitemap.additionals.page[i].lastmod)
        content += `        <lastmod>${moment(
          sitemap.additionals.page[i].lastmod,
          'DD.MM.YYYY HH:mm:ss'
        ).format('YYYY-MM-DDTHH:mm:ssZ')}</lastmod>\n`
      content += `    </url>\n`
    }
  }

  content += `</urlset>`

  context.res.setHeader('Content-Type', 'text/xml; charset=UTF-8')
  context.res.write(content)
  context.res.end()

  return {
    props: {}
  }
}

export default PageSitemap
