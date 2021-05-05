const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
const validate = require("../middleware/validate");
const { menuModelSchema, menuValidationSchema } = require("./Menu");
const bcrypt = require("bcrypt");

const locationSchema = new mongoose.Schema({
  longitude: {
    type: String,
    required: true
  },
  altitude: {
    type: String,
    required: true
  }
});

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
    select: false
  },
  type: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 12
  },
  hasDelivery: {
    type: Boolean,
    default: false
  },
  hasBooking: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 1024
  },
  location: {
    type: locationSchema,
    required: true
  },
  menu: menuModelSchema
});

businessSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, isBusinessAccount: true },
    process.env.JWT_SECRET
  );
  return token;
};

businessSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Business = mongoose.model("Business", businessSchema);

function validateBusinessCreation(business) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(30).required().email(),
    password: Joi.string().min(8).max(30).required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("confirmPassword")
      .messages({ "any.only": "{{#label}} does not match" }),
    type: Joi.string().min(3).max(12).required(),
    hasDelivery: Joi.boolean(),
    hasBooking: Joi.boolean(),
    description: Joi.string().min(10).max(1024),
    location: Joi.object({
      longitude: Joi.string().required(),
      altitude: Joi.string().required()
    }).required(),
    menu: menuValidationSchema
  });
  return schema.validate(business);
}

function validateBusinessPatching(business) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50),
    type: Joi.string().min(3).max(12),
    hasDelivery: Joi.boolean(),
    hasBooking: Joi.boolean(),
    description: Joi.string().min(10).max(1024),
    location: Joi.object({
      longitude: Joi.string().required(),
      altitude: Joi.string().required()
    }),
    menu: menuValidationSchema
  });
  return schema.validate(business);
}

function validateRecommendation(recommendationInput) {
  const schema = Joi.object({
    currentUserLocation: Joi.object({
      longitude: Joi.number().required().greater(-180).less(180),
      altitude: Joi.number().required().greater(-90).less(90)
    }).required(),
    currentTimeStampInMs: Joi.date().timestamp().required(),
    radiusInKm: Joi.number().required()
  });
  return schema.validate(recommendationInput);
}

exports.Business = Business;
exports.validateCreation = validate(validateBusinessCreation);
exports.validatePatching = validate(validateBusinessPatching);
exports.validateRecommendation = validate(validateRecommendation);
