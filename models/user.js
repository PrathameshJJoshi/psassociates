const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const user = db.define('user', {
  fname: {
    type: Sequelize.STRING
  },
  lname: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING,
    unique:true
  },
  password: {
    type: Sequelize.STRING
  },
  account_type: {
    type: Sequelize.ENUM('Admin','Agent','Accountant','Architect','Marketing-Executive','Office-Boy','Project-Manager','Site-Engineer','Site-Supervisor')
  },
});



user.sync().then(() => {
  console.log('table created');
});
module.exports = user;
