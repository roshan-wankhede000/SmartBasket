let mongoose = require("mongoose")



var productschema = mongoose.Schema({
    name: {
        type: String
        
    },
    price: {
        type: Number,
       
    },
    quantity: {
        type: Number,
       
    },
    discount:{
        type:Number,
    },
    category:{
        type:String,
    },
    finalprice:{
        type:Number,
    },
    image:{
        type:String,
    },
    description:{
        type:String,
    },
    

},{ timestamps: true })


module.exports=mongoose.model("product",productschema)