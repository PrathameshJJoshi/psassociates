const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const project_details = db.define('tbl_project_details', {

  site_id: {
    type: Sequelize.INTEGER
  },
  premise_type: {
    type: Sequelize.ENUM("Flat","Shop")
  },
  number: {
    type: Sequelize.STRING
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
    type: Sequelize.DATE 
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


project_details.sync().then(() => {
  console.log('table created');
});
module.exports = project_details;
