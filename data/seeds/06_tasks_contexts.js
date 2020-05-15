
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks_contexts').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks_contexts').insert([
        {task_id: 1, context_id: 2},
        {task_id: 2, context_id: 2},
        {task_id: 3, context_id: 2},
        {task_id: 4, context_id: 2},
        {task_id: 3, context_id: 4},
        {task_id: 2, context_id: 1},
        {task_id: 4, context_id: 3}
      ]);
    });
};
