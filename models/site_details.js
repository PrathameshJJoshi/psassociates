const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const site_details = db.define('tbl_site_details', {
  site_id: {
    type: Sequelize.INTEGER
  },
  flat_number: {
    type: Sequelize.INTEGER
  },
  party_name: {
    type: Sequelize.STRING
  },
  party_contact_number: {
    type: Sequelize.STRING
  },
  employee: {
    type: Sequelize.ENUM("Agent","Office")
  },
  token_recieved: {
    type: Sequelize.ENUM("Pending","Recieved","Cancelled")
  },
  final_status: {
    type: Sequelize.ENUM("Available","Booked","Blocked","InProcess")
  },
  amount_recieved: {
    type: Sequelize.DECIMAL
  },
  sale_deed: {
    type: Sequelize.ENUM("Yes","No")
  },
  site_visit_date: {
    type: Sequelize.DATE
  },
  remarks: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM("Pending","Approved","Completed","Cancelled")
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


site_details.sync().then(() => {
  console.log('table created');
});
module.exports = site_details;
