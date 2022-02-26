const Subheader = ({ data }) => {
  return (
    <div className="subheader">
      <div className="subheader-details">
        <div className="subheader-short">{data.url_short}</div>
        <div className="subheader-date">{data.created_at}</div>
      </div>
    </div>
  )
}

export default Subheader
