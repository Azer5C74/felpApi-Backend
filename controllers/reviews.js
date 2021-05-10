const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const { Business } = require('../models/Business');

// @desc      Get reviews For specific Business
// @route     GET /api/reviews
// @route     GET /api/business/:businessId/reviews
// @access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.businessId) {
        const reviews = await Review.find({ business: req.params.businessId });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
});

// @desc      Get single review
// @route     GET /api/reviews/:id
// @access    Public
exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'business',
        select: 'name description'
    });

    if (!review) {
        return next(
            new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: review
    });
});


// @desc      Add review
// @route     POST /api/business/:businessId/reviews
// @access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
    const { businessId } = req.params;
    req.body.business = businessId;
    req.body.user = req.user.id;

    const business = await Business.findById(businessId);

    if (!business) {
        return next(
            new ErrorResponse(
                `No business with the id of ${businessId}`,
                404
            )
        );
    }
    console.log(req.body)
    const review = await Review.create(req.body);

    res.status(201).json({
        success: true,
        data: review
    });
});


// @desc      Update review
// @route     PUT /api/reviews/:id
// @access    Private
exports.updateReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
        );
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to update review`, 401));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: review
    });
});

// @desc      Delete review
// @route     DELETE /api/reviews/:id
// @access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
        );
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to delete review`, 401));
    }

    await review.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});

