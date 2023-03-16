const express = require('express'),
    router = express.Router()

const DirectionModel = require("../../models/directionsModel");
const UserModel = require("../../models/userModel")


router.get('/',async (req, res) => {
    const content = await DirectionModel.find({})
    res.send(content)
})


router.post('/',async ({body}, res) => {
        const direction =new DirectionModel(body);
        const saveDirection =await direction.save();
        body.drivers.map(async (_id) => {
            await UserModel.findByIdAndUpdate(_id, {geo: saveDirection._id})
        })

        res.send(saveDirection);
})
router.put('/',async ({body}, res) => {
    try {
        const updatedDirection = await DirectionModel.findByIdAndUpdate(body._id, body, {new: true});
        await UserModel.updateMany({geo: body._id}, {geo: ''}, {upsert: false});
        body.drivers.map(async (_id) => {
            await UserModel.findByIdAndUpdate(_id, {geo: body._id})
        })
        res.send(updatedDirection);
    } catch(e) {
        res.send(false)
    }

})

router.delete('/:id',async (req, res) => {
    try {
        const response = await DirectionModel.findByIdAndDelete(req.params.id);
        await UserModel.updateMany({geo: req.params.id}, {geo: ''}, {upsert: false})
        if (response) {
            res.send(true)
        }
    } catch(e) {
        res.send(false)
    }

})

module.exports = router