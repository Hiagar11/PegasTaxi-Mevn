const express = require('express'),
    router = express.Router();
require('dotenv').config()
const jwt = require('jsonwebtoken')

const UserModel = require('../../models/userModel')

router
    .get( '/', async (req, res) => {
        let users = await UserModel.find({}).exec()
        users = users.map(item => item.name)
        res.send(users).status(200)
    })
    .get ('/:name', async (req, res) => {
        let user = await UserModel.findOne({name: req.params.name}).exec();
        user.password = ''
        res.json(user).status(200)
    })
    .post('/', async({body: user}, res) => {
        let existedUser = await UserModel.findOne({name: user.name, login: user.login})
        if (existedUser) {
            res.send({msg:'exist yet'})
        }
    })



module.exports = router