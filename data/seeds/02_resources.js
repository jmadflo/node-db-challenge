
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, name: 'MacBook', description: 'My trusty laptop.'},
        {id: 2, name: 'Slack', description: 'Tool to stay in contact with my cohort.'},
        {id: 3, name: 'Heroku', description: 'Tool that lets me deploy my server'},
        {id: 4, name: 'Teammates', description: 'The other people on my team.'}
      ]);
    });
};
