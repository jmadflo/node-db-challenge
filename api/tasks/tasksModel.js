const db = require('../../data/dbConfig')

module.exports = {
    getTasks,
    addTask,
    getTasksByProjectId,
    updateTask,
    getTaskById,
    removeTask,
    getContextsForTaskId
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

// updates task
function updateTask(updatedTask, id) {
    return db('tasks')
        .where({ id })
            .update(updatedTask)
                .then(() => {
                    return getTaskById(id)
                })
}

// removes task
function removeTask(id) {
    return db('tasks')
        .where({ id }).del()
}

// get contexts for a specific task
function getContextsForTaskId(task_id) {
    return db.select('contexts.id', 'contexts.name', 'contexts.currently_true') 
        .from('tasks_contexts')
        .join('contexts', 'tasks_contexts.context_id', 'contexts.id')
        .where({task_id})
}