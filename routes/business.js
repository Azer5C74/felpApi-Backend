const express = require("express");
const router = express.Router({ mergeParams: true });

//include other resource routers
const reviewRouter = require("./review");

const {
  me,
  register,
  //login,
  update,
  getByLocation,
  getById,
  getMenu,
  getRecommendations
} = require("../controllers/businesses");

const { protect } = require("../middleware/auth");
const {
  validateCreation,
  validatePatching,
  validateRecommendation
} = require("../models/Business");

const validateObjectId = require("../middleware/validateObjectId");

//Re-route into other resource routers
router.use("/:businessId/reviews", reviewRouter);

router.get("/me", protect, me);
router.post("/recommendations", validateRecommendation, getRecommendations);
router.post("/register", validateCreation, register);
//router.post("/login", login);
router.patch("/", protect, validatePatching, update);
router.get("/:id", validateObjectId, getById);
router.get("/:id/menu", validateObjectId, getMenu);
router.get("/:longitude/:altitude/", getByLocation);

module.exports = router;
