const express = require('express')
const router = express.Router()

const Projects = require('./projectsModel')
const Resources = require('../resources/resourcesModel')
const Tasks = require('../tasks/tasksModel')

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

// get project by id including its associated resources and tasks

router.get('/:id', (req, res) => {
    // get project
    Projects.getProjectById(req.params.id)
        .then(project => {
            console.log(project)
            // get the list of resources by project id
            Resources.getResourcesByProjectId(req.params.id)
                .then(resources => {
                    console.log(resources)
                    // get the list of tasks for this project by project id
                    Tasks.getTasksByProjectId(req.params.id)
                        .then(tasks => {
                            res.status(201).json({ ...project, tasks: tasks, resources: resources })
                        })
                        .catch(() => {
                            res.status(500).json({ message: `The tasks for project with an id of ${req.params.id} could not be retrieved` })
                        })
                })
                .catch(() => {
                    res.status(500).json({ message: `The resources for project with an id of ${req.params.id} could not be retrieved` })
                })
        })
        .catch(() => {
            res.status(500).json({ message: `The project with an id of ${req.params.id} could not be retrieved` })
        })
    })


module.exports = router