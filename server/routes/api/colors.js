const express = require('express'),
    router = express.Router()

const ColorModel = require("../../models/colorsTripsModel");


router.get('/',async (req, res) => {
    //Пагинация, поиск или фильтрация, тогда queryParam
    let content = await ColorModel.find({})
    res.send(content)
})


router.post('/',async ({body}, res) => {
    let color = new ColorModel(body);
    let newColor = await color.save()
    res.send(newColor)
})

module.exports = router