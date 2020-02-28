const baseQuery = require('./baseQuery')

module.exports = {
    
    select() {
        return baseQuery('SELECT * FROM generos')
    }
}