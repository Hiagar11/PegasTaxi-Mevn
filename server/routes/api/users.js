const express = require('express'),
    router = express.Router();
require('dotenv').config()
const jwt = require('jsonwebtoken')

const UserModel = require('../../models/userModel')

router
    .get('/', async (req, res) => {
        let users = await UserModel.find({})
        users = users.map(item => {
            item.password = '';
            return item
        });
        res.send(users).status(200);
    })
    .post('/', async ({body: user}, res) => {
        let existedLogin = await UserModel.findOne({login: user.login})
        let existedName = await UserModel.findOne({name: user.name})
        if (existedLogin === user.login) existedLogin = false
        if (existedName === user.name) existedName = false
        if (existedLogin || existedName) {
            res.send({msg: 'Пользователь уже существует', code: 403})
        } else {
            let newUser = new UserModel(user);
            let saving = await newUser.save();
            saving.password = ''
            res.send({msg: 'Пользователь успешно добавлен', code: 200, user: saving});
        }
    })
    .put('/', async ({body: user}, res) => {
        let updatedUser = await UserModel.findByIdAndUpdate(user._id, user, {new: true});
        updatedUser.password = '';
        res.send({msg: 'Пользователь успешно изменен', user: updatedUser})
    })
    .delete('/', async ({body}, res) => {
        let deletedUser = await UserModel.findByIdAndDelete(body.id)
        res.send({msg: 'Пользователь успешно удален'});
    })


module.exports = router