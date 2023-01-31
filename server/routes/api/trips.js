const express = require('express'),
    router = express.Router();
const mongoose = require('mongoose')
const authChecking = require('../../middlewares/auth')


router.get('/', authChecking, async (req, res) => {
    try {
        let TripModel = connectModel(req.query.date);
        let ColorModel = require('../../models/colorsTripsModel');

        let trips =await TripModel.find({}).exec();
        let colors = await ColorModel.find({}).exec();
        colors = colors.map(item => {return item.color})

        let statsTripsMoney = sortTrips(trips, colors)
        trips = trips.map(item => {return item.money})
        res.send({
            totalTrips: trips.length,
            statsTripsMoney,
            totalMoney: trips.reduce((acc, num) => {return acc+num})
        })
    } catch (e) {
        res.send([]);
    }
})


router.get('/:date', authChecking, async ({params: date}, res) => {
    let TripModel = connectModel(date.date);

    let content = await TripModel.find(date).sort({time: 'asc'})
    res.send(content)
})

router.post('/', async ({body}, res) => {
    let TripModel = connectModel(body.date);
    let newTrip = new TripModel(body);
    newTrip.save()
    res.send(newTrip)
})
router.put('/', async ({body}, res) => {
    let TripModel = connectModel(body.date);

    let trip = await TripModel.findByIdAndUpdate(body.id, body, {new: true});
    res.send(trip)
})
router.delete('/', async ({body}, res) => {
    let TripModel = connectModel(body.date);

    await TripModel.findByIdAndDelete(body.id);
    res.send('ok')
})


function createNameTrips(date) {
    let month = date.match(/(.+)-(.+)-(.+)/i)[2];
    let year = date.match(/(.+)-(.+)-(.+)/i)[1];
    let maxYear = new Date().getFullYear() + 1;
    if (+year < 2023 || +year > maxYear) {
        throw new Error('Not extending')
    }
    return `trips_${year}_${month}`
}

function connectModel(date) {
    const name = createNameTrips(date)
    return require('../../models/tripModel')(name);
}

function sumTrips(arr) {
    if (arr.length === 0) {
        return 0
    }
    return arr.reduce((acc, number) => {return acc + number})
}

function sortTrips(arrTrips, arrColors) {
    let result = {};
    arrColors.forEach(color => {
        let arr = arrTrips.filter(item => item.color === color)
        arr = arr.map(item => {return item.money})
        result[color] = {money: sumTrips(arr), length: arr.length, color}
    })
    return result;
}


module.exports = router