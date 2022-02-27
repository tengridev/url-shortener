import { ads } from '../../data/ads'

const AdsPage = () => {}

export async function getServerSideProps(context) {
  let content = ''

  if (ads.txt && Array.isArray(ads.txt) && ads.txt.length > 0) {
    ads.txt.map((item) => {
      content += `${item.domain}, ${item.publisher}, ${item.type}`

      if (item.authority) content += `, ${item.authority}`

      content += `\n`
    })
  }

  context.res.setHeader('Content-Type', 'text/plain; charset=UTF-8')
  context.res.write(content)
  context.res.end()

  return {
    props: {}
  }
}

export default AdsPage
