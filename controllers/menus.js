const _ = require("lodash");
const { Business } = require("../models/Business");
const asyncHandler = require("../middleware/async");

const mongoose = require("mongoose");

exports.getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const business = await Business.findOne({
    "menu._id": id
  });
  if (!business)
    return res.status(404).send({
      error: true,
      reason: "the menu with the given ID is not found"
    });
  res.send(business.menu);
});

exports.register = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const businessID = req.payload.id;
  if (req.payload.isBusinessAccount !== true)
    return res.status(403).send({
      error: true,
      reason: "Unauthorized"
    });
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

  return res.status(201).send(business.menu);
});

exports.updateItems = asyncHandler(async (req, res) => {
    const { item, price } = req.body;
    const businessID = req.payload.id;
    if (req.payload.isBusinessAccount !== true)
      return res.status(403).send({
        error: true,
        reason: "Unauthorized"
      });
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
    return res.status(201).send({ item, price });
});

// router.put(
//   "/:id/items",
//   auth,
//   validateObjectId,
//   validateItemCreation,
//   async (req, res) => {
//     const { id } = req.params;
//     const { item, price } = req.body;
//     const businessID = req.payload.id;
//     let business = await Business.findOne({
//       "menu._id": id
//     });

//     if (!business)
//       return res.status(404).send({
//         error: true,
//         reason: "the menu with the given ID is not found"
//       });

//     if (
//       business._id.toHexString() !== businessID ||
//       req.payload.isBusinessAccount !== true
//     )
//       return res.status(403).send({
//         error: true,
//         reason: "Unauthorized"
//       });

//     await business.update({
//       $push: {
//         "menu.items": { item, price }
//       }
//     });
//     return res.status(201).send({ item, price });
//   }
// );

// module.exports = router;
