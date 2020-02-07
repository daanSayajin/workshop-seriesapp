const connection = require('../config/database')

module.exports = (sql, params) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params || '', (err, res) => {
            if (err) return reject(err)
            resolve(res)
        })
    })
}