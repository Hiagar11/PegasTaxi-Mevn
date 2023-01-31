const db = require('../ext/db')

const schema = new db.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 255,
            minlength: 2,
            trim: true
        },
        login: {
            type: String,
            required: true,
            maxlength: 255,
            minlength: 2,
            trim: true
        },
        password: {
            type: String,
            required: true,
            maxlength: 20,
            minlength: 5,
            trim: true
        },
        role: {
            type: String,
            required: true,
            maxlength: 20,
            minlength: 1,
            trim: true
        },

    }
)

module.exports = db.model('user', schema)