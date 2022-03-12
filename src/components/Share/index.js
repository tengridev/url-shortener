import { Icon } from '../Icons'
import Link from 'next/link'

const Share = ({ data }) => {
  if (Object.keys(data).length === 0) return false

  return (
    <div className="share-button-group">
      {data.facebook && (
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${data.facebook.url}`}
        >
          <a rel="nofollow" target="_blank">
            <Icon
              name="facebook"
              size={data.facebook.size || 32}
              className={
                data.facebook.className || 'p-2 rounded bg-blue-600 fill-white'
              }
            />
          </a>
        </Link>
      )}

      {data.twitter && (
        <Link href={`https://twitter.com/share?url=${data.twitter.url}`}>
          <a rel="nofollow" target="_blank">
            <Icon
              name="twitter"
              size={data.twitter.size || 32}
              className={
                data.twitter.className || 'p-2 rounded bg-sky-500 fill-white'
              }
            />
          </a>
        </Link>
      )}

      {data.reddit && (
        <Link href={`https://www.reddit.com/submit?url=${data.reddit.url}`}>
          <a rel="nofollow" target="_blank">
            <Icon
              name="reddit"
              size={data.reddit.size || 32}
              className={
                data.reddit.className ||
                'p-[0.375rem] rounded bg-indigo-400 fill-white'
              }
            />
          </a>
        </Link>
      )}

      {data.telegram && (
        <Link href={`https://telegram.me/share/?url=${data.telegram.url}`}>
          <a rel="nofollow" target="_blank">
            <Icon
              name="telegram"
              size={data.telegram.size || 32}
              className={
                data.telegram.className || 'p-2 bg-blue-400 rounded fill-white'
              }
            />
          </a>
        </Link>
      )}

      {data.whatsapp && (
        <Link href={`https://web.whatsapp.com/send?text=${data.whatsapp.url}`}>
          <a rel="nofollow" target="_blank">
            <Icon
              name="whatsapp"
              size={data.whatsapp.size || 32}
              className={
                data.whatsapp.className ||
                'p-[0.375rem] rounded bg-green-500 fill-white'
              }
            />
          </a>
        </Link>
      )}
    </div>
  )
}

export default Share
