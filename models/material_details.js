const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const material_details = db.define('tbl_material_details', {
  site_id: {
    type: Sequelize.INTEGER
  },
  material_type: {
    type: Sequelize.ENUM("Issued","Purchased")
  },
  material: {
    type: Sequelize.STRING
  },
  unit: {
    type: Sequelize.STRING
  },
  unit_rate: {
    type: Sequelize.DECIMAL
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  amount: {
    type: Sequelize.DECIMAL
  },
  material_from: {
    type: Sequelize.ENUM("Agency","Contractor","Vendor")
  },
  contact_person: {
    type: Sequelize.STRING
  },
  contact_number: {
    type: Sequelize.STRING
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


material_details.sync().then(() => {
  console.log('table created');
});
module.exports = material_details;
