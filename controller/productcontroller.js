let product = require("../model/productmodel.js")

let addproduct = async(req,res)=>{
    
    let {name,price,quantity,discount,category,finalprice,description}=req.body;
    let image = req.file.originalname
   await  product.create({
        name,price,quantity,discount,category,finalprice,image,description
    })
    res.redirect("/")
}

let getproduct = async(req,res)=>{
    let product1 = await product.find()    
}

let productdetail = async(req,res)=>{
    let id = req.params.id
    let p = await product.findById(id)
    let related = await product.find({category:p.category})
    let email = await req.cookies.name
    return res.render("detail",{p:p,related:related,email:email})
}
module.exports = {addproduct,getproduct,productdetail}