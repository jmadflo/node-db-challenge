const db = require('../../data/dbConfig')

module.exports = {
    getProjects,
    addProject,
    getProjectById
}

// gets all projects
function getProjects(){
    return db('projects')
}

// getsproject by id
function getProjectById(id){
    return db('projects')
        .where({id})
        .first()
}

// inserts a new project record to projects table
function addProject(newProject){
    return db('projects')
        .insert(newProject, 'id')
        .then(id => {
            return getProjectById(id[0])
        })
}