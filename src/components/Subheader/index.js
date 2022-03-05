import moment from 'moment'

const Subheader = ({ data }) => {
  return (
    <div className="subheader">
      <div className="subheader-details">
        <div className="subheader-short">{data.url_short}</div>
        <div className="subheader-date">
          {moment(data.created_at).format('DD.MM.YYYY HH:mm:ss')}
        </div>
      </div>
    </div>
  )
}

export default Subheader
