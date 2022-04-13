const requestIp = require('request-ip');
const geoip = require('geoip-lite');

export default (req, res) => {
    // const forwarded = req.headers["x-forwarded-for"]
    // const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    // console.log('client id=====')
    // console.log(ip)
    // const clientIp = ip;
    const clientIp = requestIp.getClientIp(req)
        .replace('::1', '')
        .replace('127.0.0.1', '') || '103.6.33.21' // <-- default location `KY`
        console.log('client id=')
        console.log(clientIp);
    let geo = geoip.lookup(clientIp)
    if(!geo) {
        geo = geoip.lookup(clientIp)
    }
    console.log('geo data api===')
    console.log(geo);
    res.status(200).json({ geo })

}

