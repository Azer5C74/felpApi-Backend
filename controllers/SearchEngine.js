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



// Index all documents
    miniSearch.addAll(businessList)
//get the entered term from the query
    const {term} = req.query
    let suggestions = miniSearch.autoSuggest(term, { fuzzy: 0.1 })
    let results = miniSearch.search(term,{prefix:true, fuzzy:0.1})

    const currentLocation={}
    currentLocation.altitude=35.335256
    currentLocation.longitude=10.890310


    if (results.length){
        //to perform price sorting, we have to confirm that the entered term is a menu item
        if(Object.values(results[0].match)=="menu"){
            for (let i = 0; i < results.length; i++) {

                let {altitude,longitude}=results[i].location
                d=getDistanceFromLatLonInKm(currentLocation.altitude,currentLocation.longitude,altitude,longitude);
                console.log(d*0.3/10)
                //taking price into account
                scoreQuery=(results[i].averageRating*0.2)-(d*0.4)/100+(results[i].score*0.2)
                results[i].scoreQuery=scoreQuery;
                //console.log(results[i])
            }
            results.sort(((a,b) => (a.scoreQuery < b.scoreQuery) ? 1 : -1 ));
        }


        //we have to confirm that the entered term is a name of a business
        if(Object.values(results[0].match)=="name"){

            for (let i = 0; i < results.length; i++) {

                let {altitude,longitude}=results[i].location;
                d=getDistanceFromLatLonInKm(currentLocation.altitude,currentLocation.longitude,altitude,longitude);
                scoreQuery=(results[i].averageRating*0.3)-(d*0.3)+(results[i].score*0.2)
                results[i].scoreQuery=scoreQuery;
            }
            results.sort(((a,b) => (a.scoreQuery < b.scoreQuery) ? 1 : -1 ));
            //console.log(results)
    }
    }

    //
    // // sort using average rating
    // function compareAverageRating( a, b ) {
    //     if ( a.averageRating > b.averageRating ){
    //         return -1;
    //     }
    //     if ( a.averageRating < b.averageRating ){
    //         return 1;
    //     }
    //     return 0;
    // }

    //calculate distance in KLM between two locations
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    }
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }




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