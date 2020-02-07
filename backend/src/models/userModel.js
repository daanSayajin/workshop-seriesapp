const baseQuery = require('./baseQuery')

module.exports = {
    
    insert(user) {
        return baseQuery('INSERT INTO usuarios SET ?', user)
    },
  
    findByEmail(email) {
        return baseQuery('SELECT * FROM usuarios WHERE email = ?', email)
    }
}