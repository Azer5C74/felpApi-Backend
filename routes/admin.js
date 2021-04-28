const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
 // getMenus,
  getMenu,
  createMenu,
  updateMenu,
 // deleteMenu
  
} = require('../controllers/admin');

const User = require('../models/User');
const {Business} = require('../models/Business');
const Menu = require("../models/Menu");

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));


router
  .route('/users')
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

  router
  .route('/businesses')
  .get(advancedResults(Business),getBusinesses)
  .post(createBusiness);

router
  .route('/businesses/:id')
  .get(getBusiness)
  .put(updateBusiness)
  .delete(deleteBusiness);

router
  .route('/menus')
 // .get(advancedResults(Menu),getMenus)
  .post(createMenu)
router
  .route('/menu/:id')
  .get(getMenu)
  .put(updateMenu)
  //.delete(deleteMenu);

module.exports = router;
