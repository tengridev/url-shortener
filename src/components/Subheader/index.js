import { settings } from '../../data/settings'
import QRCode from 'qrcode.react'
import Share from '../Share'

const Subheader = ({ data }) => {
  return (
    <div className="subheader">
      <div className="subheader-details">
        <div className="subheader-short">{`${data.service}/${data.slug}`}</div>
        <div className="subheader-date">{data.format.createdAt}</div>
        <Share
          data={{
            facebook: {
              url: data.short
            },
            twitter: {
              url: data.short
            },
            reddit: {
              url: data.short
            },
            telegram: {
              url: data.short
            },
            whatsapp: {
              url: data.short
            }
          }}
        />
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
