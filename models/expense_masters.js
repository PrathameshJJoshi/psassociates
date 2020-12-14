const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const expense_masters = db.define('tbl_expense_masters', {

  site_id: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.ENUM("Advance","Expense")
  },
  amount: {
    type: Sequelize.DECIMAL
  },
  remarks: {
    type: Sequelize.TEXT
  },
  date: {
    type: Sequelize.DATE
  },
  created_by: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updated_by: {
    type: Sequelize.INTEGER
  },
  updatedAt: {
    type: Sequelize.JSON
  },
});

// user.pre('save',function(next){
//   const use = this; 
//   if(!use.isModified('password')){
//       return next()
//   }
//   const hash=base.encode(use.password)
//        use.password = hash;
//        next()
//    });


expense_masters.sync().then(() => {
  console.log('table created');
});
module.exports = expense_masters;
