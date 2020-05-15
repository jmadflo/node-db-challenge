
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, description: 'Select my best projects.', notes: 'Choose the ones that best showcase my skills.', completed: false, project_id: 1},
        {id: 2, description: 'Create a website that displays my projects.', notes: 'Styling is important here.', completed: false, project_id: 1},
        {id: 3, description: 'Read and understand what the project requires.', completed: false, project_id: 2},
        {id: 4, description: 'Build out the application backend', notes: 'Coordinate with the React 2 person to make sure they know how to use the endpoints.', completed: false, project_id: 2},
      ]);
    });
};
