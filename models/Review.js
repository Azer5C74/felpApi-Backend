const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

    // title: {
    //     type: String,
    //     trim: true,
    //     required: [true, 'Please add a title for the review'],
    //     maxlength: 100
    // },

    text: {
        type: String,
        required: [true, 'Please add some text']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },

    picture: {
        type:String},

    createdAt: {
        type: Date,
        default: Date.now
    },
    business: {
        type: mongoose.Schema.ObjectId,
        ref: 'Business',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

// Prevent user from submitting more than one review per business
ReviewSchema.index({ business: 1, user: 1 }, { unique: true });


// Static method to get average rating and save
ReviewSchema.statics.getAverageRating = async function(businessId) {
    const obj = await this.aggregate([
        {
            $match: { business: businessId }
        },
        {
            $group: {
                _id: 'business',
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    try {
        await this.model('Business').findByIdAndUpdate(businessId, {
            averageRating: obj[0].averageRating
        });
    } catch (err) {
        console.error(err);
    }
};

// Call getAverageRating after save
ReviewSchema.post('save', function() {
    this.constructor.getAverageRating(this.business);
});

// Call getAverageRating before remove
ReviewSchema.pre('remove', function() {
    this.constructor.getAverageRating(this.business);
});


module.exports = mongoose.model('Review', ReviewSchema);
