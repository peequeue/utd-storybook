/* Episode 1: Agent Velvet vs Agent Static. Scripted ending: Velvet wins by KO in round three. */
UTD.episode({
 id:'1',title:'Season 2, Episode 1',cardTitle:'Ultimate Teams Deathmatch · Season 2 · Episode 1',
 fighters:['velvet','static'],          // [left, right]
 winner:'velvet',loserCond:'dead',method:'KO · Round three',methodText:'KO in round three',
 signs:{A:[[70,'GO VELVET!','#c98d12'],[230,'#TEAMSTATIC','#178a80']],C:[[150,'ARMS ARE OPTIONAL','#e8673f']],
  A2:[[90,'PLEASE HOLD','#2f3858'],[220,'1966 4EVA','#c98d12']],C2:[[150,'REPLY ALL!','#178a80']]},
 spreads:[
  {type:'title',bg:['#bfd67e','#efe2c4'],banner:['Season Two','analogue vs digital'],
   story:'One grey Monday, two spies logged into the same Teams chat.',sub:['Ultimate Teams Deathmatch','Season Two, Episode One'],
   talk:['Welcome to Season Two, folks!','Same chat. New book.']},
  {type:'intro',fighter:'velvet',bg:['#f4dc93','#a9d9e8']},
  {type:'intro',fighter:'static',bg:['#a7e0d6','#2e3d6e']},
  {type:'round',attacker:'static',defender:'velvet',injury:'armL',bg:['#3fb0ad','#3fb0ad'],
   arena:{type:'ring',size:'spread',towers:true},choose:{type:'tabs',options:['drones','reply','ad']},spring:'static',
   story:'DING! Static struck first.',
   texts:{drones:'Eight drones dive-bombed his briefcase hand. The briefcase survived. The arm did not.',
    reply:'She hit Reply-All on a forty-person thread. The blast took his arm clean off.',
    ad:'An unskippable ad blared at full volume. His arm left to find somewhere quieter.'},
   talk:{before:['Here we go! Lights!','Pick something nasty.'],after:['HIS ARM! HIS ACTUAL ARM!']}},
  {type:'round',attacker:'velvet',defender:'static',injury:'armR',bg:['#3fb0ad','#3fb0ad'],
   arena:{type:'ring',size:'spread',towers:true},choose:{type:'dial',options:['jet','rotary','fondue']},
   story:'Velvet shrugged it off. Well, half of it.',
   texts:{jet:'He lit the jetpack and dropkicked her pointing arm into next week.',
    rotary:'He lassoed her with a curly phone cord and disconnected her pointing arm.',
    fondue:'One flick of the fondue fork and her pointing arm went the way of the gruyère.'},
   talk:{before:['He is still standing!','Mostly.'],after:['AN ARM FOR AN ARM!']}},
  {type:'finish',attacker:'velvet',defender:'static',bg:['#e9e2f4','#3fb0ad'],arena:{type:'ring',size:'page'},
   mechanism:{type:'batteryWheel',labels:['40%','12%','3%','1%','1%','1%'],taps:3},finisher:'hold',
   story:'Static grabbed her phone to call in the whole drone fleet.',
   texts:{start:['Tap the wheel to charge it.'],progress:['The battery says {v}. That is not how charging works.'],
    done:['1%. The screen went black.','Pull the tab for Velvet\'s finisher.'],ko:['Velvet leaned in and whispered: "Please hold."','Static went down like a dropped call.']},
   talk:{start:['Round three!','Battery check.'],progress:['She is charging up!','She is not.'],done:['THE PHONE IS DOWN!','Someone check on her group chats.'],
    ko:["IT'S OVER!",'Analogue lives. Somebody fetch the slide projector.'],notYet:['Not yet!','Her phone still has juice. Allegedly.']},
   card:['{A} said "Please hold."','Her phone died at 1%. KO.']},
  {type:'winner',bg:['#38b6c2','#38b6c2'],story:'And that is how a one-armed man with a rotary phone won Monday.'}
 ]
});
