
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('Projects').insert([
        {id: 1, name: 'Create Portfolio Website', description: 'Make a website to display my projects.', completed: false},
        {id: 2, name: "Complete This Month's Build Week", description: 'Build the backend that is solicited.', completed: false}
      ]);
    });
};
