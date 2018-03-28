var mongoose = require('mongoose');

var companySchema = mongoose.Schema({
userid:{
    type:mongoose.Schema.Types.ObjectId,
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
