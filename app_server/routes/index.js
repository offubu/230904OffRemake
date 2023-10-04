const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlCal = require('../controllers/cal');
const ctrlOthers = require('../controllers/others');

//  Loc8r
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

//  calmon
router.get('/years', ctrlCal.decadeList);
router.get('/years/fortnights-list', ctrlCal.fortnightList);
router.get('/cal-mon', ctrlCal.cal);
router.get('/cal-mon/draft-schedule', ctrlCal.draftSch);

router.get('/about', ctrlOthers.about);

module.exports = router;
