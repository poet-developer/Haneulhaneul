const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
     {
     username: {type: String, required: true}, //꼭 필요할 때 입력 형식
     nickname: {type: String, default: true, unique: true}, //중복방지
     hashedPassword : {type : String, default: true},
     // author : {type: String, required: true},
     // withYou : {type: Number, required: true}
     },
     { timestamps : true},
     // create_at : {type: Date, required: true},
     //_id : primary Key, unique
)

module.exports = mongoose.model("user", UserSchema)