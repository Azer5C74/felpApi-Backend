const express = require("express");
const router = express.Router({ mergeParams: true });

const { getById, register, updateItems } = require("../controllers/menus");
const validateObjectId = require("../middleware/validateObjectId");
const { protect } = require("../middleware/auth");
const { validateCreation, validateItemCreation } = require("../models/Menu");
router.get("/:id", validateObjectId, getById);
router.post("/", protect, validateCreation, register);
router.put("/items", protect, validateItemCreation, updateItems);

module.exports = router;
