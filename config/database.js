const Sequelize = require('sequelize');


const db="adhemant_psassociates";
const username="ps_admin";
const password="Qmk^n832TypbnEfl";
const host="localhost";
const port="3306";

module.exports =  new Sequelize(db,username,password, {
  host: host,
  port:port,
  dialect: 'mariadb',
  // operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});