const goo = require('mongoose');
// const Y = goo.model('Year');

const yearsListedInOrder = (req, res) => {
    res.status(200).json({msg:"placeholder"});
};
const createNewYearOfFortnightsIfItDoesntAlreadyExistForThatYear = (req, res) => {
    const year = req.params.year;
    fortnightsList=[];
    yearStart = new Date(year,0,1);
    for(let i=1;i<=27;i++){        
        fzero = new Date(yearStart.getTime() + (i-1)*1209600000);

        fortnight={}; fortnight['ordinal_number']=i;
        fortnight['day1_fzero'] = fzero;
        ndays=14
        if(i==27){
            ndays=1; eoy=new Date(fzero.getTime() + 86400000); 
            console.log("eoy: ",eoy,"year:",year['number'],"eoyGetY:",eoy.getFullYear());
            if(eoy.getFullYear()==year['number']) ndays = 2;
        }

        // ordinal 'th in server controller
        // fortnight['cal-mon_title']='th Fortnight of 2029'  //  remove from schema (rfs)
        // bin_pending in server controller
        // fortnight['pending']=true;  // greyed or saturation change for card bg or page bg  //  RFS
        // if((today-this_year_jan_1st_unix)/604800000/2 > i) fortnight['pending']=false;

        fortnight['intent_cal_view'] = {
            context: 'intent', activities: []
        }

        fortnight['adherered_cal_view'] = {
            context: 'adhered', activities: []
        }

        for(d=0;d<ndays;d++){
            for(hh=0;hh<24;m++){
                beh_dur = {
                    activity_code: '10000 (No Activitiy)',
                    duration: {
                        begin: new Date(fzero.getTime() + 86400000*d + 60000*hh*60),
                        end: new Date(fzero.getTime() + 86400000*d + 60000*hh*90)
                    }
                };
                fortnight['intent_cal_view'].activities.push(beh_dur);
                fortnight['adhered_cal_view'].activities.push(beh_dur);
            }
        }
        fortnightsList.push(fortnight);
    }
    Y.create({
        year: req.params.year,
        fortnights: fortnightsList
    }).then((err, y) => { 
        if(!y) return res.status(400).json({msg: "bad request"});
        if(err) return res.status(400).json({msg: err});
        return res.status(201).json({msg:"Year has been successfully stored",y});
    })
};
const fortnightsByOrdinalThisYear = (req, res) => {
    Y.find().then( fortnights => {
        if(!fortnights) { return res.status(404).json({ possible_issue: 'collection is empty' }); }
        res.status(200).json(fortnights);
    } ).catch( err => { res.status(404).json({ logged: err }); });
};
const fortnightsReadOne = (req, res) => {
    Y.findById(req.params.fortnight_id).then( fortnight => {
        if(!fortnight){ return res.status(404).json({ log: 'ObjectId doesnt exist' }); }
        res.status(200).json(fortnight);
    }).catch( err => { res.status(404).json(err); });
};
const fortnightsUpdateOne = (req, res) => {
    res.status(200).json({msg:"placeholder"});
};
const fortnightsDeleteOne = (req, res) => {
    res.status(200).json({msg:"placeholder"});
};


module.exports = {
    yearsListedInOrder,
    createNewYearOfFortnightsIfItDoesntAlreadyExistForThatYear,
    fortnightsByOrdinalThisYear,
    fortnightsReadOne,
    fortnightsUpdateOne,
    fortnightsDeleteOne
}