const Alert = ({ title, text, className }) => {
  return (
    <div className={`alert ${className ? className : ''}`}>
      {title && <h5 className="alert-title">{title}</h5>}
      <p className="alert-text">{text}</p>
    </div>
  )
}

export default Alert
