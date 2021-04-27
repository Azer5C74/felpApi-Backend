const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Business } = require("../models/Business");
const asyncHandler = require("../middleware/async");

exports.me = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.user._id).select("-password");
  return res.send(business);
});

exports.getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const business = await Business.findById(id);
  if (!business)
    return res.status(404).send({
      error: true,
      reason: "the business with the given ID is not found"
    });
  res.send(
    _.pick(business, [
      "_id",
      "name",
      "email",
      "type",
      "hasDelivery",
      "hasBooking",
      "description",
      "location",
      "menu"
    ])
  );
});

exports.getMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const business = await Business.findById(id);
  if (!business)
    return res.status(404).send({
      error: true,
      reason: "The business with the given ID is not found"
    });
  if (business.menu) {
    const { _id, items } = business.menu;
    res.send({
      menuID: _id,
      items
    });
  }
  res.status(404).send({
    error: true,
    reason: "the menu has not been set for this business yet"
  });
});

exports.getByLocation = asyncHandler(async (req, res) => {
  const { longitude, altitude } = req.params;
  const business = await Business.findOne({
    "location.longitude": longitude,
    "location.altitude": altitude
  });
  if (!business)
    return res.status(404).send({
      error: true,
      reason: "no business was found in this location"
    });
  res.send(
    _.pick(business, [
      "_id",
      "name",
      "email",
      "type",
      "hasDelivery",
      "hasBooking",
      "description",
      "location",
      "menu"
    ])
  );
});

exports.register = asyncHandler(async (req, res) => {
  const { email, location } = req.body;
  let business = await Business.findOne({ email });
  // TODO: Check if the email is taken by user too
  if (business)
    return res
      .status(400)
      .send({ error: true, message: "email has already registered" });

  business = await Business.findOne({
    "location.longitude": location.longitude,
    "location.altitude": location.altitude
  });
  if (business)
    return res.status(400).send({
      error: true,
      message: "this location has been claimed by other business"
    });

  business = new Business(
    _.pick(req.body, [
      "name",
      "email",
      "password",
      "type",
      "hasDelivery",
      "hasBooking",
      "description",
      "location",
      "menu"
    ])
  );

  const salt = await bcrypt.genSalt(10);
  business.password = await bcrypt.hash(business.password, salt);

  await business.save();
  const token = business.generateAuthToken();

  return res
    .header("x-auth-token", token)
    .status(201)
    .send(
      _.pick(business, [
        "_id",
        "name",
        "email",
        "type",
        "hasDelivery",
        "hasBooking",
        "description",
        "location",
        "menu"
      ])
    );
});

exports.update = asyncHandler(async (req, res) => {
  const id = req.payload.id;
  if (req.payload.isBusinessAccount !== true)
    return res.status(403).send({
      error: true,
      reason: "Unauthorized"
    });
  const business = await Business.findByIdAndUpdate(id, req.body, {
    new: true
  });
  if (!business)
    return res.status(404).send({
      error: true,
      reason: "The business with the given ID is not found"
    });
  res.send(
    _.pick(business, [
      "_id",
      "name",
      "email",
      "type",
      "hasDelivery",
      "hasBooking",
      "description",
      "location",
      "menu"
    ])
  );
});

// // TODO: fix caegories of the businesses
// router.get("/recommendations", async (req, res) => {
//   let { currentUserLocation, currentDateTime } = req.body;
//   currentDateTime = new Date(currentDateTime);

//   const startMorningPeriod = currentDateTime.setHours(6, 0);
//   const endMorningPeriod = currentDateTime.setHours(10, 30);

//   const startNoonPeriod = currentDateTime.setHours(11, 45);
//   const endNoonPeriod = currentDateTime.setHours(14, 45);

//   const startEveningPeriod = currentDateTime.setHours(19, 30);
//   const endEveningPeriod = currentDateTime.setHours(2, 30);

//   if (
//     currentDateTime >= startMorningPeriod &&
//     currentDateTime <= endMorningPeriod
//   ) {
//     console.log("morning");
//   } else if (
//     currentDateTime >= startNoonPeriod &&
//     currentDateTime <= endNoonPeriod
//   ) {
//     console.log("noon");
//   } else if (
//     currentDateTime >= startEveningPeriod &&
//     currentDateTime <= endEveningPeriod
//   ) {
//     console.log("evening");
//   } else {
//     // return empty array
//   }
// });

// module.exports = router;
