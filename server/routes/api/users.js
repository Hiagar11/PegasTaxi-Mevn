const express = require('express'),
    router = express.Router();
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserModel = require('../../models/userModel')
const TokenModel = require('../../models/tokenModel')

router.route('/')
    .post(async ({body: {login, password}}, res) => {
        const user = await UserModel.findOne({login, password})
        if (user) {
            const id = user._id.toString()
            const token = jwt.sign({id}, process.env.SECRET_KEY_JWT);
            let saveToken = new TokenModel({token, userId: id});
            await saveToken.save();
            res.status(200).send(
                {
                    token,
                    user: {
                        name: user.name
                    }
                }
            )
        } else {
            res.status(403).send({msg: 'Not Found'})
        }
    })
    .put((req, res) => {
        res.send('put')

    })
    .delete((req, res) => {
        res.send('delete')
    })


module.exports = router