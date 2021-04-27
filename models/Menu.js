const mongoose = require("mongoose");
const Joi = require("joi");
const validate = require("../middleware/validate");

const menuItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  price: {
    type: Number,
    required: true
  }
});

const menuSchema = new mongoose.Schema({
  items: [menuItemSchema]
});

// const MenuItem = mongoose.model("MenuItems", menuItemSchema);

const itemValidationSchema = Joi.object({
  item: Joi.string().required().min(3).max(20),
  price: Joi.number().required()
});

const itemsValidationSchema = Joi.array()
  .items(itemValidationSchema)
  .required();

const menuValidationSchema = Joi.object({
  items: itemsValidationSchema
});

function validateItemCreation(item) {
  return itemValidationSchema.validate(item);
}

function validateMenuCreation(menu) {
  return menuValidationSchema.validate(menu);
}

exports.menuModelSchema = menuSchema;
exports.menuValidationSchema = menuValidationSchema;
exports.validateCreation = validate(validateMenuCreation);
exports.validateItemCreation = validate(validateItemCreation);
