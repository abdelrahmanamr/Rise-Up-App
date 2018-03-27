var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    Username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    Firstname:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    Lastname:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    Password:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    Tags:{
        type: String,
        required: false,
    },
    Admin:{
        type: Boolean,
        required: true,
        default:false
    },
    Expert:{
        type: Boolean,
        required: true,
        default:false
    },
    Blocked:{
        type: Boolean,
        required: true,
        default:false
    },
    ImageURL:{
        type:String,
        required:false
    },
    Email: {
      type: String,
      required: true,
      trim: true,
    lowercase: true
    },
    CreatedAt: {
      type: Date,
      default: Date.now
    },
    
  });
  
  mongoose.model('User', userSchema);