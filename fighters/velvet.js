/* Agent Velvet: field agent, 1966. Fighter file for the UTD pop-up engine. */
(function(){const K=UTD.kit;
const VB='<path d="M68 106 Q56 128 50 150 L46 168" fill="none" stroke-width="17" stroke="#d99a1c"/><path d="M66 112 Q57 130 51 148" fill="none" stroke-width="5" stroke="#efbf4a" opacity=".7"/><rect x="38" y="160" width="18" height="9" rx="3" fill="#c98d12" transform="rotate(8 47 164)"/>';
const VF='<circle cx="47" cy="174" r="9" fill="#f2c9a0"/><path d="M42 172 Q47 168 52 172" fill="none" stroke="#c99a74" stroke-width="1.5"/><rect x="20" y="180" width="52" height="34" rx="4" fill="#8a5630"/><rect x="20" y="180" width="52" height="9" rx="3" fill="#6f4224"/><rect x="42" y="186" width="9" height="7" rx="1.5" fill="#e6c25a"/><path d="M36 180 V171 H56 V180" fill="none" stroke="#5a3a20" stroke-width="3.5"/><path d="M24 206 H68" stroke="#6f4224" stroke-width="1.5"/>';
const RARM='<path d="M132 106 Q150 120 160 132 Q158 112 152 96" fill="none" stroke-width="17" stroke="#d99a1c"/><path d="M134 110 Q148 122 156 128" fill="none" stroke-width="5" stroke="#efbf4a" opacity=".7"/><rect x="144" y="92" width="17" height="8" rx="3" fill="#c98d12" transform="rotate(-10 152 96)"/><circle cx="151" cy="86" r="10" fill="#f2c9a0"/><path d="M145 82 H157 M145 86 H157" stroke="#c99a74" stroke-width="1.5"/>';
UTD.fighter({
 id:'velvet',name:'Agent Velvet',short:'Velvet',he:'he',his:'his',him:'him',ink:'#a87100',
 palette:['#e8ab2a','#d99a1c','#c98d12'],corner:'mustard',
 // drawing order; {part} entries are removable, {cond} entries switch on a condition
 body:[
  '<path d="M50 188 Q58 236 62 248 Q68 226 72 188Z M128 188 Q136 236 140 248 Q146 226 150 188Z" fill="#ff7a1a"/><path d="M54 188 Q60 218 62 230 Q66 214 68 188Z M132 188 Q138 218 140 230 Q144 214 146 188Z" fill="#ffd23f"/><path d="M58 188 Q61 204 62 210 Q64 202 65 188Z M136 188 Q139 204 140 210 Q142 202 143 188Z" fill="#fff6d0"/>',
  '<path d="M50 180 H70 L66 192 H54Z M130 180 H150 L146 192 H134Z" fill="#c0392b"/>',
  '<rect x="46" y="94" width="28" height="90" rx="13" fill="#9aa3ad"/><rect x="126" y="94" width="28" height="90" rx="13" fill="#8b949e"/><rect x="50" y="98" width="7" height="80" rx="3.5" fill="#c3cad1"/><rect x="130" y="98" width="7" height="80" rx="3.5" fill="#b0b8c0"/><rect x="46" y="110" width="28" height="5" fill="#6d757e"/><rect x="46" y="160" width="28" height="5" fill="#6d757e"/><rect x="126" y="110" width="28" height="5" fill="#646c75"/><rect x="126" y="160" width="28" height="5" fill="#646c75"/><circle cx="60" cy="136" r="5" fill="#f4f1ea"/><path d="M60 136 L63 133" stroke="#c0392b" stroke-width="1.5"/>',
  '<path d="M76 186 L124 186 L129 262 L106 262 L100 212 L94 262 L71 262Z" fill="#6b3f22"/><path d="M100 212 L106 262 L129 262 L124 186 L104 186Z" fill="#5a331b"/><path d="M84 196 L82 258 M116 196 L118 258" stroke="#7d4c2b" stroke-width="1.5"/>',
  '<path d="M68 262 H96 Q98 272 90 274 H66 Q62 268 68 262Z M104 262 H132 Q138 268 134 274 H110 Q102 272 104 262Z" fill="#23222a"/><path d="M72 266 H80 M114 266 H122" stroke="#fff" stroke-width="2" opacity=".6"/>',
  {part:'armL',piece:'back'},
  '<path d="M66 100 Q100 86 134 100 L130 184 L70 184Z" fill="#e8ab2a"/><path d="M102 92 L134 100 L130 184 L104 184Z" fill="#d99a1c"/><path d="M80 110 V180 M90 106 V182 M110 106 V182 M120 110 V180" stroke="#f2c050" stroke-width="1.5" opacity=".7"/>',
  '<rect x="72" y="182" width="56" height="9" fill="#2b2a33"/><rect x="95" y="181" width="11" height="11" rx="2" fill="#e6c25a"/>',
  '<path d="M78 98 L74 150 M122 98 L126 150" stroke="#6f4224" stroke-width="5"/>',
  '<rect x="85" y="80" width="30" height="20" rx="8" fill="#c98d12"/><path d="M88 85 H112 M88 90 H112 M88 95 H112" stroke="#e8ab2a" stroke-width="1.5"/>',
  {part:'armR'},
  {part:'armL',piece:'front'},
  '<circle cx="71" cy="60" r="6" fill="#e9b98d"/><circle cx="129" cy="60" r="6" fill="#e9b98d"/><circle cx="100" cy="58" r="28" fill="#f2c9a0"/><path d="M80 70 Q100 92 120 70 Q118 84 100 86 Q82 84 80 70Z" fill="#e3b088"/>',
  '<path d="M71 54 Q74 20 104 24 Q136 26 130 56 Q122 38 98 40 Q84 42 71 54Z" fill="#3a2414"/><path d="M84 32 Q100 26 118 32" stroke="#6b4a30" stroke-width="3" fill="none"/><path d="M72 50 L72 74 L79 72 L78 52Z M128 50 L128 74 L121 72 L122 52Z" fill="#3a2414"/>',
  '<path d="M80 48 Q89 44 97 48 M103 48 Q111 44 120 48" stroke="#3a2414" stroke-width="3" fill="none"/><rect x="79" y="52" width="19" height="13" rx="5" fill="#23222a"/><rect x="102" y="52" width="19" height="13" rx="5" fill="#23222a"/><path d="M98 56 H102" stroke="#23222a" stroke-width="3"/><rect x="83" y="54" width="5" height="3" rx="1" fill="#fff" opacity=".8"/><rect x="106" y="54" width="5" height="3" rx="1" fill="#fff" opacity=".8"/>',
  '<path d="M100 64 Q97 70 101 71" stroke="#c99a74" stroke-width="2" fill="none"/><path d="M89 76 Q101 82 112 72" stroke="#7a3e2a" stroke-width="2.5" fill="none"/>'],
 parts:{
  armL:{label:'briefcase arm',back:VB,front:VF,stump:'<ellipse cx="68" cy="110" rx="8" ry="10" fill="#c98d12"/><path d="M63 104 L72 116 M72 104 L64 114" stroke="#fff6d0" stroke-width="2"/>',crop:[12,94,70,124],fly:[0.38,0.67],dir:-1},
  armR:{label:'punching arm',all:RARM,stump:'',crop:[122,74,48,70],pivot:[132,106],swing:[0.6,-1.0,0.35]}},
 pivot:'armR',hand:[151,86],jet:[0,190],
 intro:{story:'In the mustard corner stood Agent Velvet.',sub:['Field agent, 1966.','Never met a gadget he could not over-engineer.','Weakness: phone cords. All phone cords.'],
  talk:['Look at that jetpack!','Look at that turtleneck.'],talkFired:['LIFT-OFF!','He has not checked the weather.'],
  scene:{boxes:[[0.55,-0.35,0.5,1.0,0.35,'#e8673f','retro'],[1.02,-0.6,0.45,1.5,0.35,'#f2c94c','retro'],[1.48,-0.15,0.55,0.8,0.35,'#3a6fb0','retro'],[1.98,-0.45,0.42,1.25,0.35,'#f4a08a','retro'],[2.55,-0.2,0.66,0.85,0.35,'#2f8f8a','retro']],
   pops:[['sun',236,92,110,200],['cloud',160,252,308,90]]},
  pose:[160,285,120,168],tab:{type:'lift',sound:'whoosh'}},
 art:{
  sun:[110,200,'<path d="M55 90 V200" stroke="#f7f4ee" stroke-width="3"/>'+Array.from({length:12},(_,k)=>{const a=k/12*Math.PI*2;return '<path d="M'+(55+Math.cos(a)*42).toFixed(1)+' '+(50+Math.sin(a)*42).toFixed(1)+' L'+(55+Math.cos(a+0.13)*54).toFixed(1)+' '+(50+Math.sin(a+0.13)*54).toFixed(1)+' L'+(55+Math.cos(a+0.26)*42).toFixed(1)+' '+(50+Math.sin(a+0.26)*42).toFixed(1)+'Z" fill="#f2c230"/>';}).join('')+'<circle cx="55" cy="50" r="38" fill="#fbe7a1"/><circle cx="55" cy="50" r="28" fill="#f7d76a"/>'],
  cloud:[308,90,'<path d="M0 40 Q30 10 60 34 Q90 6 130 30 Q170 8 200 34 Q240 10 270 32 Q295 22 308 36 V90 H0Z" fill="#f7f4ee"/>'],
  pot:[90,80,'<path d="M10 30 H80 L72 66 Q45 76 18 66Z" fill="#e8673f"/><path d="M45 30 H80 L72 66 Q58 72 45 72Z" fill="#c0392b"/><ellipse cx="45" cy="30" rx="35" ry="8" fill="#f7d76a"/><path d="M4 34 H14 M76 34 H86" stroke="#5a3a20" stroke-width="5" stroke-linecap="round"/><path d="M22 66 L16 80 M68 66 L74 80" stroke="#5a3a20" stroke-width="4"/><path d="M50 30 L70 2" stroke="#9aa3ad" stroke-width="3"/>'],
  fork:[120,24,'<rect x="0" y="9" width="70" height="6" rx="3" fill="#6f4224"/><rect x="68" y="10" width="34" height="4" fill="#9aa3ad"/><path d="M100 6 H118 M100 12 H118 M100 18 H118" stroke="#9aa3ad" stroke-width="2.5"/><circle cx="110" cy="12" r="9" fill="#f7d76a"/>'],
  bubble:[170,95,'<path d="M10 8 H160 Q166 8 166 14 V62 Q166 68 160 68 H50 L28 90 L34 68 H10 Q4 68 4 62 V14 Q4 8 10 8Z" fill="#fff"/><text x="85" y="48" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="26" fill="#2b2a33">Please hold.</text>'],
  note:[40,56,'<ellipse cx="13" cy="46" rx="11" ry="8" fill="#2f3858" transform="rotate(-20 13 46)"/><rect x="21" y="4" width="4" height="42" fill="#2f3858"/><path d="M25 4 Q38 12 34 26 Q32 16 25 14Z" fill="#2f3858"/>']},
 attacks:{
  jet:{name:'Jetpack Dropkick',fx:'WHOOSH!',quip:'Health and safety would like a word.',
   text:'He lit the jetpack and dropkicked {Dhis} {part} into next week.',
   icon(g){g.fillRect(-26,-30,20,50);g.fillRect(6,-30,20,50);g.fillStyle='#ff7a1a';g.beginPath();g.moveTo(-26,22);g.lineTo(-16,46);g.lineTo(-6,22);g.moveTo(6,22);g.lineTo(16,46);g.lineTo(26,22);g.fill();},
   steps:[{t:0,do:'sound',name:'whoosh'},{t:0,do:'dash',dur:1500,trail:'flame'},{t:900,do:'hit'}]},
  rotary:{name:'Rotary Grapple',fx:'RING RING!',quip:'He dialled nine for pain.',
   text:'He lassoed {Dhim} with a curly phone cord and disconnected {Dhis} {part}.',
   icon(g){g.beginPath();g.arc(0,8,24,0,7);g.stroke();for(let a=0;a<8;a++){g.beginPath();g.arc(Math.cos(a*0.75)*14,8+Math.sin(a*0.75)*14,3,0,7);g.fill();}g.beginPath();g.moveTo(-34,-22);g.quadraticCurveTo(0,-40,34,-22);g.lineWidth=12;g.stroke();},
   steps:[{t:0,do:'sound',name:'ring'},{t:150,do:'tether',color:'#e9dcc0',grow:550,yank:520,coils:3},{t:1670,do:'hit'}]},
  fondue:{name:'Flaming Fondue',fx:'SIZZLE!',quip:'Gruyère at that temperature is a weapon.',
   text:'One flick of the fondue fork and {Dhis} {part} went the way of the gruyère.',
   icon(g){g.beginPath();g.moveTo(-30,-4);g.lineTo(30,-4);g.lineTo(22,26);g.lineTo(-22,26);g.closePath();g.fill();g.lineWidth=4;g.beginPath();g.moveTo(8,-4);g.lineTo(30,-44);g.stroke();g.fillStyle='#ff7a1a';g.beginPath();g.moveTo(-14,30);g.lineTo(-8,44);g.lineTo(-2,30);g.moveTo(2,30);g.lineTo(8,44);g.lineTo(14,30);g.fill();},
   steps:[{t:0,do:'sound',name:'sizzle'},{t:0,do:'source',prop:'pot',size:[0.52,0.46],dx:0.5,dz:0.18,dur:1700,flames:true},
    {t:600,do:'lob',prop:'fork',size:[0.5,0.1],from:{dx:0.5,y:0.5,dz:0.18},dur:700,spin:3,trail:'flame',splat:'#f7d76a'},{t:550,do:'sound',name:'whoosh'},{t:1300,do:'hit'}]}},
 finishers:{
  hold:{name:'Please hold.',card:'{A} said "Please hold."',
   steps:[{t:0,do:'sound',name:'hold'},{t:0,do:'speech',prop:'bubble',size:[0.85,0.47],dx:0.4,y:1.95,hold:2200},
    {t:250,do:'stream',prop:'note',size:[0.13,0.18],count:7,interval:230,dur:900},{t:300,do:'sway',dur:1900},{t:2300,do:'ko'}]}}
});
})();
