import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'next-share'
import { settings } from '../../data/settings'
import QRCode from 'qrcode.react'

const Subheader = ({ data }) => {
  return (
    <div className="subheader">
      <div className="subheader-details">
        <div className="subheader-short">{`${data.service}/${data.slug}`}</div>
        <div className="subheader-date">{data.format.createdAt}</div>
        <div className="share-button-group">
          <FacebookShareButton url={data.short}>
            <FacebookIcon size={32} className="rounded" />
          </FacebookShareButton>

          <TwitterShareButton url={data.short}>
            <TwitterIcon size={32} className="rounded" />
          </TwitterShareButton>

          <RedditShareButton url={data.short}>
            <RedditIcon size={32} className="rounded" />
          </RedditShareButton>

          <TelegramShareButton url={data.short}>
            <TelegramIcon size={32} className="rounded" />
          </TelegramShareButton>

          <WhatsappShareButton url={data.short}>
            <WhatsappIcon size={32} className="rounded" />
          </WhatsappShareButton>
        </div>
      </div>
      <div className="subheader-qrcode">
        <QRCode
          className="subheader-qrcode-svg"
          value={data.short}
          {...settings.qrCode}
        />
      </div>
    </div>
  )
}

export default Subheader
