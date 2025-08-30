let mongoose = require("mongoose")


var schema = mongoose.Schema({
    pid:{
        type:String
    },
    name: {
        type: String
        
    },
    image:{
        type:String
    },

    finalprice:{
        type:Number
    },

    quantity:{
        type:Number
    },

    totalrice:{
        type:Number
    },
    
    email: {
        type: String,
       
    }
})

module.exports=mongoose.model("cart",schema)
