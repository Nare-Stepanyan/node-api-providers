const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let validateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 24,
    validate: {
      validator: (lower) => {
        return lower.charAt(0).toUpperCase() + lower.substring(1);
      },
    },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /\d/g.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  providers: {
    type: [{ type: ObjectId, ref: "provider" }],
  },
});
clientSchema.pre("save", function (next) {
  this.name =
    this.name.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase();
  next();
});

const providerSchema = new Schema({
  name: {
    type: String,
    unique: true,
    validate: {
      validator: (lower) => {
        return lower.charAt(0).toUpperCase() + lower.substring(1);
      },
    },
  },
});

providerSchema.pre("save", function (next) {
  this.name =
    this.name.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase();
  next();
});
const clients = mongoose.model("client", clientSchema, "clients");
const providers = mongoose.model("provider", providerSchema, "providers");

module.exports = { clients, providers };
