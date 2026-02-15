//var express = require('express');
//var router = express.Router();


//const mongoose = require("mongoose");
//mongoose.connect(`mongodb://127.0.0.1:27017/Disastra_DB`);


const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");



//------------------------------------client----------------------------------------------------


const clientSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },


  cases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case"
  }],

  connectedLawyers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer"
  }],


  points: { type:Number, required:true, default:0},
  level: { type: String, default:"Bronze" },
  completed:{ type:Number, required:true, default:0},


 
  isverified:{ type:Boolean, default:false},
  otp: { type: String },


});

clientSchema.plugin(passportLocalMongoose, { usernameField: "email" });


//------------------------------------------------------------------------------------------



const lawyerSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },



  phone: String,

  specialization: [String],

  experienceYears: Number,

  barRegistrationNumber: {
    type: String,
    required: true
  },

  linkedinProfileid: Number,



    cases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case"
  }],



  otp: {type: String},
  isverified:{type: Boolean, default:false},




  
});

lawyerSchema.plugin(passportLocalMongoose, { usernameField: "email" });




//---------------------------------------------------JUDGES------------------------------------


const judgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  


   courtName: {
    type: String,
    required: true
  },

   barRegistrationNumber: {
    type: String,
    required: true
  },

  designation: String,

  assignedCases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case"
  }],

  judgementsGiven: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Judgement"
  }],




  otp: {type: String},
  isverified:{type: Boolean, default:false},


});

judgeSchema.plugin(passportLocalMongoose, { usernameField: "email" });







//------------------------------------------------------------------------------------------------------


//-------------------------------------admin---------------------------------------------------------------

const adminSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  super: { type: Boolean, default: false }, 
 
});


//----------------------------------------------------------------------------------------------------------------


const caseSchema = new mongoose.Schema({

  caseTitle: {
    type: String,
    required: true
  },

  caseNumber: {
    type: String,
    unique: true
  },

  description: String,

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },

  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer"
  },

  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Judge"
  },

  status: {
    type: String,
    enum: ["filed", "in-progress", "hearing", "closed"],
    default: "filed"
  }

}, { timestamps: true });


//--------------------------------------------------------------------------------------------



const judgementSchema = new mongoose.Schema({

  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case"
  },

  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Judge"
  },

  fullVerdict: String,

  simplifiedVerdict: String

}, { timestamps: true });




const Client = mongoose.model("Client", clientSchema);
const Lawyer = mongoose.model("Lawyer", lawyerSchema);
const Judge = mongoose.model("Judge", judgeSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Case =  mongoose.model("Case", caseSchema);
const Judgement=mongoose.model("Judgement", judgementSchema);





module.exports = { Client, Lawyer, Judge, Admin, Case , Judgement};



