var mangoose = require('mangoose');

var companySchema = mangoose.schema({
userid:{
    type:mangoose.schema.type.ObjectId,
    ref:'User'
},
name:{
    type:String,
    required:true,
    trim:true,
    lowercase:true
},
email:{
    type:String,
    required:true,
    trim:true
},
website:{
    type:String,
    required:true
},
tags:{
    type:String,
    required: true
},
type:{
   type:String,
   required: true
},
 views:{
    type:Number,
     default:0
 },
 createdAt:{
     type: Date,
     default: Date.now
 },
 updatedAt:Date
});

mongoose.model('Company',companySchema);