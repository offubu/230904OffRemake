const goo = require('mongoose');
const Loc = goo.model('Location');

const doSetAverageRating = (location) => {
    if (location.reviews && location.reviews.length > 0) {
        const count = location.reviews.length;
        const total = location.reviews.reduce((acc, {rating}) => {
            return acc + rating;
        }, 0);
  
        location.rating = parseInt(total / count, 10);
        location.save( err => {
            if(err) return console.log(err);
            console.log(`Average rating updated to ${location.rating}`);
        });
    }
};

const updateAverageRating = (locationId) => {
    Loc.findById(locationId).select('rating reviews')
        .exec( (err, location) => { if (!err) doSetAverageRating(location); });
};

const doAddReview = (req, res, location) => {
    if (!location) return res.status(404).json({"message": "Location not found"});

    const {author, rating, reviewText} = req.body;
    location.reviews.push({author, rating, reviewText});
    location.save( (err, location) => { 
        if(err) return res.status(400).json(err); 
        updateAverageRating(location._id);
        const thisReview = location.reviews.slice(-1).pop();
        return res.status(201).json(thisReview);
    });
};

const reviewsCreate = (req,res) => {
    const locationid = req.params.locationid;
    if(!locationid) return res.status(404).json({"id issue": "id not valid"});
    Loc.findById(locationid).select('reviews')  //
        .exec( (err,location) => {
            if(err) return res.status(400).json({msg: 'bad request', err});
            return doAddReview(req, res, location);
        });
};

const reviewsReadOne = (req,res) => {
    Loc.findById(req.params.locationid)
        .then( (location) => {
            if(!location){ return res.status(400).json({"location_missing": "potentially valid id, you cannot review a location that doesnt exist"}) }
            
            const review = location.reviews.id(req.params.reviewid);
            if(!review){ return res.status(400).json({"bad_request" : "reviewid not found, or reviewid format is invalid"}); }
            
            const response = {
                location: {
                    name: location.name,
                    id: req.params.locationid
                },
                review
            }
            return res.status(200).json(response);
        })
        .catch( (err) => { console.log(err);
            res.status(400).json({"error_log" : err, "description": "the ID format may be invalid, or something else"});
        });
};

const reviewsUpdateOne = (req,res) => {
    if (!req.params.locationid || !req.params.reviewid) {
        return res.status(404).json({ "msg": "Not found, locationid and reviewid are both required" });
    }

    Loc.findById(req.params.locationid).select('reviews')
        .exec((err, location) => {
            if(!location) return res.status(404).json({ "msg": "Location not found" });
            if(err) return res.status(400).json(err);
            if(!location.reviews || location.reviews.length<1) return res.status(404).json({ "msg": "No review to update" });

            const thisReview = location.reviews.id(req.params.reviewid);
            if(!thisReview) return res.status(404).json({"msg": "Review not found" });
            
            thisReview.author = req.body.author;
            thisReview.rating = req.body.rating;
            thisReview.reviewText = req.body.reviewText;
            location.save((err, location) => {
                if(err) return res.status(404).json(err);
                updateAverageRating(location._id);
                return res.status(200).json(thisReview);
            });
        });
};
const reviewsDeleteOne = (req,res) => {};

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
}