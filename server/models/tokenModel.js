const db = require('../ext/db')
const {Schema: {Types: {ObjectId}}} = require('mongoose')

const schema = new db.Schema(
    {
        token: {
            type: String,
            required: true,
            maxlength: 255,
            minlength: 2,
            trim: true
        },
        userId: {
            type: ObjectId,
            ref: 'User'
        },

    }
)

module.exports = db.model('token', schema)