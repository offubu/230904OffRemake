const express = require('express');
const router = express.Router();
const ctrlFortnights = require('../controllers/fortnight');
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');

// Fortnights
router.route('/fortnights')
    // .get(ctrlFortnights.yearsListedInOrder)
    .get(ctrlFortnights.fortnightsByOrdinalThisYear)
    // .post(ctrlFortnights.createNewYearOfFortnightsIfItDoesntAlreadyExistForThatYear);

router.route('/:year/fortnights')
    .get(ctrlFortnights.fortnightsByOrdinalThisYear)
    .post(ctrlFortnights.createNewYearOfFortnightsIfItDoesntAlreadyExistForThatYear);

router.route('/fortnights/:fortnight_id')
    .get(ctrlFortnights.fortnightsReadOne)
    .put(ctrlFortnights.fortnightsUpdateOne).delete(ctrlFortnights.fortnightsDeleteOne);

//locations
router.route('/locations')
    .get(ctrlLocations.locationsListByDistance)
    .post(ctrlLocations.locationsCreate);  //  create New Location

router.route('/locations/:locationid')
    .get(ctrlLocations.locationsReadOne)
    .put(ctrlLocations.locationsUpdateOne).delete(ctrlLocations.locationsDeleteOne);

//reviews
router.route('/locations/:locationid/reviews')
    .post(ctrlReviews.reviewsCreate)  //  create New Review

router.route('/locations/:locationid/reviews/:reviewid')
    .get(ctrlReviews.reviewsReadOne)
    .put(ctrlReviews.reviewsUpdateOne).delete(ctrlReviews.reviewsDeleteOne)

module.exports = router;