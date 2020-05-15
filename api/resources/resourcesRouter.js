const express = require('express')
const router = express.Router()

const Resources = require('./resourcesModel')

// gets all resources
router.get('/', (req, res) => {
    Resources.getResources()
        .then(resources => {
            res.status(201).json(resources)
        })
        .catch(err => {
            res.status(500).json({ message: 'Resources could not be retrieved.'})
        })
})

// posts a new resource
router.post('/', (req, res) => {
    Resources.addResource(req.body)
        .then(newResource => {
            res.status(201).json(newResource)
        })
        .catch(() => {
            res.status(500).json({ message: 'Resource could not be added.'})
        })
})


module.exports = router