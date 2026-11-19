/* Madame Bristle: 1880s circus sideshow bearded lady and strongwoman. Fighter file for the UTD pop-up engine. */
(function(){
const SK='#eebf98',HAIR='#7a3a1f',BEARD='#6b2f1a',PINK='#e85d9a';
const STUMP=(x,y)=>'<path d="M'+(x-6)+' '+(y-4)+' l5 -4 l4 4 l5 -3 l2 6 l-3 4 l3 4 l-6 2 l-3 -3 l-5 2Z" fill="#b5121b"/><circle cx="'+x+'" cy="'+y+'" r="3" fill="#f3d2c2"/>';
UTD.fighter({
 id:'bristle',name:'Madame Bristle',short:'Bristle',he:'she',his:'her',him:'her',ink:'#a8326e',
 palette:['#a8326e','#c0392b','#a8862a'],corner:'velvet',
 body:[
  // long flowing hair behind everything
  '<path d="M68 58 Q62 28 100 26 Q138 28 132 58 Q146 92 140 130 Q132 140 124 128 Q128 108 122 96 L78 96 Q72 108 76 128 Q68 140 60 130 Q54 92 68 58Z" fill="'+HAIR+'"/><circle cx="62" cy="128" r="8" fill="'+HAIR+'"/><circle cx="138" cy="128" r="8" fill="'+HAIR+'"/><path d="M66 80 Q62 100 66 120 M134 80 Q138 100 134 120" stroke="#9a5030" stroke-width="3" fill="none"/>',
  // boots with heels and laces
  '<path d="M74 212 L72 258 Q70 268 58 270 L58 274 H92 L96 212Z M104 212 L104 274 H140 L140 270 Q128 268 126 258 L126 212Z" fill="#3a2414"/><path d="M90 268 L94 280 M108 268 L104 280" stroke="#3a2414" stroke-width="5"/><path d="M74 222 L94 226 M74 234 L94 238 M74 246 L94 250 M106 226 L126 222 M106 238 L126 234 M106 250 L126 246" stroke="#e6b33a" stroke-width="2"/>',
  // tutu skirt (flares with the fan trick)
  {cond:'fan',
   no:'<path d="M64 170 L136 170 L156 206 Q100 218 44 206Z" fill="'+PINK+'"/><path d="M60 180 L140 180 L160 212 Q100 226 40 212Z" fill="#f29cc2" opacity=".85"/><path d="M80 172 L66 214 M100 172 V220 M120 172 L134 214" stroke="#e6b33a" stroke-width="5"/>',
   yes:'<path d="M64 170 L136 170 L184 220 Q100 240 16 220Z" fill="'+PINK+'"/><path d="M62 182 L138 182 L190 226 Q100 248 10 226Z" fill="#f29cc2" opacity=".85"/><path d="M78 172 L40 232 M92 172 L80 240 M108 172 L120 240 M122 172 L160 232" stroke="#e6b33a" stroke-width="6"/>'},
  // shoulders and sweetheart-neck corset leotard
  '<path d="M64 112 Q100 96 136 112 L134 124 L66 124Z" fill="'+SK+'"/>',
  '<path d="M66 116 Q84 106 100 118 Q116 106 134 116 L134 176 Q100 186 66 176Z" fill="#c0392b"/><path d="M70 120 Q84 112 98 122 M102 122 Q116 112 130 120" stroke="#e85d75" stroke-width="3" fill="none"/>',
  '<path d="M82 128 L84 172 M100 124 V178 M118 128 L116 172" stroke="#e6b33a" stroke-width="5"/><path d="M90 140 L110 146 M90 152 L110 158 M90 164 L110 168" stroke="#2b2a33" stroke-width="1.5"/>',
  '<path d="M66 164 Q100 174 134 164 L134 174 Q100 184 66 174Z" fill="#2b2a33"/><circle cx="100" cy="172" r="7" fill="#e6b33a"/><circle cx="100" cy="172" r="3" fill="#c0392b"/>',
  {part:'armR'},
  {part:'armL'},
  // head: face, ears, earrings
  '<circle cx="74" cy="72" r="5" fill="#d9a07a"/><circle cx="126" cy="72" r="5" fill="#d9a07a"/><circle cx="74" cy="86" r="6" fill="none" stroke="#e6b33a" stroke-width="2.5"/><circle cx="126" cy="86" r="6" fill="none" stroke="#e6b33a" stroke-width="2.5"/>',
  '<ellipse cx="100" cy="70" rx="25" ry="27" fill="'+SK+'"/>',
  '<path d="M75 60 Q76 36 100 36 Q124 36 125 60 Q118 46 100 46 Q82 46 75 60Z" fill="'+HAIR+'"/><path d="M76 56 Q78 70 74 80 M124 56 Q122 70 126 80" stroke="'+HAIR+'" stroke-width="6" fill="none"/>',
  '<path d="M120 50 l10 -6 l-2 10 l10 2 l-10 4 Z" fill="'+PINK+'"/><circle cx="126" cy="54" r="3" fill="#f7f4ee"/>',
  // eyes with lashes, brows, blush
  '<path d="M82 56 Q89 52 96 56 M104 56 Q111 52 118 56" stroke="#3a1f12" stroke-width="2.5" fill="none"/>',
  '<ellipse cx="90" cy="65" rx="4.5" ry="5" fill="#fff"/><ellipse cx="110" cy="65" rx="4.5" ry="5" fill="#fff"/><circle cx="90.5" cy="66" r="3" fill="#3a6fb0"/><circle cx="110.5" cy="66" r="3" fill="#3a6fb0"/><circle cx="90.5" cy="66" r="1.5" fill="#1d1d26"/><circle cx="110.5" cy="66" r="1.5" fill="#1d1d26"/>',
  '<path d="M84 62 l-4 -3 M86 60 l-3 -4 M89 59 l-1 -4 M116 62 l4 -3 M114 60 l3 -4 M111 59 l1 -4" stroke="#1d1d26" stroke-width="1.6"/><path d="M85 61 Q90 58 95 61 M105 61 Q110 58 115 61" stroke="#1d1d26" stroke-width="2.2" fill="none"/>',
  '<circle cx="82" cy="76" r="5.5" fill="#f19aa8" opacity=".6"/><circle cx="118" cy="76" r="5.5" fill="#f19aa8" opacity=".6"/><path d="M98 70 Q100 74 102 70" stroke="#c98f6b" stroke-width="1.8" fill="none"/>',
  // the beard
  {cond:'fan',
   no:'<path d="M80 80 Q100 100 120 80 Q118 98 110 106 L106 152 Q100 162 94 152 L90 106 Q82 98 80 80Z" fill="'+BEARD+'"/><path d="M94 110 L106 118 M94 120 L106 128 M94 130 L106 138 M94 140 L106 148 M106 110 L94 118 M106 120 L94 128 M106 130 L94 138 M106 140 L94 148" stroke="#8a4a2a" stroke-width="2"/><path d="M93 152 L107 152" stroke="'+PINK+'" stroke-width="5"/><circle cx="100" cy="160" r="5" fill="#e6b33a"/>',
   yes:'<path d="M78 78 Q100 94 122 78 L166 108 L146 116 L158 136 L122 124 L114 152 L100 132 L86 152 L78 124 L42 136 L54 116 L34 108Z" fill="'+BEARD+'"/><path d="M100 96 L100 128 M90 96 L60 120 M110 96 L140 120 M94 100 L74 140 M106 100 L126 140" stroke="#8a4a2a" stroke-width="2.5"/><circle cx="44" cy="134" r="4" fill="'+PINK+'"/><circle cx="156" cy="134" r="4" fill="'+PINK+'"/><circle cx="100" cy="132" r="4" fill="#e6b33a"/>'},
  // curled moustache and red lips
  '<path d="M100 82 Q92 76 84 80 Q78 82 77 76 M100 82 Q108 76 116 80 Q122 82 123 76" stroke="'+BEARD+'" stroke-width="4.5" fill="none"/>',
  '<path d="M92 87 Q96 84 100 86 Q104 84 108 87 Q100 94 92 87Z" fill="#d7263d"/><path d="M95 87 Q100 89 105 87" stroke="#f27a8a" stroke-width="1.2" fill="none"/>',
  {part:'hat'}],
 parts:{
  hat:{label:'velvet top hat',all:'<path d="M80 40 L83 4 Q100 -2 117 4 L120 40Z" fill="#5a2f6e"/><path d="M100 0 Q117 2 117 4 L120 40 L104 40Z" fill="#4a245c"/><rect x="81" y="26" width="38" height="8" fill="'+PINK+'"/><circle cx="112" cy="26" r="7" fill="#f7f4ee"/><circle cx="112" cy="26" r="3" fill="#e6b33a"/><path d="M114 20 Q124 4 120 -4" stroke="#e6b33a" stroke-width="3" fill="none"/><ellipse cx="100" cy="40" rx="32" ry="6" fill="#3a1f4a"/>',
   stump:'',crop:[62,0,76,50],fly:[0.42,0.3],dir:1},
  armR:{label:'kettlebell arm',all:'<path d="M132 116 Q150 140 150 164" fill="none" stroke="'+SK+'" stroke-width="15"/><rect x="141" y="150" width="18" height="8" rx="3" fill="#c0392b"/><path d="M136 182 Q150 162 164 182" fill="none" stroke="#2b2a33" stroke-width="6"/><circle cx="150" cy="198" r="18" fill="#2b2a33"/><path d="M134 192 H166 M133 204 H167" stroke="#e8673f" stroke-width="5"/><circle cx="150" cy="168" r="9" fill="'+SK+'"/>',
   stump:STUMP(132,116),crop:[124,108,48,110],fly:[0.32,0.62],dir:1},
  armL:{label:'flexing arm',all:'<path d="M68 116 Q46 122 40 102 Q37 88 48 78" fill="none" stroke="'+SK+'" stroke-width="15"/><circle cx="45" cy="104" r="9.5" fill="'+SK+'"/><rect x="38" y="80" width="20" height="8" rx="3" fill="'+PINK+'" transform="rotate(-15 48 84)"/><circle cx="49" cy="72" r="10" fill="'+SK+'"/>',
   stump:STUMP(68,116),crop:[26,58,52,68],pivot:[68,116],swing:[-0.6,1.0,-0.35]}},
 pivot:'armL',hand:[49,72],
 intro:{story:'In the velvet corner: Madame Bristle.',sub:['Bearded lady and strongwoman, 1886.','Can bench press a piano. Has. Twice. Mid-recital.','Weakness: a ticklish chin. Do not touch the beard.'],
  talk:['That is a LOT of woman and a LOT of beard!','Both of them could take me.'],talkFired:['THE BEARD FAN! I CAN FEEL THE BREEZE!','Somewhere, a barber has started weeping.'],
  scene:{boxes:[[0.6,-0.35,0.55,0.55,0.45,'#c69a5c','crate'],[1.2,-0.7,0.5,0.5,0.4,'#b98a4c','crate'],[2.6,-0.4,0.5,0.75,0.4,'#a8326e','stripe']],
   pops:[['bunting',160,48,300,60],['bigTop',170,110,250,190]]},
  pose:[160,292,112,170],tab:{type:'swap',cond:'fan',lift:0,sound:'fanfare',fx:'chalk'}},
 art:{
  bunting:[300,60,'<path d="M0 10 Q150 40 300 10" stroke="#5a3a20" stroke-width="2" fill="none"/>'+[0,1,2,3,4,5,6,7,8,9].map(k=>{const x=15+k*29,y=10+Math.sin(k/9*Math.PI)*28;return '<path d="M'+(x-9)+' '+y+' L'+(x+9)+' '+(y+1)+' L'+x+' '+(y+22)+'Z" fill="'+['#c0392b','#e6b33a','#a8326e','#3a6fb0'][k%4]+'"/>';}).join('')],
  bigTop:[250,190,'<path d="M125 6 L240 150 H10Z" fill="#f7f4ee"/>'+[0,1,2,3,4].map(k=>'<path d="M125 6 L'+(10+k*50)+' 150 L'+(35+k*50)+' 150Z" fill="#c0392b"/>').join('')+'<rect x="10" y="150" width="230" height="40" fill="#e6b33a"/><path d="M100 190 Q125 150 150 190Z" fill="#3a1f4a"/><rect x="122" y="0" width="5" height="16" fill="#5a3a20"/><path d="M127 0 L146 6 L127 12Z" fill="#a8326e"/>'],
  palm:[110,130,'<path d="M30 130 L30 70 Q20 66 18 50 L16 22 Q16 14 22 14 Q28 14 28 22 L30 46 L32 10 Q32 2 39 2 Q46 2 46 10 L46 44 L50 6 Q50 0 57 0 Q64 0 64 8 L62 46 L68 14 Q70 6 76 8 Q82 10 80 18 L74 60 L92 46 Q100 40 106 46 Q110 52 104 58 L78 90 Q72 104 60 112 L60 130Z" fill="#eebf98"/><path d="M30 120 H60" stroke="#e85d9a" stroke-width="10"/><path d="M40 70 Q50 76 60 70" stroke="#c9946a" stroke-width="2" fill="none"/>'],
  cannon:[200,140,'<g transform="rotate(-32 110 92)"><rect x="24" y="72" width="150" height="40" rx="18" fill="#2b2a33"/><rect x="24" y="68" width="20" height="48" rx="6" fill="#e6b33a"/><rect x="104" y="72" width="10" height="40" fill="#e6b33a"/><rect x="150" y="72" width="8" height="40" fill="#e6b33a"/><path d="M174 92 q14 -4 18 -16" stroke="#8a5630" stroke-width="3" fill="none"/></g><circle cx="122" cy="112" r="26" fill="#c0392b"/><circle cx="122" cy="112" r="6" fill="#e6b33a"/><path d="M122 88 V136 M98 112 H146 M105 95 L139 129 M139 95 L105 129" stroke="#e6b33a" stroke-width="3"/><text x="122" y="40" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="16" fill="#a8326e">HUMAN CANNONBALL</text>']},
 attacks:{
  whisker:{name:'Whisker Whip Lash',fx:'WHACK!',quip:'Conditioner. That is the secret.',call:['The beard is moving on its OWN!','It has more muscle than I do.'],
   text:'Her braided beard lashed out like a bullwhip, coiled round his {part} and tore it clean off.',
   icon(g){g.lineWidth=9;g.beginPath();g.moveTo(-40,-20);g.bezierCurveTo(-10,30,10,-40,40,10);g.stroke();g.lineWidth=3;for(let k=-3;k<4;k++){g.beginPath();g.moveTo(k*10-4,-6+k*2);g.lineTo(k*10+4,6+k*2);g.stroke();}},
   steps:[{t:0,do:'sound',name:'snap'},{t:0,do:'tether',from:[100,152],color:'#6b2f1a',grow:550,yank:520,coils:2},{t:1000,do:'sound',name:'snap'},{t:1300,do:'hit'}]},
  armswing:{name:'Severed Arm Swing',fx:'THWACK!',quip:'Recycling. In this economy.',call:['She is picking up her own ARM!','I believe that is legal. Barely.'],
   text:'She picked up her own fallen arm, kettlebell still in its fist, and swung it. His {part} went flying.',
   icon(g){g.lineWidth=12;g.beginPath();g.moveTo(-36,-30);g.quadraticCurveTo(-10,0,6,10);g.stroke();g.beginPath();g.arc(20,20,18,0,7);g.fill();g.lineWidth=4;g.beginPath();g.arc(0,0,42,-2.4,-1.2);g.stroke();},
   steps:[{t:0,do:'sound',name:'whoosh'},{t:100,do:'bounce',prop:'bristle~armR',size:[0.32,0.72],dur:1000,arc:1.2,spin:2,y0:1.1},{t:1100,do:'sound',name:'thud'},{t:1100,do:'hit'}]},
  clap:{name:'Big Top Clap',fx:'SMASH!',quip:'Polite applause. At a lethal volume.',call:['She is calling for a round of applause!','With one arm. Bold.'],
   text:'Two giant palms slammed together. The shockwave tore his {part} clean off.',
   icon(g){g.fillRect(-36,-30,22,56);g.fillRect(14,-30,22,56);g.lineWidth=4;g.beginPath();g.moveTo(-6,-20);g.lineTo(6,-30);g.moveTo(-6,0);g.lineTo(8,0);g.moveTo(-6,20);g.lineTo(6,30);g.stroke();},
   steps:[{t:0,do:'sound',name:'whoosh'},{t:0,do:'clap',prop:'palm',size:[0.62,0.74],dur:650,y:0.95},{t:680,do:'hit'}]}},
 finishers:{
  cannon:{name:'Human Cannonball',card:'{A} fired {D} from the human cannonball.',
   steps:[{t:0,do:'sound',name:'fanfare'},{t:0,do:'say',a:'Uh oh. Bristle has that look in her eye.',b:'The look of a woman who owns a cannon.'},
    {t:900,do:'hoist',dur:1800},{t:2000,do:'say',v:'a',a:'SHE HAS GOT HIM OVERHEAD! ONE ARM!',b:'Frozen lizard. Easy to carry. Like a baguette.'},
    {t:3000,do:'lose'},{t:3100,do:'say',a:'HIS TAIL! HIS TAIL JUST FELL OFF!',b:'Lizards do that. It is their exit strategy.'},
    {t:4600,do:'cannon',prop:'cannon',size:[1.05,0.74],dx:0.8,load:1100,fuse:2600,flight:2600},
    {t:5200,do:'say',a:'Is that... a cannon?','b':'It says Human Cannonball on the side, Barry.'},
    {t:6700,do:'say',v:'b',a:'She is lighting the FUSE!',b:'He is technically not human. Loophole.'},
    {t:8000,do:'say',a:'THREE! TWO!',b:'She is not waiting for one.'},
    {t:9150,do:'say',v:'c',a:'KA-BOOOOM!',b:'Ladies and gentlemen, the lizard has left the building.'},
    {t:11900,do:'ko'}]}}
});
})();
