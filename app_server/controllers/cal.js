var yday = new Date(2023, 5, 13)
var today = new Date()
var y23jan1 = new Date(2023,0,1);
var year = today.toDateString().slice(0,4);
var month = today.getMonth();
console.log(today,year);
console.log(today.toString(),today.toUTCString(),);
console.log(today.getMonth());
console.log(today,today/24/60/60/1000);
console.log(yday,yday/24/60/60/1000);
console.log(yday,yday/86400000);
console.log((today-yday)/24/60/60/1000);
console.log(today/604800000);
console.log((today-y23jan1)/604800000);
console.log((today-y23jan1)/604800000/2);


//  aim to experience inhibitory control with a weekly rudder to settle into a fortnights basis for 18 months
biasList=[
    'vigorous_musle_building',
    'moderate_muscle_building','moderate_muscle_building',
    'moderate_muscle_building','moderate_muscle_building',
    'moderate_aerobic',
    'vigorous_aerobic'
]
adherenceList=[ 'under_adherent', 'adherent', 'over_adherent' ];
daysNames=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
timesOfDay=['Early AM','Morning','Afternoon','Evening'];
function mins_time(number){ return [parseInt(number/60),number%60]; }
timesOfDayBounds={  // if user is strict waking for 4 years, change_all_weeks()
    Early_AM_Begin:mins_time(240),Early_AM_End:mins_time(419),
    Morning_Begin:mins_time(420),Morning_End:mins_time(719),
    Afternoon_Begin:mins_time(720),Afternoon_End:mins_time(1019),
    Evening_Begin:mins_time(1020),Evening_End:mins_time(1200)
}
fortnightsList=[];
for(let i=1;i<=26;i++){
    fortnight={};
    fortnight['ordinal_number']=i;
    fortnight['cal-mon_title']='th Fortnight of 2029'
    if(i%10==1) fortnight['cal-mon_title']='st Fortnight of 2029'
    if(i%10==2) fortnight['cal-mon_title']='nd Fortnight of 2029'
    if(i%10==3) fortnight['cal-mon_title']='rd Fortnight of 2029'
    fortnight['pending']=true;  // greyed or saturation change for card bg or page bg 
    if((today-y23jan1)/604800000/2 > i)
        fortnight['pending']=false;
    fortnight['day_names']=daysNames;
    fortnight['card_titles']=[
        'Margin','Calendar of Timeslots','Waking Active Times',
        'Modes','Nutrient Balance','Json/Rules Header','Comments'
    ]
    fortnight['margin_subheadings']=['Citation References','Main Citation Content','Formatting Example','Full Real Example'];
    fortnight['scheduled_cal_view']={
        title: 'Calendar: Schedule of Timeslots',
        context: 'Hover over Timeslots to see scheduled activities',
        draft_button_text: 'Draft a schedule for your activities',
        day_col: 'Days',
        times_of_day: timesOfDay,
        times_of_day_bounds: timesOfDayBounds,
        modal_placeholder: 'modalGeo'
    }
    fortnight['adhered_cal_view']={
        title: 'Adhered Calendar (Admin View)',
        context: 'The Differences between Scheduled and Adhered will be color coded. Phone location data should be broadly permitted to allow location inference (eg, outdoor period is minimum distance from known indoor location',
        draft_button_text: 'Draft a notification for the user/usergroup',
        day_col: 'Days',
        times_of_day: timesOfDay,
        times_of_day_bounds: timesOfDayBounds,
        modal_placeholder: 'modalGeo'
    }
    fortnight['modes']={
        title: 'Modes',
        mode_list: [
            { name: 'inhibitory_control', mode: 2 },
            { name: 'fatigue', mode: 1 },  // opinion based and analysis based poll issuance at the end of each fortnight
            { name: 'pa_bias', mode: biasList[Math.floor(Math.random()*biasList.length)] },  // opinion based and analysis based poll issuance at the end of each fortnight},
            { name: 'placeholder_adherent', mode: adherenceList[Math.floor(Math.random()*adherenceList.length)] },  // adherence function by Carlo
            { name: 'overall_adherent', mode: '(MA from placeholder) Adherent' }  // weighted average to indicate reliability of adherence behaviour, 6 week, 9 week average, plot moving average
        ]
    }
    fortnight['nutrient_balance']={  // logged or 6 week averaged
        title: 'Nutrient Balance',
        food_list: [
            { name: 'eggs', measure: Math.ceil(Math.random()*3 +2), unit: 'count'},
            { name: 'olive_oil', measure: Math.ceil(Math.random()*50 +200), unit: 'calories'},
            { name: 'butter', measure: Math.ceil(Math.random()*10 +60), unit: 'calories'}
        ]
    }
    fortnight['comments']={
        title:'Comments',
        button_text:'Add Comment',
        comments_list: [
            {author:'',labels:[],timeStamp:'',commentText:'Strict Olive Oil Calories'},
            {author:'',labels:[],timeStamp:'',commentText:'No Cooking with Fat'},
            {author:'',labels:[],timeStamp:'',commentText:'Standing on 1 Leg'}
        ]
    };
    fortnight['rules_header']={
        title: 'Rules Header',
        click_holding: 'Held',
        rules_list: [
            { rule_meaning: 'Adherent', ont_reasoned_rule_text:'?adherentWhoAdherence' },  // breaking down into rule components is a requirement for fullness of description
            { rule_meaning: 'Inferred_Fatigue: 1', ont_reasoned_rule_text:'?PreviousPhysicalActivityDurationsAndTypes' }
        ]
    };  // queue of 2 rules maximum, option to keep either pane and hold pushing or auto push the top pane to below and load new rule to top pane or freeze either pane
    fortnightsList.push(fortnight);
}
console.log(fortnightsList[21])

const cal = (req, res) => {
    res.render('cal-mon', { title: 'Calendar' });
};
const draftSch = (req, res) => {
    res.render('cal-draft-sch', { title: 'draft a schedule for review by your trainer' });
};

const fortnightList = (req, res) => {
    res.render('fortnights-list', { 
        title: 'Fortnights of This Year',
        today: ''
    });
};

module.exports = {
    cal,
    draftSch,
    fortnightList
};
  