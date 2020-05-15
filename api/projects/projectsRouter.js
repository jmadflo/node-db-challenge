const express = require('express')
const router = express.Router()

const Projects = require('./projectsModel')

// gets all projects
router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch(err => {
            res.status(500).json({ message: 'projects could not be retrieved.'})
        })
})

// posts a new project
router.post('/', (req, res) => {
    Projects.addProject(req.body)
        .then(newproject => {
            res.status(201).json(newproject)
        })
        .catch(() => {
            res.status(500).json({ message: 'project could not be added.'})
        })
})


module.exports = router