/* Agent Static: field agent, 2026. Fighter file for the UTD pop-up engine. */
(function(){const K=UTD.kit;
const SARM='<path d="M132 110 Q152 128 160 140 L172 122" fill="none" stroke-width="17" stroke="#178a80"/><path d="M136 116 Q150 128 156 134" fill="none" stroke-width="5" stroke="#2bbcb0" opacity=".7"/><rect x="161" y="118" width="16" height="9" rx="3" fill="#127068" transform="rotate(-50 169 122)"/><circle cx="174" cy="114" r="8" fill="#d9a37a"/><path d="M178 110 L188 100" stroke="#d9a37a" stroke-width="5" stroke-linecap="round"/>';
UTD.fighter({
 id:'static',name:'Agent Static',short:'Static',he:'she',his:'her',him:'her',ink:'#127a71',
 palette:['#1fa59a','#178a80','#2a9d8f'],corner:'teal',
 body:[
  '<path d="M78 194 L122 194 L126 262 L106 262 L100 214 L94 262 L74 262Z" fill="#2f4a7a"/><path d="M100 214 L106 262 L126 262 L122 194 L102 194Z" fill="#27406b"/><path d="M86 200 L84 258 M114 200 L116 258" stroke="#4a6aa0" stroke-width="1.5"/><rect x="80" y="228" width="12" height="7" rx="2" fill="#a9bde0"/>',
  '<path d="M66 258 H96 V272 H62 Q60 264 66 258Z M104 258 H134 Q140 264 138 272 H104Z" fill="#f7f4ee"/><path d="M62 270 H96 M104 270 H138" stroke="#9aa3ad" stroke-width="3"/><path d="M72 263 L86 266 M112 266 L126 263" stroke="#1fa59a" stroke-width="3"/>',
  '<path d="M68 110 Q56 132 54 152 L78 150" fill="none" stroke-width="17" stroke="#178a80"/>',
  '<path d="M64 104 Q100 90 136 104 L134 198 L66 198Z" fill="#1fa59a"/><path d="M102 96 L136 104 L134 198 L104 198Z" fill="#1a958b"/><rect x="66" y="188" width="68" height="10" fill="#147a71"/><path d="M82 160 H118 L114 184 H86Z" fill="#178a80"/><path d="M84 162 H116" stroke="#2bbcb0" stroke-width="1.5"/>',
  '<path d="M110 128 Q118 122 126 128 M113 132 Q118 128 123 132" stroke="#f7f4ee" stroke-width="2" fill="none"/><circle cx="118" cy="136" r="1.8" fill="#f7f4ee"/>',
  '<path d="M92 104 V130 M108 104 V130" stroke="#f7f4ee" stroke-width="2.5"/><rect x="90" y="130" width="4" height="6" rx="1" fill="#9aa3ad"/><rect x="106" y="130" width="4" height="6" rx="1" fill="#9aa3ad"/>',
  {part:'armR'},
  {cond:'dead',no:'<ellipse cx="88" cy="146" rx="24" ry="17" fill="#8ff4f0" opacity=".45"/>',yes:''},
  {cond:'dead',no:'<rect x="77" y="131" width="20" height="32" rx="4" fill="#20262e"/><rect x="80" y="135" width="14" height="22" rx="1.5" fill="#8ff4f0"/><circle cx="94" cy="134" r="4" fill="#ff3d5e"/><path d="M83 141 H91 M83 145 H89 M83 149 H91" stroke="#2e7d7a" stroke-width="1.5"/>',yes:'<rect x="77" y="131" width="20" height="32" rx="4" fill="#20262e"/><rect x="80" y="135" width="14" height="22" rx="1.5" fill="#0d1014"/>'},
  '<rect x="66" y="144" width="18" height="10" rx="3" fill="#127068"/><circle cx="80" cy="152" r="8" fill="#d9a37a"/>',
  '<path d="M62 76 Q60 26 100 26 Q140 26 138 76 L132 106 L68 106Z" fill="#178a80"/><path d="M70 74 Q70 36 100 36 Q130 36 130 74 L126 98 L74 98Z" fill="#0f5e57"/>',
  '<circle cx="100" cy="68" r="24" fill="#d9a37a"/><path d="M78 56 Q86 40 100 42 Q116 40 122 56 Q112 48 100 50 Q88 48 78 56Z" fill="#2b1d14"/>',
  {cond:'dead',yes:'<path d="M86 60 L95 68 M95 60 L86 68 M105 60 L114 68 M114 60 L105 68" stroke="#2b2a33" stroke-width="2.5"/><path d="M92 86 Q100 80 108 86" stroke="#2b2a33" stroke-width="2.5" fill="none"/>',no:'<path d="M87 63 H96 M104 63 H113" stroke="#2b2a33" stroke-width="3"/><path d="M87 68 Q91 71 96 68 M104 68 Q108 71 113 68" stroke="#a8714d" stroke-width="1.8" fill="none"/><path d="M94 82 H107" stroke="#2b2a33" stroke-width="2.5"/><circle cx="86" cy="76" r="4" fill="#e99a8a" opacity=".5"/><circle cx="114" cy="76" r="4" fill="#e99a8a" opacity=".5"/>'},
  '<circle cx="77" cy="70" r="4.5" fill="#fff"/><circle cx="123" cy="70" r="4.5" fill="#fff"/><path d="M77 74 V82 M123 74 V82" stroke="#fff" stroke-width="2.5"/>'],
 parts:{
  armR:{label:'pointing arm',all:SARM,stump:'<ellipse cx="133" cy="113" rx="9" ry="8" fill="#147a71"/><path d="M128 108 L138 118 M138 108 L129 117" stroke="#bff3ee" stroke-width="2"/>',crop:[124,94,76,52],fly:[0.4,0.27],dir:1,pivot:[132,110],swing:[-0.35,1.3,0.4]}},
 pivot:'armR',hand:[174,114],conds:['dead'],
 intro:{story:'In the teal corner waited Agent Static.',sub:['Field agent, 2026.','Fourteen unread notifications and a licence to scroll.','Weakness: a phone on 1%.'],
  talk:['And the challenger!','She has already muted us.'],talkFired:['DRONES! EVERYWHERE!','She ordered those on next-day delivery.'],
  scene:{boxes:[[0.5,-0.4,0.45,1.3,0.4,'#425790','glass'],[1.0,-0.75,0.4,1.9,0.4,'#5a73b8','glass'],[1.52,-0.3,0.55,1.1,0.4,'#3a4f88','glass'],[2.06,-0.85,0.38,2.0,0.4,'#6c86cc','glass'],[2.62,-0.38,0.62,1.2,0.4,'#425790','glass']],
   pops:[['moon',62,70,100,190],['ledge',160,250,308,60]]},
  pose:[160,292,112,170],tab:{type:'reveal',pop:['drones',160,215,260,150],sound:'drones'}},
 art:{
  moon:[100,190,'<path d="M50 80 V190" stroke="#8ff4f066" stroke-width="3"/><circle cx="50" cy="42" r="36" fill="#f4efd8"/><circle cx="66" cy="32" r="32" fill="#2e3d6e"/><circle cx="34" cy="52" r="4" fill="#ddd6bc"/><circle cx="28" cy="36" r="3" fill="#ddd6bc"/>'],
  ledge:[308,60,'<rect width="308" height="60" fill="#1d2a52"/><rect width="308" height="6" fill="#8ff4f0"/>'],
  drones:[260,150,'<path d="M40 40 V150 M130 14 V150 M220 50 V150" stroke="#ffffff66" stroke-width="2"/>'+K.drone(10,22)+K.drone(100,-4)+K.drone(190,32)],
  drone1:[60,34,K.drone(0,4)],
  env:[60,40,'<rect x="2" y="2" width="56" height="36" rx="3" fill="#f7f4ee"/><path d="M2 4 L30 24 L58 4" fill="none" stroke="#9aa3ad" stroke-width="3"/><circle cx="51" cy="9" r="7" fill="#ff3d5e"/>'],
  bigEnv:[120,80,'<rect x="3" y="3" width="114" height="74" rx="5" fill="#f7f4ee"/><path d="M3 6 L60 46 L117 6" fill="none" stroke="#9aa3ad" stroke-width="4"/><text x="58" y="70" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="13" fill="#2b2a33">RE: RE: RE: RE:</text><circle cx="104" cy="15" r="13" fill="#ff3d5e"/><text x="104" y="20" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="13" fill="#fff">40</text>']},
 attacks:{
  drones:{name:'Drone Swarm',fx:'BZZZT!',quip:'Eight drones. Zero pilot licences.',
   text:'Eight drones dive-bombed {D}. {Dhis_cap} {part} did not make it.',
   icon(g){g.fillRect(-28,-8,56,18);g.fillRect(-46,-20,30,6);g.fillRect(16,-20,30,6);g.fillRect(-34,-16,5,12);g.fillRect(29,-16,5,12);g.fillStyle='#ff3d5e';g.beginPath();g.arc(0,2,5,0,7);g.fill();},
   steps:[{t:0,do:'sound',name:'drones'},{t:0,do:'swarm',prop:'drone1',size:[0.42,0.24],count:4,dur:1900},{t:1900,do:'hit'}]},
  reply:{name:'Reply-All Bomb',fx:'SEND!',quip:'Forty people saw that. Including HR.',
   text:'She hit Reply-All on a forty-person thread. The blast took {Dhis} {part} clean off.',
   icon(g){g.strokeRect(-36,-22,72,46);g.beginPath();g.moveTo(-36,-22);g.lineTo(0,6);g.lineTo(36,-22);g.stroke();g.fillStyle='#ff3d5e';g.beginPath();g.arc(36,-24,14,0,7);g.fill();g.fillStyle='#fff';g.font='700 15px Inter,sans-serif';g.textAlign='center';g.fillText('40',36,-19);},
   steps:[{t:0,do:'volley',prop:'env',size:[0.18,0.12],count:9,interval:95,dur:520,finale:{prop:'bigEnv',size:[0.5,0.33],gap:150,dur:650}},{t:1655,do:'hit'}]},
  ad:{name:'Auto-play Ad',fx:'BLAAAH!',quip:'Skip in five seconds. He did not have five seconds.',
   text:'An unskippable ad blared at full volume. {Dhis_cap} {part} left to find somewhere quieter.',
   icon(g){g.strokeRect(-36,-26,64,46);g.beginPath();g.moveTo(-12,-14);g.lineTo(10,-3);g.lineTo(-12,8);g.closePath();g.fill();g.beginPath();g.arc(34,-3,12,-0.8,0.8);g.stroke();g.beginPath();g.arc(34,-3,24,-0.8,0.8);g.stroke();},
   steps:[{t:0,do:'sound',name:'ad'},{t:0,do:'screen',size:[0.95,0.71],dur:1750,count:5,rings:5,ringColor:'#f2c230',
    draw(g,n){const S=K.SERIF;g.fillStyle='#23222a';g.fillRect(0,0,320,240);const gr=g.createLinearGradient(0,0,320,240);gr.addColorStop(0,'#ff3d5e');gr.addColorStop(1,'#f2c230');g.fillStyle=gr;g.fillRect(16,16,288,180);
     g.fillStyle='#fff';g.textAlign='center';g.font='italic 700 58px '+S;g.fillText('BUY NOW!',160,106);g.font='700 20px Inter,sans-serif';g.fillText('AD · you cannot skip this',160,150);
     g.fillStyle='#f7f4ee';g.fillRect(196,204,108,28);g.fillStyle='#23222a';g.font='700 16px Inter,sans-serif';g.fillText('Skip in '+n,250,224);}},{t:1750,do:'hit'}]}},
 finishers:{}
});
})();
