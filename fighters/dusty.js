/* Dusty Scales: 1890s travelling carnival bearded dragon. Fighter file for the UTD pop-up engine. */
(function(){
const SKIN='#d4a862',DARK='#b88a4c',LIMB='#c99a55';
UTD.fighter({
 id:'dusty',name:'Dusty Scales',short:'Dusty',he:'he',his:'his',him:'him',ink:'#a1551f',
 palette:['#b5283a','#c99a55','#a6773c'],corner:'sandy',
 body:[
  // tail, legs
  {part:'tail'},
  '<path d="M80 228 Q76 256 70 266 H98 Q98 250 100 230Z M108 230 Q112 252 108 266 H136 Q130 250 128 228Z" fill="'+LIMB+'"/><path d="M72 266 l-4 6 M82 266 l0 7 M92 266 l3 6 M112 266 l-3 6 M122 266 l0 7 M132 266 l4 6" stroke="#6b4a2a" stroke-width="2.5"/>',
  // torso, belly, side spikes
  '<ellipse cx="104" cy="182" rx="38" ry="54" fill="'+SKIN+'"/><ellipse cx="108" cy="192" rx="22" ry="36" fill="#ead096"/><path d="M92 170 H124 M90 184 H126 M92 198 H124 M96 212 H120" stroke="#d9b874" stroke-width="2"/>',
  '<path d="M66 150 l-8 4 l8 6 l-8 4 l8 6 l-8 4 l8 6 l-8 4 l8 6" fill="none" stroke="'+DARK+'" stroke-width="3" stroke-linejoin="round"/>',
  // waistcoat
  '<path d="M68 150 Q72 130 94 126 L100 196 L74 218 Q62 190 68 150Z M140 150 Q136 130 114 126 L108 196 L134 218 Q146 190 140 150Z" fill="#b5283a"/><path d="M114 126 L108 196 L134 218 Q146 190 140 150 Q136 130 114 126Z" fill="#9e2030"/>',
  '<circle cx="97" cy="148" r="3.5" fill="#e6c25a"/><circle cx="98" cy="166" r="3.5" fill="#e6c25a"/><circle cx="99" cy="184" r="3.5" fill="#e6c25a"/><path d="M110 170 Q122 178 132 172" stroke="#e6c25a" stroke-width="2" fill="none"/>',
  // left arm holding the circus programme
  '<path d="M72 150 Q54 166 50 184" fill="none" stroke="'+LIMB+'" stroke-width="13"/>',
  {part:'program'},
  '<circle cx="50" cy="188" r="7.5" fill="'+LIMB+'"/><path d="M45 192 l-3 4 M50 194 l0 5 M55 192 l3 4" stroke="#6b4a2a" stroke-width="2"/>',
  {part:'armR'},
  // head
  '<path d="M66 58 l6 -12 l6 10 l6 -14 l6 12 l8 -14 l6 12 l8 -12 l5 12 l9 -9 l2 13" fill="'+DARK+'" stroke="'+DARK+'" stroke-width="2"/>',
  '<path d="M64 100 Q58 62 96 52 Q134 46 150 72 Q158 92 142 106 Q118 116 90 114 Q70 112 64 100Z" fill="'+SKIN+'"/><path d="M102 52 Q140 52 150 72 Q158 92 142 106 Q132 110 120 112 Q138 92 102 52Z" fill="#c99a55" opacity=".55"/>',
  '<circle cx="80" cy="70" r="3" fill="'+DARK+'"/><circle cx="90" cy="62" r="2.5" fill="'+DARK+'"/><circle cx="72" cy="84" r="2.5" fill="'+DARK+'"/>',
  '<circle cx="122" cy="76" r="11" fill="#fff"/><circle cx="125" cy="77" r="5.5" fill="#2b2a33"/><circle cx="127" cy="75" r="1.8" fill="#fff"/><circle cx="98" cy="76" r="8" fill="#fff"/><circle cx="101" cy="77" r="4" fill="#2b2a33"/>',
  '<path d="M108 62 Q122 56 136 64 M88 66 Q96 62 104 66" stroke="#6b4a2a" stroke-width="4" fill="none"/><circle cx="148" cy="84" r="1.8" fill="#6b4a2a"/><circle cx="143" cy="86" r="1.8" fill="#6b4a2a"/>',
  '<path d="M96 100 Q122 110 148 92" stroke="#6b4a2a" stroke-width="3" fill="none"/><path d="M140 96 l4 6" stroke="#6b4a2a" stroke-width="2.5"/>',
  {part:'collar'},
  {cond:'frill',
   no:'<path d="M74 104 Q88 128 112 120 Q132 126 146 104 Q130 118 110 114 Q90 118 74 104Z" fill="#2b2a33"/><path d="M86 112 l2 8 M98 116 l1 7 M112 117 l0 7 M126 115 l-1 7" stroke="#4d4d58" stroke-width="2"/>',
   yes:'<path d="M54 96 L36 120 L64 120 L56 146 L82 132 L90 158 L104 136 L118 158 L126 132 L150 146 L142 120 L168 120 L150 96 Q100 128 54 96Z" fill="#2b2a33"/><path d="M64 108 L50 120 M80 118 L68 142 M96 124 L92 154 M112 124 L116 154 M128 118 L142 142 M140 108 L158 120" stroke="#55555f" stroke-width="2.5"/><path d="M60 118 L64 120 M84 130 L82 132 M118 156 L118 158" stroke="#e8673f" stroke-width="3"/>'},
  {cond:'cold',no:'',yes:'<ellipse cx="104" cy="180" rx="44" ry="58" fill="#7fc8f0" opacity=".28"/><path d="M64 100 Q58 62 96 52 Q134 46 150 72 Q158 92 142 106 Q118 116 90 114 Q70 112 64 100Z" fill="#7fc8f0" opacity=".3"/><path d="M80 118 l3 14 l3 -14 M96 122 l3 18 l3 -18 M114 122 l3 15 l3 -15 M130 116 l3 12 l3 -12" fill="#e8f6ff" stroke="#bfe3f2" stroke-width="1.5"/><path d="M146 84 q6 2 4 8" stroke="#7fc8f0" stroke-width="3" fill="none"/><path d="M40 120 l-10 -4 M44 132 l-12 2 M168 120 l10 -4 M164 134 l12 2" stroke="#7fc8f0" stroke-width="3"/><path d="M70 230 l6 -6 l6 6 M120 230 l6 -6 l6 6" stroke="#e8f6ff" stroke-width="3" fill="none"/>'}],
 parts:{
  tail:{label:'tail',all:'<path d="M80 222 Q34 236 20 258 Q16 272 32 270 Q52 262 88 238Z" fill="'+DARK+'"/><path d="M40 252 l-6 -8 l10 2 M54 246 l-4 -9 l9 4 M68 240 l-2 -9 l8 5" fill="'+DARK+'" stroke="'+DARK+'" stroke-width="3"/>',
   stump:'<path d="M84 226 l-6 3 l3 4 l-5 4 l6 2 l3 -3 l4 3 l1 -8Z" fill="#b5121b"/>',crop:[12,216,84,60],fly:[0.42,0.3],dir:-1},
  program:{label:'rolled-up circus programme',all:'<g transform="rotate(-24 46 186)"><rect x="24" y="178" width="46" height="17" rx="7.5" fill="#f3e6c4"/><rect x="40" y="178" width="9" height="17" fill="#b5283a"/><ellipse cx="25" cy="186.5" rx="3.2" ry="8.5" fill="#e0cfa0"/><path d="M30 182 H38 M52 182 H64 M52 190 H62" stroke="#c9b48e" stroke-width="1.5"/></g>',
   stump:'',crop:[16,164,60,44],fly:[0.32,0.24],dir:-1},
  collar:{label:'brass bell collar',all:'<path d="M84 124 Q106 136 130 124 L130 133 Q106 145 84 133Z" fill="#d9a91d"/><path d="M86 127 Q106 138 128 127" stroke="#f2d27a" stroke-width="1.5" fill="none"/><circle cx="107" cy="146" r="8.5" fill="#e6c25a"/><path d="M101 147 H113" stroke="#8a6a1a" stroke-width="2"/><circle cx="107" cy="151" r="2" fill="#8a6a1a"/><circle cx="104" cy="143" r="2" fill="#fff6d0"/>',
   stump:'<path d="M88 130 Q106 139 126 130" stroke="#e8d3a0" stroke-width="3" fill="none"/>',crop:[80,118,54,40],fly:[0.3,0.22],dir:-1},
  armR:{label:'claw arm',all:'<path d="M134 150 Q154 158 164 140" fill="none" stroke="'+LIMB+'" stroke-width="13"/><circle cx="166" cy="135" r="7.5" fill="'+LIMB+'"/><path d="M168 128 l2 -5 M173 132 l5 -2 M172 138 l5 1" stroke="#6b4a2a" stroke-width="2"/>',
   stump:'<path d="M128 144 l5 -5 l4 4 l5 -3 l2 6 l-3 4 l3 4 l-6 2 l-3 -3 l-5 2Z" fill="#b5121b"/><circle cx="134" cy="150" r="3" fill="#f3d2c2"/>',crop:[126,120,58,44],fly:[0.36,0.27],dir:-1,pivot:[134,150],swing:[0.6,-1.0,0.35]}},
 pivot:'armR',hand:[166,135],
 intro:{story:'In the sandy corner: Dusty Scales.',sub:['Carnival reptile, 1894. Former opening act.','Eats anything that moves. Has been asked to stop.','Weakness: cold drafts. Also mirrors.'],
  talk:['Look at the FRILL on that boy!','He looks like a pinecone that owes money.'],talkFired:['HE IS EATING THE WARM-UP ACT!','Those locusts had families. Briefly.'],
  scene:{boxes:[[0.55,-0.45,0.8,0.62,0.4,'#b5283a','stripe'],[2.55,-0.6,0.85,0.72,0.4,'#3a6fb0','stripe'],[1.6,0.84,0.62,0.3,0.36,'#e6c25a','stripe']],
   pops:[['dunes',160,240,308,100],['cactus',52,160,70,130],['sunLamp',250,150,90,200]]},
  pose:[160,285,120,168],tab:{type:'swap',cond:'frill',lift:0.3,sound:'fanfare',pop:['heat',160,180,260,140],fx:'eat',bug:'cricket',count:4,mouth:[146,96]}},
 art:{
  dunes:[308,100,'<path d="M0 60 Q60 20 120 50 Q180 14 240 46 Q280 30 308 44 V100 H0Z" fill="#e6b86a"/><path d="M0 74 Q70 50 150 70 Q230 52 308 70 V100 H0Z" fill="#d9a352"/><path d="M40 82 Q80 74 120 82 M190 80 Q230 72 270 80" stroke="#f2cf8a" stroke-width="3" fill="none"/>'],
  cactus:[70,130,'<path d="M30 130 V30 Q30 14 38 14 Q46 14 46 30 V130Z" fill="#5f9e5a"/><path d="M30 70 H18 Q12 70 12 60 V40 Q12 34 17 34 Q22 34 22 40 V58 H30Z M46 82 H56 Q62 82 62 72 V54 Q62 48 57 48 Q52 48 52 54 V72 H46Z" fill="#4f8a4b"/><path d="M38 24 V120" stroke="#77b571" stroke-width="2"/><circle cx="38" cy="12" r="5" fill="#e8673f"/>'],
  sunLamp:[90,200,'<rect x="42" y="70" width="6" height="124" fill="#8a6a1a"/><rect x="28" y="190" width="34" height="8" rx="3" fill="#5a3a20"/><path d="M14 64 L76 64 L64 30 L26 30Z" fill="#d9a91d"/><ellipse cx="45" cy="64" rx="31" ry="7" fill="#fff3a6"/><path d="M45 70 L10 120 M45 70 L80 120 M45 70 L45 128" stroke="#fff3a6" stroke-width="3" opacity=".7"/>'],
  heat:[260,140,'<path d="M30 140 Q20 110 40 90 Q60 70 50 40 M90 140 Q80 100 100 80 Q120 60 110 20 M150 140 Q140 104 160 84 Q180 64 170 30 M210 140 Q200 110 220 90 Q240 70 230 44" stroke="#ffd23f" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>'],
  cricket:[90,66,'<ellipse cx="44" cy="36" rx="28" ry="15" fill="#6ab04c"/><circle cx="72" cy="30" r="11" fill="#78c25a"/><circle cx="76" cy="27" r="3.5" fill="#fff"/><circle cx="77" cy="27" r="1.8" fill="#2b2a33"/><path d="M78 20 Q90 4 86 0 M74 20 Q80 2 74 0" stroke="#4f8a3b" stroke-width="2" fill="none"/><path d="M30 46 L18 62 M44 50 L40 64 M24 30 L4 10 L14 40" stroke="#4f8a3b" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M26 28 Q44 18 60 28" stroke="#9fd884" stroke-width="3" fill="none"/>']},
 attacks:{
  tail:{name:'Sandstorm Tail Whip',fx:'SPLAT!',quip:'She will need a new gym membership. Half price.',call:['Watch the tail! Watch the TAIL!','Everyone is watching the tail, Barry.'],
   text:'A pleated tail snapped out and flung a fan of sand. {Dhis_cap} {part} spun away.',
   icon(g){g.lineWidth=8;g.beginPath();g.moveTo(-40,20);for(let k=0;k<6;k++)g.lineTo(-30+k*14,k%2?-6:14);g.stroke();for(let k=0;k<7;k++){g.beginPath();g.arc(30+Math.random()*16,-30+Math.random()*24,4,0,7);g.fill();}},
   steps:[{t:0,do:'sound',name:'whack'},{t:0,do:'sound',name:'sand'},{t:0,do:'tailwhip',grow:500,snap:450},{t:850,do:'hit'}]},
  cricket:{name:'Locust Pounce Toss',fx:'CRUNCH!',quip:'That locust died doing what it loved. Being thrown.',call:['He is reaching into his MOUTH!','Please let it not be lunch. It is lunch.'],
   text:'Dusty sprang off the speed bump and hurled a rubbery cricket. It bounced once, then took {Dhis} {part} clean off.',
   icon(g){g.beginPath();g.ellipse(-6,6,26,13,0,0,7);g.fill();g.beginPath();g.arc(24,0,10,0,7);g.fill();g.lineWidth=5;g.beginPath();g.moveTo(-20,14);g.lineTo(-30,32);g.moveTo(-4,18);g.lineTo(-8,32);g.moveTo(-24,0);g.lineTo(-40,-22);g.stroke();},
   steps:[{t:0,do:'hop',dur:600,height:0.45},{t:0,do:'sound',name:'boing'},{t:350,do:'bounce',prop:'cricket',size:[0.34,0.25],dur:1000,arc:0.9,spin:2},{t:1350,do:'hit'}]},
  bob:{name:'Head-Bob Charge',fx:'SNAP!',quip:'A headbutt is just a hug with commitment.',call:['He is bobbing! WHY is he bobbing?!','It is either a charge or a song.'],
   text:'Dusty bobbed his head like a bobblehead, then skidded into {Dhis} shin. {Dhis_cap} {part} jolted loose.',
   icon(g){g.beginPath();g.arc(0,0,18,0,7);g.fill();g.lineWidth=5;for(let k=0;k<3;k++){g.beginPath();g.arc(0,0,26+k*8,-0.6,0.6);g.stroke();g.beginPath();g.arc(0,0,26+k*8,Math.PI-0.6,Math.PI+0.6);g.stroke();}},
   steps:[{t:0,do:'sound',name:'click'},{t:0,do:'charge',bob:700,dur:1500},{t:1040,do:'sound',name:'thud'},{t:1060,do:'hit'}]}},
 finishers:{}
});
})();
