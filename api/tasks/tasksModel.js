const db = require('../../data/dbConfig')

module.exports = {
    getTasks,
    addTask
}

// gets all tasks
function getTasks(){
    return db('tasks')
}

// getstask by id
function getTaskById(id){
    return db('tasks')
        .where({id})
        .first()
}

// inserts a new task record to tasks table
function addTask(newTask){
    return db('tasks')
        .insert(newTask, 'id')
        .then(id => {
            return getTaskById(id[0])
        })
}