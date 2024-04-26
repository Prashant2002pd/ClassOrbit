const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://prashant2002singh:prashantdb123@cluster0.eecayhs.mongodb.net/Parthweb')

const studentSchema=new mongoose.Schema({
    name:String,
    number:Number,
    age:Number,
    gender:String,
    address:String,
    fees:[
        {month:String, paid:{type:Boolean,default:false}}
    ],
    attendence:[{
        date:String,
        isPresent:{type:Boolean,default:true}
    }]
})

const Students=mongoose.model("Students",studentSchema)

module.exports={Students};