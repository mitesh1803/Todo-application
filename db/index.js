const mongoose=require('mongoose');

mongoose.connect('')
    .then(()=>console.log("Database connected"))
    .catch(err=>console.log("Error occured",err))

const UserSchema=new mongoose.Schema({
    email:String,
    password:String
})
const User=mongoose.model("User",UserSchema)

const todoSchema=new mongoose.Schema({
    title:String,
    description:String,
    userId:mongoose.Schema.Types.ObjectId
})
const Todo=mongoose.model("Todo",todoSchema)

module.exports={
    User,
    Todo
}
