const Model = require('../models/roomModel')
const router = require('express').Router();

router.post('/add', (req, res) => {
    let model = new Model(req.body);
    model.save()
    .then(data => {
        console.log('user data saved');
        res.status(200).json({message : 'success'});
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
})

router.put('/update/:id', (req, res) => {
    id = req.params.id;
    Model.findByIdAndUpdate(id, req.body)
    .then(data => {
        console.log('user data saved');
        res.status(200).json({message : 'success'});
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
})

router.get('/getbyadmin/:id', (req, res) => {

    Model.find({admin : req.params.id})
    .populate('members')
    .then(data => {

        res.status(200).json(data);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
})

router.get('/getbymember/:mem_id', (req, res) => {
    Model.find({"members" : {"$in" : [req.params.mem_id]}})
    .populate('members')
    .then(data => {

        res.status(200).json(data);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
})


module.exports = router;