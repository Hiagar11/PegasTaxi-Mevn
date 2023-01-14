const express = require('express'),
    router = express.Router()

const UserModel = require('../../models/userModel')

router.post('/',async ({body: {login, password} }  , res) => {
    let user = await UserModel.findOne({login, password});
    if (user) {
        res.send(user);
    } else {
        res.send(false);
    }

})
router.get('/:id',async ({params: {id}}, res) => {
    let user = await UserModel.findById(id);
    if (user) {
        res.send(user);
    } else {
        res.send(false);
    }
})
router.put('/',(req, res) => {

})
router.delete('/',(req, res) => {

})


module.exports = router