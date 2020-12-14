const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const site_masters = db.define('tbl_site_masters', {

  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  contact_person: {
    type: Sequelize.STRING
  },
  contact_number: {
    type: Sequelize.STRING
  },
  status: {
    type:   Sequelize.ENUM,
    values: ['InProcess','Inactive','Completed']
  },
  // status: {
  //   type: Sequelize.ENUM({values:['InProcess','Inactive','Completed']})
  // },
  created_by: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.DATE
  },
  modified_by: {
    type: Sequelize.INTEGER
  },
  modifiedAt: {
    type: Sequelize.DATE
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


site_masters.sync().then(() => {
  console.log('table created');
});
module.exports = site_masters;
