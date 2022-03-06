import { settings } from '../../data/settings'
import { robots } from '../../data/robots'
import { regex } from '../../utils/regex'

const RobotsPage = () => {}

export async function getServerSideProps(context) {
  let content = ''
  const policies =
    robots.policies?.length > 0
      ? robots.policies
      : [
          {
            userAgent: '*',
            allow: '/'
          }
        ]
  const sitemaps =
    robots.sitemaps?.length > 0
      ? robots.sitemaps
      : [`${settings.main.URL}/sitemap`]

  policies.map((item) => {
    content += `User-agent: ${item.userAgent}\n`

    if (item.allow) {
      if (Array.isArray(item.allow) && item.allow.length > 0) {
        item.allow.map((allow) => {
          content += `Allow: ${allow}\n`
        })
      } else {
        content += `Allow: ${item.allow}\n`
      }
    }

    if (item.disallow) {
      if (Array.isArray(item.disallow) && item.disallow.length > 0) {
        item.disallow.map((disallow) => {
          content += `Disallow: ${disallow}\n`
        })
      } else {
        content += `Disallow: ${item.disallow}\n`
      }
    }

    if (item.crawlDelay) {
      content += `Crawl-delay: ${item.crawlDelay}\n`
    }

    content += `\n`
  })

  sitemaps.map((item) => {
    content += `Sitemap: ${
      regex.url.test(item) ? item : settings.main.URL + item
    }\n`
  })

  context.res.setHeader('Content-Type', 'text/plain; charset=UTF-8')
  context.res.write(content)
  context.res.end()

  return {
    props: {}
  }
}

export default RobotsPage
