const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max: 20
    },
    email:{
        type: String,
        require: true,
        max: 50,
    },
    password:{
        type: String,
        require: true,
        min: 6
    },
    profilePicture:{
        type: String,
        default:""
    },
    coverProfile:{
        type: String,
        default:""
    },
    followers:{
        type: Array,
        default:[]
    },
    followings:{
        type: Array,
        default:[]
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    desc:{
        type: String,
        max: 50
    },
    city:{
        type: String,
        max: 50
    },
    from:{
        type: String,
        max: 50
    },
    relationship:{
        type: Number,
        enum: [1,2,3]
    }
},
{timestamps: true});


const usermodel = new mongoose.model("User", userSchema);
module.exports = usermodel;