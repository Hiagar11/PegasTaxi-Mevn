const db = require('../ext/db')

const schema = new db.Schema(
    {
        color: {
            type: String,
            maxlength: 30,
            minlength: 1,
            trim: true
        },
        description: {
            type: String,
            maxlength: 30,
            minlength: 1,
            trim: true
        },
    }
)

module.exports = db.model('colors-trip', schema)