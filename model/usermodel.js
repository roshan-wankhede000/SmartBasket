let mongoose = require("mongoose")



var schema = mongoose.Schema({
    username: {
        type: String
        
    },
    email: {
        type: String,
       
    },
    password: {
        type: String,
       
    }
})


module.exports=mongoose.model("user",schema)