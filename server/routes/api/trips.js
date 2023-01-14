const express = require('express'),
    router = express.Router();
const mongoose = require('mongoose')

const authChecking = require('../../middlewares/auth')

router.get('/:date', authChecking, async ({ params: date}, res) => {
    let TripModel = connectModel(date.date);

    let content = await TripModel.find(date).sort({time: 'asc'})
    res.send(content)
})
router.get('/', authChecking, async (req, res) => {
    let TripModel = connectModel(req.query.date);
    let trips =await TripModel.find({});
    res.send({
        total: trips.length,
        moneyFrom: trips.map()

    })
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
    return `trips_${year}_${month}`
}

function connectModel(date) {
    const name = createNameTrips(date)
    try {
        return require('../../models/tripModel')(name);
    } catch (e) {
        return mongoose.model(name)
    }
}


module.exports = router