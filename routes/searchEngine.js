const express = require ('express')
const {searchQuery} = require('../controllers/SearchEngine')

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.
    route('/').
    get(searchQuery);

module.exports = router;