const db = require('../ext/db')
const schema = new db.Schema(
    {
        color: {
            type: String,
            maxlength: 30,
            minlength: 1,
            trim: true
        },
        time: {
            type: String,
            required: true,
            maxlength: 30,
            minlength: 1,
            trim: true
        },
        directionFrom: {
            type: String,
            required: true,
            maxlength: 255,
            minlength: 2,
            trim: true
        },
        directionTo: {
            type: String,
            required: true,
            maxlength: 255,
            minlength: 2,
            trim: true
        },
        driverFrom: {
            type: String,
            maxlength: 20,
            minlength: 0,
            trim: true
        },
        driverTo: {
            type: String,
            maxlength: 20,
            minlength: 0,
            trim: true
        },
        money: {
            type: Number,
            require: true,
            maxlength: 20,
            minlength: 2,
            trim: true
        },
        comment: {
            type: String,
            maxlength: 512,
            minlength: 0,
            trim: true
        },
        created: {
            type: Date,
            default: Date.now()
        },
        date: {
            type: Date,
            maxlength: 10,
            trim: true
        }
    }
)
function createModel(name) {
    return db.model(name, schema)
}


module.exports = createModel;


