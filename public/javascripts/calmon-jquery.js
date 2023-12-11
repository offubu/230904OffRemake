console.log("tiny calmon-jquery.js",document.referrer);

const jqget = () => new Promise((resolve) => {
    $.get(`http://localhost:3400/api${window.location.pathname}`, (data) => {  
        resolve(data);  
    })
})

const main = async() => {  let pageData = await jqget();  console.log("main load(01):", pageData);
    
    let scrollX = 2300/24*(pageData.wakingDuration.begin);
    scrollDemo.scrollTo(scrollX,0);

    let allAs = [];
    
    for(let w=0;w<wl.length;w++){
        let idwwl = document.getElementById(wl[w].id);
        let idbuf='';let wind=0;let winh=0;let winm=0;
        for(c in idwwl.id){ 
            if(idwwl.id[c]=='d'){ wind=parseInt(idbuf);  idbuf=''; continue; }
            if(idwwl.id[c]=='h'){ winh=parseInt(idbuf);  idbuf=''; continue; }
            if(idwwl.id[c]=='m'){ winm=parseInt(idbuf);  idbuf=''; continue; }
            idbuf+=idwwl.id[c];
        }

        if(w%48==0){ allAs = [];
            for(let k=1;k<=3;k++) for(a of pageData.days[wind-1][cATSK[k]]) allAs.push(a);
            console.log('all Activities:', allAs);
        }

        let initial = new Date(pageData.days[wind-1].date);
        initial.setHours(winh);    initial.setMinutes(winm);
        let beginLimit = new Date(pageData.days[wind-1].date);
        beginLimit = postBeginCollision(beginLimit, initial, allAs);
        
        initial.setMinutes(initial.getMinutes() + 10);
        let endLimit = new Date(pageData.days[wind-1].date);
        endLimit = postEndCollision(endLimit, initial, allAs);

        idwwl.addEventListener( "click", () => {  console.log('postModalListener for:',idwwl.id)
            let selectTime = new Date(pageData.days[wind-1].date);
            selectTime.setHours(winh);    selectTime.setMinutes(winm);
            pomB.value = selectTime.toISOString().slice(0,16);
            selectTime.setMinutes(selectTime.getMinutes() + 10);
            pomE.value = selectTime.toISOString().slice(0,16);
            pomQd.value = wind;
            
            pomB.min = aBeginCollisionTime.toISOString().slice(0,16);
            pomE.min = selectTime.toISOString().slice(0,16);
            pomE.max = aEndCollisionTime.toISOString().slice(0,16)
        })
    }
    
    for(let d=0;d<14;d++){
        let deRAs = pageData.days[d][cATSK[3]];
        gmPickAppend(d, deRAs, cATSK[3], 'gainsboro');  //  whitesmoke is lighter than gainsboro
        let diGAs = pageData.days[d][cATSK[2]];
        gmPickAppend(d, diGAs, cATSK[2], 'Teal');  //  
        let diPAs = pageData.days[d][cATSK[1]];
        gmPickAppend(d, diPAs, cATSK[1], 'lime');
    }
}


const output = document.querySelector(".output");
const scrollDemo = document.querySelector(".sticky-xhead-ymarg-scroll-window");
scrollDemo.addEventListener( 
    "scroll", 
    event => { output.innerHTML = `scrollTop: ${scrollDemo.scrollTop} <br> scrollLeft: ${scrollDemo.scrollLeft} `; }, 
    { passive: true }
);

const wlc = document.getElementsByClassName("winelch");
const wl = document.getElementsByClassName("winel");
const iaBS = document.getElementsByClassName("iaBarSpan");


const pomG = document.querySelector("#pomGroup"); 
const pomN = document.querySelector("#pomName"); 
const pomC = document.querySelector("#pomCode"); 
const pomB = document.querySelector("#pomBegin"); 
const pomE = document.querySelector("#pomEnd"); 
const pomQd = document.querySelector("#pomQd");
pomB.addEventListener( 'keyup', () => {  console.log(pomB.value);
        let keyupBtVal = new Date(pomB.value);  keyupBtVal.setMinutes(keyupBtVal.getMinutes() + 10);
        pomE.min = keyupBtVal.toISOString().slice(0,16);
    }
)
pomG.value = "blank";
const blankList = ['Select a Type to show Activities']
const ipaList = [
    '(sp1000) No Activity','(sp1001) Walking','(sp1002) Running',
    '(sp11007) Cycling','(am15675) Tennis'
];
const igaList = [
    '(sp9001) Pilates','(sp9002) Yoga','(sp10001) Stretching',
    '(sp13001) Hiking','(am19030) Ice Skating'
];
const eraList = [
    '(r000) Do Not Disurb','(r001) Cook and Eat Breakfast',
    '(r002) Cook and Eat Lunch','(r003) Cook and Eat Dinner',
    '(r010) Sleep Prep'
];
function codeNames(alist){
    while(pomC.firstChild) pomC.removeChild(pomC.firstChild);
    for(a of alist){  let o = document.createElement("option");
        o.innerHTML = a;    pomC.append(o);
    }
}
pomG.addEventListener( 'change', () => {
    if(pomG.value == 'blank') codeNames(blankList);
    if(pomG.value == 'Intended Physical Activity') codeNames(ipaList);
    if(pomG.value == 'Intended General Activity') codeNames(igaList);
    if(pomG.value == 'Expected Routine Activity') codeNames(eraList);
})

//
function postBeginCollision(beginLimit, winElDt, dayActivities){
    let collisionMillis = 0x7fffffff;
    for(a of dayActivities){
        let aDE = new Date(a.duration.end);
        if(winElDt.getTime() - aDE.getTime() < 0) { console.log('continuing'); continue; }
        if(winElDt.getTime() - aDE.getTime() < collisionMillis){ 
            collisionMillis = winElDt.getTime() - aDE.getTime();
            beginLimit = new Date(aDE.getTime());
            beginLimit.setMinutes(beginLimit.getMinutes() + 5);
        }
    }
    return beginLimit
}
//
function postEndCollision(endLimit, winElDt, dayActivities){
    let collisionMillis = 0x7fffffff;
    for(a of dayActivities){
        let aDB = new Date(a.duration.begin);
        if(aDB.getTime() - winElDt.getTime() < 0) { console.log('continuing'); continue; }
        if(aDB.getTime() - winElDt.getTime() < collisionMillis){ 
            collisionMillis = aDB.getTime() - winElDt.getTime();
            endLimit = new Date(aDB.getTime());
            endLimit.setMinutes(endLimit.getMinutes() - 5);
        }
    }
    return endLimit
}

function postModalListener(){    console.log('postModalListener setup')
    let selectTime = new Date(pageData.days[wind-1].date); 
    selectTime.setHours(winh);    selectTime.setMinutes(winm);

// given day hour minutes, check that day's pageData all activities
// POST activity should begin AFTER the previous
// POST activity should end BEFORE the next
// api/controller in group collision required HERE and for all groups.

    pomB.value = selectTime.toISOString().slice(0,16);
    selectTime.setMinutes(selectTime.getMinutes() + 10);
    pomE.min = selectTime.toISOString().slice(0,16);
    pomE.value = selectTime.toISOString().slice(0,16);
}

const gmG = document.querySelector("#gmGroup"); 
const gmN = document.querySelector("#gmName"); 
const gmC = document.querySelector("#gmCode"); 
const gmB = document.querySelector("#gmBegin"); 
const gmE = document.querySelector("#gmEnd"); 
const gmD = document.querySelector("#gmDEL");
//  currentActivityTypeSchemaKeys (cATSK)
let cATSK={
    1:'intentPhysicalActivities',
    2:'intentGroupActivities',
    3:'expectedRoutineActivities'
}
function gmDOnClick(id, aTime, aType){ 
    gmD.addEventListener( "click", ()=>{
        $.ajax({
            url:`http://localhost:3400/api${window.location.pathname}/intent?` 
                + $.param({  "id":id,    "aTime": aTime,    "aType": aType}),
            method:'DELETE'
        }).then( () => {  console.log("ajax DELETE done"); window.location.reload(); });
    });
}

const getModalListener = (wl, groupEl, group) => {  wl.dataset.target='#getModal';
    wl.style.cursor = 'pointer';    wl.style.opacity = '100%';
    wl.innerHTML = '&#128269';

    wl.addEventListener( "click", () => {
        gmG.innerHTML = group;
        gmN.innerHTML = groupEl.activityName
        gmC.innerHTML = groupEl.activityCode
        let gmTime = new Date(groupEl.duration.begin)
        gmB.value = gmTime.toISOString().slice(0,16);
        gmTime = new Date(groupEl.duration.end)
        gmE.value = gmTime.toISOString().slice(0,16);
        gmDOnClick(wl.id, gmTime, group);
    });
}

function halfHourOrdinals(dt,d){
    let h = dt.getHours();    let m = 0;   
    dt.getMinutes()<30 ? m=0 : m=1;
    return (d*48) + (h*2) + m;
}

function getModalPicker(dt, d, pickedA, BIE, group){
    let Ordinal = halfHourOrdinals(dt,d)
    if(BIE=='E' && dt.getMinutes()%30==0) Ordinal-=1;
    console.log('eras assign, winelID:',wl[Ordinal].id); 
    getModalListener(wl[Ordinal], pickedA, group);
}

function appendBeginBar(begin, end, T, d, color){
    let p1 = new Date(begin); p1.setTime(p1.getTime()+1800000);
    let marL = 100*(begin.getMinutes()%30)/30;
    let ihr = document.createElement("hr");
    ihr.style.cssText = `height:2px; margin:-2px 0 0 ${marL}%; backg6round:${color};`;
    if(end.getTime()>=p1.getTime()) ihr.style.width=`${101-marL}%`;
    if(end.getTime()<p1.getTime()) ihr.style.width=`${1+100*(T%30)/30 - marL}%`;
    
    let Ordinal = halfHourOrdinals(begin,d)
    
    iaBS[Ordinal].append(ihr);
}
function appendEndBar(end, T, d, color){
    let ihr = document.createElement("hr");
    ihr.style.cssText = `height:2px; margin:-2px 0 0 -1px; background:${color};opacity:100%;`;
    ihr.style.width= `${1+100*(end.getMinutes()%30)/30}%`;
    
    let Ordinal = halfHourOrdinals(end,d)
    
    if(end.getMinutes()%30==0) { Ordinal-=1; ihr.style.width= `101%`; }
    iaBS[Ordinal].append(ihr);
}
function appendIntervalBar(interval, d, color){
    let ihr = document.createElement("hr");
    ihr.style.cssText = `width:105%; height:2px; margin:-2px 0 0 -2px; background:${color};`;
    let Ordinal = halfHourOrdinals(interval,d)
    iaBS[Ordinal].append(ihr);
}

function gmPickAppend(d, activities, activityType, color){
    for(let a=0;a<activities.length;a++){
        let aBegin = new Date(activities[a].duration.begin);
        let aEnd = new Date(activities[a].duration.end);
        let aTmins = (aEnd.getTime() - aBegin.getTime())/60000;
        
        getModalPicker(aBegin, d, activities[a], 'B', activityType);
        getModalPicker(aEnd, d, activities[a], 'E', activityType);
        
        appendBeginBar(aBegin, aEnd, aTmins, d, color);
        if(aTmins>30) appendEndBar(aEnd, aTmins, d, color);
        
        let aIntervalsNum = Math.ceil(aTmins/30) - 2;  //  for duration=61 min, there will be 1 interval
        if(aTmins%30 > 30-aBegin.getMinutes()%30) aIntervalsNum += 1;  //  if duration=62 minutes begins at 29 minutes, there will be 2 intervals with begin and end durations of 1 minute.
        if(aIntervalsNum==0) continue;
        let interval = new Date(aBegin);
        for(let dI=1;dI<=aIntervalsNum;dI++){ 
            interval.setTime(interval.getTime()+1800000);
            getModalPicker(interval, d, activities[a], 'I', activityType);
            appendIntervalBar(interval, d, color);
        }
    }
}
main();


