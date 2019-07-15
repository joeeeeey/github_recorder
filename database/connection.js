const Sequelize = require("sequelize");

const config = require("../config/config");

const mysqlConfig = config.mysql.client;

let Connection;
( () => {
  let instance;
  Connection = function Connection() {
    if (instance) {
      console.log("HAS BEEN CREATED!");
      return instance;
    }
    instance = new Sequelize(
      mysqlConfig.database,
      mysqlConfig.user,
      mysqlConfig.password,
      {
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          idle: 30000
        }
      }
    );
    return instance;
  };
})();

module.exports = Connection;