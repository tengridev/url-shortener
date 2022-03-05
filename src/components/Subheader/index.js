import moment from 'moment'

const Subheader = ({ data }) => {
  return (
    <div className="subheader">
      <div className="subheader-details">
        <div className="subheader-short">{data.short}</div>
        <div className="subheader-date">
          {moment(data.createdAt).format('DD.MM.YYYY HH:mm:ss')}
        </div>
      </div>
    </div>
  )
}

export default Subheader
