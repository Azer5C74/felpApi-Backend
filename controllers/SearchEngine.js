const MiniSearch = require('minisearch')
const {Business} = require("../models/Business")
const asyncHandler = require('../middleware/async');


exports.searchQuery = asyncHandler(async (req, res, next) => {

    let miniSearch = new MiniSearch({
        fields: ['name','location','type','menu','hasDelivery','hasBooking','averageRating'], // fields to index for full-text search
        storeFields: ['name','location','type','menu','hasDelivery','hasBooking','averageRating'] // fields to return with search results
    })

    businessList = await Business.find().select('name location type menu hasDelivery hasBooking averageRating')
    if(!businessList)
        return next(new ErrorResponse("Business List is empty", 400));

    // const { longitude, altitude } = req.params;
    // const business = await Business.findOne({
    //     "location.longitude": longitude,
    //     "location.altitude": altitude
    // });


// Index all documents
    miniSearch.addAll(businessList)
    const {term} = req.query
    let suggestions = miniSearch.autoSuggest(term, { fuzzy: 0.2 })

    let results = miniSearch.search(term,{prefix:true, fuzzy:0.2})
// Search with default options. It will return the id of the matching documents,
// along with a relevance score and match information
    if(results) {
        res.status(200).json({
            success: true,
            countSuggestions: suggestions.length,
            countResults: results.length,
            suggestions: suggestions,
            results: results
        });
    }
    else{
        return next(new ErrorResponse("Your search did not match any documents, try different keywords", 401));
    }
})