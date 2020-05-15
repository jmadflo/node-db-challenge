const db = require('../../data/dbConfig')

module.exports = {
    getResources,
    addResource
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