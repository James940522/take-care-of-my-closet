"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        login_id: "leeyoungeun1",
        password: "1234567",
        nickname: "isnickname1",
        user_image: "aaaa.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login_id: "leeyoungeun2",
        password: "1234567",
        nickname: "isnickname2",
        user_image: "aaaa.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {})
  },
}
