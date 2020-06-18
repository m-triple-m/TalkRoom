const Model = require('../models/userModel')
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

router.get('/getbyusername/:username', (req, res) => {
    Model.findOne({username : req.params.username})
    .then(data => {
        console.log('user data fetched');
        res.status(200).json(data);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
})

module.exports = router;