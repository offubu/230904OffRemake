const goo = require('mongoose');
const Y = goo.model('Year');

//  currentActivityTypeSchemaKeys (cATSK)
let cATSK={
    1:'intentPhysicalActivities',
    2:'intentGroupActivities',
    3:'expectedRoutineActivities'
}

const intentActivitiesCreate = (req,res) => {    let y = req.params.year; let f = req.params.fortnight; 
    let {pomGroup,pomCode,pomName,pomBegin,pomEnd,pomQd} = req.body;
    console.log('CREATE intent activity => y: ',y,'f: ',f,'\nForm body: ', req.body,"\ndestruct check: ",pomGroup);

    const postData={
        activityName: pomName,
        activityCode: pomCode,
        duration: { begin: pomBegin, end: pomEnd }  //  individual activities can have : { INTENSIT(userQueried), FREQUENCY(accumulatedWithChosenAveragingPeriod), MODALITY(predetermined), METs, METsConvertedToCalories, stepsEquivalent, durationAdherence, associatedComments, unassociatedComments, relatedActivities }
    }
    
    Y.find({year:y}).then( yr => { if(!yr || yr.length == 0) return res.status(404).json({msg: 'year not found'});
        switch(pomGroup){
            case 'Intended Physical Activity':
                yr[0].fortnights[f-1].days[pomQd-1][cATSK[1]].push(postData);
                break;
            case 'Intended General Activity':
                yr[0].fortnights[f-1].days[pomQd-1][cATSK[2]].push(postData);
                break;
            case 'Expected Routine Activity':
                yr[0].fortnights[f-1].days[pomQd-1][cATSK[3]].push(postData);
                break;
        }
        yr[0].save();
    }).catch(ce => console.log('intentActivitiesCreate CATCH:',ce));
    res.redirect(`/years/${y}/${f}`);
};
const intentActivitiesDelete = (req,res) => {    let y = req.params.year; let f = req.params.fortnight; 
    
    let d = '';
    for(c of req.query.id){  if(c == 'd') break;
        d+=c;
    }
    d = parseInt(d);
    console.log('DEL intent activity => y: ',y,'f: ',f,"\nDEL req.params:",req.params,"\nDEL req.query:",req.query,"DELETE d: ",d);
    let dt = new Date(req.query.aTime);    let type = req.query.aType;

    Y.find({year:y}).then( yr => {
        if(!yr || yr.length == 0) return res.status(404).json({msg: 'year not found'});
        console.log(`DELETE activity of year ${y}, fortnight ${f}`);
        console.log('   aTime: ',dt)
        for(let ai=0;ai<yr[0].fortnights[f-1].days[d-1][type].length;ai++){
            console.log("ai++");
            console.log('   Time: ',yr[0].fortnights[f-1].days[d-1][type][ai].duration.end)
            if(dt.getTime()==yr[0].fortnights[f-1].days[d-1][type][ai].duration.end.getTime()){
                console.log("attempting DELETE",yr[0].fortnights[f-1].days[d-1][type][ai])
                yr[0].fortnights[f-1].days[d-1][type][ai].deleteOne();
                // yr[0].update();
                yr[0].save();
                return;
            }
        }
    })
    .catch(ce => console.log('4-3delTest CATCH:',ce))
    // req.method = 'GET'; console.log("redirecting", req.method)
    res.redirect(303,`/years/${y}/${f}`)
};

const adheredActivitiesCreate = (req,res) => {
    return;
};

const activeTimesUpdate = (req, res) => {
    return;
}

module.exports = {
    intentActivitiesCreate,
    // intentActivitiesRead, 
    // intentActivitiesUpdate, 
    intentActivitiesDelete,
    adheredActivitiesCreate,
    // adheredActivitiesRead,
    // adheredActivitiesUpdate,
    // adheredActivitiesDelete,
    activeTimesUpdate,
}