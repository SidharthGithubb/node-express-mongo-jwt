const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    },
    email: {
        type: String,
        required: [true, "Please add the email id"],
        unique: [true, "Email id is already taken"]
    }
},
    {
        timestamps: true 
    }
)

module.exports=mongoose.model("User",userSchema)