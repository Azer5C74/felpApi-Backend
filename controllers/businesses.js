const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Business } = require("../models/Business");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const axios = require("axios");

exports.me = asyncHandler(async (req, res) => {
  const id = req.payload.id;
  if (req.payload.isBusinessAccount !== true)
    return res.status(403).send({
      error: true,
      reason: "Unauthorized"
    });
  const business = await Business.findById(id).select("-password");
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
      "menu",
      "averageRating",
      "imageUrl"
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
      "menu",
      "averageRating",
      "imageUrl"
    ])
  );
});

exports.register = asyncHandler(async (req, res) => {
  const businessTypes = ["coffee shop", "restaurant"];
  const { email, location, type } = req.body;
  let business = await Business.findOne({ email });
  const user = await User.findOne({ email });
  if (business || user)
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

  // if (!(type in businessTypes)) return res.status(400).send({
  //   error: true,
  //   message: `business type should be in ${businessTypes}`
  // });

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
  const token = business.getSignedJwtToken();

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
        "menu",
        "averageRating",
        "imageUrl"
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
      "menu",
      "averageRating",
      "imageUrl"
    ])
  );
});

exports.getRecommendations = asyncHandler(async (req, res) => {
  let { currentUserLocation, currentTimeStampInMs, radiusInKm } = req.body;

  let tempDate = new Date(currentTimeStampInMs);
  let currentDateTime = new Date(currentTimeStampInMs);
  const startMorningPeriod = tempDate.setHours(6, 0);
  const endMorningPeriod = tempDate.setHours(11, 30);

  const startNoonPeriod = tempDate.setHours(11, 31);
  const endNoonPeriod = tempDate.setHours(14, 45);

  const startAfterNoonPeriod = tempDate.setHours(14, 46);
  const endAfterNoonPeriod = tempDate.setHours(19, 30);

  const startEveningPeriod = tempDate.setHours(19, 31);
  const endEveningPeriod = tempDate.setHours(2, 30);

  let recommendedBusinesses = [];
  let businessType = null;
  const { altitude, longitude } = currentUserLocation;

  if (
    currentDateTime >= startMorningPeriod &&
    currentDateTime <= endMorningPeriod
  )
    businessType = "coffee shop";
  else if (
    currentDateTime >= startNoonPeriod &&
    currentDateTime <= endNoonPeriod
  )
    businessType = "restaurant";
  else if (
    currentDateTime >= startAfterNoonPeriod &&
    currentDateTime <= endAfterNoonPeriod
  )
    businessType = "coffee shop";
  else if (
    currentDateTime >= startEveningPeriod ||
    currentDateTime <= endEveningPeriod
  )
    businessType = "restaurant";

  recommendedBusinesses = await getBusinessesByLocationAndType(
    businessType,
    altitude,
    longitude,
    radiusInKm
  );
  if (!recommendedBusinesses)
    return res.status(404).send({
      error: true,
      reason: "there are no recommendations. Check your input attributes"
    });
  return res.send({ recommendedBusinesses });
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

async function getBusinessesByLocationAndType(
  type,
  altitude,
  longitude,
  radius
) {
  const maxRecommendations = 5;
  let selectedBusinesses = [];
  let businesses = await Business.find({ type })
    .sort({ hasDelivery: 1 })
    .limit(maxRecommendations);
  let distance;
  let buss;
  for (business of businesses) {
    distance = getDistanceFromLatLonInKm(
      business.location.altitude,
      business.location.longitude,
      altitude,
      longitude
    );
    // console.log(business.get);
    if (distance <= radius) {
      let res = await axios.get(
        "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=" +
          business.location.longitude +
          "," +
          business.location.altitude +
          "&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=zBwyIw-CoeGxme7pVSAkc0yJV_UYm3IzxxPrvsYWwC4"
      );

      // console.log(
      //   res.data.Response.View[0].Result[0].Location.Address.Label
      // );
      buss = _.pick(business, [
        "_id",
        "name",
        "email",
        "type",
        "hasDelivery",
        "hasBooking",
        "description",
        "location",
        "menu",
        "averageRating",
        "imageUrl"
      ]);
      buss.address = res.data.Response.View[0].Result[0].Location.Address.Label;
      buss.distance = distance;
      console.log(buss);
      selectedBusinesses.push(buss);
    }
  }
  return selectedBusinesses;
}
