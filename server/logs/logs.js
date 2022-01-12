const fs = require('fs')
const logs = (request) => {
    let traffic = request.traffic()
    let logs = `statusCode=${request.response.statusCode} method=${request.route.method} path=${request.route.path} origin=${request.headers.origin} recv=${traffic.recvPayload}/${traffic.recvRaw} sent=${traffic.sentPayload}/${traffic.sentRaw} start=${new Date(traffic.timeStart)} finish=${new Date(traffic.timeFinish)} duration=${traffic.timeDuration}ms`

    if (fs.existsSync('./logs/logs.txt')) {
        fs.readFile('./logs/logs.txt', 'utf-8', function (err, data) {
            if (err) throw err
            logs = logs + '\r\n' + data
            fs.writeFile('./logs/logs.txt', logs, 'utf-8', function (err) {
                if (err) throw err
                console.log('filelistAsync complete')
            })
        })
    } else {
        fs.writeFile('./logs/logs.txt', logs, 'utf-8', function (err) {
            if (err) throw err
            console.log('filelistAsync complete')
        })
    }
}

module.exports = logs