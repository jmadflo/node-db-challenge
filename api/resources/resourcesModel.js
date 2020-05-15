const db = require('../../data/dbConfig')

module.exports = {
    getResources,
    addResource,
    getResourcesByProjectId,
}

// gets all resources
function getResources(){
    return db('resources')
}

// getsResource by id
function getResourceById(id){
    return db('resources')
        .where({id})
        .first()
}

// inserts a new resource record to resources table
function addResource(newResource){
    return db('resources')
        .insert(newResource, 'id')
        .then(id => {
            return getResourceById(id[0])
        })
}

// get resource by project id
function getResourcesByProjectId(project_id) {
    return db.select('resources.id', 'resources.name', 'resources.description') 
        .from('projects_resources')
        .join('resources', 'projects_resources.resource_id', 'resources.id')
        .where({project_id})
}