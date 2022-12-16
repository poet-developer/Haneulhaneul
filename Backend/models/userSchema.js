const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
     {
     name: {type: String, required: true, unique:true}, //꼭 필요할 때 입력 형식
     nick: {type: String, required: true, unique:true}, //중복방지
     hashedPassword : {type : String, default: true},
     sessions : [{
          created_at : {type : Date, required: true},
     }]
     // withYou : {type: Number, required: true}
     },
     { timestamps : true},
     // create_at : {type: Date, required: true},
     //_id : primary Key, unique
)

module.exports = mongoose.model("user", UserSchema)