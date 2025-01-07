const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm' // define the key for token in jwt,  or it is a secret
require("./db/config");
const User = require('./db/User')        // must use first letter is capital is file name or variable name is same
const Product = require('./db/Product');
const multer = require('multer');
const path = require('path');
const app = express();



app.use('/upload', express.static(path.join(__dirname, 'upload')));  // jb folder ma se image ko frontend ma access krna ho to yh must use krna ha 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './upload')         // nul error nhi ha or upload name ka folder create hoga
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);   // date.now kr k hum ne pehly klhud se unique file name create kya then file.originalname kr k user ki file k name k sath append kr dya usy
  }
})
const upload = multer({ storage });

app.use('*', cors());
app.use(express.json());
app.post('/register', async (req, resp) => {      // user sign up
  if (req.body.firstName && req.body.lastName && req.body.email && req.body.password) {       // condition  => must enter the email or password 
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      resp.status(400).send({ message: "User already exists. Please use a different Email.." });
    } else {
      const user = new User(req.body);
      if (user) {
        let result = await user.save();
        result = result.toObject();    // hidden the password toObject() is called to convert the mongoose 
        delete result.password; // deleet the password field
        Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => { // sign ak  callback func hota ha jwt ka jo k 2 , 3 parameter ko 
          if (err) {
            resp.status(403).send({ result: "Something went wrong please try again.." })
          }
          resp.send({ user: result, auth: token }); // user or token dono send kr dy ga 
        })
      } else {
        resp.send("Please must enter the name email or password")
      }
    }

  } else {
    resp.send(" Please you must enter the Email or password")
  }
});
app.get('/user/:_id', varifyToken, async (req, resp) => { // yh api data ko get kr k updation waly  previous data ko show karati ha 
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return resp.send({ result: "Invalid user Id" });
  } else {
    let result = await User.findOne({ _id });
    resp.send(result);
  }
})

app.post('/login', async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => { // sign ak  callback func hota ha jwt ka jo k 2 , 3 parameter ko 
        if (err) {
          resp.status(403).send({ result: "Something went wrong please try again.." })
        }
        resp.send({ user, auth: token });
      })

    } else {
      resp.send({ message: "User not found" })
    }
  } else {
    resp.send({ message: "Please you must enter the Email or Password.." })
  }


});



app.post("/add-product", varifyToken, async (req, resp) => { // product add api
  if (req.body.name && req.body.price && req.body.category && req.body.company) {

    const existCompany = await Product.findOne({ company: req.body.company });
    if (existCompany) {
      resp.status(400).send({ message: "Company already exists. This company cannot be registered again." });
    } else {
      let product = new Product(req.body);
      if (product) {
        let result = await product.save();
        resp.send(result);
      } else {
        resp.send("Please must enter the name , price , category , company")
      }
    }
  } else {
    resp.send("Please must enter the name , price , category , company");
  }
})

app.put('/profile/:userId', varifyToken, upload.single("imgURL"), async (req, resp) => {  // create a profile ....
  const { userId } = req.params;
  const { firstName, lastName, email, CNIC, Gender, dateOfBirth, contactNo } = req.body;
  const imgURL = req.file ? `/upload/${req.file.filename}` : null
  if (req.body.firstName && req.body.lastName && req.body.CNIC && req.body.Gender && req.body.dateOfBirth && req.body.contactNo && req.file) {
    

    const existCNIC = await User.findOne({ CNIC: req.body.CNIC });
    if (existCNIC) {
      resp.status(400).send({ message: "Your CNIC is already registered.." });
    } else {
      const updatedProfile = await User.findByIdAndUpdate(
        userId,
        {
          firstName, lastName, CNIC, email , Gender, dateOfBirth, contactNo, imgURL,
        },
        { new: true }
      );
      if (updatedProfile) {
         resp.send(updatedProfile);
      } else {
        resp.send({ message: "Something went Wrong Please try again" });
      }
    }

  } else {
    resp.send({ message: "Please you must enter the all Fields" });
  }
})
app.get('/userProfie/:userId', varifyToken,  async(req, resp)=>{
  const { userId } = req.params;
  const profile =await User.findOne({ _id: userId});
  if(!profile){
    return resp.status(404).send({ message: "Profile not found for this user." }); 
  } else {
    resp.send(profile);
  }
})

app.get("/products", varifyToken, async (req, resp) => {       // list of all products
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Products Found.." })
  }
})

app.delete('/products/:id', varifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  if (result.deletedCount > 0) {
    resp.send(result);
  } else {
    resp.send({ message: "Product is already not found" });
  }
})

app.get('/products/:_id', varifyToken, async (req, resp) => { // yh api data ko get kr k updation waly  previous data ko show karati ha 
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return resp.send({ result: "Invalid Product ID" });
  } else {
    let result = await Product.findOne({ _id });
    resp.send(result);
  }
})

app.put('/products/:id', varifyToken, async (req, resp) => {  // update product
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  )
  resp.send(result)
})

app.get('/search/:key', varifyToken, async (req, resp) => { // search api
  let result = await Product.find({
    "$or": [                         // jb b hum mutiple field ma se data search krty hain to $or use krty hain
      { name: { $regex: req.params.key, $options: 'i' } },
      { price: { $regex: req.params.key, $options: 'i' } },
      { category: { $regex: req.params.key, $options: 'i' } },// i option allow you to search in mongodb
      { company: { $regex: req.params.key, $options: 'i' } } // if i dont use optiion i then i search full name 
    ]
  })
  resp.send(result);
})


function varifyToken(req, resp, next) {        // using middleware  : i use middleware because ma har api ma condition lgana chahta hn k token ko varify kro
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(' ')[1];
    console.log("middleware called  ", token);
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        resp.send({ result: "Please provide valid token.." });
      } else {
        next();
      }
    })
  } else {
    resp.send({ result: "Please add token with headers" });
  }
}







app.listen(500, () => {
  console.log("Server is runnig....")
})


