const baseQuery = require('./baseQuery')

module.exports = {

    select() {
        return baseQuery('SELECT * FROM vw_series_generos')
    },

    insert(series_generos) {
        return baseQuery('INSERT INTO series_generos SET ?', series_generos)
    },

    selectById(id) {
        return baseQuery('SELECT * FROM vw_series_generos WHERE id_serie = ?', id)
    },
     
    delete(id) {
        return baseQuery('DELETE FROM series_generos WHERE id_serie = ?;', id)
    }
}

