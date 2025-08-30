let express = require("express");
let multer = require("multer")
let {searchProduct,home,loginData,registerData,addData,checkLogin,logout,admin}=require("../controller/controller.js")
let {addproduct,getproduct,productdetail} = require("../controller/productcontroller.js")
let {addtocart,carts,increase,decrease,deletecart} = require("../controller/cartcontroller.js")
let {checkout} = require("../controller/checkoutController.js")
let {checkout1,invoiceHandler} = require("../controller/ordercontroller.js")
let {profileHandler,getProfileHandler} = require('../controller/profile.js')

let router=express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
             
  const upload = multer({ storage: storage })
// let multer = require("multer")art,carts,increase,decrease,deletecart}
// var upload = multer({ dest: 'upload/'});
router.get('/search',searchProduct);
router.get("/",home);
router.get("/login",loginData);
router.get("/register",registerData);
// router.get("/:id",getDataById);
router.post("/add",addData)
router.post("/checklogin",checkLogin)
router.get("/logout",logout)
router.get("/admin",admin)
router.post("/addproduct",upload.single("image"), addproduct);
router.get("/getproduct",getproduct)
router.get("/productdetail/:id",productdetail)
router.get("/addcart/:id",addtocart) 
router.get("/cart",carts)
router.get("/increase/:id",increase)
router.get("/decrease/:id",decrease)
router.get("/deletecart/:id",deletecart)
router.get("/checkout",checkout)
router.get("/placeOrder",checkout1)
router.get("/getprofile",getProfileHandler)
router.post("/profile",profileHandler)
router.get("/invoice",invoiceHandler)
// router.post()
module.exports=router