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
    console.log(req.params.id)
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

// updates project
router.put('/:id', (req, res) => {
    Projects.getProjectById(req.params.id)
        .then(project => {
            if (project) {
                console.log(project)
                Projects.updateProject(req.body, req.params.id)
                    .then(updatedProject => {
                        console.log(updatedProject)
                        res.status(201).json(updatedProject)
                    })
                    .catch (() => {
                        res.status(500).json({ message: 'Failed to update project' })
                    })
            } else {
                res.status(500).json({ message: 'Failed to update project' })
            }
        })
        .catch (() => {
            res.status(404).json({ message: 'Could not find project with given id'  })
        })
})

// deletes project
router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(deleted => {
            if (deleted) {
                res.json({ message: 'Project was deleted' })
            } else {
                res.status(500).json({ message: 'Failed to delete project' })
            }
        })
        .catch(() => {
            res.status(404).json({ message: 'Could not find project with given id' })
        })
})


module.exports = router