const sequelize = require("../database/connection")()
const Sequelize = require("sequelize");

const Records = sequelize.define(
  "records",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true
    },
    author: Sequelize.STRING(255),
    message: Sequelize.STRING(255),
    branch_ref: Sequelize.STRING(255),
    head_commit: Sequelize.STRING(255),
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