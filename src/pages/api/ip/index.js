import requestIp from 'request-ip'

const ipAPI = async (req, res) => {
  if (req.method === 'GET' || req.method === 'POST') {
    const clientIp = requestIp.getClientIp(req)
    const ipAddress =
      (clientIp?.substring(0, 7) === '::ffff:'
        ? clientIp.substring(7)
        : clientIp) || '127.0.0.1'
    const userAgent =
      req?.headers['user-agent'] || navigator.userAgent || 'No User Agent'

    res.status(200).json({
      ipAddress,
      userAgent
    })
  } else {
    res.status(200).json({
      error: {
        key: 'invalid_request_method'
      }
    })
  }
}

export default ipAPI
