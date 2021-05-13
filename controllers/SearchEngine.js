const MiniSearch = require('minisearch')
const {Business} = require("../models/Business")
const asyncHandler = require('../middleware/async');


exports.searchQuery = asyncHandler(async (req, res, next) => {

    let miniSearch = new MiniSearch({
        fields: ['name'], // fields to index for full-text search
        storeFields: ['name'] // fields to return with search results
    })

    businessList = await Business.find().select("name")
    if(!businessList)
        return next(new ErrorResponse("Business List is empty", 400));


// Index all documents
    miniSearch.addAll(businessList)
    //console.log(miniSearch)
    console.log(req.query)
    const {term} = req.query
    let results = miniSearch.search(term)
// Search with default options. It will return the id of the matching documents,
// along with a relevance score and match information
    //console.log(miniSearch.search())
    res.status(200).json({
        success: true,
        data: results
    });
})