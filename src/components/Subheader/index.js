import { settings } from '../../data/settings'
import QRCode from 'qrcode.react'
import moment from 'moment'

const Subheader = ({ data }) => {
  return (
    <div className="subheader">
      <div className="subheader-details">
        <div className="subheader-short">{`${data.service}/${data.slug}`}</div>
        <div className="subheader-date">
          {moment(data.createdAt).format('DD.MM.YYYY HH:mm:ss')}
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
