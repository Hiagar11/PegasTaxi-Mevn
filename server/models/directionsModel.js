const db = require('../ext/db')

const schema = new db.Schema(
    {
        color: {
            type: String,
            maxlength: 30,
            trim: true
        },
        title: {
            type: String,
            maxlength: 30,
            trim: true
        },
        locations: {
            type: Array,
            trim: true
        },
        drivers: {
            type: Array,
            trim: true
        },
        direction: {
            type: String
        }
    }
)

module.exports = db.model('direction', schema)