const names = ['DownStreet','RouteP','3Leaf']
const commonAddress='125 High Street, Reading, RG6 1PS'
const ratings = [3,4,2]
const facilities=['Hot Drinks','Food','Kills','Wifi']
const _3leafFacs=facilities.slice(0,3)
// console.log(facilities);
// console.log(_3leafFacs);
const otherFacs=facilities.slice(0,2).concat(facilities[3])
const distances=["100m","200m","300m"]

locationsList=[]
location={}
for(i=0;i<3;i++){
  location={}
  location['name']=names[i]
  location['address']=commonAddress
  location['rating']=ratings[i]
  if(names[i]=='3Leaf') location['facilities']=_3leafFacs
  else location['facilities']=otherFacs
  location['distance']=distances[i]
  // console.log(location,facilities)
  locationsList.push(location)
}
// console.dir(locationsList)

const homelist = (req, res) => {
  res.render('locations-list', { 
    title: 'Loc8r - find a place to work with wifi' ,
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Workplace requirements for timeslots'
    },
    locations: locationsList,
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
  });
};

const locationInfo = (req, res) => {
  res.render('location-info', { 
    title: 'DownStreet',
    pageHeader: {title: 'Location Info'},
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t please leave a review to help other people just like you.'
    },
    location: {
      name: 'Downstreet',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      api_args: {arg1: 123, arg2: 'optional, defaults'},
      openingTimes: [{
        days:'Monday - Friday',
        opening:'0700', closing:'1900',
        closed: false
      },{
        days:'Saturday',
        opening:'0800', closing:'1700',
        closed: false
      },{
        days:'Sunday', closed: true
      }],
      reviews: [{
        author:'Simon Holmes', rating:5, timeStamp:'15th June 2016',
        reviewText:'Rest Day before max output consecutive days should be used for deep stretching which will have METS value, is the METS comparable to walking?',
      },{
        author:'Clive Harber', rating:4, timeStamp:'13th June 2016',
        reviewText:'Joint injuries that are not breaks should be rested a lot.',
      }]
    }
  });
};

const addReview = (req, res) => {
  res.render('location-review-form', { 
    title: 'Add reviews, Pick what review to implements',
    pageHeader: { title: 'Review Types in cols to new review pages of different form elements for modeling and storage'}
  });
};

module.exports = {
  homelist,
  locationInfo,
  addReview
};
