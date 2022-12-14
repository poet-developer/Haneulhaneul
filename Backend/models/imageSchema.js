const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
     {
     key: {type: String, required: true}, //꼭 필요할 때 입력 형식
     author : {type: String, required: true},
     // withYou : {type: Number, required: true}
     public : {type: Boolean, default: false},
     },
     { timestamps : true},
     // create_at : {type: Date, required: true},
     //_id : primary Key, unique
)

module.exports = mongoose.model("image", ImageSchema)
// Declare Customized Schema Model