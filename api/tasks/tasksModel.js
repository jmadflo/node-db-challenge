const db = require('../../data/dbConfig')

module.exports = {
    getTasks,
    addTask,
    getTasksByProjectId
}

// gets all tasks and show project name and product description
function getTasks(){
    return db.select('projects.name as project_name', 'projects.description as project_description', 'tasks.description as tasks_description', 'tasks.notes', 'tasks.completed')
        .from('tasks')
        .join('projects', 'tasks.project_id', 'projects.id')
}

// gets task by id
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

// gets tasks for a specific project
function getTasksByProjectId(project_id) {
    return db('tasks')
        .where({ project_id })
}
