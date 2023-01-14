const jwt = require('jsonwebtoken')
require('dotenv').config()
const UserModel = require('../models/userModel')

const auth = async (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1]
    if (token) {
        const decodedToken = jwt.decode(token, process.env.SECRET_KEY_JWT)
        if( decodedToken ) {
            let user = await UserModel.findById(decodedToken.id);
            if (user) {
                next()
            } else {
                res.status(403).send({msg: 'not auth!'})
            }
        } else {
            res.status(403).send({msg: 'not auth!'})
        }

    } else {
        res.status(403).send({msg: 'not auth!'})
    }
}

module.exports = auth