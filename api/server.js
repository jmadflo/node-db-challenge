const express = require('express')
const resourcesRouter = require('./resources/resourcesRouter')
const projectsRouter = require('./projects/projectsRouter')
const tasksRouter = require('./tasks/tasksRouter')

const server = express()
server.use(express.json())

server.use('/api/resources', resourcesRouter)
server.use('/api/projects', projectsRouter)
server.use('/api/tasks', tasksRouter)

module.exports = server