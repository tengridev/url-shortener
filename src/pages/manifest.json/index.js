import { manifest } from '../../data/manifest'

const ManifestPage = () => {}

export async function getServerSideProps(context) {
  const languages = Object.keys(manifest)
  const data = languages.includes(context.locale)
    ? manifest[context.locale]
    : manifest[languages[0]]

  context.res.setHeader('Content-Type', 'application/json')
  context.res.write(JSON.stringify(data))
  context.res.end()

  return {
    props: {}
  }
}

export default ManifestPage
