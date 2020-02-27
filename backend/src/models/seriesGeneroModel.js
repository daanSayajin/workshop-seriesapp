const baseQuery = require('./baseQuery')

module.exports = {

    select() {
        return baseQuery('SELECT * FROM vw_series_generos')
    },

    insert(series_generos) {
        return baseQuery('INSERT INTO series_generos SET ?', series_generos)
    },
     
    delete(id) {
        return baseQuery('DELETE FROM series_generos WHERE id <> id_serie;', id)
    },

    update(series_generos) {
        return baseQuery('UPDATE series_generos SET ? WHERE id = ?', [series_generos, series_generos.id])
    }
}

