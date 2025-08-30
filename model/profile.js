let mongoose = require("mongoose")



var schema = mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    email:{
        type:String,
    },
    countryCode:{
        type: Number,
    },
    phone:{
        type:Number,
    },
    address:{
        type: String,
    },
    country:{
        type: String,
    },
    state:{
        type:String,
    },
    zip:{
        type:String
    }

},{timestamps: true})

module.exports=mongoose.model("profile",schema)
