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

// gets specific task
router.get('/:id', (req, res) => {
    Tasks.getTaskById(req.params.id)
        .then(task => {
            res.status(201).json(task)
        })
        .catch(() => {
            res.status(500).json({ message: 'Task could not be retrieved.'})
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

// updates task
router.put('/:id', (req, res) => {
    Tasks.getTaskById(req.params.id)
        .then(task => {
            if (task) {
                Tasks.updateTask(req.body, req.params.id)
                    .then(updatedTask => {
                        res.status(201).json(updatedTask)
                    })
                    .catch (() => {
                        res.status(500).json({ message: 'Failed to update task' })
                    })
            } else {
                res.status(500).json({ message: 'Failed to update task' })
            }
        })
        .catch (() => {
            res.status(404).json({ message: 'Could not find task with given id'  })
        })
})

// deletes task
router.delete('/:id', (req, res) => {
    Tasks.remove(req.params.id)
        .then(deleted => {
            if (deleted) {
                res.json({ message: 'Task was deleted' })
            } else {
                res.status(500).json({ message: 'Failed to delete task' })
            }
        })
        .catch(() => {
            res.status(404).json({ message: 'Could not find task with given id' })
        })
})


module.exports = router