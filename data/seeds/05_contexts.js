
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contexts').del()
    .then(function () {
      // Inserts seed entries
      return knex('contexts').insert([
        {id: 1, name: 'In the mood to code frontend', currently_true: false},
        {id: 2, name: 'At Home', currently_true: true},
        {id: 3, name: 'Feel in the mood to code backend', currently_true: true},
        {id: 4, name: 'Feel like reading', currently_true: true},
      ]);
    });
};
