const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  me,
  register,
  update,
  getByLocation,
  getById,
  getMenu
} = require("../controllers/businesses");
const { protect } = require("../middleware/auth");
const { validateCreation, validatePatching } = require("../models/Business");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/me", protect, me);
router.post("/", validateCreation, register);
router.patch("/", protect, validatePatching, update);
router.get("/:id", validateObjectId, getById);
router.get("/:id/menu", validateObjectId, getMenu);
router.get("/:longitude/:altitude/", getByLocation);

module.exports = router;
