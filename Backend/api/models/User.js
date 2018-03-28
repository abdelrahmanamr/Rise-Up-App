var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
    lowercase: true
    },
    dateOfBirth:{
        type:String,
        required: false,
    },
    firstname:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    securityQ:{
      type:String,

    },
    securityA:{
        type:String,

      },
    lastname:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    tags:{
        type: String,
        required: false,
    },
    admin:{
        type: Boolean,
        default:false
    },
    expert:{
        type: Boolean,
        default:false
    },
    blocked:{
        type: Boolean,
        default:false
    },
    ImageURL:{
        type:String,
        required:false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date

  });

  if (!userSchema.options.toObject) {
    userSchema.options.toObject = {};
  }
  userSchema.options.toObject.transform = (document, transformedDocument) => {
    delete transformedDocument.password;
    return transformedDocument;
  };


  mongoose.model('User', userSchema);
