const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Garegin', email: 'Garegin321@mail.ru', password: await bcrypt.hash('123', Number(process.env.SALTROUNDS)), createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Alexander', email: 'alex3212@mail.ru', password: await bcrypt.hash('222', Number(process.env.SALTROUNDS)), createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Evgeniy', email: 'jackiesav@mail.ru', password: await bcrypt.hash('333', Number(process.env.SALTROUNDS)), createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Albert', email: 'trezeguet17@mail.ru', password: await bcrypt.hash('777', Number(process.env.SALTROUNDS)), createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('Posts', [
      {
        title: 'Маршрут по набережной',
        start: 'орджоникидзе',
        finish: 'орджоникидзе',
        location: 'Эльбрус',
        lengthRoad: '2 км',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Маршрут по Буткемпу',
        start: '1 этаж',
        finish: '2 этаж',
        location: 'Эльбрус',
        lengthRoad: '0.2 км',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Маршрут домой',
        start: 'буткемп',
        finish: 'кровать',
        location: 'Эльбрус',
        lengthRoad: '15 км',
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('Comments', [
      {
        comment: 'хороший маршрут, лайк', post_id: 3, user_id: 2, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        comment: 'ну неплохо', post_id: 1, user_id: 3, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        comment: 'фигня полная =)', post_id: 3, user_id: 1, createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('Rates', [
      {
        grade: 3, post_id: 3, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        grade: 2, post_id: 3, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        grade: 5, post_id: 3, createdAt: new Date(), updatedAt: new Date(),
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Rates', null, {});
  },
};
