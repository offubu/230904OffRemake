const goo = require('mongoose');
const Y = goo.model('Year');


const intentActivitiesCreate = (req,res) => {
    let y = req.params.year; let f = req.params.fortnight; console.log('y: ',y,'f: ',f);
    console.log('Form body:', req.body);
    let aname=''; let acode='';let buf='';
    for(c in req.body.acode){
        if(req.body.acode.charAt(c)=='('){ console.log(buf); aname=buf; buf=''; continue; }
        if(req.body.acode.charAt(c)==')'){ console.log(buf); acode=buf; buf=''; continue; }
        buf+=req.body.acode.charAt(c);
    }
    //  form duration must be at least 1 minute, disallow in pug </script>
    //  

    // Y.find({year:y}).then( yr => { if(!yr || yr.length == 0) return res.status(404).json({msg: 'year not found'});

    //     const postData={
            // activityName: aname
    //         activityCode: acode,
    //         duration: { begin: req.body.begin, end: req.body.end }
    //     }  
    //     yr.fortnights[f-1].days[d-1].intentActivities.push(postData); 
    //     yr.save();
    //     console.log('pushSave:',JSON.stringify(yr.fortnights[f-1].days[d-1].intentActivities));
    // }).catch(ce => console.log('intentActivitiesCreate CATCH:',ce));
    res.redirect(`/years/${y}/${f}`)
};

const adheredActivitiesCreate = (req,res) => {
    return;
}

module.exports = {
    intentActivitiesCreate,
    // intentActivitiesRead, 
    // intentActivitiesUpdate, 
    // intentActivitiesDelete,
    adheredActivitiesCreate,
    // adheredActivitiesRead,
    // adheredActivitiesUpdate,
    // adheredActivitiesDelete,
}