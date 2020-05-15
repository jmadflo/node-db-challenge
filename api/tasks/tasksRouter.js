const express = require('express')
const router = express.Router()

const Tasks = require('./tasksModel')

// gets all tasks
router.get('/', (req, res) => {
    Tasks.getTasks()
        .then(tasks => {
            res.status(201).json(tasks)
        })
        .catch(err => {
            res.status(500).json({ message: 'Tasks could not be retrieved.'})
        })
})

// posts a new task
router.post('/', (req, res) => {
    Tasks.addTask(req.body)
        .then(newtask => {
            res.status(201).json(newtask)
        })
        .catch(() => {
            res.status(500).json({ message: 'Task could not be added.'})
        })
})


module.exports = router