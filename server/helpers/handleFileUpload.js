const fs = require('fs')

const handleFileUpload = (fileBuffer, filename) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./public/assets/${filename}`, fileBuffer, err => {
            if (err) reject({ isUploaded: false, messageimage: err })
            resolve({ isUploaded: true, messageimage: 'Upload successfully!' })
        })
    })
}
module.exports = handleFileUpload