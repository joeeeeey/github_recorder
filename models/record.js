const sequelize = require("../database/connection")()
// const sequelize = Connection()
const Sequelize = require("sequelize");

const Records = sequelize.define(
  "records",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true
    },
    author: Sequelize.STRING(255),
    project_name: Sequelize.STRING(255),
    data: Sequelize.TEXT,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
  },
  {
    timestamps: false
  }
);

module.exports = Records;