const express = require('express');
const bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const app = express();
const user = require('./models/user');
const material_details = require('./models/material_details')
const site_details = require('./models/site_details')
const site_masters = require('./models/site_masters')
const expense_masters = require('./models/expense_masters')
const employee_masters = require('./models/employee_masters')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('./config/keys')
var http = require('http');
const requireToken = require('./middleware/requireToken')

// Database
const db = require('./config/database');
app.use(bodyParser.json())
// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))
 


// Index route
app.get('/',requireToken,(req,res)=>{
  res.send({fname:req.us.fname,account_type:req.us.account_type,id:req.us.id,username:req.us.username})
})


// app.get('/allsites',async (req,res)=>{
//     // const {cname} = req.body
//     // if(!use){
//     //   return res.status(422).send({error :"must provide username or password2"})
//     // }
//     try{
//       const use = await site_masters.findAll()
//       res.send(use)
//       console.log(use)
//     }catch(err){
//         return res.send(err)
//     }
// })


app.get('/allsites', (req, res) => 
  site_masters.findAll()
    .then(user => res.send(user))
    .catch(err => console.log(err)));

app.post('/signup',async (req, res) => {
        let { fname,lname,email,phone,username,password } = req.body;
        try{
            const hash = await bcrypt.hash(password, 10);
              // bcrypt.genSalt(10, function(err, salt) {
              //   bcrypt.hash(password, salt, async(err, hash)=> {
                    // Store hash in your password DB.
                    const use = new user({fname,lname,email,phone,username,password:hash});
                await  use.save();
                const token = jwt.sign({userId:use.id},jwtkey)
                res.send({token})
            //     });
            // });
          
    
        }catch(err){
          return res.status(422).send(err.message)
        }
});

app.post('/signin',async (req,res)=>{
  const {username,password} = req.body
  if(!username || !password){
      return res.status(422).send({error :"must provide username or password"})
  }
  const use = await user.findOne({ where: { username } })
  // res.send(use)
  if(!use){
      return res.status(422).send({error :"must provide username or password2"})
  }
  try{
    console.log(use.hash)
    // await user.comparePassword(password);
    const validPass = await bcrypt.compare(password, use.password);
            if(validPass) {
                const token = jwt.sign({userId:use.id},jwtkey)
                res.send({token})
              // res.status(200).json('Valid Email and pass!');
            } else {
                res.status(400).json('Wrong password!');
            }    
    
  }catch(err){
      return res.status(422).send({error :"must provide username or password3"})
  }
})


app.post('/employee', async (req, res) => {
  let { employee_code, employee_firstname, employee_lastname, birth_date, mobile, email } = req.body;
  try{
    const con = new employee_masters({ employee_code, employee_firstname, employee_lastname, birth_date, mobile, email });
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
});


app.post('/expense', async (req, res) => {
  let { site_id , type, amount, remarks, date, created_by} = req.body;
  try{
    const con = new expense_masters({ site_id , type, amount, remarks, date, created_by});
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
}); 


app.post('/material', async (req, res) => {
  let { site_id , material_type, material, omaterial, unit, unit_rate, quantity, amount, material_from, location, contact_person, contact_number, remarks, status, created_by} = req.body;
  
    const con = new material_details({ site_id , material_type, material, omaterial, unit, unit_rate, quantity, amount, material_from, location, contact_person, contact_number, remarks, status, created_by});
    await  con.save()
    .then((data)=>{
      res.send(data)
    })
    .catch(err=>{
      console.log(err)
  })
}); 


app.post('/sitedetail', async (req, res) => {
  let { site_id , flat_number	, party_name, party_contact_number, employee, token_recieved, final_status, amount_recieved, sale_deed, site_visit_date, remarks, status, created_by} = req.body;
  try{
    const con = new site_details({ site_id , flat_number	, party_name, party_contact_number, employee, token_recieved, final_status, amount_recieved, sale_deed, site_visit_date, remarks, status, created_by});
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
}); 


app.post('/sitemaster', async (req, res) => {
  let { name , address	, contact_person, contact_number, status } = req.body;
  try{
    const con = new site_masters({ name , address	, contact_person, contact_number, status });
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
}); 


// app.post('/searc',async (req,res)=>{
//     const {category} = req.body
//     // const use=[];
//     console.log(category)
//     // if(!use){
//       //   return res.status(422).send({error :"must provide username or password2"})
//       // }
//       try{
//         const use = await client.findAll({ where: { category } })
//         // use.push(one)
//         res.send(use)
//         console.log(use)
//         // return use
//       }catch(err){
//         return res.status(422).send({error :"Error"})
//     }
//     // res.send(use)
//   })

// const port = process.env.PORT;

app.listen(process.env.PORT || 3000, console.log(`Server started on port ${process.env.PORT || 3000}`));