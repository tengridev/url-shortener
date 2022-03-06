import { useRouter } from 'next/router'
import { settings } from '../../data/settings'
import moment from 'moment/min/moment-with-locales'
import QRCode from 'qrcode.react'

const Subheader = ({ data }) => {
  const router = useRouter()
  moment.locale(router.locale)

  return (
    <div className="subheader">
      <div className="subheader-details">
        <div className="subheader-short">{data.short}</div>
        <div className="subheader-date">
          {moment(data.createdAt).format('DD.MM.YYYY HH:mm:ss')}
          {` - `}
          {moment(data.createdAt).fromNow()}
        </div>
      </div>
      <div className="subheader-qrcode">
        {
          <QRCode
            className="subheader-qrcode-svg"
            value={data.short}
            {...settings.qrCode}
          />
        }
      </div>
    </div>
  )
}

export default Subheader
