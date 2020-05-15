
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', projects => {
            projects.increments()
            projects.text('name')
                .notNullable()
            projects.text('description')
            projects.boolean('completed')
                .defaultTo('false')
        })
        .createTable('resources', resources => {
            resources.increments()
            resources.text('name')
                .unique()
                .notNullable()
            resources.text('description')
        })
        // projects and resources have a many to many relationship, so we need an intermediary
        .createTable('projects_resources', intermediary => {
            intermediary.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            intermediary.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            intermediary.primary(['project_id', 'resource_id'])
        })
        // There are many tasks for one project, by each task belongs to one project
        .createTable('tasks', tasks => {
            tasks.increments()
            tasks.text('description')
                .notNullable()
            tasks.text('notes')
            tasks.boolean('completed')
                .defaultTo('false')
            tasks.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE') // If I went to production I would probaby use RESTRICT instead of CASCADE to prevent a task from a project possibly getting its reference to its project lost.
        })
        .createTable('contexts', contexts => {
            contexts.increments()
            contexts.text('name')
                .notNullable()
            contexts.boolean('currently_true')
                .defaultTo('false')
        })
        // tasks and contexts have a many to many relationship, so we need an intermediary
        .createTable('tasks_contexts', intermediary => {
            intermediary.integer('task_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('tasks')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            intermediary.integer('context_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('contexts')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            intermediary.primary(['task_id', 'context_id'])
        })
}

exports.down = function(knex) {
    return knex.schema 
        .dropTableIfExists('tasks_contexts')
        .dropTableIfExists('contexts')
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects_resources')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
}
