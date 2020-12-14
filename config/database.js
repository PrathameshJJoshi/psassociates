const Sequelize = require('sequelize');


module.exports =  new Sequelize('sql12381979','sql12381979','SL3jsUJGN3', {
  host: 'sql12.freemysqlhosting.net',
  // port:3306,
  dialect: 'mariadb',
  // operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});