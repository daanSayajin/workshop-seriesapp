const baseQuery = require('./baseQuery')

module.exports = {
    
    select() {
        return baseQuery('SELECT * FROM series')
    },
    
    insert(serie) {
        return baseQuery('INSERT INTO series SET ?', serie)
    },

    selectById(id) {
        return baseQuery('SELECT * FROM series WHERE id = ?', id)
    },

    delete(id) {
        return baseQuery('DELETE FROM series WHERE id = ?', id)
    },

    update(serie) {
        return baseQuery('UPDATE series SET ? WHERE id = ?', [serie, serie.id])
    }
}