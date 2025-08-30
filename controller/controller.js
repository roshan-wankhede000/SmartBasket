let User = require("../model/usermodel.js")
let product = require("../model/productmodel.js")
const bcrypt = require('bcrypt');
let express = require("express")


let searchProduct = async (req, res) => {
  let query = req.query.q;
  let user = req.cookies.name;
  let products = [];

  if (query) {
    // Search by name (case insensitive)
    products = await product.find({
      name: { $regex: query, $options: 'i' }
    });
  }
  res.render("search", { product1: products, searchQuery: query });
};

const saltRounds = 10;

async function hashPassword(plainPassword) {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}
let home = async(req,res)=>{
    let data=req.query.data
    let user=req.cookies.name

    let product1 = await product.find({category:'electronic'})
    let grocery = await product.find({category:'grocery'})
    let machine = await product.find({category:'machine'})
    let others = await product.find({category:'others'})
    
    res.render("home",{product1:product1,grocery:grocery,machine:machine,others:others});
}
let loginData = async(req,res)=>{
    let data=req.query.data
    res.render("login");
}

let registerData = async(req,res)=>{
    res.render("register");
}

let addData = async(req,res)=>{
  await  User.create({
        username:req.body.username,
        email:req.body.email,
        password:await hashPassword(req.body.password)
    })

    res.redirect("login")
}


let checkLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = await User.findOne({ email });

  if (!user) {
    res.cookie("msg", "Invalid username or password!!");
    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.cookie("msg", "Invalid username or password!!");
    return res.redirect("/login");
  }
  res.cookie("name", user.username, {
    httpOnly: true,
    sameSite: "Strict",
    secure: false, 
  });

  res.cookie("email", user.email, {
    httpOnly: true,
    sameSite: "Strict",
    secure: false,
  });

  res.cookie("msg", "Login successfully!!");

  if (email === "admin@gmail.com" && password === "12345") {
    return res.redirect("/admin");
  } else {
    return res.redirect("/");
  }
};

let logout = async(req,res)=>{
    res.clearCookie('name');
    res.cookie("msg","logout successfully!!")
    res.redirect("login")
}

let admin=async(req,res)=>{
  res.render("admin")
}

module.exports = {searchProduct,home,loginData,registerData,addData,checkLogin,logout,admin}