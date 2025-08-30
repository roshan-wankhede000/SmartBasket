let profile = require('../model/profile')

let orders = require('../model/orders')

let profileHandler = async (req,res)=>{

    let {firstName,lastName,email,countryCode,phone,address,country,state,zip} = req.body

    await profile.create({
        firstName,lastName,email,countryCode,phone,address,country,state,zip
    })
    res.redirect("/getprofile")
}
let getProfileHandler=async(req,res)=>{
  
    
    let d = await profile.find({firstName:req.cookies.name})
    
    let o = await orders.find({
        email:req.cookies.name
    })
    
    res.render("profile",{d:d,o:o})
}

module.exports={
    profileHandler,getProfileHandler
}
