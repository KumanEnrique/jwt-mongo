const {Schema,model} = require('mongoose')

const User = new Schema({
    name: {type:String,required:true},
    password: {type:String,required:true},
    admin:Boolean
})

module.exports = model('User',User)