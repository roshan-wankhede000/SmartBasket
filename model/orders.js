let mongoose = require("mongoose")



var orders = mongoose.Schema({
    pname: {
        type: String  
    },
    price:{
        type:Number
    },
    quantity:{
        type: Number
    },
    totalPrice:{
        type:Number
    },
    email: {
        type: String,
    },
    status:{
        type:String,
        default:"pending"
    }
},{ timestamps: true })

module.exports=mongoose.model("order",orders)
