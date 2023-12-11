for(let w=0;w<wl.length;w++){
    let idwwlc = document.getElementById(wlc[w].id);  let idwwl = document.getElementById(wl[w].id);    

    let idbuf='';let wind=0;let winh=0;let winm=0;
    for(c in idwwl.id){ idbuf+=idwwl.id[c];
        if(idwwl.id[c]=='d'){ wind=parseInt(idbuf);  idbuf=''; continue; }
        if(idwwl.id[c]=='h'){ winh=parseInt(idbuf);  idbuf=''; continue; }
        if(idwwl.id[c]=='m'){ winm=parseInt(idbuf);  idbuf=''; continue; }
    }
    console.log(
        '>> idwwl.id:',idwwl.id,'idwwlc.id:',idwwlc.id,
        'wind:',wind,'winh:',winh,'winm:',winm);
    console.log(`days[wind]: `,pageData.days[wind-1]);

    idwwl.addEventListener( "click",
        () => {  console.log('clickListener=>outer_scope_idwwl.id:',idwwl.id)                
            let selectTime = new Date(pageData.days[wind-1].date); 
            selectTime.setHours(winh);    selectTime.setMinutes(winm);
            bt.value = selectTime.toISOString().slice(0,16);
            selectTime.setMinutes(selectTime.getMinutes() + 10);
            et.min = selectTime.toISOString().slice(0,16);
            et.value = selectTime.toISOString().slice(0,16);
        }
    )

    let wdate = new Date(pageData.days[wind-1].date);    wdate.setHours(winh);    wdate.setMinutes(winm);
    let wdate1 = new Date(wdate);    wdate1.setMinutes(wdate1.getMinutes()+30);
    
    // static5 powderblue
    for(let i=0;i<5;i++){
        let deraBegin = new Date(pageData.days[wind-1].expectedRoutineActivities[i].duration.begin)
        let deraEnd = new Date(pageData.days[wind-1].expectedRoutineActivities[i].duration.end)
        let deraT = deraEnd.getTime()-deraBegin.getTime();
        let deraIntervals = [];
        let dIN = Math.ceil(deraT/1800000) - 2;
        
        
        console.log(
            '|| wdate',wdate.toISOString().slice(0,16),  '|| wdate1',wdate1.toISOString().slice(0,16),
            '||||| deraBegin',deraBegin.toISOString().slice(0,16),  '|| deraEnd',deraEnd.toISOString().slice(0,16),
            '|| deraT',deraT,  '|| dIN',dIN
            );
        if(deraT>3600000) console.log('over 1hr, activity occupies at least 3 instances of 30 min intervals');

        //- if(dIN==0){
        if(
            (deraBegin.getTime()>=wdate.getTime()  &&  deraBegin.getTime()<wdate1.getTime())
            ||
            (deraEnd.getTime()>=wdate.getTime()  &&  deraEnd.getTime()<wdate1.getTime())
        ){  console.log('style changing');
            getModalListener(idwwl,pageData.days[wind-1].expectedRoutineActivities[i])
        }
        //- }
        if( deraBegin.getTime()>=wdate.getTime()  &&  deraBegin.getTime()<wdate1.getTime()){ 
            let marL = 100*(deraBegin.getMinutes()%30)/30;
            
            let ihr = document.createElement("hr");
            ihr.style.cssText = `height:2px; margin:-3px 0 0 ${marL}%; background:white;`;
            if(deraEnd.getTime()>=wdate1.getTime()) ihr.style.width='${100-marL}%';
            if(deraEnd.getTime()<wdate1.getTime()) ihr.style.width=`${100-100*(deraT/60000%30)/30}%`;
            iaBS[w].append(ihr);
        }
        if( deraEnd.getTime()>=wdate.getTime()  &&  deraEnd.getTime()<wdate1.getTime() ){
            console.log("endbar")
            let ihr = document.createElement("hr");
            ihr.style.cssText = `height:2px; margin:-3px 0 0 0; background:white;opacity:100%;`;
            ihr.style.width= `${100*(deraT/60000%30)/30}%`;
            iaBS[w].append(ihr);
        }

        if(dIN>0){
            for(let dI=1; dI<=dIN; dI++){  let interval = new Date(deraBegin);
                interval.setTime(interval.getTime()+dI*1800000);
                deraIntervals.push(interval);
            }
        }

        for(let dI=1;dI<=dIN;dI++){
            if(
            (deraIntervals[dI-1].getTime()>=wdate.getTime() && deraIntervals[dI-1].getTime()<wdate1.getTime())
            ){  console.log('style changing');  
                getModalListener(idwwl,pageData.days[wind-1].expectedRoutineActivities[i])
            

                let ihr = document.createElement("hr");
                ihr.style.cssText = `opacity:85%;width:110%; height:2px; margin:-3px 0 0 -2px; background:white;`;
                iaBS[w].append(ihr);
            }
        }
    }
}