const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const {Business} = require('../models/Business');
const mongoose = require("mongoose");


// @desc      Get all users
// @route     GET /api/admin/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single user
// @route     GET /api/admin/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Create user
// @route     POST /api/admin/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc      Update user
// @route     PUT /api/auth/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Delete user
// @route     DELETE /api/auth/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});


// ------------ admin/business----------------------//



// @desc      Get all businesses
// @route     GET /api/admin/businesses
// @access    Private/Admin
exports.getBusinesses = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


// @desc      Get single business
// @route     GET /api/admin/businesses/:id
// @access    Private/Admin
exports.getBusiness = asyncHandler(async (req, res, next) => {
  const business = await Business.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: business
  });
});


// @desc      Create business
// @route     POST /api/admin/businesses
// @access    Private/Admin
exports.createBusiness = asyncHandler(async (req, res, next) => {
  const business = await Business.create(req.body)

  res.status(201).json({
    success: true,
    data: business
  });
});

// @desc      update business
// @route     PUT /api/admin/business/:id
// @access    Private/Admin
exports.updateBusiness = asyncHandler(async (req, res, next) => {
  const business = await Business.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  });

  res.status(200).json({
    success: true,
    data: business
  });
});


// @desc      delete business
// @route     DELETE /api/admin/business/:id
// @access    Private/Admin
exports.deleteBusiness = asyncHandler(async (req, res, next) => {
  await Business.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});



//--------------admin/menu--------------

// @desc      Get all menus
// @route     GET /api/admin/menus
// @access    Private/Admin
//exports.getMenus = asyncHandler(async (req, res, next) => {
  //res.status(200).json(res.advancedResults);
//});



// @desc      Get single menu
// @route     GET /api/admin/menu/:id
// @access    Private/Admin
exports.getMenu = asyncHandler(async (req, res, next) => {
  const menu = await Business.findOne({
    "menu._id": id
  });
  res.status(200).json({
    success: true,
    data: menu
  });
});




// @desc      Create Menu
// @route     POST /api/admin/menus
// @access    Private/Admin
exports.createMenu = asyncHandler(async (req, res, next) => {

  const { items } = req.body;
  const businessID = req.payload.id;

  const business = await Business.findByIdAndUpdate(
    businessID,
    {
      menu: {
        type: mongoose.Types.ObjectId,
        items: items
      }
    },
    { new: true }
  );

  //return res.status(201).send(business.menu);

  res.status(201).json({
    success: true,
    data: business
  });
});


// @desc      update menu
// @route     PUT /api/admin/menu/:id
// @access    Private/Admin
exports.updateMenu = asyncHandler(async (req, res, next) => {
  const { item, price } = req.body;
  const businessID = req.payload.id;
 
  let business = await Business.findById(businessID);
  if (!business.menu)
    return res.status(400).send({
      error: true,
      reason: "menu should be created first"
    });
  await business.update({
    $push: {
      "menu.items": { item, price }
    }
  });
  //return res.status(201).send({ item, price }); 

  res.status(200).json({
    success: true,
    data: { item, price }
  });
});

/*
// @desc      delete menu
// @route     DELETE /api/admin/menu/:id
// @access    Private/Admin
exports.deleteMenu = asyncHandler(async (req, res, next) => {
  await MenuModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
*/