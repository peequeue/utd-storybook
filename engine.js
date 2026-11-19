/* UTD pop-up book engine. Fighters (fighters/*.js) and episodes (episodes/*.js) register data; UTD.boot() builds the book.
   See the utd-episode skill for how to add fighters, attacks, mechanisms, arenas and episodes. */
(function(){
const UTD=window.UTD={fighters:{},episodes:[],mechs:{},arenas:{},steps:{},
 fighter(f){this.fighters[f.id]=f;},episode(e){this.episodes.push(e);}};
const drone=(x,y)=>'<g transform="translate('+x+' '+y+') scale(.75)"><rect x="22" y="16" width="36" height="12" rx="4" fill="#5c6470"/><rect x="4" y="8" width="26" height="4" rx="2" fill="#c8ced6"/><rect x="50" y="8" width="26" height="4" rx="2" fill="#c8ced6"/><rect x="16" y="10" width="3" height="10" fill="#5c6470"/><rect x="61" y="10" width="3" height="10" fill="#5c6470"/><circle cx="40" cy="22" r="3" fill="#ff3d5e"/></g>';
const win=(xs,ys,w,h,c)=>xs.map(x=>ys.map(y=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+c+'"/>').join('')).join('');
UTD.kit={drone,win,SERIF:'Fraunces, Georgia, serif'};
UTD.boot=function(){

const T=THREE,W=3.2,H=4,U=0.01;          // page size; 1 layout unit (320x400 page) = 0.01 world
const $=s=>document.querySelector(s);
const view=$('#view'),cv=$('#c');
let renderer;
try{renderer=new T.WebGLRenderer({canvas:cv,antialias:true});}catch(e){$('#load').textContent='This book needs WebGL, which this browser has turned off.';}
if(renderer){
renderer.outputEncoding=T.sRGBEncoding;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;
renderer.setPixelRatio(Math.min(2,devicePixelRatio||1));
const scene=new T.Scene();scene.background=new T.Color('#d9c5a7');
const cam=new T.PerspectiveCamera(36,1,0.1,100);
const target=new T.Vector3(0,0.35,0.2),dir=new T.Vector3(0,0.8,0.6).normalize();
function fit(){const w=view.clientWidth,h=view.clientHeight;renderer.setSize(w,h,false);cam.aspect=w/h;
 const t=Math.tan(T.MathUtils.degToRad(cam.fov/2));const d=Math.max(8.4,3.95/(t*cam.aspect));
 baseD=d;cam.updateProjectionMatrix();applyCam(0);
 document.body.classList.toggle('narrow',w<720);}
addEventListener('resize',fit);
const camDir=dir.clone(),dirGoal=dir.clone(),SIDE=new T.Vector3(0.5,0.42,0.76).normalize();let baseD=10,ft=0,goalZ=1,curZ=1,shakeA=0;const goalT=target.clone(),curT=target.clone(),par=new T.Vector2(),parS=new T.Vector2();
function applyCam(dt){const k=dt?1-Math.exp(-dt*3):1;curT.lerp(goalT,k);curZ+=(goalZ-curZ)*k;parS.lerp(par,dt?1-Math.exp(-dt*2):1);
 camDir.lerp(dirGoal,k).normalize();cam.position.copy(curT).addScaledVector(camDir,baseD*curZ);cam.position.x+=parS.x*0.45;cam.position.y-=parS.y*0.25;
 if(shakeA>0.001){cam.position.x+=(Math.random()-.5)*shakeA;cam.position.y+=(Math.random()-.5)*shakeA;shakeA*=Math.exp(-(dt||0.016)*7);}
 cam.lookAt(curT);}
let viewZ=1;
function focus(x,z,zoom,hold){goalT.set(x,0.35,z);goalZ=zoom*viewZ;clearTimeout(ft);ft=setTimeout(()=>{goalT.copy(target);goalZ=viewZ;},hold);}
function home(){clearTimeout(ft);goalT.copy(target);goalZ=viewZ;}
addEventListener('pointermove',e=>{if(e.pointerType==='mouse')par.set((e.clientX/innerWidth-.5)*2,(e.clientY/innerHeight-.5)*2);});
scene.add(new T.HemisphereLight(0xfff6e8,0x7a6650,0.2));
{const pm=new T.PMREMGenerator(renderer),es=new T.Scene(),sg=new T.SphereGeometry(20,48,24),pos=sg.attributes.position,col=[];
 for(let i=0;i<pos.count;i++){const y=pos.getY(i)/20;if(y>0){const k=0.82+0.18*y;col.push(k,k*0.97,k*0.92);}else{const k=0.5+0.3*(1+y);col.push(k*0.78,k*0.64,k*0.48);}}
 sg.setAttribute('color',new T.Float32BufferAttribute(col,3));es.add(new T.Mesh(sg,new T.MeshBasicMaterial({vertexColors:true,side:T.BackSide})));
 const box=(w,h,x,y,z,c)=>{const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:c,side:T.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);es.add(m);};
 box(10,6,-6,13,7,'#ffffff');box(6,4,9,7,-5,'#d8d4cc');scene.environment=pm.fromScene(es,0.04).texture;pm.dispose();}
const sun=new T.DirectionalLight(0xfff1dc,0.66);sun.position.set(-4,10,6);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:1,far:30});sun.shadow.bias=-0.0006;sun.shadow.radius=3.2;scene.add(sun);
const aniso=renderer.capabilities.getMaxAnisotropy();
const ctex=c=>{const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.anisotropy=aniso;return t;};
const mkc=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
/* ---------- sound (synthesised, no files) ---------- */
let AC=null,MG=null,NB=null,muted=false;
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=0.7;MG.connect(AC.destination);
 NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}catch(e){AC=null;}}
 if(AC&&AC.state==='suspended')AC.resume();return muted?null:AC;}
function nz(dur,o){const a=ac();if(!a)return;o=o||{};const t=a.currentTime+(o.delay||0),src=a.createBufferSource();src.buffer=NB;src.loop=true;
 const f=a.createBiquadFilter();f.type=o.type||'bandpass';f.frequency.setValueAtTime(o.f0||1000,t);f.frequency.exponentialRampToValueAtTime(o.f1||o.f0||1000,t+dur);f.Q.value=o.q||1;
 const g=a.createGain();g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(o.gain||0.2,t+(o.attack||0.01));g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
 src.connect(f);f.connect(g);g.connect(MG);src.start(t,Math.random()*0.5);src.stop(t+dur+0.05);}
function tn(f0,f1,dur,o){const a=ac();if(!a)return;o=o||{};const t=a.currentTime+(o.delay||0),osc=a.createOscillator(),g=a.createGain();osc.type=o.type||'sine';
 osc.frequency.setValueAtTime(f0,t);osc.frequency.exponentialRampToValueAtTime(f1,t+dur);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(o.gain||0.15,t+(o.attack||0.005));g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
 osc.connect(g);g.connect(MG);osc.start(t);osc.stop(t+dur+0.05);}
const sfx={
 turn:()=>{nz(0.6,{f0:2600,f1:700,q:0.7,gain:0.22,attack:0.12});nz(0.14,{type:'highpass',f0:3500,gain:0.06,delay:0.48});},
 pop:d=>{tn(560,240,0.13,{type:'triangle',gain:0.1,delay:d});nz(0.05,{type:'highpass',f0:2800,gain:0.06,delay:d});},
 flap:()=>{nz(0.28,{f0:1900,f1:800,q:0.9,gain:0.14,attack:0.04});},
 tab:()=>{nz(0.32,{f0:500,f1:1700,q:2,gain:0.12,attack:0.05});},
 hit:()=>{tn(150,45,0.4,{gain:0.55});nz(0.3,{type:'lowpass',f0:2400,f1:250,gain:0.35});},
 confetti:()=>{for(let i=0;i<12;i++)tn(2200+Math.random()*3200,2000+Math.random()*3000,0.07,{gain:0.035,delay:Math.random()*0.7});},
 cheer:(len,amt)=>{len=len||1.8;amt=amt||1;nz(len,{f0:850,f1:1250,q:0.6,gain:0.16*amt,attack:0.35});nz(len*0.9,{f0:2600,f1:2200,q:1,gain:0.06*amt,attack:0.45});
  for(let i=0;i<6*amt;i++){const f=320+Math.random()*260;tn(f,f*1.7,0.35,{type:'sawtooth',gain:0.012*amt,attack:0.08,delay:0.15+Math.random()*len*0.6});}},
 bell:()=>{tn(1250,1240,1.5,{gain:0.16});tn(2510,2500,0.9,{gain:0.05});tn(3760,3750,0.6,{gain:0.03});},
 whoosh:()=>{nz(0.7,{f0:350,f1:2200,q:0.8,gain:0.22,attack:0.25});},
 drones:()=>{tn(170,185,1.2,{type:'sawtooth',gain:0.025,attack:0.2});tn(232,244,1.2,{type:'sawtooth',gain:0.02,attack:0.25});nz(1.2,{f0:3000,q:3,gain:0.03,attack:0.3});},
 click:k=>{for(let i=0;i<(k||6);i++)nz(0.025,{type:'highpass',f0:3200,gain:0.12,delay:i*0.07});},
 down:()=>{tn(620,70,0.9,{type:'square',gain:0.04});},
 whack:()=>{nz(0.12,{type:'lowpass',f0:1800,f1:400,gain:0.4});tn(320,120,0.15,{type:'triangle',gain:0.2});},
 boing:()=>{tn(160,640,0.22,{type:'triangle',gain:0.12});tn(640,320,0.2,{type:'triangle',gain:0.08,delay:0.22});},
 thud:()=>{tn(110,40,0.3,{gain:0.4});nz(0.15,{type:'lowpass',f0:700,gain:0.25});},
 snap:()=>{nz(0.06,{type:'highpass',f0:3000,gain:0.4});tn(1800,600,0.08,{type:'square',gain:0.05});},
 clap:()=>{nz(0.09,{f0:1500,q:0.8,gain:0.45});nz(0.12,{f0:1100,q:0.8,gain:0.3,delay:0.05});},
 splat:()=>{nz(0.35,{type:'lowpass',f0:1200,f1:200,gain:0.4});tn(200,60,0.3,{gain:0.3});},
 sand:()=>{nz(0.9,{type:'highpass',f0:4000,f1:2500,gain:0.08,attack:0.1});},
 wind:()=>{nz(1.6,{type:'bandpass',f0:300,f1:900,q:1.5,gain:0.18,attack:0.4});nz(1.4,{type:'highpass',f0:3000,gain:0.04,attack:0.5,delay:0.2});},
 boom:()=>{tn(90,30,0.9,{gain:0.7});nz(0.8,{type:'lowpass',f0:1500,f1:150,gain:0.55});},
 fuse:()=>{nz(0.9,{type:'highpass',f0:5000,gain:0.06,attack:0.05});},
 drum:()=>{for(let k=0;k<14;k++)nz(0.05,{type:'lowpass',f0:500,gain:0.12+k*0.012,delay:k*0.085});},
 gulp:()=>{tn(380,110,0.18,{type:'sine',gain:0.3});nz(0.08,{type:'lowpass',f0:600,gain:0.2,delay:0.05});},
 squelch:()=>{nz(0.25,{type:'lowpass',f0:900,f1:300,q:3,gain:0.35});tn(260,90,0.2,{type:'triangle',gain:0.15});},
 squeeze:()=>{tn(300,520,0.35,{type:'sawtooth',gain:0.03});tn(420,700,0.35,{type:'sawtooth',gain:0.02,delay:0.05});},
 fanfare:()=>{[392,523,659,784].forEach((f,i)=>tn(f,f,0.18,{type:'square',gain:0.035,delay:i*0.12}));},
 ad:()=>{[523,659,784,1046,784,1046].forEach((f,i)=>tn(f,f,0.16,{type:'sawtooth',gain:0.05,delay:i*0.16}));nz(1.2,{f0:900,q:4,gain:0.05,attack:0.1,delay:0.3});},
 ring:()=>{for(let r=0;r<2;r++)for(let i=0;i<14;i++)tn(i%2?480:440,i%2?480:440,0.05,{gain:0.07,delay:r*0.75+i*0.05});},
 sizzle:()=>{nz(1.8,{type:'highpass',f0:4200,f1:3000,gain:0.07,attack:0.25});},
 hold:()=>{[523,659,784,659,587,523,587,659,523].forEach((f,i)=>tn(f,f*0.999,0.22,{type:'triangle',gain:0.07,delay:i*0.23}));}};

/* ---------- art ---------- */
const svg=(inner,vb,w,h)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+vb+'" width="'+w+'" height="'+h+'">'+inner+'</svg>';
function crowd(seed,riser,signs){let r=seed;const rnd=()=>(r=(r*9301+49297)%233280)/233280;
 const shirts=['#e8673f','#3a6fb0','#f2c94c','#9b5de5','#f4a08a','#2f8f8a','#e85d75','#7aa95c'],skins=['#f2c9a0','#c98f6b','#e9b98d','#8d5a3b','#f6d1b0'],hair=['#3a2414','#2b2b2b','#a0522d','#e6c25a','#6b4a30'];
 const H=70+riser;let o='';const n=12;
 for(let k=0;k<n;k++){const x=14+k*(272/(n-1))+(rnd()-.5)*6,top=20+rnd()*10,sh=shirts[Math.floor(rnd()*8)],sk=skins[Math.floor(rnd()*5)];
  if(rnd()<.35)o+='<path d="M'+(x-9)+' '+(top+18)+' L'+(x-15)+' '+(top-2)+' M'+(x+9)+' '+(top+18)+' L'+(x+15)+' '+(top-2)+'" stroke="'+sh+'" stroke-width="6" stroke-linecap="round"/><circle cx="'+(x-15)+'" cy="'+(top-4)+'" r="3.5" fill="'+sk+'"/><circle cx="'+(x+15)+'" cy="'+(top-4)+'" r="3.5" fill="'+sk+'"/>';
  o+='<rect x="'+(x-11)+'" y="'+(top+14)+'" width="22" height="'+(H-top-14)+'" rx="9" fill="'+sh+'"/><circle cx="'+x+'" cy="'+(top+5)+'" r="9" fill="'+sk+'"/><path d="M'+(x-9)+' '+(top+3)+' Q'+x+' '+(top-8)+' '+(x+9)+' '+(top+3)+'Z" fill="'+hair[Math.floor(rnd()*5)]+'"/>';}
 (signs||[]).forEach(([x,t,c])=>{o+='<rect x="'+(x-1.5)+'" y="8" width="3" height="30" fill="#8a5630"/><rect x="'+(x-34)+'" y="-6" width="68" height="22" rx="2" fill="#f7f4ee"/><text x="'+x+'" y="10" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="12" fill="'+c+'">'+t+'</text>';});
 if(riser)o+='<rect x="0" y="70" width="300" height="'+riser+'" fill="#4a3f6b"/><rect x="0" y="70" width="300" height="5" fill="#6b5a8e"/>';
 return '<g transform="translate(0 8)">'+o+'</g>';}
const POW='<polygon points="'+Array.from({length:24},(_,k)=>{const a=k/24*Math.PI*2,r=k%2?52:80;return (90+Math.cos(a)*r).toFixed(1)+','+(90+Math.sin(a)*r).toFixed(1);}).join(' ')+'" fill="#f2c230"/><polygon points="'+Array.from({length:24},(_,k)=>{const a=k/24*Math.PI*2+0.1,r=k%2?40:62;return (90+Math.cos(a)*r).toFixed(1)+','+(90+Math.sin(a)*r).toFixed(1);}).join(' ')+'" fill="#e8673f"/><text x="90" y="104" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="40" fill="#fff8e8">POW!</text>';

/* ---------- arenas, choosers and mechanisms (registries; add new ones here) ---------- */
UTD.arenas.ring={build(sp,a,d){sp.ring=1;sp.wide=a.size==='spread';sp.towers=!!a.towers;
 if(sp.wide)sp.pops.push(['crowdC',-145,50,290,124],['crowdC2',145,50,290,124],['crowdB',-145,75,290,100],['crowdB2',145,75,290,100],['crowdA',-145,100,290,75],['crowdA2',145,100,290,75]);
 else if(a.crowd!==false)sp.pops.push(['crowdC',160,72,300,128],['crowdB',160,97,300,103],['crowdA',160,122,300,78]);}};
function cones(seed,n,signs){let r=seed;const rnd=()=>(r=(r*9301+49297)%233280)/233280;let o='';
 for(let k=0;k<n;k++){const x=14+k*(272/(n-1))+(rnd()-.5)*6,hgt=46+rnd()*14,top=78-hgt;
  if(rnd()<.4)o+='<path d="M'+(x-9)+' '+(top+30)+' L'+(x-17)+' '+(top+12)+' M'+(x+9)+' '+(top+30)+' L'+(x+17)+' '+(top+12)+'" stroke="#e8562a" stroke-width="4" stroke-linecap="round"/>';
  o+='<path d="M'+(x-4)+' '+top+' L'+(x+4)+' '+top+' L'+(x+13)+' 76 L'+(x-13)+' 76Z" fill="#f2702e"/><path d="M'+(x-7)+' '+(top+hgt*0.35)+' L'+(x+7)+' '+(top+hgt*0.35)+' L'+(x+9)+' '+(top+hgt*0.55)+' L'+(x-9)+' '+(top+hgt*0.55)+'Z" fill="#f7f4ee"/>'+
   '<rect x="'+(x-17)+'" y="74" width="34" height="6" rx="2" fill="#2b2a33"/><circle cx="'+(x-3)+'" cy="'+(top+hgt*0.22)+'" r="2.6" fill="#fff"/><circle cx="'+(x+3)+'" cy="'+(top+hgt*0.22)+'" r="2.6" fill="#fff"/><circle cx="'+(x-3)+'" cy="'+(top+hgt*0.23)+'" r="1.2" fill="#2b2a33"/><circle cx="'+(x+3)+'" cy="'+(top+hgt*0.23)+'" r="1.2" fill="#2b2a33"/>';}
 (signs||[]).forEach(([x,t,c])=>{o+='<rect x="'+(x-1.5)+'" y="8" width="3" height="30" fill="#8a5630"/><rect x="'+(x-36)+'" y="-6" width="72" height="22" rx="2" fill="#f7f4ee"/><text x="'+x+'" y="10" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="12" fill="'+c+'">'+t+'</text>';});
 return '<g transform="translate(0 8)">'+o+'</g>';}
function sign(t,sub,col){return '<rect x="14" y="20" width="6" height="100" fill="#9aa3ad"/><rect x="180" y="20" width="6" height="100" fill="#9aa3ad"/><rect x="0" y="0" width="200" height="66" rx="6" fill="'+col+'"/><rect x="6" y="6" width="188" height="54" rx="4" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/>'+
 '<text x="100" y="34" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="20" fill="#fff">'+t+'</text><text x="100" y="52" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#fff" opacity=".9">'+sub+'</text>';}
function asphalt(g,x0,y0,x1,y1){g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x0+8,y0+12,x1-x0,y1-y0);g.fillStyle='#4a4d55';g.fillRect(x0,y0,x1-x0,y1-y0);
 for(let k=0;k<1800;k++){g.fillStyle=Math.random()<.5?'rgba(255,255,255,.07)':'rgba(0,0,0,.12)';g.fillRect(x0+Math.random()*(x1-x0),y0+Math.random()*(y1-y0),2,2);}
 g.fillStyle=g.createPattern(NOISE,'repeat');g.fillRect(x0,y0,x1-x0,y1-y0);}
UTD.arenas.carPark={
 art:E=>{const s=E.signs||{};return {coneA:[300,86,cones(13,12,s.A)],coneB:[300,86,cones(29,12,s.B)],coneA2:[300,86,cones(47,12,s.A2)],coneB2:[300,86,cones(61,12,s.B2)],
  signL:[200,120,sign('VISITOR PARKING','faded since 1996','#3a6fb0')],signR:[200,120,sign('LOADING BAY','no duelling after 5pm','#c0392b')]};},
 build(sp,a,d){sp.fightArena=1;sp.wide=a.size==='spread';sp.towers=!!a.towers;sp.mat=(g,side)=>carMat(g,side);
  if(sp.wide){sp.pops.push(['coneB',-145,40,290,86],['coneB2',145,40,290,86],['signL',-175,80,150,90],['signR',175,80,150,90],['coneA',-145,98,290,86],['coneA2',145,98,290,86]);
   sp.boxes.push([-2.45,-0.45,0.95,0.42,0.42,'#e8673f','car'],[-1.25,-0.5,0.95,0.42,0.42,'#3a6fb0','car'],[1.25,-0.5,0.95,0.42,0.42,'#f2c94c','car'],[2.45,-0.45,0.95,0.42,0.42,'#7aa95c','car']);}
  else if(a.crowd!==false){sp.pops.push(['coneB',160,60,300,86],['signR',240,100,140,84],['coneA',160,115,300,86]);sp.boxes.push([0.75,-0.25,0.95,0.42,0.42,'#e8673f','car']);}
  else sp.boxes.push([0.75,0.3,0.95,0.42,0.42,'#e8673f','car'],[2.45,0.3,0.95,0.42,0.42,'#3a6fb0','car']);}};
function carMat(g,side){const P=side==='P',L=side==='L',y0=P?440:400,y1=P?1020:944,x0=P?96:L?220:-10,x1=P?928:L?1034:804;asphalt(g,x0,y0,x1,y1);
 g.strokeStyle='#f7f4ee';g.lineWidth=8;for(let x=x0+60;x<x1-20;x+=180){g.beginPath();g.moveTo(x,y0+10);g.lineTo(x,y0+150);g.stroke();}
 const bx0=P?300:L?700:-10,bx1=P?880:L?1034:330,by0=y0+220,by1=y1-40;g.strokeStyle='#f2c230';g.lineWidth=10;g.strokeRect(bx0,by0,bx1-bx0,by1-by0);
 g.save();g.beginPath();g.rect(bx0,by0,bx1-bx0,by1-by0);g.clip();g.lineWidth=8;for(let k=-400;k<1200;k+=46){g.beginPath();g.moveTo(bx0+k,by1);g.lineTo(bx0+k+220,by0);g.stroke();}g.restore();
 g.fillStyle='rgba(247,244,238,.85)';g.font='700 46px Inter,sans-serif';g.textAlign='center';if(!L)g.fillText(P?'LOADING BAY':'BAY',P?(bx0+bx1)/2:160,by1-24);if(L||P)g.fillText(P?'':'LOADING',L?880:0,by1-24);g.textAlign='left';}
function sawdust(g,cx,cy,rx,ry){g.save();g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.clip();g.fillStyle='#d9b27a';g.fillRect(cx-rx,cy-ry,rx*2,ry*2);
 for(let k=0;k<5000;k++){g.fillStyle=['rgba(140,95,40,.25)','rgba(255,240,200,.3)','rgba(110,70,30,.2)'][k%3];g.fillRect(cx-rx+Math.random()*rx*2,cy-ry+Math.random()*ry*2,3,1.5);}
 g.fillStyle=g.createPattern(NOISE,'repeat');g.fillRect(cx-rx,cy-ry,rx*2,ry*2);g.fillStyle='rgba(192,57,43,.22)';g.beginPath();g.ellipse(cx,cy,rx*0.32,ry*0.32,0,0,7);g.fill();
 g.fillStyle='rgba(122,47,94,.4)';g.font='italic 700 '+Math.round(ry*0.28)+'px '+SERIF;g.textAlign='center';g.fillText('UTD',cx,cy+ry*0.1);g.textAlign='left';g.restore();}
function tentWall(seed){let o='<rect x="0" y="0" width="300" height="150" fill="#c0392b"/>';for(let k=0;k<10;k++)o+='<path d="M'+(k*30+15)+' 0 L'+(k*30+30)+' 0 L'+(k*30+30)+' 150 L'+(k*30+15)+' 150Z" fill="#f7f4ee"/>';
 o+='<path d="M0 0 Q37 22 75 0 Q112 22 150 0 Q187 22 225 0 Q262 22 300 0 V14 Q262 36 225 14 Q187 36 150 14 Q112 36 75 14 Q37 36 0 14Z" fill="#e6b33a"/>';
 for(let k=0;k<12;k++)o+='<circle cx="'+(12+k*25)+'" cy="'+(28+(k%2)*6)+'" r="3.5" fill="#fff6c8"/>';return o;}
UTD.arenas.bigTop={
 art:()=>({tentL:[300,150,tentWall(1)],tentR:[300,150,tentWall(2)]}),
 build(sp,a,d){sp.fightArena=1;sp.wide=a.size==='spread';sp.towers=!!a.towers;
  if(sp.wide){sp.ell=[0,0.18,2.3,0.88];sp.pops.push(['tentL',-150,18,300,150],['tentR',150,18,300,150],['crowdC',-145,50,290,124],['crowdC2',145,50,290,124],['crowdB',-145,75,290,100],['crowdB2',145,75,290,100],['crowdA',-145,100,290,75],['crowdA2',145,100,290,75]);}
  else{sp.ell=[1.6,0.75,1.35,0.72];if(a.crowd!==false)sp.pops.push(['tentR',160,22,300,150],['crowdC',160,60,300,128],['crowdB',160,85,300,103]);}
  sp.mat=(g,side)=>{const[cx,cz,rx,rz]=sp.ell,px=side==='L'?(cx+W)*320:cx*320;sawdust(g,px,(cz+2)*320,rx*320,rz*320);};
  sp.build3d=s=>curb(s);}};
function curb(sp){const[cx,cz,rx,rz]=sp.ell,N=40,halves={L:new T.Group(),R:new T.Group()};
 for(let k=0;k<N;k++){const a0=k/N*Math.PI*2,a1=(k+1)/N*Math.PI*2,x0=cx+Math.cos(a0)*rx,z0=cz+Math.sin(a0)*rz,x1=cx+Math.cos(a1)*rx,z1=cz+Math.sin(a1)*rz,len=Math.hypot(x1-x0,z1-z0);
  const m=new T.Mesh(new T.BoxGeometry(len*1.02,0.13,0.07),CARD_MAT({color:k%2?'#f7f4ee':'#c0392b'}));m.position.set((x0+x1)/2,0.065,(z0+z1)/2);m.rotation.y=-Math.atan2(z1-z0,x1-x0);m.castShadow=m.receiveShadow=true;
  halves[(x0+x1)/2<0?'L':'R'].add(m);}
 ['L','R'].forEach(k=>{const g=halves[k];if(!g.children.length)return;g.scale.y=0.001;g.visible=false;sp[k].add(g);(sp.struct=sp.struct||[]).push({g,axis:'sy',flat:0.001,z:cz});});}
UTD.mechs.tentFlap={sets:'cold',hint:'Press and hold the rope to open the tent flap.',act:'Hold to open the flap',
 value:(d,n)=>d.mechanism.labels[n]||'',
 drawL(g,sp){g.fillStyle='#2b2a33';g.font='italic 700 34px '+SERIF;g.textAlign='center';g.fillText('Press and hold the rope',512,1180);g.textAlign='left';},
 build(sp,i){const fx=-1.6,fz=0.55,fw=1.7,fh=1.15,g=new T.Group();g.position.set(fx,0.001,fz);
  const pm=c=>CARD_MAT({color:c});const post=x=>{const m=new T.Mesh(new T.BoxGeometry(0.07,fh,0.07),pm('#8a5630'));m.position.set(x,fh/2,0);m.castShadow=true;return m;};
  const bar=new T.Mesh(new T.BoxGeometry(fw+0.1,0.08,0.08),pm('#8a5630'));bar.position.y=fh;bar.castShadow=true;
  const sky=mkc(256,180),sg=sky.getContext('2d'),gr=sg.createLinearGradient(0,0,0,180);gr.addColorStop(0,'#2e3d6e');gr.addColorStop(1,'#8fb3d9');sg.fillStyle=gr;sg.fillRect(0,0,256,180);sg.fillStyle='#fff';for(let k=0;k<40;k++){sg.beginPath();sg.arc(Math.random()*256,Math.random()*180,1+Math.random()*2.5,0,7);sg.fill();}
  sg.fillStyle='#e8f1f8';sg.beginPath();sg.moveTo(0,180);sg.lineTo(60,120);sg.lineTo(120,170);sg.lineTo(190,110);sg.lineTo(256,160);sg.lineTo(256,180);sg.fill();
  const back=new T.Mesh(new T.PlaneGeometry(fw,fh).translate(0,fh/2,0),new T.MeshBasicMaterial({map:ctex(sky)}));back.position.z=-0.02;
  const cc=mkc(128,256),cg=cc.getContext('2d');for(let k=0;k<4;k++){cg.fillStyle=k%2?'#f7f4ee':'#c0392b';cg.fillRect(k*32,0,32,256);}cg.fillStyle='#e6b33a';cg.fillRect(0,0,128,18);const ct=ctex(cc);
  const half=s=>{const geo=new T.PlaneGeometry(fw/2,fh-0.05);geo.translate(-s*fw/4,(fh-0.05)/2,0);const m=new T.Mesh(geo,CARD_MAT({map:ct,side:T.DoubleSide}));m.castShadow=true;const h=new T.Group();h.position.x=s*fw/2;h.position.z=0.01;h.add(m);return h;};
  const cl=half(-1),cr=half(1);
  g.add(post(-fw/2),post(fw/2),bar,back,cl,cr);
  const rope=new T.Mesh(new T.CylinderGeometry(0.012,0.012,0.7,6),pm('#e6c25a'));rope.position.set(fw/2+0.12,fh-0.35,0.04);const tas=new T.Mesh(new T.SphereGeometry(0.07,12,10),pm('#c0392b'));tas.position.set(fw/2+0.12,fh-0.74,0.04);tas.castShadow=true;g.add(rope,tas);
  g.scale.y=0.001;g.visible=false;sp.L.add(g);(sp.struct=sp.struct||[]).push({g,axis:'sy',flat:0.001,z:fz});
  sp.flap={cl,cr,f:0,fw,g};sp.disc=tas;tas.userData.hold=rope.userData.hold=on=>{if(busy||i!==cur)return;UTD.mechs.tentFlap.hold(sp,i,on);};},
 hold(sp,i,on){const st=S.mech[i]=S.mech[i]||{n:0,p:0};if(st.done)return;st.holding=on;if(!on||st.ticking)return;st.ticking=true;sfx.wind();focus(-0.4,0.6,0.84,99999);
  const F=sp.flap,D=popOf(sp,sp.d.defender),M=sp.d.mechanism,marks=[0.34,0.67];let windT=0;
  TICKS.push(dt=>{if(st.done)return true;if(!st.holding){st.ticking=false;return true;}
   st.p=Math.min(1,st.p+dt/(M.secs||3.2));const f=st.p;F.f=f;F.cl.scale.x=F.cr.scale.x=Math.max(0.12,1-f*0.85);
   windT+=dt;if(windT>1.3){windT=0;sfx.wind();}
   for(let q=0;q<Math.ceil(6*f);q++)emit(V3(-1.6+(Math.random()-.5)*1.2,0.2+Math.random()*0.9,0.6),V3(1.6+Math.random()*1.4,(Math.random()-.4)*0.4,(Math.random()-.5)*0.4),Math.random()<.5?'#ffffff':'#bfe3f2',1.4,0.2,0.8);
   D.g.rotation.z=Math.sin(now/30)*0.05*f;const n=marks.filter(m=>f>=m).length+(f>=1?1:0);if(n!==st.n){st.n=n;drawL(i);ui();}
   if(f>=1){st.done=true;st.holding=false;st.ticking=false;D.g.rotation.z=0;S.cond[sp.d.defender].cold=true;refreshFighters(i);sfx.down();home();drawL(i);ui();return true;}});},
 auto(sp,i){const M=this;M.hold(sp,i,true);},
 tap(sp,i){const st=S.mech[i]=S.mech[i]||{n:0};if(st.done)return;st.n++;const taps=sp.d.mechanism.taps||3,F=sp.flap,f0=F.f,f1=Math.min(1,st.n/taps);sfx.wind();sfx.flap();focus(-0.4,0.6,0.84,1600);
  tween(700,e=>{const f=f0+(f1-f0)*ease.back(e);F.f=f;F.cl.scale.x=Math.max(0.12,1-f*0.85);F.cr.scale.x=Math.max(0.12,1-f*0.85);});
  const D=popOf(sp,sp.d.defender);tween(1400,e=>{for(let q=0;q<3*st.n;q++)emit(V3(-1.6+(Math.random()-.5)*1.2,0.2+Math.random()*0.9,0.6),V3(1.6+Math.random()*1.2,(Math.random()-.4)*0.4,(Math.random()-.5)*0.4),Math.random()<.5?'#ffffff':'#bfe3f2',1.4,0.2,0.8);
   D.g.rotation.z=Math.sin(e*60)*0.03*st.n;},0,()=>{D.g.rotation.z=0;});
  if(st.n>=taps)setTimeout(()=>{st.done=true;S.cond[sp.d.defender].cold=true;refreshFighters(i);sfx.down();drawL(i);ui();},800);
  else setTimeout(()=>{drawL(i);ui();},300);}};
UTD.mechs.accordion={hint:'Tap the folded speed bump to pull it out.',act:'Pull out the speed bump',
 value:(d,n)=>d.mechanism.labels[n]||'',
 drawL(g,sp){g.fillStyle='#2b2a33';g.font='italic 700 34px '+SERIF;g.textAlign='center';g.fillText('Pull the speed bump out from',512,1110);g.fillText('the spine, under his feet  →',512,1152);g.textAlign='left';},
 build(sp,i){const N=sp.d.mechanism.panels||7,pw=0.24,ph=0.13,c=mkc(256,140),x=c.getContext('2d');x.fillStyle='#f2c230';x.fillRect(0,0,256,140);x.fillStyle='#2b2a33';
  for(let k=-2;k<8;k++){x.beginPath();x.moveTo(k*48,140);x.lineTo(k*48+24,140);x.lineTo(k*48+84,0);x.lineTo(k*48+60,0);x.fill();}
  const t=ctex(c),mat=CARD_MAT({map:t}),g=new T.Group(),D=sp.d.defender,slot=SLOTS[sp.d.arena.size][EF.findIndex(f=>f.id===D)];g.position.set(0.08,0.001,lz(slot[1])+0.16);
  sp.acc={g,N,pw,panels:[],f:0};for(let k=0;k<N;k++){const pg=new T.Group(),geo=new T.BoxGeometry(pw,ph,0.012);geo.translate(pw/2,ph/2,0);const m=new T.Mesh(geo,mat);m.castShadow=m.receiveShadow=true;pg.add(m);g.add(pg);sp.acc.panels.push(pg);}
  const hc=mkc(128,64),hx=hc.getContext('2d');hx.fillStyle='#e8673f';hx.fillRect(0,0,128,64);hx.fillStyle='#fff';hx.font='700 30px Inter,sans-serif';hx.textAlign='center';hx.fillText('PULL',64,43);
  const hm=new T.Mesh(new T.BoxGeometry(0.22,0.16,0.03).translate(0.11,0.08,0),CARD_MAT({map:ctex(hc)}));hm.castShadow=true;sp.acc.handle=hm;g.add(hm);
  layoutAcc(sp.acc,0);g.scale.y=0.001;g.visible=false;sp.R.add(g);(sp.struct=sp.struct||[]).push({g,axis:'sy',flat:0.001,z:g.position.z});sp.disc=hm;hm.userData.hit=()=>mechTap(i);},
 tap(sp,i){const st=S.mech[i]=S.mech[i]||{n:0};if(st.done)return;st.n++;const taps=sp.d.mechanism.taps||3,f0=sp.acc.f,f1=Math.min(1,st.n/taps);sfx.squeeze();focus(1.0,1.1,0.78,1500);
  tween(650,e=>layoutAcc(sp.acc,f0+(f1-f0)*ease.back(e)));
  if(st.n>=taps)setTimeout(()=>{st.done=true;const D=popOf(sp,sp.d.defender),dir=D.bx<1.6?-1:1;sfx.thud();sfx.boing();
   tween(700,e=>{D.g.rotation.z=-dir*0.42*ease.back(e);D.g.position.y=D.by+Math.sin(e*Math.PI)*0.25;});drawL(i);ui();},680);
  else setTimeout(()=>{drawL(i);ui();},300);}};
function layoutAcc(a,f){a.f=f;const th=(1-f)*1.45;let x=0;a.panels.forEach((pg,k)=>{pg.position.set(x,0,k%2?-Math.sin(th)*a.pw:0);pg.rotation.y=(k%2?1:-1)*th;x+=Math.cos(th)*a.pw;});a.handle.position.set(x,0,a.panels.length%2?-Math.sin(th)*a.pw:0);}
const CHOOSERS={
 tabs:{setup(sp,d){sp.atkTabs=d.choose.options;},
  sub:(i,d)=>d.choose.sub||'Pull one of the three tabs along the bottom edge to choose {Ahis} attack.',
  hint:(i,d)=>d.choose.hint||'Pull one of the three tabs sticking out of the bottom edge to launch {A}\'s attack.',
  act:i=>S.choice[i]?'':'Pick an attack for me',run:i=>{if(!S.choice[i]){const o=SP[i].atkObjs[Math.floor(Math.random()*SP[i].atkObjs.length)];pickTab(i,o);}}},
 dial:{setup(sp,d){sp.dial=d.choose.options;},
  sub:(i,d)=>S.choice[i]?'The dial says '+ATK[S.choice[i]].name+'. Pull the lever to strike back.':(d.choose.sub||'Turn the dial to choose {Ahis} comeback.'),
  hint:(i,d)=>S.choice[i]?'Pull the lever, or tap the dial again to change your mind.':(d.choose.hint||'Tap the dial to choose {A}\'s comeback.'),
  talk:(i,d)=>S.choice[i]?['The '+ATK[S.choice[i]].name+'!','Lever. Now.']:null,
  act:i=>S.struck[i]?'':S.choice[i]?'Pull the lever':'Turn the dial',run:i=>{S.choice[i]?pullLever(i):turnDial(i);}}};
UTD.mechs.batteryWheel={sets:'dead',hint:'Tap the wheel to charge {D}\'s phone.',act:'Tap the wheel',
 value:(d,n)=>d.mechanism.labels[n],
 drawL(g,sp){const cx=160*PX,cy=318*PX,r=58*PX;g.save();g.beginPath();g.arc(cx,cy,r,Math.PI,2*Math.PI);g.closePath();g.globalCompositeOperation='destination-out';g.fill();g.restore();
  g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=6;g.beginPath();g.arc(cx,cy,r,Math.PI,2*Math.PI);g.stroke();g.fillStyle='#2b2a33';g.beginPath();g.moveTo(cx-22,cy-r-34);g.lineTo(cx+22,cy-r-34);g.lineTo(cx,cy-r+4);g.fill();
  g.font='italic 700 36px '+SERIF;g.textAlign='center';g.fillText('Tap the wheel',cx,cy+60);g.textAlign='left';},
 build(sp,i){const labels=sp.d.mechanism.labels,c=mkc(512,512),x=c.getContext('2d');x.translate(256,256);
  for(let k=0;k<6;k++){x.fillStyle=k%2?'#2f3858':'#3a4f88';x.beginPath();x.moveTo(0,0);x.arc(0,0,256,-Math.PI/2+(k-0.5)*Math.PI/3,-Math.PI/2+(k+0.5)*Math.PI/3);x.fill();
   x.save();x.rotate(k*Math.PI/3);x.fillStyle=k>=3?'#ff6b6b':'#8ff4f0';x.font='italic 700 64px '+SERIF;x.textAlign='center';x.fillText(labels[k],0,-168);x.restore();}
  x.fillStyle='#c9a227';x.beginPath();x.arc(0,0,22,0,7);x.fill();
  const geo=new T.CircleGeometry(0.62,48);geo.rotateX(-Math.PI/2);const m=new T.Mesh(geo,new T.MeshLambertMaterial({map:ctex(c)}));
  m.position.set(lw(160,'L'),-0.002,lz(318));sp.L.add(m);sp.disc=m;m.userData.hit=()=>mechTap(i);},
 tap(sp,i){const st=S.mech[i]=S.mech[i]||{n:0};if(st.done)return;st.n++;sfx.click(6);focus(-1.6,1.0,0.8,1400);const r0=sp.disc.rotation.y;
  tween(700,e=>{sp.disc.rotation.y=r0+Math.PI/3*ease.back(e);});
  if(st.n>=sp.d.mechanism.taps)setTimeout(()=>{st.done=true;S.cond[sp.d.defender].dead=true;sfx.down();refreshFighters(i);drawL(i);ui();},750);
  else setTimeout(()=>{drawL(i);ui();},300);}};


/* ---------- episode, fighters and attacks ---------- */
const EPS=UTD.episodes,want=(location.hash||'').slice(1),EP=EPS.find(e=>'episode-'+e.id===want)||EPS[EPS.length-1];
const FD=UTD.fighters,EF=EP.fighters.map(id=>{if(!FD[id])throw new Error('Unknown fighter '+id);return FD[id];});
const ATK={};Object.values(FD).forEach(f=>{Object.entries(f.attacks||{}).forEach(([k,a])=>{a.id=k;a.f=f.id;ATK[k]=a;});Object.entries(f.finishers||{}).forEach(([k,a])=>{a.id=k;a.f=f.id;a.finisher=true;ATK[k]=a;});});
const WIN=FD[EP.winner],LOSE=EF.find(f=>f.id!==EP.winner);
const sg=EP.signs||{};
const ART={
 crowdA:[300,78,crowd(11,0,sg.A)],crowdB:[300,103,crowd(23,25,sg.B)],crowdC:[300,128,crowd(41,50,sg.C)],
 crowdA2:[300,78,crowd(57,0,sg.A2)],crowdB2:[300,103,crowd(73,25,sg.B2)],crowdC2:[300,128,crowd(91,50,sg.C2)],
 pow:[180,180,POW],
 champ:[260,150,'<rect x="20" y="40" width="8" height="110" fill="#8a5630"/><rect x="232" y="40" width="8" height="110" fill="#8a5630"/><path d="M0 18 H44 L32 44 L44 70 H0Z M260 18 H216 L228 44 L216 70 H260Z" fill="#c0392b"/><rect x="30" y="8" width="200" height="66" fill="#e8673f"/><text x="130" y="54" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="36" fill="#fff8e8">Champion</text>'],
 trophy:[100,140,'<path d="M20 18 Q2 18 4 34 Q6 50 24 52 M80 18 Q98 18 96 34 Q94 50 76 52" fill="none" stroke="#d9a91d" stroke-width="7"/><path d="M20 10 H80 V40 Q80 75 50 80 Q20 75 20 40Z" fill="#f2c230"/><path d="M30 18 Q34 40 44 54" stroke="#fff8e8" stroke-width="4" fill="none" opacity=".6"/><rect x="44" y="80" width="12" height="22" fill="#d9a91d"/><rect x="26" y="102" width="48" height="12" fill="#d9a91d"/><rect x="18" y="114" width="64" height="26" fill="#5a3a20"/><text x="50" y="132" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="12" fill="#f2c230">MONDAY</text>'],
 sunburst:[220,170,'<path d="M0 170 L10 120 L28 140 L36 90 L56 118 L70 60 L88 104 L110 40 L132 104 L150 60 L164 118 L184 90 L192 140 L210 120 L220 170Z" fill="#f2c230"/><circle cx="110" cy="170" r="70" fill="#f7d76a"/>'],
 waves:[308,110,'<path d="M0 50 Q40 20 80 46 Q120 16 160 44 Q200 18 240 46 Q280 22 308 42 V110 H0Z" fill="#7fd3d6"/><path d="M10 60 Q50 40 90 58 M130 56 Q170 38 210 58" stroke="#fff" stroke-width="3" fill="none"/>'],
 barry:[120,120,'<circle cx="60" cy="60" r="58" fill="#f2c94c"/><path d="M14 120 Q16 88 40 82 L60 96 L80 82 Q104 88 106 120Z" fill="#2f3858"/><path d="M40 82 L60 112 L52 84Z M80 82 L60 112 L68 84Z" fill="#232a44"/><path d="M50 84 L60 100 L70 84Z" fill="#fff"/><path d="M48 94 L60 99 L48 104Z M72 94 L60 99 L72 104Z" fill="#d7263d"/><circle cx="60" cy="99" r="3" fill="#a81c2e"/><rect x="52" y="70" width="16" height="14" fill="#e9b28a"/><ellipse cx="60" cy="52" rx="27" ry="29" fill="#f6c39b"/><circle cx="33" cy="54" r="6" fill="#e9b28a"/><circle cx="87" cy="54" r="6" fill="#e9b28a"/><path d="M33 46 Q32 20 60 20 Q90 20 87 46 Q84 30 64 32 Q48 30 40 38 Q36 42 33 46Z" fill="#3a2414"/><path d="M48 26 Q62 22 76 28" stroke="#7a5a3a" stroke-width="3" fill="none"/><path d="M30 50 Q30 22 60 18 Q90 22 90 50" stroke="#2b2a33" stroke-width="4" fill="none"/><rect x="25" y="46" width="9" height="15" rx="4" fill="#2b2a33"/><path d="M30 60 Q32 76 48 74" stroke="#2b2a33" stroke-width="2.5" fill="none"/><circle cx="49" cy="74" r="3.5" fill="#2b2a33"/><path d="M42 42 Q48 37 54 41 M66 41 Q72 37 78 42" stroke="#3a2414" stroke-width="3.5" fill="none"/><circle cx="48" cy="49" r="3.2" fill="#2b2a33"/><circle cx="72" cy="49" r="3.2" fill="#2b2a33"/><circle cx="49" cy="48" r="1" fill="#fff"/><circle cx="73" cy="48" r="1" fill="#fff"/><path d="M57 52 Q60 60 63 52" stroke="#d99a7a" stroke-width="2.5" fill="none"/><circle cx="40" cy="60" r="5" fill="#f19a8a" opacity=".5"/><circle cx="80" cy="60" r="5" fill="#f19a8a" opacity=".5"/><path d="M48 70 Q60 84 72 70Z" fill="#7a1f2a"/><path d="M52 71 Q60 76 68 71" fill="#fff"/><path d="M36 64 Q48 56 60 63 Q72 56 84 64 Q88 70 82 70 Q72 64 60 68 Q48 64 38 70 Q32 70 36 64Z" fill="#5a3a22"/>'],
 dot:[120,120,'<circle cx="60" cy="60" r="58" fill="#7fd3d6"/><path d="M16 120 Q18 90 42 84 L60 92 L78 84 Q102 90 104 120Z" fill="#e0a526"/><path d="M42 84 L54 104 L60 92Z M78 84 L66 104 L60 92Z" fill="#c98d12"/><circle cx="50" cy="104" r="2" fill="#f7f4ee"/><circle cx="50" cy="112" r="2" fill="#f7f4ee"/><path d="M46 88 Q60 98 74 88" stroke="#f7f4ee" stroke-width="3" stroke-dasharray="1 4" stroke-linecap="round" fill="none"/><rect x="53" y="72" width="14" height="14" fill="#b37c5c"/><path d="M28 62 Q24 22 60 20 Q96 22 92 62 L92 80 L80 80 L80 50 L40 50 L40 80 L28 80Z" fill="#1d1d26"/><ellipse cx="60" cy="54" rx="24" ry="27" fill="#c98f6b"/><path d="M34 46 Q40 24 64 26 Q84 28 86 46 Q76 36 60 38 Q46 36 34 46Z" fill="#1d1d26"/><path d="M36 46 H84" stroke="#1d1d26" stroke-width="5"/><circle cx="36" cy="66" r="3" fill="#f7f4ee"/><circle cx="84" cy="66" r="3" fill="#f7f4ee"/><path d="M38 52 Q38 46 48 46 Q56 46 56 53 Q56 60 47 60 Q38 60 38 52Z M64 53 Q64 46 72 46 Q82 46 82 52 Q82 60 73 60 Q64 60 64 53Z" fill="#fff" stroke="#c0392b" stroke-width="3"/><path d="M36 48 L40 44 M84 48 L80 44" stroke="#c0392b" stroke-width="3"/><path d="M56 53 H64" stroke="#c0392b" stroke-width="2.5"/><circle cx="47" cy="54" r="2.6" fill="#2b2a33"/><circle cx="73" cy="54" r="2.6" fill="#2b2a33"/><path d="M42 44 L52 45 M68 45 L78 44" stroke="#1d1d26" stroke-width="2.5"/><path d="M58 60 Q60 64 62 60" stroke="#a8714d" stroke-width="2" fill="none"/><path d="M52 70 H68" stroke="#8a3a3a" stroke-width="3" stroke-linecap="round"/><path d="M84 30 L98 12" stroke="#e6c25a" stroke-width="4"/><path d="M98 12 L101 8" stroke="#f4a08a" stroke-width="4"/><path d="M84 30 L82 33" stroke="#2b2a33" stroke-width="3"/>']};
{const tb=(EP.spreads.find(s=>s.type==='title')||{}).banner||['Ultimate','Teams Deathmatch'];
 ART.banner=[260,150,'<rect x="0" y="40" width="260" height="110" fill="#f7d06a"/><path d="M0 40 L20 10 L40 40 L60 10 L80 40 L100 10 L120 40 L140 10 L160 40 L180 10 L200 40 L220 10 L240 40 L260 10 L260 40Z" fill="#f7d06a"/><text x="130" y="88" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="30" fill="#2b2a33">'+tb[0]+'</text><text x="130" y="120" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="17" fill="#2b2a33">'+(tb[1]||'')+'</text>'];}
Object.values(FD).forEach(f=>Object.assign(ART,f.art||{}));Object.values(UTD.arenas).forEach(a=>{if(a.art)Object.assign(ART,a.art(EP));});
// fighter cut-outs: every state the episode can reach (parts lost, pivot arm separated, conditions)
function fbody(f,lost,sep,cond){let o='<g stroke-linecap="round" stroke-linejoin="round">';
 f.body.forEach(b=>{if(typeof b==='string')o+=b;else if(b.cond)o+=cond[b.cond]?b.yes:b.no;else{const P=f.parts[b.part];
  if(lost.includes(b.part)){if(b.piece!=='back')o+=P.stump||'';}else if(sep!==b.part)o+=b.piece?P[b.piece]:P.all;}});return o+'</g>';}
const fkey=(id,lost,sep,cond)=>id+'|'+lost.slice().sort().join('+')+'|'+(sep||'')+'|'+Object.keys(cond||{}).filter(k=>cond[k]).sort().join('+');
{const inj={},att={},cnd={};EF.forEach(f=>{inj[f.id]=[];att[f.id]=false;cnd[f.id]=[{}];});
 EP.spreads.forEach(s=>{if(s.type==='intro'){const I=FD[s.fighter].intro;if(I.tab.type==='swap')cnd[s.fighter].push({[I.tab.cond]:true});}if(s.type==='round'){inj[s.defender].push(s.injury);att[s.attacker]=true;}if(s.type==='finish'){att[s.attacker]=true;if(s.injury)inj[s.defender].push(s.injury);const c=(UTD.mechs[s.mechanism.type]||{}).sets;if(c)cnd[s.defender].push({[c]:true});}});
 if(EP.loserCond&&cnd[LOSE.id].length<2)cnd[LOSE.id].push({[EP.loserCond]:true});
 EF.forEach(f=>{const pre=[[]];inj[f.id].forEach((p,k)=>pre.push(inj[f.id].slice(0,k+1)));const seps=[''];if(att[f.id]&&f.pivot)seps.push(f.pivot);
  pre.forEach(lost=>seps.forEach(sep=>{if(sep&&lost.includes(sep))return;cnd[f.id].forEach(c=>{ART[fkey(f.id,lost,sep,c)]=[200,280,fbody(f,lost,sep,c)];});}));
  Object.entries(f.parts).forEach(([pn,P])=>{const c=P.crop;ART[f.id+'~'+pn]=[c[2],c[3],P.all||(P.back+P.front),c.join(' ')];});});}

const IMG={},TEX={},SIL={};
const NOISE=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');for(let i=0;i<2600;i++){g.fillStyle=Math.random()<.5?'rgba(0,0,0,.07)':'rgba(255,255,255,.08)';g.fillRect(Math.random()*128,Math.random()*128,1.6,1.6);}return c;})();
function paperize(img,w,h,rim){const t=document.createElement('canvas');t.width=w;t.height=h;t.getContext('2d').drawImage(img,0,0,w,h);
 const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');const r=rim||Math.max(3,Math.round(Math.min(w,h)*0.014));
 for(let a=0;a<16;a++){const an=a/16*Math.PI*2;g.drawImage(t,Math.cos(an)*r,Math.sin(an)*r);}
 g.globalCompositeOperation='source-in';g.fillStyle='#fbf6ea';g.fillRect(0,0,w,h);
 g.globalCompositeOperation='source-over';g.shadowColor='rgba(60,40,20,.35)';g.shadowBlur=r*0.8;g.drawImage(t,0,0);g.shadowBlur=0;
 g.globalCompositeOperation='source-atop';g.fillStyle=g.createPattern(NOISE,'repeat');g.fillRect(0,0,w,h);g.globalCompositeOperation='source-over';const q=document.createElement('canvas');q.width=w;q.height=h;const qg=q.getContext('2d');qg.fillStyle=qg.createPattern(CARD_M,'repeat');qg.fillRect(0,0,w,h);qg.globalCompositeOperation='destination-in';qg.drawImage(c,0,0);g.globalCompositeOperation='multiply';g.drawImage(q,0,0);g.globalCompositeOperation='source-over';return c;}
function loadArt(){return Promise.all(Object.entries(ART).map(([k,a])=>new Promise(res=>{
 const sc=k==='barry'||k==='dot'?2.5:4,img=new Image();
 img.onload=()=>{IMG[k]=img;const c=paperize(img,Math.round(a[0]*sc),Math.round(a[1]*sc));TEX[k]=ctex(c);const sc2=mkc(c.width>>1,c.height>>1),sg2=sc2.getContext('2d');sg2.drawImage(c,0,0,sc2.width,sc2.height);sg2.globalCompositeOperation='source-in';sg2.fillStyle='#e4d9c2';sg2.fillRect(0,0,sc2.width,sc2.height);SIL[k]=ctex(sc2);res();};
 img.onerror=res;img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg(a[2],a[3]||('0 0 '+a[0]+' '+a[1]),a[0]*sc,a[1]*sc));})));}


/* ---------- state and spreads (built from the episode script) ---------- */
const S={met:false,flicked:false,fire:{},choice:{},struck:{},mech:{},ko:false,lost:{},cond:{},serial:0,striking:false};
EF.forEach(f=>{S.lost[f.id]=[];S.cond[f.id]={};});
const fill=(t,o)=>String(t).replace(/\{(\w+)\}/g,(m,k)=>o[k]!==undefined?o[k]:m);
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function toks(A,D,part){return {A:A.short,Aname:A.name,Ahis:A.his,Ahe:A.he,Ahim:A.him,D:D.short,Dname:D.name,Dhis:D.his,Dhis_cap:cap(D.his),Dhe:D.he,Dhim:D.him,part:part?D.parts[part].label:''};}
const SLOTS={spread:[[-120,255,120,175],[120,255,120,175]],page:[[85,290,110,160],[238,290,110,160]],front:[[82,345,100,140],[238,345,100,140]]};
function lostAt(i,fid){const l=[];EP.spreads.slice(0,i).forEach(s=>{if((s.type==='round'||s.type==='finish')&&s.injury&&s.defender===fid)l.push(s.injury);});return l;}
function makeSpread(d,i){const sp={d,type:d.type,bg:d.bg,pops:[],boxes:[],flaps:[]};
 const fighterPops=(slot,sepFor)=>EF.forEach((f,k)=>{const sep=f.id===sepFor&&f.pivot&&!lostAt(i,f.id).includes(f.pivot)?f.pivot:'';const s=SLOTS[slot][k];
  sp.pops.push([fkey(f.id,lostAt(i,f.id),sep,{}),s[0],s[1],s[2],s[3],f.id,0,sep?f.id+'~'+sep:null,sep]);});
 if(d.type==='title'){UTD.arenas[(d.arena&&d.arena.type)||d.arena||'ring'].build(sp,{size:'page',crowd:false},d);sp.pops.unshift(['banner',160,118,260,150]);fighterPops('front','');
  const who=EP.verse?'the fighters':'your commentators';sp.flaps=[{k:'meet',x:160,y:258,w:240,h:92,label:'Lift to meet '+who,col:'#f7f4ee'}];sp.flip=true;
  sp.story=()=>d.story;sp.sub=()=>d.sub||[];sp.hint=()=>S.met?'Flick the little flip-book in the corner, then turn the page.':'Lift the flap to meet '+who+'.';sp.talk=()=>d.talk||[];}
 else if(d.type==='intro'){const F=FD[d.fighter],I=F.intro;sp.boxes=I.scene.boxes.slice();sp.pops=I.scene.pops.slice();
  if(I.tab.type==='reveal')sp.pops.push(I.tab.pop.concat(['late']));if(I.tab.type==='swap'&&I.tab.pop)sp.pops.push(I.tab.pop.concat(['late']));sp.pops.push([fkey(F.id,[],'',{}),...I.pose,'hero']);sp.tab=true;sp.introF=F;
  const V=EP.verse&&EP.verse[F.id];sp.story=()=>V?V.intro:I.story;sp.sub=()=>V?[]:I.sub;sp.hint=()=>'Pull the tab on the right-hand edge of the page.';sp.talk=()=>V?(S.fire[i]?V.fired:[]):(S.fire[i]?I.talkFired:I.talk);}
 else if(d.type==='round'){const A=FD[d.attacker],D=FD[d.defender],tk=toks(A,D,d.injury);UTD.arenas[d.arena.type].build(sp,d.arena,d);fighterPops(d.arena.size,A.id);
  const ch=CHOOSERS[d.choose.type];ch.setup(sp,d);
  sp.result=()=>{const k=S.choice[i];return fill((d.texts||{})[k]||ATK[k].text,tk);};
  sp.story=()=>d.story;sp.sub=()=>S.struck[i]?[sp.result()]:[fill(ch.sub(i,d),tk)];
  sp.hint=()=>S.struck[i]?'Turn the page.':fill(ch.hint(i,d),tk);
  sp.talk=()=>EP.verse?[]:S.struck[i]?[d.talk.after[0],ATK[S.choice[i]].quip]:(ch.talk&&ch.talk(i,d))||d.talk.before;}
 else if(d.type==='finish'){const M=UTD.mechs[d.mechanism.type];UTD.arenas[d.arena.type].build(sp,d.arena,d);fighterPops(d.arena.size,d.attacker);sp.tab=true;sp.mech=M;
  const ph=()=>S.ko?'ko':S.mech[i]&&S.mech[i].done?'done':S.mech[i]&&S.mech[i].n?'progress':'start';
  sp.story=()=>d.story;sp.sub=()=>{const t=d.texts[ph()];return (Array.isArray(t)?t:[t]).map(x=>fill(x,{v:S.mech[i]?M.value(d,S.mech[i].n):''}));};
  sp.hint=()=>({ko:'Turn the page.',done:'Pull the tab on the right-hand edge for the finisher.',progress:M.hint,start:M.hint})[ph()];sp.talk=()=>(d.talk[ph()]||[]).map(x=>fill(x,{v:S.mech[i]?M.value(d,S.mech[i].n):''}));}
 else if(d.type==='winner'){sp.boxes=[[1.6,0.95,0.95,0.55,0.62,'#f7f4ee','p1'],[0.68,0.95,0.78,0.34,0.62,'#e9e2d0','p2']];
  const fl=f=>lostAt(EP.spreads.length,f.id),lc={};if(EP.loserCond)lc[EP.loserCond]=true;
  sp.pops=[['sunburst',160,140,220,170],['waves',160,200,308,110],[fkey(WIN.id,fl(WIN),'',{}),160,264,112,175,'',0.55],[fkey(LOSE.id,fl(LOSE),'',lc),68,264,96,140,'',0.34]];
  sp.gatefold=true;sp.pocket=true;sp.story=()=>d.story;
  sp.sub=()=>sp.wingOpen?['Your own fight card is in the pocket below. Pull it out.']:['Open the gatefold on the right to see the result.'];
  sp.hint=()=>sp.wingOpen?'Tap the card in the pocket to pull it out, then copy it for Teams.':'Tap the folded page on the right to open the gatefold.';
  sp.talk=()=>EP.verse?(sp.wingOpen?(d.talk||[]):[]):sp.wingOpen?(d.talk||['What a fight!','Same ending for everyone. Different arms.']):['Drumroll, please.','Open it. The suspense is unbearable. For you.'];}
 return sp;}

const SP=EP.spreads.map((d,i)=>makeSpread(d,i));const TK0=toks(EF[0],EF[1]);
/* ---------- procedural paper, card and material textures ---------- */
function genHeight(w,h,opt){const H=new Float32Array(w*h);
 const oct=(cell,amp)=>{const gw=Math.ceil(w/cell)+2,G=new Float32Array(gw*(Math.ceil(h/cell)+2));for(let i=0;i<G.length;i++)G[i]=Math.random();
  for(let y=0;y<h;y++){const fy=y/cell,iy=fy|0,ty=fy-iy,sy=ty*ty*(3-2*ty);for(let x=0;x<w;x++){const fx=x/cell,ix=fx|0,tx=fx-ix,sx=tx*tx*(3-2*tx),o=iy*gw+ix;
   const a=G[o],b=G[o+1],c=G[o+gw],d=G[o+gw+1],ab=a+(b-a)*sx,cd=c+(d-c)*sx;H[y*w+x]+=amp*(ab+(cd-ab)*sy);}}};
 (opt.oct||[[64,0.5],[16,0.3],[5,0.22],[2,0.14]]).forEach(([c,a])=>oct(c,a));
 for(let n=0;n<(opt.fibers||0);n++){let x=Math.random()*w,y=Math.random()*h,a=Math.random()*Math.PI*2;const L=8+Math.random()*(opt.flen||45),amp=(0.12+Math.random()*0.22)*(Math.random()<0.5?1:-0.6);
  for(let k=0;k<L;k++){a+=(Math.random()-.5)*0.3;x+=Math.cos(a);y+=Math.sin(a);const xi=((x|0)%w+w)%w,yi=((y|0)%h+h)%h;H[yi*w+xi]+=amp;}}
 return H;}
function normalTex(H,w,h,str){const c=mkc(w,h),g=c.getContext('2d'),id=g.createImageData(w,h),d=id.data;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,nx=(H[y*w+(x-1+w)%w]-H[y*w+(x+1)%w])*str,ny=(H[((y+1)%h)*w+x]-H[((y-1+h)%h)*w+x])*str,l=Math.hypot(nx,ny,1);
  d[i*4]=(nx/l*0.5+0.5)*255;d[i*4+1]=(ny/l*0.5+0.5)*255;d[i*4+2]=(1/l*0.5+0.5)*255;d[i*4+3]=255;}
 g.putImageData(id,0,0);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=aniso;return t;}
function grayCanvas(H,w,h,lo,hi){let mn=1e9,mx=-1e9;for(const v of H){if(v<mn)mn=v;if(v>mx)mx=v;}const c=mkc(w,h),g=c.getContext('2d'),id=g.createImageData(w,h),d=id.data;
 for(let i=0;i<H.length;i++){const v=lo+(hi-lo)*(H[i]-mn)/(mx-mn||1);d[i*4]=v;d[i*4+1]=v*0.985;d[i*4+2]=v*0.95;d[i*4+3]=255;}g.putImageData(id,0,0);return c;}
const PH=genHeight(512,640,{fibers:2600}),PAPER_N=normalTex(PH,512,640,2.4),PAPER_M=grayCanvas(PH,512,640,212,255);
const CH=genHeight(256,256,{oct:[[32,0.5],[8,0.3],[3,0.2]],fibers:700,flen:30}),CARD_N=normalTex(CH,256,256,1.8),CARD_M=grayCanvas(CH,256,256,220,255);
const PAPER_MAT=o=>new T.MeshStandardMaterial(Object.assign({roughness:0.88,metalness:0,normalMap:PAPER_N,normalScale:new T.Vector2(0.55,0.55),envMapIntensity:0.42},o));
const CARD_MAT=o=>new T.MeshStandardMaterial(Object.assign({roughness:0.8,metalness:0,normalMap:CARD_N,normalScale:new T.Vector2(0.4,0.4),envMapIntensity:0.42},o));
/* ---------- desk and book ---------- */
{const c=mkc(1024,1024),g=c.getContext('2d');g.fillStyle='#d9c5a7';g.fillRect(0,0,1024,1024);
 for(let i=0;i<180;i++){const y=Math.random()*1024;g.strokeStyle='rgba('+(120+Math.random()*40|0)+','+(90+Math.random()*30|0)+',60,'+(0.05+Math.random()*0.08)+')';g.lineWidth=1+Math.random()*3;g.beginPath();g.moveTo(0,y);for(let x=0;x<=1024;x+=64)g.lineTo(x,y+Math.sin(x/140+i)*4);g.stroke();}
 for(let i=0;i<26;i++){const y=Math.random()*1024,r=6+Math.random()*16;const gr=g.createRadialGradient(Math.random()*1024,y,1,Math.random()*1024,y,r*4);gr.addColorStop(0,'rgba(110,80,50,.10)');gr.addColorStop(1,'rgba(110,80,50,0)');g.fillStyle=gr;g.fillRect(0,y-r*4,1024,r*8);}
 const wd=g.getImageData(0,0,1024,1024).data,WH=new Float32Array(1024*1024);for(let i=0;i<WH.length;i++)WH[i]=-(wd[i*4]+wd[i*4+1])/510;
 const t=ctex(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(3,3);const wn=normalTex(WH,1024,1024,6);wn.repeat.set(3,3);
 const desk=new T.Mesh(new T.PlaneGeometry(40,40),new T.MeshStandardMaterial({map:t,normalMap:wn,normalScale:new T.Vector2(0.6,0.6),roughness:0.75,metalness:0,envMapIntensity:0.18}));desk.rotation.x=-Math.PI/2;desk.position.y=-0.12;desk.receiveShadow=true;scene.add(desk);
 const pen=new T.Group(),body=new T.Mesh(new T.CylinderGeometry(0.07,0.07,2.6,6),new T.MeshLambertMaterial({color:'#f2c230'}));body.rotation.z=Math.PI/2;
 const tip=new T.Mesh(new T.ConeGeometry(0.07,0.3,6),new T.MeshLambertMaterial({color:'#f1d7b3'}));tip.rotation.z=-Math.PI/2;tip.position.x=1.45;
 pen.add(body,tip);pen.position.set(-5.6,-0.05,1.4);pen.rotation.y=0.5;pen.traverse(o=>{o.castShadow=true;});scene.add(pen);
 [['#e8673f',-5.4,-1.2,0.4],['#f4d77a',-5,-0.4,1.2],['#3a6fb0',5.3,-1.6,2],['#f4f1ea',5.6,1.5,0.8]].forEach(([col,x,z,r])=>{const s=new T.Shape();s.moveTo(0,0);s.lineTo(0.5,0.1);s.lineTo(0.35,0.4);s.lineTo(-0.05,0.3);
  const m=new T.Mesh(new T.ShapeGeometry(s),new T.MeshLambertMaterial({color:col,side:T.DoubleSide}));m.rotation.x=-Math.PI/2;m.rotation.z=r;m.position.set(x,-0.115,z);m.receiveShadow=true;scene.add(m);});}
const book=new T.Group();scene.add(book);let coverG,coverMat,coverBoard;
{const lc=mkc(256,256),lg=lc.getContext('2d');lg.fillStyle='#2f3858';lg.fillRect(0,0,256,256);const LH=new Float32Array(256*256);
 for(let y=0;y<256;y++)for(let x=0;x<256;x++){const v=Math.sin(x*Math.PI/2)*0.5+Math.sin(y*Math.PI/2)*0.5+Math.random()*0.6;LH[y*256+x]=v;if(Math.random()<0.5){lg.fillStyle='rgba(255,255,255,'+(0.02+Math.random()*0.05)+')';lg.fillRect(x,y,1,1);}}
 const lt=ctex(lc);lt.wrapS=lt.wrapT=T.RepeatWrapping;lt.repeat.set(10,6);const ln=normalTex(LH,256,256,0.9);ln.repeat.set(10,6);
 const ec=mkc(64,256),eg=ec.getContext('2d');eg.fillStyle='#f3efe6';eg.fillRect(0,0,64,256);for(let y=0;y<256;y+=3){eg.fillStyle='rgba(120,100,70,'+(0.12+Math.random()*0.12)+')';eg.fillRect(0,y,64,1);}
 const et=ctex(ec),em=new T.MeshStandardMaterial({map:et,roughness:0.95}),etop=new T.MeshStandardMaterial({color:'#f3efe6',roughness:0.95});
 const linen=new T.MeshStandardMaterial({map:lt,normalMap:ln,normalScale:new T.Vector2(0.8,0.8),roughness:0.85,envMapIntensity:0.4});
 const board=new T.Mesh(new T.BoxGeometry(W+0.13,0.05,H+0.26),linen);board.position.set((W+0.13)/2,-0.13,0);board.castShadow=board.receiveShadow=true;book.add(board);
 const spine=new T.Mesh(new T.BoxGeometry(0.06,0.05,H+0.26),linen);spine.position.set(0,-0.13,0);spine.receiveShadow=true;book.add(spine);
 coverG=new T.Group();book.add(coverG);coverMat=[linen,linen,linen,linen.clone(),linen,linen];
 const boardL=new T.Mesh(new T.BoxGeometry(W+0.13,0.05,H+0.26),coverMat);boardL.position.set(-(W+0.13)/2,-0.13,0);boardL.castShadow=boardL.receiveShadow=true;coverG.add(boardL);coverBoard=boardL;
 [1,-1].forEach(sx=>{const b=new T.Mesh(new T.BoxGeometry(W,0.065,H),[em,em,etop,etop,em,em]);b.position.set(sx*W/2,-0.0775,0);b.castShadow=b.receiveShadow=true;(sx<0?coverG:book).add(b);});}

/* ---------- helpers ---------- */
const PX=1024/320;
function paper(g,col,w,h,gutter){g.fillStyle=col;g.fillRect(0,0,w,h);g.save();g.globalCompositeOperation='multiply';g.drawImage(PAPER_M,0,0,w,h);g.restore();
 for(let i=0;i<10;i++){const x=Math.random()*w,y=Math.random()*h,r=80+Math.random()*220,gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(120,90,40,.035)');gr.addColorStop(1,'rgba(120,90,40,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,2*r,2*r);}
 const eg=g.createLinearGradient(0,0,0,h);eg.addColorStop(0,'rgba(90,60,20,.06)');eg.addColorStop(0.06,'rgba(90,60,20,0)');eg.addColorStop(0.94,'rgba(90,60,20,0)');eg.addColorStop(1,'rgba(90,60,20,.07)');g.fillStyle=eg;g.fillRect(0,0,w,h);
 const gr=gutter==='R'?g.createLinearGradient(w-110,0,w,0):g.createLinearGradient(110,0,0,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(40,25,10,.22)');g.fillStyle=gr;g.fillRect(gutter==='R'?w-110:0,0,110,h);}
function wrap(g,text,x,y,mw,lh){if(text.indexOf('\n')>=0){text.split('\n').forEach(t=>{y=wrap(g,t,x,y,mw,lh);});return y;}const words=text.split(' ');let line='';for(const w of words){const t=line?line+' '+w:w;if(g.measureText(t).width>mw&&line){g.fillText(line,x,y);y+=lh;line=w;}else line=t;}if(line){g.fillText(line,x,y);y+=lh;}return y;}
const SERIF='Fraunces, Georgia, serif';
const dark=c=>{const n=parseInt(c.slice(1),16);return ((n>>16)*0.3+((n>>8)&255)*0.59+(n&255)*0.11)<110;};
function icon(g,k,cx,cy,s,col){const a=ATK[k];if(!a||!a.icon)return;g.save();g.translate(cx,cy);g.scale(s,s);g.lineCap='round';g.lineJoin='round';g.fillStyle=col;g.strokeStyle=col;g.lineWidth=7;a.icon(g);g.restore();}
function star(g,cx,cy,r1,r2,n,col){g.fillStyle=col;g.beginPath();for(let k=0;k<n*2;k++){const a=k/(n*2)*Math.PI*2,r=k%2?r2:r1;g.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);}g.closePath();g.fill();}
function matWide(g,side){const y0=400,y1=944,L=side==='L',x0=L?288:-30,x1=L?1054:736,cx=L?1024:0,cy=(y0+y1)/2;
 g.fillStyle='rgba(0,0,0,.18)';g.fillRect(x0+(L?0:30),y0+12,x1-x0,y1-y0+14);g.fillStyle='#2f3858';g.fillRect(L?x0-14:x0,y0-4,x1-x0+14,y1-y0+22);
 g.fillStyle='#ebe5d6';g.fillRect(L?x0:x0,y0,L?x1-x0:x1-x0,y1-y0);g.fillStyle=g.createPattern(NOISE,'repeat');g.fillRect(x0,y0,x1-x0,y1-y0);
 g.strokeStyle='rgba(47,56,88,.12)';g.lineWidth=2;for(let yy=y0+40;yy<y1;yy+=40){g.beginPath();g.moveTo(x0,yy);g.lineTo(x1,yy);g.stroke();}
 g.fillStyle='rgba(232,103,63,.2)';g.beginPath();g.arc(cx,cy,190,0,7);g.fill();g.fillStyle='rgba(47,56,88,.35)';g.font='italic 700 120px '+SERIF;g.textAlign='center';g.fillText('UTD',cx,cy+42);
 g.fillStyle='#f2c230';g.font='700 28px Inter,sans-serif';g.fillText('SEASON TWO',cx,y1+15);g.textAlign='left';}
function drawL(i){const sp=SP[i],c=sp.cL,g=c.getContext('2d'),w=c.width,h=c.height;g.clearRect(0,0,w,h);paper(g,sp.bg[0],w,h,'R');
 const ink=dark(sp.bg[0])||sp.type==='winner'?'#fdfaf3':'#2b2a33';g.fillStyle=ink;g.textBaseline='alphabetic';
 if(sp.wide){(sp.mat||matWide)(g,'L');g.fillStyle=ink;g.font='italic 700 50px '+SERIF;let y=wrap(g,sp.story(),70,1060,880,58)+6;g.font='italic 500 32px '+SERIF;sp.sub().forEach(s=>{y=wrap(g,s,72,y,880,40)+4;});}
 else{const vs=!!EP.verse;g.font='italic 700 '+(vs?43:66)+'px '+SERIF;let y=wrap(g,sp.story(),80,vs?130:170,860,vs?56:78)+18;
 g.font='italic 500 42px '+SERIF;sp.sub().forEach(s=>{y=wrap(g,s,92,y,800,52)+6;});}
 (sp.flaps||[]).forEach(f=>{const x=f.x*PX,y0=f.y*PX,fw=f.w*PX,fh=f.h*PX;g.fillStyle='rgba(0,0,0,.08)';g.fillRect(x-fw/2,y0,fw,fh);g.fillStyle=ink;g.textAlign='center';
  if(f.k==='meet'&&EP.verse){const fa=IMG[fkey(EF[0].id,[],'',{})],fb=IMG[fkey(EF[1].id,[],'',{})];if(fa)g.drawImage(fa,x-fw/2+60,y0+18,130,182);if(fb)g.drawImage(fb,x+40,y0+18,130,182);g.font='italic 700 34px '+SERIF;g.fillText(EF[0].name,x-fw/2+125,y0+240);g.fillText(EF[1].name,x+105,y0+240);g.font='italic 700 30px '+SERIF;g.fillText('vs',x,y0+130);}
  else if(f.k==='meet'){g.drawImage(IMG.barry,x-fw/2+40,y0+40,150,150);g.drawImage(IMG.dot,x+20,y0+40,150,150);g.font='italic 700 34px '+SERIF;g.fillText('Barry Bellows',x-fw/2+115,y0+235);g.fillText('Dot Mallory',x+95,y0+235);g.font='italic 500 28px '+SERIF;g.fillText('loud, mostly right',x-fw/2+115,y0+275);g.fillText('quiet, always right',x+95,y0+275);}
  else if(ATK[f.k]){star(g,x,y0+fh/2-10,fw*0.46,fw*0.3,12,'#f2c230');star(g,x,y0+fh/2-10,fw*0.34,fw*0.22,12,'#e8673f');g.fillStyle='#fff8e8';g.font='italic 700 '+(ATK[f.k].fx.length>7?36:44)+'px '+SERIF;g.fillText(ATK[f.k].fx,x,y0+fh/2);}
  g.textAlign='left';});
 if(sp.mech&&sp.mech.drawL)sp.mech.drawL(g,sp,i);
 g.font='italic 500 30px '+SERIF;g.fillStyle=ink;g.globalAlpha=.7;g.fillText(String(i*2+1),56,h-40);g.globalAlpha=1;
 if(sp.tL)sp.tL.needsUpdate=true;}
function drawR(i){const sp=SP[i],c=sp.cR,g=c.getContext('2d'),w=c.width,h=c.height;paper(g,sp.bg[1],w,h,'L');
 const ink=dark(sp.bg[1])?'#fdfaf3':'#2b2a33';g.fillStyle=ink;
 if(sp.wide){(sp.mat||matWide)(g,'R');g.fillStyle=ink;g.textAlign='center';
  if(sp.atkTabs){g.font='italic 700 30px '+SERIF;g.fillText('Pull a tab to attack',(0.62+0.98)*320,1205);g.font='700 40px Inter,sans-serif';sp.atkTabs.forEach((k,j)=>g.fillText('↓',(0.62+j*0.98)*320,1262));}
  if(sp.dial){g.font='italic 700 30px '+SERIF;g.fillText('Turn the dial',0.8*320,1250);g.fillText('Pull the lever',2.65*320,1100);}
  g.textAlign='left';}
 if(sp.mat&&!sp.wide)sp.mat(g,'P');
 if(sp.ring&&!sp.wide){const x0=112,x1=912,y0=464,y1=1008;g.fillStyle='rgba(0,0,0,.18)';g.fillRect(x0-6,y0+10,x1-x0+24,y1-y0+14);g.fillStyle='#2f3858';g.fillRect(x0-14,y0-4,x1-x0+28,y1-y0+22);
  g.fillStyle='#ebe5d6';g.fillRect(x0,y0,x1-x0,y1-y0);g.fillStyle=g.createPattern(NOISE,'repeat');g.fillRect(x0,y0,x1-x0,y1-y0);
  g.strokeStyle='rgba(47,56,88,.12)';g.lineWidth=2;for(let yy=y0+40;yy<y1;yy+=40){g.beginPath();g.moveTo(x0,yy);g.lineTo(x1,yy);g.stroke();}
  g.fillStyle='rgba(232,103,63,.18)';g.beginPath();g.arc((x0+x1)/2,(y0+y1)/2,150,0,7);g.fill();g.fillStyle='rgba(47,56,88,.35)';g.font='italic 700 92px '+SERIF;g.textAlign='center';g.fillText('UTD',(x0+x1)/2,(y0+y1)/2+32);g.textAlign='left';
  g.fillStyle='#f2c230';g.font='700 26px Inter,sans-serif';g.textAlign='center';g.fillText('SEASON TWO',(x0+x1)/2,y1+14);g.textAlign='left';g.fillStyle=ink;}
 if(sp.tab){g.font='italic 700 34px '+SERIF;g.textAlign='right';g.fillText('Pull',w-46,1080);g.textAlign='left';}
 g.font='italic 500 30px '+SERIF;g.globalAlpha=.7;g.textAlign='right';g.fillText(String(i*2+2),w-56,h-40);g.textAlign='left';g.globalAlpha=1;
 if(sp.tR)sp.tR.needsUpdate=true;}
function pageMesh(tex,x){const m=new T.Mesh(new T.PlaneGeometry(W,H),PAPER_MAT({map:tex,alphaTest:0.5}));m.rotation.x=-Math.PI/2;m.position.set(x,0,0);m.receiveShadow=true;return m;}
const lw=(x,side)=>side==='L'?-W+x*U:x*U, lz=y=>-H/2+y*U;
function cutout(key,w,h){const geo=new T.PlaneGeometry(w,h);geo.translate(0,h/2,0);
 const m=new T.Mesh(geo,CARD_MAT({map:TEX[key],alphaTest:0.5,side:T.DoubleSide}));
 m.customDepthMaterial=new T.MeshDepthMaterial({depthPacking:T.RGBADepthPacking,map:TEX[key],alphaTest:0.5});m.castShadow=true;m.receiveShadow=true;
 if(SIL[key])[0.006].forEach(dz=>{const e=new T.Mesh(geo,new T.MeshStandardMaterial({map:SIL[key],alphaTest:0.5,side:T.DoubleSide,roughness:0.95,envMapIntensity:0.2}));e.position.z=-dz;e.receiveShadow=true;e.userData.edge=1;m.add(e);});
 return m;}
function setTex(m,key){m.material.map=TEX[key];m.customDepthMaterial.map=TEX[key];m.material.needsUpdate=m.customDepthMaterial.needsUpdate=true;m.children.forEach(e=>{if(e.userData.edge&&SIL[key]){e.material.map=SIL[key];e.material.needsUpdate=true;}});}
/* ---------- tweens, confetti, flying parts ---------- */
const tw=[],TICKS=[];let now=0;
function tween(dur,fn,delay,done){tw.push({s:now+(delay||0),d:dur,fn,done});}
const ease={in2:p=>p*p,soft:p=>{const c1=0.45,c3=c1+1;return 1+c3*Math.pow(p-1,3)+c1*Math.pow(p-1,2);},out:p=>1-Math.pow(1-p,3),inout:p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2,back:p=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(p-1,3)+c1*Math.pow(p-1,2);}};
const CN=420,cgeo=new T.PlaneGeometry(0.07,0.04),conf=new T.InstancedMesh(cgeo,new T.MeshLambertMaterial({side:T.DoubleSide}),CN);
conf.instanceMatrix.setUsage(T.DynamicDrawUsage);conf.castShadow=true;scene.add(conf);
const P=[],dum=new T.Object3D(),COLS=['#e8673f','#f2c230','#3a6fb0','#1fa59a','#f4a08a','#9b5de5','#ffffff'].map(c=>new T.Color(c));
for(let i=0;i<CN;i++){P.push({p:new T.Vector3(0,-5,0),v:new T.Vector3(),r:new T.Euler(),w:new T.Vector3(),life:99});conf.setColorAt(i,COLS[i%COLS.length]);}
let ci=0;
const REDS=['#c1121f','#9d0208','#e5383b','#d00000','#780000','#f2c230'].map(c=>new T.Color(c));
function burst(pos,n,power,red){for(let k=0;k<n;k++){const q=P[ci];conf.setColorAt(ci,red?REDS[k%REDS.length]:COLS[ci%COLS.length]);conf.instanceColor.needsUpdate=true;ci=(ci+1)%CN;q.p.copy(pos);const a=Math.random()*Math.PI*2,s=(0.6+Math.random())*power;
 q.v.set(Math.cos(a)*s*0.7,1.6+Math.random()*2.4*power,Math.sin(a)*s*0.7);q.r.set(Math.random()*6,Math.random()*6,Math.random()*6);q.w.set(Math.random()*12-6,Math.random()*12-6,Math.random()*12-6);q.life=0;}}
const flying=[];
const SPLAT=(()=>{const c=mkc(128,128),g=c.getContext('2d');g.fillStyle='#b5121b';g.beginPath();for(let k=0;k<18;k++){const a=k/18*Math.PI*2,r=34+Math.random()*22;g.lineTo(64+Math.cos(a)*r,64+Math.sin(a)*r);}g.fill();
 for(let k=0;k<9;k++){g.beginPath();g.arc(64+(Math.random()-.5)*110,64+(Math.random()-.5)*110,3+Math.random()*7,0,7);g.fill();}g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.arc(52,50,10,0,7);g.fill();return ctex(c);})();
function splats(sp,pos,n){if(EP.gore===false)return;for(let k=0;k<(n||5);k++){const r=0.06+Math.random()*0.16,m=new T.Mesh(new T.PlaneGeometry(r*2,r*2).rotateX(-Math.PI/2),new T.MeshStandardMaterial({map:SPLAT,transparent:true,roughness:0.35,depthWrite:false}));
 const x=pos.x+(Math.random()-.5)*0.9,z=pos.z+(Math.random()-.5)*0.6;m.position.set(x,0.006+k*0.0004,z);m.rotation.y=Math.random()*6;m.receiveShadow=true;(x<0?sp.L:sp.R).add(m);m.scale.setScalar(0.01);tween(300,e=>m.scale.setScalar(Math.max(0.01,ease.out(e))),200+k*60);}}
const FXN=320,fxm=new T.InstancedMesh(new T.PlaneGeometry(0.06,0.06),new T.MeshBasicMaterial({side:T.DoubleSide}),FXN);fxm.frustumCulled=false;fxm.instanceMatrix.setUsage(T.DynamicDrawUsage);scene.add(fxm);
const FX=[];for(let i=0;i<FXN;i++){FX.push({p:new T.Vector3(0,-5,0),v:new T.Vector3(),life:9,max:1,g:0,s:1});fxm.setColorAt(i,new T.Color('#ffffff'));}
let fi=0;function emit(pos,vel,col,max,g,s){const q=FX[fi];fxm.setColorAt(fi,new T.Color(col));fxm.instanceColor.needsUpdate=true;fi=(fi+1)%FXN;q.p.copy(pos);q.v.copy(vel);q.life=0;q.max=max;q.g=g||0;q.s=s||1;}
const V3=(x,y,z)=>new T.Vector3(x,y,z);
const qb=(a,c,b,t)=>a.clone().multiplyScalar((1-t)*(1-t)).addScaledVector(c,2*t*(1-t)).addScaledVector(b,t*t);
function prop(sp,key,w,h){const m=cutout(key,w,h);m.geometry.translate(0,-h/2,0);sp.R.add(m);return m;}
function kill(sp,m){sp.R.remove(m);}
function fling(key,w,h,from,parent,vx){const m=cutout(key,w,h);m.geometry.translate(0,-h/2,0);m.position.copy(from);parent.add(m);
 flying.push({sp:SP[cur],m,v:new T.Vector3(vx,3.2,0.4),w:new T.Vector3(3,5*Math.sign(vx||1),2),rest:false});}
function physics(dt){
 for(let i=0;i<CN;i++){const q=P[i];if(q.life<6){q.life+=dt;if(q.p.y>0.012){q.v.y-=6*dt;q.p.addScaledVector(q.v,dt);q.v.multiplyScalar(0.985);q.r.x+=q.w.x*dt;q.r.y+=q.w.y*dt;q.r.z+=q.w.z*dt;}
  else{q.p.y=0.012;q.r.x=-Math.PI/2;q.r.y=0;}
  const sc=q.life>5?Math.max(0,6-q.life):1;dum.position.copy(q.p);dum.rotation.copy(q.r);dum.scale.setScalar(sc);}
  else{dum.position.set(0,-5,0);dum.scale.setScalar(0);}
  dum.updateMatrix();conf.setMatrixAt(i,dum.matrix);}
 conf.instanceMatrix.needsUpdate=true;
 for(let i=0;i<FXN;i++){const q=FX[i];if(q.life<q.max){q.life+=dt;q.v.y-=q.g*dt;q.p.addScaledVector(q.v,dt);dum.position.copy(q.p);dum.quaternion.copy(cam.quaternion);dum.scale.setScalar(Math.max(0.001,q.s*(1-q.life/q.max)));}
  else{dum.position.set(0,-5,0);dum.scale.setScalar(0.001);}dum.updateMatrix();fxm.setMatrixAt(i,dum.matrix);}
 fxm.instanceMatrix.needsUpdate=true;
 flying.forEach(f=>{if(f.rest)return;f.v.y-=7*dt;f.m.position.addScaledVector(f.v,dt);f.m.rotation.x+=f.w.x*dt;f.m.rotation.z+=f.w.z*dt;
  if(f.m.position.y<0.02&&f.v.y<0){f.m.position.y=0.02;f.m.rotation.set(-Math.PI/2,0,f.m.rotation.z);f.rest=true;if(f.sp&&f.m.position.x<0)f.sp.L.add(f.m);}});}

/* ---------- builders ---------- */
function strip(len,axis){const g=axis==='x'?new T.PlaneGeometry(len,0.2):new T.PlaneGeometry(0.6,len);g.rotateX(-Math.PI/2);const m=new T.Mesh(g,new T.MeshStandardMaterial({color:'#efe8da',roughness:0.9}));m.receiveShadow=true;return m;}
function smallTab(label){const c=mkc(256,80),x=c.getContext('2d');x.fillStyle='#f7f4ee';x.fillRect(0,0,256,80);x.fillStyle='#2b2a33';x.font='700 26px Inter,sans-serif';x.fillText(label,16,50);
 x.fillStyle='#f2c230';x.beginPath();x.moveTo(204,16);x.lineTo(246,40);x.lineTo(204,64);x.fill();const geo=new T.PlaneGeometry(0.46,0.145);geo.rotateX(-Math.PI/2);
 const m=new T.Mesh(geo,new T.MeshStandardMaterial({map:ctex(c),roughness:0.8}));m.castShadow=true;return m;}
function buildTowers(sp){sp.lights=[];[-2.85,2.85].forEach(x=>{const g=new T.Group();g.position.set(x,0.001,-0.95);
 const mat=c=>new T.MeshStandardMaterial({color:c,roughness:0.7});const pole=new T.Mesh(new T.CylinderGeometry(0.045,0.06,1.9,10),mat('#9aa3ad'));pole.position.y=0.95;pole.castShadow=true;
 const head=new T.Group();head.position.y=1.95;const box=new T.Mesh(new T.BoxGeometry(0.62,0.36,0.12),mat('#2f3858'));box.castShadow=true;head.add(box);
 const lamps=[];for(let r=0;r<2;r++)for(let c=0;c<3;c++){const l=new T.Mesh(new T.CircleGeometry(0.07,20),new T.MeshBasicMaterial({color:'#6b6f78'}));l.position.set(-0.19+c*0.19,-0.08+r*0.16,0.062);head.add(l);lamps.push(l);}
 const tgt=V3(-x*0.25,0,0.3),hp=V3(x,1.95,-0.95);head.rotation.order='YXZ';head.rotation.set(0.45,Math.atan2(tgt.x-hp.x,tgt.z-hp.z),0);
 const len=hp.distanceTo(tgt),cg=new T.ConeGeometry(0.7,len,32,1,true);cg.translate(0,-len/2,0);const cone=new T.Mesh(cg,new T.MeshBasicMaterial({color:'#fff3c4',transparent:true,opacity:0,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending}));
 const cw=new T.Group();cw.position.y=1.95;cw.quaternion.setFromUnitVectors(V3(0,-1,0),tgt.clone().sub(hp).normalize());cw.add(cone);
 g.add(pole,head,cw);g.scale.y=0.001;g.visible=false;(x<0?sp.L:sp.R).add(g);(sp.struct=sp.struct||[]).push({g,axis:'sy',flat:0.001,z:-0.95});sp.lights.push({lamps,cone});});}
function lightsOn(sp,on){if(!sp.lights)return;sp.lightsOn=on;if(on){nz(0.08,{type:'lowpass',f0:500,gain:0.35});nz(0.08,{type:'lowpass',f0:500,gain:0.35,delay:0.25});}
 sp.lights.forEach((L,k)=>{const d=on?k*250:0;setTimeout(()=>{L.lamps.forEach(l=>l.material.color.set(on?'#fff6c8':'#6b6f78'));},d);const o0=L.cone.material.opacity;tween(on?500:200,e=>{L.cone.material.opacity=o0+((on?0.06:0)-o0)*e;},d);});}
function buildAtkTabs(sp,i){const pal=FD[sp.d.attacker].palette;sp.atkObjs=sp.atkTabs.map((k,j)=>{const o={k},c=mkc(320,190),x=c.getContext('2d'),col=pal[j%pal.length];x.fillStyle=col;x.fillRect(0,0,320,190);
  x.fillStyle=x.createPattern(NOISE,'repeat');x.fillRect(0,0,320,190);icon(x,k,160,64,0.9,'#fff');x.fillStyle='#fff';x.textAlign='center';x.font='italic 700 34px '+SERIF;x.fillText(ATK[k].name,160,140);x.font='700 18px Inter,sans-serif';x.fillText('PULL ↓',160,176);
  const geo=new T.PlaneGeometry(0.66,0.39);geo.rotateX(-Math.PI/2);const m=new T.Mesh(geo,new T.MeshStandardMaterial({map:ctex(c),roughness:0.8}));o.m=m;o.z0=2.12;
  m.position.set(0.62+j*0.98,-0.003,2.12);m.castShadow=true;{const st=strip(0.9,'z');st.position.set(0,-0.001,-0.62);st.userData.hit=()=>pickTab(i,o);m.add(st);}sp.R.add(m);m.userData.hit=()=>pickTab(i,o);return o;});}
function gearTex(n,r1,r0,col,draw){const c=mkc(512,512),g=c.getContext('2d');g.translate(256,256);g.fillStyle=col;g.beginPath();
 for(let k=0;k<n*2;k++){const a0=k/(n*2)*Math.PI*2,a1=(k+1)/(n*2)*Math.PI*2,r=k%2?r0:r1;g.lineTo(Math.cos(a0)*r,Math.sin(a0)*r);g.lineTo(Math.cos(a1)*r,Math.sin(a1)*r);}g.closePath();g.fill();
 if(draw)draw(g);g.fillStyle='#c9a227';g.beginPath();g.arc(0,0,20,0,7);g.fill();g.setTransform(1,0,0,1,0,0);g.fillStyle=g.createPattern(NOISE,'repeat');g.globalCompositeOperation='source-atop';g.fillRect(0,0,512,512);return ctex(c);}
function buildDial(sp,i){const keys=[null].concat(sp.dial),cols=['#9aa3ad'].concat(FD[sp.d.attacker].palette);
 const t=gearTex(28,256,238,'#2f3858',g=>{keys.forEach((k,j)=>{const th=j*Math.PI*2/keys.length,hw=Math.PI/keys.length;g.fillStyle=cols[j%cols.length];g.beginPath();g.moveTo(0,0);g.arc(0,0,226,Math.PI/2-th-hw,Math.PI/2-th+hw);g.closePath();g.fill();
  g.save();g.translate(Math.sin(th)*140,Math.cos(th)*140);g.rotate(-th);if(k){icon(g,k,0,-26,0.75,'#2b2a33');g.fillStyle='#2b2a33';g.font='italic 700 30px '+SERIF;g.textAlign='center';g.fillText(ATK[k].name.split(' ')[0],0,40);}
  else{g.fillStyle='#fff';g.font='italic 700 90px '+SERIF;g.textAlign='center';g.fillText('?',0,30);}g.restore();});});
 const dm=new T.Mesh(new T.CircleGeometry(0.42,48).rotateX(-Math.PI/2),new T.MeshStandardMaterial({map:t,alphaTest:0.5,roughness:0.7}));dm.position.set(0.8,0.012,1.62);dm.castShadow=true;sp.R.add(dm);
 const gt=gearTex(14,256,214,'#e8673f');const gm=new T.Mesh(new T.CircleGeometry(0.25,40).rotateX(-Math.PI/2),new T.MeshStandardMaterial({map:gt,alphaTest:0.5,roughness:0.7}));gm.position.set(1.42,0.011,1.82);gm.castShadow=true;sp.R.add(gm);
 sp.dialM=dm;sp.gearM=gm;sp.dialIdx=0;sp.dialKeys=keys;dm.userData.hit=gm.userData.hit=()=>turnDial(i);
 const lv=new T.Group();lv.position.set(2.65,0.001,1.5);const mat=c=>new T.MeshStandardMaterial({color:c,roughness:0.6});
 const base=new T.Mesh(new T.BoxGeometry(0.34,0.16,0.26),mat('#2f3858'));base.position.y=0.08;base.castShadow=true;
 const piv=new T.Group();piv.position.y=0.15;piv.rotation.x=-0.75;const rod=new T.Mesh(new T.CylinderGeometry(0.026,0.026,0.6,10),mat('#cfd4da'));rod.position.y=0.3;rod.castShadow=true;
 const knob=new T.Mesh(new T.SphereGeometry(0.075,16,12),mat('#e8673f'));knob.position.y=0.62;knob.castShadow=true;piv.add(rod,knob);lv.add(base,piv);lv.scale.y=0.001;lv.visible=false;sp.R.add(lv);
 (sp.struct=sp.struct||[]).push({g:lv,axis:'sy',flat:0.001,z:1.5});sp.leverPiv=piv;[base,rod,knob].forEach(m=>{m.userData.hit=()=>pullLever(i);});sp.leverHits=[base,rod,knob];}
function buildFlip(sp){const c=mkc(256,196),tx=ctex(c);sp.flipC=c;sp.flipT=tx;drawFlip(sp,0);
 const g=new T.Group();g.position.set(2.75,0.001,1.68);g.scale.set(1.3,1,1.3);const stack=new T.Mesh(new T.BoxGeometry(0.56,0.06,0.43),new T.MeshStandardMaterial({color:'#f3efe6',roughness:0.8}));stack.position.y=0.03;stack.castShadow=true;stack.receiveShadow=true;
 const top=new T.Mesh(new T.PlaneGeometry(0.54,0.41).rotateX(-Math.PI/2),new T.MeshStandardMaterial({map:tx,roughness:0.7}));top.position.y=0.062;
 const leafG=new T.Group();leafG.position.set(0,0.064,0.205);const lf2=new T.Mesh(new T.PlaneGeometry(0.54,0.41).rotateX(-Math.PI/2).translate(0,0,-0.205),new T.MeshStandardMaterial({color:'#fbf8f2',side:T.DoubleSide,roughness:0.8}));leafG.add(lf2);leafG.visible=false;
 g.add(stack,top,leafG);sp.R.add(g);sp.flipLeaf=leafG;[stack,top].forEach(m=>{m.userData.hit=()=>riffle(SP.indexOf(sp));});sp.flipHits=[stack,top];}
function drawFlip(sp,f){const g=sp.flipC.getContext('2d');g.fillStyle='#fbf8f2';g.fillRect(0,0,256,196);g.strokeStyle='#d9d3c6';g.lineWidth=3;g.strokeRect(2,2,252,192);
 const ph=f/12*Math.PI*2,reach=Math.max(0,Math.sin(ph)),rec=Math.max(0,Math.sin(ph-0.6));g.lineCap='round';g.lineWidth=7;
 const fig=(x,col,dir,arm,lean)=>{g.strokeStyle=col;g.fillStyle=col;g.beginPath();g.arc(x+lean*dir,58,15,0,7);g.fill();g.beginPath();g.moveTo(x+lean*dir,74);g.lineTo(x,128);g.lineTo(x-12,168);g.moveTo(x,128);g.lineTo(x+12,168);g.stroke();
  g.beginPath();g.moveTo(x+lean*dir,88);g.lineTo(x+dir*(18+arm*44),92-arm*6);g.moveTo(x+lean*dir,88);g.lineTo(x-dir*14,112);g.stroke();};
 fig(80+reach*16,'#d99a1c',1,reach,4);fig(176+rec*14,'#178a80',-1,0.2,-rec*10);
 if(reach>0.85){star(g,150,80,30,18,10,'#e8673f');g.fillStyle='#fff';g.font='italic 700 16px Georgia,serif';g.textAlign='center';g.fillText('POW',150,86);}
 g.fillStyle='#7a6a55';g.font='600 12px Inter,sans-serif';g.textAlign='right';g.fillText(String(f+1),246,186);sp.flipT.needsUpdate=true;}
function riffle(i){const sp=SP[i];if(busy||i!==cur||sp.riffling)return;sp.riffling=true;let last=-1;sp.flipLeaf.visible=true;nz(1.3,{type:'highpass',f0:2500,f1:4500,gain:0.08,attack:0.05});
 for(let k=0;k<22;k++)nz(0.02,{type:'highpass',f0:3500,gain:0.06,delay:k*0.058});
 tween(1300,e=>{const f=Math.floor(e*24)%12;if(f!==last){last=f;drawFlip(sp,f);}sp.flipLeaf.rotation.x=-Math.abs(Math.sin(e*Math.PI*22))*0.9;},0,()=>{sp.flipLeaf.visible=false;sp.flipLeaf.rotation.x=0;drawFlip(sp,0);sp.riffling=false;if(!S.flicked){S.flicked=true;ui();(EP.verse?say('Flick the pages, watch them run,','A sneak peek at the bloody fun!'):say('Ooh, a preview!','Spoilers. Sort of.'));}});}
function buildWing(sp){const wing=new T.Group();wing.position.set(W,0.035,0);wing.rotation.z=Math.PI;sp.R.add(wing);sp.wing=wing;sp.wingOpen=false;
 const ci=mkc(1024,1280),gi=ci.getContext('2d');paper(gi,'#38b6c2',1024,1280,'L');gi.fillStyle='rgba(255,255,255,.16)';for(let k=0;k<90;k++){gi.fillRect(Math.random()*1024,Math.random()*1280,14,8);}
 gi.fillStyle='#fdfaf3';gi.textAlign='center';gi.font='italic 700 64px '+SERIF;gi.fillText('The victory parade',512,1150);gi.font='italic 500 30px '+SERIF;gi.fillText('15',960,1240);
 const co=mkc(1024,1280),go=co.getContext('2d');paper(go,'#2f3858',1024,1280,'R');go.fillStyle='#f2c230';go.textAlign='center';go.font='italic 700 84px '+SERIF;go.fillText('The result',512,470);go.fillText('is in.',512,570);
 go.font='700 40px Inter,sans-serif';go.fillStyle='#fdfaf3';go.fillText('OPEN THE GATEFOLD',512,760);go.fillStyle='#f2c230';go.beginPath();go.moveTo(420,820);go.lineTo(604,820);go.lineTo(604,790);go.lineTo(680,850);go.lineTo(604,910);go.lineTo(604,880);go.lineTo(420,880);go.closePath();go.fill();
 star(go,512,1080,120,84,14,'#e8673f');go.fillStyle='#fdfaf3';go.font='italic 700 44px '+SERIF;go.fillText('UTD',512,1096);
 const to=ctex(co);to.wrapS=to.wrapT=T.RepeatWrapping;to.repeat.set(-1,1);
 const geo=new T.PlaneGeometry(W,H);geo.rotateX(-Math.PI/2);geo.translate(W/2,0,0);
 const inM=new T.Mesh(geo,new T.MeshStandardMaterial({map:ctex(ci),roughness:0.78})),outM=new T.Mesh(geo,new T.MeshStandardMaterial({map:to,roughness:0.78,side:T.BackSide}));
 inM.receiveShadow=true;inM.castShadow=outM.castShadow=true;outM.userData.hit=()=>openWing(SP.indexOf(sp));wing.add(inM,outM);sp.wingOut=outM;
 const defs=[['crowdC',W/2,-1.32,3.0,1.28],['crowdB',W/2,-1.07,3.0,1.03],['crowdA',W/2,-0.82,3.0,0.78],['champ',W/2,-0.15,2.6,1.5],['trophy',W/2+0.95,0.8,0.75,1.05]];
 sp.wingItems=defs.map(([k,x,z,w,h])=>{const g=new T.Group(),m=cutout(k,w,h);g.add(m);g.position.set(x,0.003,z);g.rotation.x=-Math.PI/2;g.visible=false;wing.add(g);return {g,axis:'x',flat:-Math.PI/2,z};});
 sp.wingItems.slice().sort((a,b)=>a.z-b.z).forEach((it,r)=>{it.g.position.y=0.003+r*0.002;});}
function buildPocket(sp){const px=lw(160,'L');sp.cardC=mkc(900,560);sp.cardT=ctex(sp.cardC);
 const cg=new T.Group();cg.position.set(px,0.008,0.86);const geo=new T.PlaneGeometry(1.8,1.12);geo.rotateX(-Math.PI/2);
 const cm=new T.Mesh(geo,new T.MeshStandardMaterial({map:sp.cardT,roughness:0.7,side:T.DoubleSide}));cm.castShadow=true;cg.add(cm);sp.L.add(cg);sp.cardG=cg;sp.cardM=cm;
 const c=mkc(880,396),g=c.getContext('2d');g.fillStyle='#e8673f';g.fillRect(0,0,880,396);g.fillStyle=g.createPattern(NOISE,'repeat');g.fillRect(0,0,880,396);
 const gr=g.createLinearGradient(0,0,0,396);gr.addColorStop(0,'rgba(0,0,0,.18)');gr.addColorStop(0.25,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,880,396);
 g.strokeStyle='rgba(255,248,232,.7)';g.lineWidth=5;g.setLineDash([16,12]);g.strokeRect(22,22,836,352);g.setLineDash([]);
 g.globalCompositeOperation='destination-out';g.beginPath();g.moveTo(330,0);g.lineTo(440,78);g.lineTo(550,0);g.closePath();g.fill();g.globalCompositeOperation='source-over';
 g.fillStyle='#fff8e8';g.textAlign='center';g.font='italic 700 62px '+SERIF;g.fillText('Your fight card',440,220);g.font='700 28px Inter,sans-serif';g.fillText('TAP TO PULL IT OUT',440,290);
 const pg=new T.PlaneGeometry(2.0,0.9);pg.rotateX(-Math.PI/2);const pm=new T.Mesh(pg,new T.MeshStandardMaterial({map:ctex(c),alphaTest:0.5,roughness:0.8}));pm.position.set(px,0.016,lz(307));pm.castShadow=true;pm.receiveShadow=true;sp.L.add(pm);sp.pocketM=pm;
 cm.userData.hit=pm.userData.hit=()=>pullCard(SP.indexOf(sp));drawCard(sp);}
function drawCard(sp){const c=sp.cardC,g=c.getContext('2d'),w=900,h=560;S.serial=S.serial||(1000+Math.floor(Math.random()*9000));
 g.fillStyle='#fbf6ea';g.fillRect(0,0,w,h);g.fillStyle=g.createPattern(NOISE,'repeat');g.fillRect(0,0,w,h);
 g.fillStyle='#2f3858';g.fillRect(0,0,w,104);g.strokeStyle='#2f3858';g.lineWidth=8;g.strokeRect(4,4,w-8,h-8);g.lineWidth=2;g.strokeRect(18,116,w-36,h-134);
 g.textAlign='center';g.fillStyle='#f2c230';g.font='700 38px Inter,sans-serif';g.fillText('OFFICIAL FIGHT CARD',w/2,52);g.fillStyle='#fdfaf3';g.font='500 20px Inter,sans-serif';g.fillText(EP.cardTitle,w/2,84);
 const wl=lostAt(EP.spreads.length,WIN.id),ll=lostAt(EP.spreads.length,LOSE.id),lc={};if(EP.loserCond)lc[EP.loserCond]=true;
 const iw=IMG[fkey(WIN.id,wl,'',{})],il=IMG[fkey(LOSE.id,ll,'',lc)];if(iw)g.drawImage(iw,34,128,140,196);if(il)g.drawImage(il,726,128,140,196);
 g.fillStyle='#2b2a33';g.font='italic 700 46px '+SERIF;g.fillText(WIN.name,w/2,178);g.font='italic 500 26px '+SERIF;g.fillText('defeated',w/2,216);g.font='italic 700 46px '+SERIF;g.fillText(LOSE.name,w/2,266);
 g.fillStyle='#e8673f';g.font='700 26px Inter,sans-serif';g.fillText(EP.method.toUpperCase(),w/2,306);
 g.textAlign='left';g.fillStyle='#2b2a33';let n=0;const rows=[];
 EP.spreads.forEach((s,k)=>{if(s.type==='round'){n++;const A=FD[s.attacker],D=FD[s.defender],a=ATK[S.choice[k]];rows.push(['Round '+n,A.short+' used the '+(a?a.name:'?'),D.short+' lost '+D.his+' '+D.parts[s.injury].label]);}
  if(s.type==='finish'){n++;const A=FD[s.attacker],D=FD[s.defender],f=ATK[s.finisher];rows.push(['Round '+n,fill(s.card?s.card[0]:f.card,toks(A,D)),fill(s.card?s.card[1]:'{D} went down. KO.',toks(A,D))]);}});
 rows.forEach((r,k)=>{const y=372+k*50;g.font='700 18px Inter,sans-serif';g.fillStyle='#7a6a55';g.fillText(r[0].toUpperCase(),40,y);g.fillStyle='#2b2a33';g.font='italic 700 22px '+SERIF;g.fillText(r[1],140,y);g.font='italic 500 22px '+SERIF;g.fillText('→ '+r[2],520,y);});
 g.font='500 18px Inter,sans-serif';g.fillStyle='#7a6a55';g.fillText('Copy #'+S.serial+' · '+new Date().toLocaleDateString('en-AU'),44,h-30);
 g.save();g.translate(w-78,h-50);g.rotate(-0.25);g.strokeStyle='#e8673f';g.lineWidth=5;g.beginPath();g.arc(0,0,36,0,7);g.stroke();g.fillStyle='#e8673f';g.textAlign='center';g.font='italic 700 24px '+SERIF;g.fillText('UTD',0,8);g.restore();
 sp.cardT.needsUpdate=true;}
function attachArm(pop,key,w,h){const f=FD[pop.fid],P=f.parts[pop.sep],c=P.crop,kx=w/200,ky=h/280,aw=c[2]*kx,ah=c[3]*ky,px=P.pivot[0]-c[0],py=P.pivot[1]-c[1];
 const geo=new T.PlaneGeometry(aw,ah);geo.translate(aw/2-px*kx,-ah/2+py*ky,0);
 const m=new T.Mesh(geo,CARD_MAT({map:TEX[key],alphaTest:0.5,side:T.DoubleSide}));
 m.customDepthMaterial=new T.MeshDepthMaterial({depthPacking:T.RGBADepthPacking,map:TEX[key],alphaTest:0.5});m.castShadow=true;
 const g=new T.Group();g.add(m);g.position.set((P.pivot[0]/200-0.5)*w,(1-P.pivot[1]/280)*h,0.008);pop.g.add(g);pop.arm=g;}
function shade(c,k){const col=new T.Color(c);col.multiplyScalar(k);return col;}
function boxTex(w,h,col,kind){const c=mkc(Math.max(64,Math.round(w*360)),Math.max(64,Math.round(h*360))),g=c.getContext('2d'),cw=c.width,ch=c.height;g.fillStyle=col;g.fillRect(0,0,cw,ch);
 if(kind==='retro'){const cols=Math.max(2,Math.round(w/0.16)),rows=Math.max(2,Math.round(h/0.2)),mx=cw*0.12,gw=(cw-2*mx)/cols,gh=(ch*0.86)/rows;
  for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){g.fillStyle=Math.random()<0.18?'#ffe9a6':'#fdf6e3';g.fillRect(mx+i*gw+gw*0.2,ch*0.06+j*gh+gh*0.18,gw*0.6,gh*0.55);}
  g.fillStyle='rgba(0,0,0,.18)';g.fillRect(0,0,cw,ch*0.035);g.fillStyle='#5a3a20';g.fillRect(cw*0.4,ch*0.9,cw*0.2,ch*0.1);}
 else if(kind==='glass'){const cols=Math.max(2,Math.round(w/0.1));for(let i=0;i<cols;i++){const x=(i+0.25)*cw/cols;for(let y=ch*0.04;y<ch*0.96;y+=ch/26){g.fillStyle=Math.random()<0.45?'#8ff4f0':'rgba(143,244,240,.18)';g.fillRect(x,y,cw/cols*0.5,ch/26*0.55);}}
  const gr=g.createLinearGradient(0,0,cw,0);gr.addColorStop(0,'rgba(255,255,255,.12)');gr.addColorStop(0.5,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,cw,ch);}
 else if(kind==='car'){g.fillStyle='rgba(255,255,255,.15)';g.fillRect(0,0,cw,ch*0.08);g.fillStyle='#cfe3f2';g.fillRect(cw*0.12,ch*0.1,cw*0.34,ch*0.32);g.fillRect(cw*0.52,ch*0.1,cw*0.34,ch*0.32);
  g.fillStyle='rgba(0,0,0,.25)';g.fillRect(0,ch*0.48,cw,ch*0.04);g.fillStyle='#f7f4ee';g.fillRect(cw*0.02,ch*0.56,cw*0.06,ch*0.1);g.fillStyle='#ff6b6b';g.fillRect(cw*0.92,ch*0.56,cw*0.06,ch*0.1);
  [0.24,0.76].forEach(x=>{g.fillStyle='#23222a';g.beginPath();g.arc(cw*x,ch*0.86,ch*0.2,0,7);g.fill();g.fillStyle='#9aa3ad';g.beginPath();g.arc(cw*x,ch*0.86,ch*0.08,0,7);g.fill();});}
 else if(kind==='stripe'){for(let x=0;x<cw;x+=cw/8){g.fillStyle='#f7f4ee';g.fillRect(x,0,cw/16,ch);}g.fillStyle='#d9a91d';g.fillRect(0,0,cw,ch*0.12);g.fillRect(0,ch*0.88,cw,ch*0.12);
  g.fillStyle='#2b2a33';g.font='italic 700 '+Math.round(ch*0.16)+'px '+SERIF;g.textAlign='center';g.fillText('MARVELS',cw/2,ch*0.56);}
 else if(kind==='crate'){g.strokeStyle='rgba(60,35,15,.6)';g.lineWidth=Math.max(2,cw*0.02);for(let y=0;y<ch;y+=ch/4){g.beginPath();g.moveTo(0,y);g.lineTo(cw,y);g.stroke();}g.beginPath();g.moveTo(0,0);g.lineTo(cw,ch);g.moveTo(cw,0);g.lineTo(0,ch);g.stroke();
  g.fillStyle='#2b2a33';g.font='700 '+Math.round(ch*0.2)+'px Inter,sans-serif';g.textAlign='center';g.fillText('500 LB',cw/2,ch*0.6);}
 else{g.fillStyle=kind==='p1'?'#e8673f':'#3a6fb0';g.fillRect(0,0,cw,ch*0.14);g.fillStyle='#2b2a33';g.textAlign='center';g.font='italic 700 '+Math.round(ch*0.5)+'px '+SERIF;g.fillText(kind==='p1'?'1st':'2nd',cw/2,ch*0.74);}
 g.fillStyle=g.createPattern(NOISE,'repeat');g.fillRect(0,0,cw,ch);return ctex(c);}
function buildBoxes(sp){(sp.boxes||[]).forEach(([x,zf,w,h,d,col,kind])=>{const geo=new T.BoxGeometry(w,h,d);geo.translate(0,h/2,-d/2);
 const side=CARD_MAT({color:shade(col,0.78)}),top=CARD_MAT({color:shade(col,1.08)}),front=CARD_MAT({map:boxTex(w,h,col,kind)});
 const m=new T.Mesh(geo,[side,side,top,side,front,side]);m.castShadow=m.receiveShadow=true;const g=new T.Group();g.add(m);g.position.set(x,0.001,zf);g.scale.y=0.001;g.visible=false;(x<0?sp.L:sp.R).add(g);
 (sp.struct=sp.struct||[]).push({g,axis:'sy',flat:0.001,z:zf});});}
function buildRing(sp){const st=[];const mk=(w,h,d,col)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshLambertMaterial({color:col}));m.castShadow=m.receiveShadow=true;return m;};
 const x0=sp.wide?-2.3:0.35,x1=sp.wide?2.3:2.85,zb=sp.wide?-0.75:-0.55,zf=sp.wide?0.95:1.15,cx=(x0+x1)/2,ww=x1-x0,dd=zf-zb,ph=0.82,ropes=[[0.3,'#e8673f'],[0.5,'#f7f4ee'],[0.7,'#3a6fb0']];
 const post=col=>{const g=new T.Group(),p=mk(0.07,ph,0.07,'#cfd4da');p.position.y=ph/2;const pad=mk(0.13,0.5,0.13,col);pad.position.y=0.5;const cap=mk(0.1,0.04,0.1,'#9aa3ad');cap.position.y=ph+0.02;g.add(p,pad,cap);return g;};
 const bc=mkc(1024,96),bx=bc.getContext('2d');bx.fillStyle='#2f3858';bx.fillRect(0,0,1024,96);bx.fillStyle='#f2c230';bx.font='italic 700 54px '+SERIF;bx.textAlign='center';bx.fillText('Ultimate Teams Deathmatch',512,66);
 const btex=ctex(bc),bw0=ww*0.8;
 const wall=(xa,xb,parent,ca,cb,half)=>{const g=new T.Group(),w=xb-xa,c=(xa+xb)/2;g.position.set(c,0.001,zb);
  if(ca){const a=post(ca);a.position.x=-w/2;g.add(a);}if(cb){const b=post(cb);b.position.x=w/2;g.add(b);}
  ropes.forEach(([y,col])=>{const r=mk(w,0.035,0.035,col);r.position.y=y;g.add(r);});
  let t=btex,bwid=bw0,bx0=(cx)-c;if(half){t=btex.clone();t.needsUpdate=true;t.repeat.set(0.5,1);t.offset.set(half==='L'?0:0.5,0);bwid=bw0/2;bx0=(half==='L'?-bw0/4:bw0/4)-c;}
  const ban=new T.Mesh(new T.PlaneGeometry(bwid,0.18),new T.MeshLambertMaterial({map:t}));ban.position.set(bx0,0.13,0.02);ban.castShadow=true;g.add(ban);
  g.rotation.x=-Math.PI/2;g.visible=false;parent.add(g);st.push({g,axis:'x',flat:-Math.PI/2,z:zb});};
 if(sp.wide){wall(x0,0,sp.L,'#e8673f',null,'L');wall(0,x1,sp.R,null,'#3a6fb0','R');}else wall(x0,x1,sp.R,'#e8673f','#3a6fb0',null);
 const side=(x,col,sign)=>{const g=new T.Group();g.position.set(x,0.001,(zb+zf)/2);const p=post(col);p.position.z=dd/2;g.add(p);
  ropes.forEach(([y,c])=>{const r=mk(0.035,0.035,dd,c);r.position.y=y;g.add(r);});g.rotation.z=sign*Math.PI/2;g.visible=false;st.push({g,axis:'z',flat:sign*Math.PI/2,z:sign>0?0.31:0.3});return g;};
 (x0<0?sp.L:sp.R).add(side(x0,'#f7f4ee',1));sp.R.add(side(x1,'#f2c94c',-1));sp.struct=(sp.struct||[]).concat(st);}

function drawCover(){const c=mkc(1024,1280),g=c.getContext('2d'),w=1024,h=1280;g.fillStyle='#2f3858';g.fillRect(0,0,w,h);g.save();g.globalCompositeOperation='multiply';g.drawImage(PAPER_M,0,0,w,h);g.restore();
 g.strokeStyle='#d9a91d';g.lineWidth=6;g.strokeRect(46,46,w-92,h-92);g.lineWidth=2;g.strokeRect(62,62,w-124,h-124);
 g.textAlign='center';g.fillStyle='#f2c230';g.font='italic 700 108px '+SERIF;g.fillText('Ultimate',w/2,250);g.fillText('Teams',w/2,370);g.fillText('Deathmatch',w/2,490);
 g.fillStyle='#fdfaf3';g.font='700 40px Inter,sans-serif';g.fillText((EP.title||'').toUpperCase(),w/2,575);
 const fa=IMG[fkey(EF[0].id,[],'',{})],fb=IMG[fkey(EF[1].id,[],'',{})];if(fa)g.drawImage(fa,150,640,300,420);if(fb)g.drawImage(fb,574,640,300,420);
 star(g,w/2,860,120,84,14,'#e8673f');g.fillStyle='#fdfaf3';g.font='italic 700 72px '+SERIF;g.fillText('VS',w/2,885);
 g.fillStyle='#f2c230';g.font='italic 500 44px '+SERIF;g.fillText(EF[0].name+' vs '+EF[1].name,w/2,1140);
 g.fillStyle='rgba(253,250,243,.8)';g.font='700 26px Inter,sans-serif';g.fillText('A POP-UP STORYBOOK · TAP TO OPEN',w/2,1200);
 const t=ctex(c);t.wrapS=t.wrapT=T.RepeatWrapping;return t;}
function openCover(){if(S.opened||S.opening)return;S.opening=true;sfx.turn();for(let k=0;k<5;k++)sfx.pop(0.7+k*0.12);ui();
 target.set(0.1,1.0,0.2);viewZ=1.35;home();setTimeout(()=>{dirGoal.copy(dir);target.set(0,0.35,0.2);viewZ=1;home();},2600);
 tween(2600,e=>{const k=e<0.12?0:ease.inout((e-0.12)/0.88),crack=e<0.12?Math.sin(e/0.12*Math.PI/2)*0.08:0.08*(1-k);coverG.rotation.z=-Math.PI*(1-k)+crack;coverG.position.y=Math.sin(Math.min(1,e*1.2)*Math.PI)*0.04;setFold(SP[0],k);},0,
  ()=>{coverG.rotation.z=0;coverG.position.y=0;setFold(SP[0],1);S.opened=true;S.opening=false;ui();});}
function build(){
 SP.forEach((sp,i)=>{
  sp.cL=mkc(1024,1280);sp.cR=mkc(1024,1280);sp.tL=ctex(sp.cL);sp.tR=ctex(sp.cR);drawL(i);drawR(i);
  sp.L=new T.Group();sp.R=new T.Group();sp.L.visible=sp.R.visible=i===0;book.add(sp.L,sp.R);
  sp.pL=pageMesh(sp.tL,-W/2);sp.pR=pageMesh(sp.tR,W/2);sp.pL.userData.page='L';sp.pR.userData.page='R';sp.L.add(sp.pL);sp.R.add(sp.pR);
  if(sp.ring)buildRing(sp);
  if(sp.build3d)sp.build3d(sp);
  buildBoxes(sp);
  if(sp.towers)buildTowers(sp);if(sp.atkTabs)buildAtkTabs(sp,i);if(sp.dial)buildDial(sp,i);if(sp.flip)buildFlip(sp);if(sp.gatefold)buildWing(sp);if(sp.pocket)buildPocket(sp);if(sp.mech)sp.mech.build(sp,i);
  if(sp.ring||sp.fightArena){const g=new T.Group(),m=cutout('pow',0.85,0.85);g.add(m);g.position.set(0.5,0.75,1.0);g.scale.setScalar(0.001);g.visible=false;sp.R.add(g);sp.powG=g;}
  sp.popDefs=sp.pops;sp.pops=sp.pops.map((d,j)=>{const g=new T.Group(),m=cutout(d[0],d[3]*U,d[4]*U);g.add(m);
   g.position.set(lw(d[1],'R'),0.003,lz(d[2]));g.rotation.x=-Math.PI/2;g.visible=false;(g.position.x<-0.02?sp.L:sp.R).add(g);
   const po={w:d[3]*U,h:d[4]*U,g,m,key:d[0],tag:d[5],fid:FD[d[5]]?d[5]:null,sep:d[8]||'',bx:g.position.x,by:g.position.y};if(d[7])attachArm(po,d[7],d[3]*U,d[4]*U);return po;});
  sp.pops.forEach((p,j)=>{p.yo=sp.popDefs[j][6]||0;});sp.pops.slice().sort((a,b)=>a.g.position.z-b.g.position.z).forEach((p,r)=>{p.g.position.y=p.by=p.yo+0.003+r*0.002;});
  sp.items=null;
  sp.flapObjs=(sp.flaps||[]).map((f,j)=>{const g=new T.Group(),fw=f.w*U,fh=f.h*U;
   const c=mkc(Math.round(f.w*4),Math.round(f.h*4)),x=c.getContext('2d'),cw=c.width,ch=c.height;x.fillStyle=f.col;x.fillRect(0,0,cw,ch);
   const gr=x.createLinearGradient(0,0,0,ch);gr.addColorStop(0,'rgba(255,255,255,.16)');gr.addColorStop(1,'rgba(0,0,0,.14)');x.fillStyle=gr;x.fillRect(0,0,cw,ch);
   x.fillStyle=x.createPattern(NOISE,'repeat');x.fillRect(0,0,cw,ch);x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=3;x.setLineDash([8,8]);x.strokeRect(12,12,cw-24,ch-24);x.setLineDash([]);
   const ink2=dark(f.col)?'#fff':'#2b2a33';x.fillStyle=ink2;x.textAlign='center';
   if(f.k==='meet'){x.font='italic 700 44px '+SERIF;wrap(x,f.label,cw/2,ch/2-10,cw-60,52);}
   else{icon(x,f.k,cw/2,ch*0.33,1.25,ink2);x.font='italic 700 40px '+SERIF;f.label.split(' ').forEach((l,k)=>x.fillText(l,cw/2,ch*0.62+k*44));}
   x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.arc(cw/2,ch,34,Math.PI,0);x.fill();x.fillStyle='#2b2a33';x.font='700 18px Inter,sans-serif';x.fillText('LIFT',cw/2,ch-8);
   const geo=new T.PlaneGeometry(fw,fh);geo.rotateX(-Math.PI/2);geo.translate(0,0,fh/2);
   const front=new T.Mesh(geo,CARD_MAT({map:ctex(c)}));front.castShadow=true;front.receiveShadow=true;
   const bc=mkc(cw,ch),bx=bc.getContext('2d');bx.fillStyle=f.col;bx.fillRect(0,0,cw,ch);bx.fillStyle='rgba(0,0,0,.22)';bx.fillRect(0,0,cw,ch);bx.fillStyle=bx.createPattern(NOISE,'repeat');bx.fillRect(0,0,cw,ch);
   if(f.k!=='meet'){bx.fillStyle='#fff8e8';bx.textAlign='center';bx.font='700 22px Inter,sans-serif';bx.fillText('YOUR PICK',cw/2,ch*0.38);bx.font='italic 700 38px '+SERIF;f.label.split(' ').forEach((l,k)=>bx.fillText(l,cw/2,ch*0.54+k*42));}
   const bt=ctex(bc);bt.wrapS=bt.wrapT=T.RepeatWrapping;bt.repeat.set(1,-1);
   const back=new T.Mesh(geo,new T.MeshLambertMaterial({map:bt,side:T.BackSide}));back.castShadow=true;
   g.add(front,back);g.position.set(lw(f.x,'L'),0.004+j*0.001,lz(f.y));sp.L.add(g);
   const o={g,front,f,open:false};front.userData.flap=o;return o;});
  if(sp.tab){const c=mkc(256,72),x=c.getContext('2d');x.fillStyle='#f7f4ee';x.fillRect(0,0,256,72);x.fillStyle='#f2c230';x.beginPath();x.moveTo(200,14);x.lineTo(244,36);x.lineTo(200,58);x.fill();
   const geo=new T.PlaneGeometry(0.8,0.22);geo.rotateX(-Math.PI/2);const m=new T.Mesh(geo,new T.MeshLambertMaterial({map:ctex(c)}));
   m.position.set(W+0.1,-0.002,lz(342));m.castShadow=true;{const st=strip(1.0,'x');st.position.set(-0.85,-0.001,0);st.userData.hit=()=>pull(i);m.add(st);}sp.R.add(m);sp.tab=m;sp.tabX=m.position.x;m.userData.hit=()=>pull(i);}
 });
}

/* ---------- page turning ---------- */
const N=44,lgeo=new T.BufferGeometry(),lpos=new Float32Array((N+1)*2*3),luv=new Float32Array((N+1)*2*2),lidx=[];
for(let i=0;i<=N;i++)for(let j=0;j<2;j++){const k=i*2+j;luv[k*2]=i/N;luv[k*2+1]=1-j;}
for(let i=0;i<N;i++){const a=i*2,b=(i+1)*2,c=a+1,d=b+1;lidx.push(a,c,b,b,c,d);}
lgeo.setAttribute('position',new T.BufferAttribute(lpos,3));lgeo.setAttribute('uv',new T.BufferAttribute(luv,2));lgeo.setIndex(lidx);
const lf=new T.Mesh(lgeo,new T.MeshLambertMaterial({side:T.FrontSide})),lb=new T.Mesh(lgeo,new T.MeshLambertMaterial({side:T.BackSide}));
lf.castShadow=lb.castShadow=true;const leaf=new T.Group();leaf.add(lf,lb);leaf.visible=false;book.add(leaf);
function setLeaf(th){let x=0,y=0;const du=W/N;for(let i=0;i<=N;i++){if(i>0){const u=(i-0.5)*du,a=th-0.85*(u/W)*Math.sin(th);x+=Math.cos(a)*du;y+=Math.sin(a)*du;}
 for(let j=0;j<2;j++){const k=(i*2+j)*3;lpos[k]=x;lpos[k+1]=y+0.012;lpos[k+2]=j?H/2:-H/2;}}
 lgeo.attributes.position.needsUpdate=true;lgeo.computeVertexNormals();}
function mirror(t){const c=t.clone();c.wrapS=T.RepeatWrapping;c.repeat.x=-1;c.needsUpdate=true;return c;}
let cur=0,busy=false,turning=null;
function itemsOf(sp){if(!sp.items)sp.items=sp.pops.map(p=>({g:p.g,axis:'x',flat:-Math.PI/2,z:p.g.position.z-(p.yo?0.32:0),pop:p})).concat((sp.struct||[]).map(o=>({g:o.g,axis:o.axis,flat:o.flat,z:o.z})));return sp.items;}
function riseItems(list,on,fast){const ord=list.slice().sort((a,b)=>on?b.z-a.z:a.z-b.z);   // rise front-to-back, fold back-to-front
 if(on)ord.forEach((it,k)=>{it.g.visible=true;if(k<7)sfx.pop((100+k*150)/1000);});
 ord.forEach((it,k)=>{const to=on?(it.pop&&it.pop.down!==undefined?it.pop.down:0):it.flat;
  const get=()=>it.axis==='sy'?it.g.scale.y:it.g.rotation[it.axis],set=v=>{if(it.axis==='sy')it.g.scale.y=Math.max(0.001,v);else it.g.rotation[it.axis]=v;};
  const to2=it.axis==='sy'?(on?1:it.flat):to,from2=get();
  if(Math.abs(from2-to2)<1e-4){if(!on)it.g.visible=false;return;}
  tween(on?820:(fast?140:300),e=>{set(from2+(to2-from2)*(on?ease.soft(e):ease.out(e)));},on?100+k*150:k*(fast?25:70),
   on?null:()=>{if(Math.abs(get()-it.flat)<0.01)it.g.visible=false;});});}
function popsRise(sp,on,fast){const idx=SP.indexOf(sp);
 if(!(on&&sp.wing&&!sp.wingOpen))riseItems(itemsOf(sp).filter(it=>!(it.pop&&it.pop.tag==='late'&&!S.fire[idx])),on,fast);
 sp.flapObjs.forEach(o=>{const from=o.g.rotation.x,to=on&&o.open?-3.0:0;if(from!==to)tween(500,e=>{o.g.rotation.x=from+(to-from)*ease.out(e);},on?300:0);});}
function setFold(sp,f){const idx=SP.indexOf(sp),k=f<=0?0:f>=1?1:f*f*(3-2*f);
 itemsOf(sp).forEach(it=>{const late=it.pop&&it.pop.tag==='late'&&!S.fire[idx];const up=it.axis==='sy'?1:(it.pop&&it.pop.down!==undefined?it.pop.down:0);
  const v=late?it.flat:it.flat+(up-it.flat)*k;if(it.axis==='sy')it.g.scale.y=Math.max(0.001,v);else it.g.rotation[it.axis]=v;it.g.visible=!late&&k>0.02;});
 sp.flapObjs.forEach(o=>{o.g.rotation.x=o.open?-3.0*k:0;});}
function sideKids(sp,side){const pm=side==='L'?sp.pL:sp.pR,its=new Set(itemsOf(sp).map(x=>x.g));return sp[side].children.filter(c=>c!==pm).map(c=>({c,v:c.visible,item:its.has(c)}));}
function showKids(list,on){list.forEach(k=>{if(!on)k.c.visible=false;else if(!k.item)k.c.visible=k.v;});}
function applyTurn(th){const t=turning;th=Math.max(0,Math.min(Math.PI,th));let fA,fB;
 if(t.dir>0){t.A.R.rotation.z=th;t.B.L.rotation.z=th-Math.PI;fA=1-th/Math.PI;fB=th/Math.PI;}
 else{t.A.L.rotation.z=th-Math.PI;t.B.R.rotation.z=th;fA=th/Math.PI;fB=1-th/Math.PI;}
 if(t.B.wing&&!t.B.wingOpen)fB=0;
 setFold(t.A,fA);setFold(t.B,fB);
 const up=th<Math.PI/2;if(t.dir>0){showKids(t.kA,up);showKids(t.kB,!up);}else{showKids(t.kA,!up);showKids(t.kB,up);}
 if(fB>0.55&&!t.popped){t.popped=true;for(let k=0;k<5;k++)sfx.pop(k*0.09);}}
function beginTurn(dir){const n=cur+dir,A=SP[cur],B=SP[n];if(A.lightsOn)lightsOn(A,false);closeWing(A);putCardBack(A,true);busy=true;sfx.turn();home();P.forEach(q=>{q.life=99;});
 B.L.visible=B.R.visible=true;if(dir>0){A.L.position.y=B.R.position.y=-0.03;}else{A.R.position.y=B.L.position.y=-0.03;}
 turning={dir,n,A,B,th:dir>0?0:Math.PI,kA:sideKids(A,dir>0?'R':'L'),kB:sideKids(B,dir>0?'L':'R')};applyTurn(turning.th);ui();}
function resetSide(g){g.rotation.z=0;g.position.y=0;}
function animLeaf(to,done){const from=turning.th;tween(Math.max(300,Math.abs(to-from)/Math.PI*1300),e=>{turning.th=from+(to-from)*ease.inout(e);applyTurn(turning.th);},0,done);}
function finishTurn(){const {n,A,B}=turning;showKids(turning.kA,true);showKids(turning.kB,true);A.L.visible=A.R.visible=false;[A.L,A.R,B.L,B.R].forEach(resetSide);setFold(A,1);setFold(B,B.wing&&!B.wingOpen?0:1);
 cur=n;turning=null;busy=false;if(B.type==='round'||B.type==='finish'){sfx.bell();sfx.cheer(1.4,0.6);}if(B.lights&&!B.lightsOn)setTimeout(()=>lightsOn(B,true),700);
 if(B.d.spring&&!B.boinged){B.boinged=true;setTimeout(()=>boing(popOf(B,B.d.spring)),500);}if(B.type==='winner'){drawCard(B);wiggleWing(B);}ui();}
function cancelTurn(){const {A,B}=turning;showKids(turning.kA,true);showKids(turning.kB,true);B.L.visible=B.R.visible=false;[A.L,A.R,B.L,B.R].forEach(resetSide);setFold(A,1);setFold(B,0);turning=null;busy=false;ui();}
function turn(dir){const n=cur+dir;if(busy||n<0||n>=SP.length||(dir>0&&gate()))return;beginTurn(dir);animLeaf(dir>0?Math.PI:0,finishTurn);}

/* ---------- interactions ---------- */
const popOf=(sp,tag)=>sp.pops.find(p=>p.tag===tag);
function jump(p,dx){const bx=p.bx;tween(650,e=>{p.g.position.x=bx+Math.sin(e*Math.PI)*dx;p.g.position.y=p.by+Math.sin(e*Math.PI)*0.45;p.g.rotation.z=Math.sin(e*Math.PI)*-0.15*Math.sign(dx||1);},0,()=>{p.g.position.x=bx;p.g.position.y=p.by;p.g.rotation.z=0;});}
function shake(p,delay){tween(520,e=>{p.g.rotation.z=Math.sin(e*Math.PI*7)*0.16*(1-e);},delay);}
function worldOf(p,dy){const v=new T.Vector3(p.g.position.x,dy,p.g.position.z);return v;}
function refreshFighters(from){for(let k=from;k<SP.length;k++){const sp=SP[k];if(sp.type!=='round'&&sp.type!=='finish')continue;
 sp.pops.forEach(p=>{if(!p.fid)return;const key=fkey(p.fid,S.lost[p.fid],p.sep&&!S.lost[p.fid].includes(p.sep)?p.sep:'',S.cond[p.fid]);if(TEX[key]&&p.key!==key){setTex(p.m,key);p.key=key;}});}}
function showPow(sp,x){const g=sp.powG;if(!g)return;if(x!==undefined)g.position.x=x;g.visible=true;tween(380,e=>{g.scale.setScalar(Math.max(0.001,ease.back(e)));g.rotation.y=(1-e)*0.6;});
 tween(300,e=>{g.scale.setScalar(Math.max(0.001,1-e));},1700,()=>{g.visible=false;});}
function lift(i,o){if(busy||i!==cur)return;o.open?closeFlap(o):openFlap(i,o);}
function openFlap(i,o){const a0=o.g.rotation.x,was=o.open;o.open=true;sfx.flap();tween(600,e=>{o.g.rotation.x=a0+(-3.0-a0)*ease.back(e);});if(!was)trigger(i,o);}
function closeFlap(o){const a0=o.g.rotation.x;o.open=false;sfx.flap();tween(400,e=>{o.g.rotation.x=a0*(1-ease.out(e));});}
function trigger(i,o){if(o.f.k==='meet'){S.met=true;focus(-1.6,0.7,0.82,1800);ui();}}
function wiggleTab(sp,d){if(!sp.tab)return;const x0=sp.tabX;tween(500,e=>{sp.tab.position.x=x0+Math.sin(e*Math.PI*3)*0.07;},d||0);}
function swingArm(p,mode){if(!p.arm)return;const sw=FD[p.fid].parts[p.sep].swing,a=p.arm,wind=sw[0],hit=mode==='hold'?(sw[2]||0.35):sw[1];
 tween(320,e=>{a.rotation.z=wind*ease.out(e);},0,()=>tween(170,e=>{a.rotation.z=wind+(hit-wind)*ease.out(e);},0,()=>tween(500,e=>{a.rotation.z=hit*(1-ease.inout(e));},1000)));}
function partPos(p,part){const c=FD[p.fid].parts[part].crop,cx=c[0]+c[2]/2,cy=c[1]+c[3]/2;return V3(p.g.position.x+(cx/200-0.5)*p.w,p.by+(1-cy/280)*p.h,p.g.position.z+0.06);}
function artPos(p,a){return V3(p.bx+(a[0]/200-0.5)*p.w,p.by+(1-a[1]/280)*p.h,p.g.position.z+0.06);}
function handPos(p){const h=FD[p.fid].hand||[150,90];return V3(p.bx+(h[0]/200-0.5)*p.w,p.by+(1-h[1]/280)*p.h,p.g.position.z+0.06);}
/* step library: attacks and finishers are lists of {t, do, ...}. Add new step types to UTD.steps. */
const once=f=>{let d=false;return()=>{if(!d){d=true;f();}};};
function runSteps(steps,ctx){steps.forEach(st=>setTimeout(()=>{const fn=UTD.steps[st.do];if(fn)fn(st,ctx);else console.warn('Unknown step',st.do);},st.t||0));}
Object.assign(UTD.steps,{
 sound(st){if(sfx[st.name])sfx[st.name]();},
 hit(st,c){c.hit();},
 ko(st,c){c.ko();},
 shake(st){shakeA=st.amount||0.12;},
 swarm(st,c){const{sp,A,D}=c,z=D.g.position.z+0.05,ds=Array.from({length:st.count||4},()=>prop(sp,st.prop,st.size[0],st.size[1]));
  const S0=V3(A.bx+0.2,1.35,z),C=V3(D.bx,1.0,z),H=partPos(D,c.part),n=ds.length;
  const orb=(i,t)=>{const a=i*Math.PI*2/n+t*Math.PI*4;return V3(C.x+Math.cos(a)*0.45,1.05+Math.sin(t*Math.PI*3+i)*0.15,z+Math.sin(a)*0.3);};
  tween(st.dur||1900,e=>{ds.forEach((d,i)=>{let q;if(e<0.25)q=S0.clone().add(V3(i*0.15-0.15,i*0.08,0)).lerp(orb(i,0),ease.inout(e/0.25));
   else if(e<0.78)q=orb(i,(e-0.25)/0.53);else q=orb(i,1).lerp(H,ease.inout((e-0.78)/0.22));d.position.copy(q);d.rotation.z=Math.sin(e*40+i)*0.15;});},0,()=>{ds.forEach(d=>kill(sp,d));});},
 volley(st,c){const{sp,A,D}=c,z=D.g.position.z+0.08,S0=V3(A.bx-0.18,0.85,z),n=st.count||9,iv=st.interval||95;
  for(let i=0;i<n;i++){const m=prop(sp,st.prop,st.size[0],st.size[1]);m.visible=false;const T1=V3(D.bx+(Math.random()-.5)*0.3,0.6+Math.random()*0.5,z),C1=S0.clone().lerp(T1,0.5).add(V3(0,0.5+Math.random()*0.3,0));
   tween(st.dur||520,e=>{m.visible=true;m.position.copy(qb(S0,C1,T1,e));m.rotation.z=e*8;},i*iv,()=>{burst(T1,5,0.25,EP.gore!==false);kill(sp,m);});nz(0.07,{f0:3000,f1:1400,gain:0.06,delay:i*iv/1000+0.4});}
  if(st.finale){const F=st.finale,big=prop(sp,F.prop,F.size[0],F.size[1]);big.visible=false;const Tb=partPos(D,c.part),Cb=S0.clone().lerp(Tb,0.5).add(V3(0,0.8,0));
   tween(F.dur||650,e=>{big.visible=true;big.position.copy(qb(S0,Cb,Tb,e));big.rotation.z=e*Math.PI*2;big.scale.setScalar(0.6+e*0.6);},n*iv+(F.gap||150),()=>kill(sp,big));}},
 screen(st,c){const{sp,A,D}=c,z=D.g.position.z+0.38,cv2=mkc(320,240),g=cv2.getContext('2d'),tx=ctex(cv2);
  const draw=n=>{st.draw(g,n);tx.needsUpdate=true;};let last=st.count||5;draw(last);
  const tv=prop(sp,'pow',st.size[0],st.size[1]);tv.material.map=tx;tv.customDepthMaterial.map=tx;tv.material.needsUpdate=true;tv.children.forEach(e=>{e.visible=false;});
  tv.position.set((A.bx+D.bx)/2-0.05,0.95,z-0.08);tv.rotation.y=(D.bx<A.bx?-1:1)*0.35;tv.scale.setScalar(0.001);tween(350,e=>tv.scale.setScalar(Math.max(0.001,ease.back(e))));
  const rings=[];for(let i=0;i<(st.rings||0);i++){const r=new T.Mesh(new T.RingGeometry(0.1,0.15,40),new T.MeshBasicMaterial({color:st.ringColor||'#f2c230',transparent:true,side:T.DoubleSide,depthWrite:false}));r.rotation.y=Math.PI/2;r.visible=false;sp.R.add(r);rings.push(r);
   const P1=V3(D.bx+0.05,0.8,D.g.position.z+0.05);tween(600,e=>{r.visible=true;r.position.copy(tv.position).lerp(P1,e);r.scale.setScalar(1+e*2.5);r.material.opacity=1-e*0.8;},350+i*230,()=>{r.visible=false;});}
  const cnt=st.count||5;tween(st.dur||1750,e=>{const n=cnt-Math.floor(e*cnt);if(n!==last&&n>=1){last=n;draw(n);}D.g.rotation.z=Math.sin(e*50)*0.06*e;},0,()=>{D.g.rotation.z=0;
   tween(300,e=>tv.scale.setScalar(Math.max(0.001,1-e)),300,()=>{kill(sp,tv);rings.forEach(r=>sp.R.remove(r));});});},
 dash(st,c){const{A,D}=c,x0=A.bx,y0=A.by,z=A.g.position.z,xt=D.bx-Math.sign(D.bx-A.bx)*0.5,lean=-0.9*Math.sign(D.bx-A.bx);
  tween(st.dur||1500,e=>{let x=x0,y=y0,rz=0;
   if(e<0.25){y=y0+ease.out(e/0.25)*0.55;}
   else if(e<0.6){const t=ease.inout((e-0.25)/0.35);x=x0+(xt-x0)*t;y=y0+0.55+Math.sin(t*Math.PI)*0.2-t*0.25;rz=lean*t;}
   else if(e<0.7){x=xt;y=y0+0.3;rz=lean;}
   else{const t=ease.inout((e-0.7)/0.3);x=xt+(x0-xt)*t;y=y0+0.3*(1-t);rz=lean*(1-t);}
   A.g.position.x=x;A.g.position.y=y;A.g.rotation.z=rz;
   if(st.trail==='flame'&&e<0.7)for(let k=0;k<3;k++)emit(V3(x+(Math.random()-.5)*0.25,y+0.3*A.h,z+0.03),V3((Math.random()-.5)*0.4,-1.1-Math.random(),0),Math.random()<.5?'#ff7a1a':'#ffd23f',0.4,0,0.9);},0,()=>{A.g.position.set(x0,y0,z);A.g.rotation.z=0;});},
 tether(st,c){const{sp,A,D}=c,z=A.g.position.z+0.06,Hd=st.from?artPos(A,st.from):handPos(A),Tg=V3(D.bx,0.85,z);Hd.z=z;
  const curve=new T.Curve();curve.getPoint=(t,o)=>{o=o||new T.Vector3();const b=Hd.clone().lerp(Tg,t);b.y+=Math.sin(t*Math.PI)*0.35;const a=t*90;return o.set(b.x,b.y+Math.cos(a)*0.035,b.z+Math.sin(a)*0.035);};
  const geo=new T.TubeGeometry(curve,600,0.011,5,false),mat=new T.MeshStandardMaterial({color:st.color||'#e9dcc0',roughness:0.6}),cord=new T.Mesh(geo,mat);cord.castShadow=true;geo.setDrawRange(0,0);sp.R.add(cord);
  const total=geo.index.count,dirx=Math.sign(A.bx-D.bx);
  tween(st.grow||550,e=>{geo.setDrawRange(0,Math.floor(total*e/3)*3);},0,()=>{
   const coils=Array.from({length:st.coils||3},(_,i)=>{const m=new T.Mesh(new T.TorusGeometry(0.2,0.014,6,36),mat);m.rotation.x=Math.PI/2;m.position.set(D.bx,0.45+i*0.25,D.g.position.z);m.scale.setScalar(2.2);m.castShadow=true;sp.R.add(m);tween(260,e=>m.scale.setScalar(2.2-1.2*ease.out(e)),i*90);return m;});
   tween(st.yank||520,e=>{const k=Math.sin(e*Math.PI);D.g.position.x=D.bx+dirx*0.3*k;coils.forEach(cc=>{cc.position.x=D.g.position.x;});},450,()=>{D.g.position.x=D.bx;setTimeout(()=>{[cord,...coils].forEach(m=>sp.R.remove(m));},600);});});},
 source(st,c){const{sp,A}=c,z=A.g.position.z+(st.dz||0.18),pot=prop(sp,st.prop,st.size[0],st.size[1]);pot.position.set(A.bx+(st.dx||0.5)*Math.sign(c.D.bx-A.bx),st.size[1]/2+0.02,z);pot.scale.setScalar(0.001);
  tween(300,e=>pot.scale.setScalar(Math.max(0.001,ease.back(e))));
  if(st.flames)tween(st.dur||1700,e=>{if(Math.random()<0.8)emit(V3(pot.position.x+(Math.random()-.5)*0.15,0.04,z+0.02),V3((Math.random()-.5)*0.2,0.6+Math.random()*0.5,0),Math.random()<.5?'#ff7a1a':'#ffd23f',0.5,0,0.8);});
  tween(300,e=>pot.scale.setScalar(Math.max(0.001,1-e)),(st.dur||1700)+300,()=>kill(sp,pot));},
 lob(st,c){const{sp,A,D}=c,s=Math.sign(D.bx-A.bx),f=st.from||{},z=A.g.position.z+(f.dz||0),m=prop(sp,st.prop,st.size[0],st.size[1]);m.visible=false;
  const F0=V3(A.bx+(f.dx||0.5)*s,f.y||0.5,z),F1=partPos(D,c.part),FC=F0.clone().lerp(F1,0.5).add(V3(0,0.7,0));
  tween(st.dur||700,e=>{m.visible=true;const q=qb(F0,FC,F1,e);m.position.copy(q);m.rotation.z=-e*Math.PI*(st.spin||3)*s;if(st.trail==='flame')emit(q.clone(),V3((Math.random()-.5)*0.3,0.3,0),Math.random()<.5?'#ff7a1a':'#ffd23f',0.35,0,0.8);},0,
   ()=>{if(st.splat)for(let k=0;k<30;k++)emit(F1.clone(),V3((Math.random()-.5)*2,Math.random()*1.5,(Math.random()-.5)*0.5),st.splat,0.7,4,1.4);kill(sp,m);});},
 speech(st,c){const{sp,A}=c,b=prop(sp,st.prop,st.size[0],st.size[1]);b.position.set(A.bx+(st.dx||0.4)*Math.sign(c.D.bx-A.bx),st.y||1.95,A.g.position.z+0.05);b.scale.setScalar(0.001);
  tween(350,e=>b.scale.setScalar(Math.max(0.001,ease.back(e))));tween(300,e=>b.scale.setScalar(Math.max(0.001,1-e)),st.hold||2200,()=>kill(sp,b));},
 stream(st,c){const{sp,A,D}=c,z=A.g.position.z+0.05;for(let i=0;i<(st.count||7);i++){const m=prop(sp,st.prop,st.size[0],st.size[1]);m.visible=false;const a=V3(A.bx+0.2*Math.sign(D.bx-A.bx),1.45,z),b=V3(D.bx,1.15+(i%2)*0.25,z);
  tween(st.dur||900,e=>{m.visible=true;m.position.copy(a).lerp(b,e);m.position.y+=Math.sin(e*Math.PI*3+i)*0.12;m.rotation.z=Math.sin(e*8+i)*0.3;},i*(st.interval||230),()=>kill(sp,m));}},
 lose(st,c){c.lose&&c.lose();},
 say(st){if(EP.verse){const v=st.v&&EP.verse.finisher&&EP.verse.finisher[st.v];if(v)say(v[0],v[1]);return;}say(st.a,st.b);},
 focus(st,c){focus(st.x!==undefined?st.x:c.D.g.position.x,st.z!==undefined?st.z:c.D.g.position.z,st.zoom||0.8,st.hold||2000);},
 hoist(st,c){const{A,D}=c,x0=D.g.position.x,y0=D.by,s=Math.sign(A.bx-D.bx);c.held=true;
  focus(A.g.position.x,A.g.position.z,0.75,st.dur||1600);tween(st.dur||1600,e=>{const k=ease.inout(e);D.g.position.x=x0+(A.bx-x0)*k;D.g.position.y=y0+Math.sin(k*Math.PI*0.5)*1.15;D.g.rotation.z=-s*k*Math.PI/2+Math.sin(e*40)*0.04*(1-k);A.g.position.y=A.by-Math.sin(e*Math.PI)*0.05;});},
 cannon(st,c){const{sp,A,D}=c,s=Math.sign(D.bx-A.bx),cx=A.bx+s*(st.dx||0.8),z=A.g.position.z+0.12,m=prop(sp,st.prop,st.size[0],st.size[1]);m.scale.x=s<0?1:-1;m.position.set(cx,st.size[1]/2,z);m.scale.y=0.001;
  tween(700,e=>{m.scale.y=Math.max(0.001,ease.back(e));});focus(cx,z,0.72,st.hold||7000);const mouth=V3(cx+s*st.size[0]*0.32,st.size[1]*0.82,z),start=D.g.position.clone(),land=V3(D.bx,D.by,D.g.position.z);
  tween(st.load||900,e=>{D.g.position.copy(start).lerp(mouth,ease.inout(e));D.g.scale.setScalar(Math.max(0.05,1-0.75*e));},800,()=>{sfx.fuse();setTimeout(()=>sfx.fuse(),900);setTimeout(()=>sfx.fuse(),1800);
   tween(st.fuse||2400,e=>{emit(mouth.clone().add(V3(-s*0.25,-0.05,0)),V3((Math.random()-.5)*0.4,0.6,0),Math.random()<.5?'#ffd23f':'#ff7a1a',0.3,0,0.6);},0,()=>{sfx.boom();shakeA=0.22;
    for(let q=0;q<50;q++)emit(mouth.clone(),V3(s*(1+Math.random()*2),Math.random()*1.5,(Math.random()-.5)*0.8),Math.random()<.5?'#9aa3ad':'#d9d3c6',1.0,0.3,1.6);burst(mouth,120,1.3,EP.gore!==false);
    const top=mouth.clone().lerp(land,0.5).add(V3(0,2.6,0));focus(land.x,land.z,0.9,3000);tween(st.flight||2400,e=>{D.g.position.copy(qb(mouth,top,land,e));D.g.scale.setScalar(0.25+0.75*Math.min(1,e*1.6));D.g.rotation.z=e*Math.PI*4*s;},0,()=>{D.g.position.copy(land);D.g.scale.setScalar(1);D.g.rotation.z=0;sfx.thud();splats(sp,V3(land.x,0,land.z+0.2),8);});
    tween(500,e=>{m.scale.y=Math.max(0.001,1-e);},2600,()=>kill(sp,m));});});},
 hop(st,c){const A=c.A,y0=A.by;tween(st.dur||600,e=>{A.g.position.y=y0+Math.sin(e*Math.PI)*(st.height||0.5);A.g.scale.y=1+Math.sin(e*Math.PI*2)*0.06;},0,()=>{A.g.position.y=y0;A.g.scale.y=1;});},
 // signature: pleated tail snaps across, sand spray clips the target
 tailwhip(st,c){const{sp,A,D}=c,s=Math.sign(D.bx-A.bx),z=A.g.position.z+0.03,N=st.segments||12,seg=[],cols=st.colors||['#c99a55','#a6773c'];
  const len=Math.abs(D.bx-A.bx)-0.35,P0=V3(A.bx+s*0.18,A.by+0.16,z);
  for(let k=0;k<N;k++){const m=new T.Mesh(new T.BoxGeometry(len/N*1.05,0.07,0.05),CARD_MAT({color:cols[k%2]}));m.castShadow=true;m.visible=false;sp.R.add(m);seg.push(m);}
  const T1=partPos(D,c.part);
  tween(st.grow||500,e=>{const n=Math.ceil(e*N);seg.forEach((m,k)=>{m.visible=k<n;const u=(k+0.5)/N;m.position.set(P0.x+s*u*len,P0.y+0.05+Math.sin(u*Math.PI*6)*0.05*(1-u),z);m.rotation.z=Math.sin(u*Math.PI*6)*0.5;});},0,
   ()=>tween(st.snap||450,e=>{seg.forEach((m,k)=>{const u=(k+0.5)/N,a=e*Math.PI*0.75*u;m.position.x=P0.x+s*Math.cos(a)*u*len;m.position.y=P0.y+0.05+Math.sin(a)*u*len*0.7;m.rotation.z=s*a;});
    if(e>0.4)for(let q=0;q<5;q++)emit(seg[N-1].position.clone(),T1.clone().sub(seg[N-1].position).multiplyScalar(1.6).add(V3((Math.random()-.5)*0.6,Math.random()*0.8,(Math.random()-.5)*0.3)),Math.random()<.5?'#e6c25a':'#d9a33f',0.6,1.5,0.9);},0,
    ()=>tween(350,e=>{seg.forEach(m=>{m.scale.setScalar(Math.max(0.001,1-e));});},500,()=>seg.forEach(m=>sp.R.remove(m)))));},
 // prop bounces once on the tarmac, then hits the target
 bounce(st,c){const{sp,A,D}=c,s=Math.sign(D.bx-A.bx),z=A.g.position.z+0.08,m=prop(sp,st.prop,st.size[0],st.size[1]);m.visible=false;
  const P0=V3(A.bx+s*0.3,st.y0||0.9,z),Mid=V3((A.bx+D.bx)/2,0.05,z+0.1),P1=partPos(D,c.part),C0=P0.clone().lerp(Mid,0.5).add(V3(0,st.arc||0.9,0)),C1=Mid.clone().lerp(P1,0.5).add(V3(0,0.7,0)),d=st.dur||900;
  tween(d,e=>{m.visible=true;const q=e<0.5?qb(P0,C0,Mid,e*2):qb(Mid,C1,P1,(e-0.5)*2);m.position.copy(q);m.rotation.z=-s*e*Math.PI*(st.spin||2);if(Math.abs(e-0.5)<0.03){sfx.boing();for(let q=0;q<12;q++)emit(Mid.clone(),V3((Math.random()-.5)*1.2,Math.random()*0.8,(Math.random()-.5)*0.4),'#c9b48e',0.5,1.5,0.9);}},0,()=>kill(sp,m));},
 // attacker bobs its head like a bobblehead, then skids into the target
 charge(st,c){const{A,D}=c,s=Math.sign(D.bx-A.bx),x0=A.bx,xt=D.bx-s*0.45,b=st.bob||700,d=st.dur||1400;
  tween(d,e=>{const t=e*d;let x=x0,rz=0;if(t<b)rz=Math.sin(t/b*Math.PI*10)*0.18;else{const u=(t-b)/(d-b);const k=u<0.45?ease.in?ease.in(u/0.45):(u/0.45)*(u/0.45):u<0.6?1:1-ease.inout((u-0.6)/0.4);x=x0+(xt-x0)*k;rz=-s*0.25*(u<0.6?1:1-(u-0.6)/0.4);
   if(u<0.45&&Math.random()<0.6)emit(V3(A.g.position.x,0.04,A.g.position.z+0.05),V3(-s*0.6,0.4,0),'#b9b1a0',0.4,0,0.7);}
   A.g.position.x=x;A.g.rotation.z=rz;},0,()=>{A.g.position.x=x0;A.g.rotation.z=0;});},
 // two giant palms slam in from the page edges; paper gust
 clap(st,c){const{sp,A,D}=c,z=D.g.position.z+0.12,y=st.y||0.9,hs=[-1,1].map(k=>{const m=prop(sp,st.prop,st.size[0],st.size[1]);m.scale.x=k;m.position.set(D.bx+k*1.6,y,z);m.visible=false;return {m,k};});
  tween(st.dur||650,e=>{hs.forEach(({m,k})=>{m.visible=true;m.position.x=D.bx+k*(1.6-1.25*ease.in2(e));});},0,()=>{sfx.clap();shakeA=0.08;
   for(let q=0;q<40;q++)emit(V3(D.bx,y,z),V3((Math.random()-.5)*3,Math.random()*1.4,(Math.random()-.5)*0.6),Math.random()<.6?'#fbf6ea':'#e4d9c2',0.7,1,1.1);
   tween(450,e=>{hs.forEach(({m,k})=>{m.position.x=D.bx+k*(0.35+1.4*ease.out(e));});},350,()=>hs.forEach(({m})=>kill(sp,m)));});},
 // giant prop drops over the target like a lid, squashes, then lifts away
 drop(st,c){const{sp,D}=c,z=D.g.position.z+0.14,m=prop(sp,st.prop,st.size[0],st.size[1]),yb=st.size[1]*0.42,yt=3.4,fall=st.fall||550;m.position.set(D.bx,yt,z);
  tween(fall,e=>{m.position.y=yt+(yb-yt)*e*e;},0,()=>{sfx.splat();shakeA=0.16;burst(V3(D.bx,0.1,z),60,0.8,EP.gore!==false);tween(250,e=>{D.g.scale.y=1-0.55*ease.out(e);});
   tween(500,e=>{m.position.y=yb+ease.out(e)*0.45;},st.hold||500,()=>tween(500,e=>{m.position.y=yb+0.45+ease.in2(e)*3;m.rotation.z=e*0.6;},st.linger||900,()=>{kill(sp,m);tween(300,e=>{D.g.scale.y=0.45+0.55*e;});}));});},
 sway(st,c){const D=c.D;tween(st.dur||1900,e=>{D.g.rotation.z=Math.sin(e*Math.PI*4)*0.14*e;});}});

function wiggleWing(sp){if(!sp.wing)return;tween(700,e=>{sp.wing.rotation.z=Math.PI-Math.sin(e*Math.PI*2)*0.06*(1-e);},1200);}
function setWingFold(sp,f){const k=f<=0?0:f>=1?1:f*f*(3-2*f);sp.wingItems.forEach(it=>{it.g.rotation.x=it.flat*(1-k);it.g.visible=k>0.02;});}
function openWing(i){const sp=SP[i];if(busy||i!==cur||sp.wingOpen||sp.wingBusy)return;sp.wingBusy=true;sfx.turn();
 target.set(1.6,0.35,0.15);viewZ=1.5;home();let popped=false;
 tween(1500,e=>{const r=Math.PI*(1-ease.inout(e)),f=1-r/Math.PI;sp.wing.rotation.z=r;sp.wing.position.y=0.035+Math.sin(e*Math.PI)*0.03;setWingFold(sp,f);setFold(sp,f);
  if(f>0.5&&!popped){popped=true;for(let k=0;k<6;k++)sfx.pop(k*0.08);}},0,()=>{sp.wing.rotation.z=0;sp.wing.position.y=0.035;setWingFold(sp,1);sp.wingBusy=false;sp.wingOpen=true;drawL(i);
  setTimeout(()=>{burst(V3(W*1.5,1.8,-0.4),200,1.3);burst(V3(W/2,1.6,0),140,1.1);sfx.cheer(2.8,1.3);sfx.confetti();},200);ui();});}
function closeWing(sp){if(!sp.wing||!sp.wingOpen)return;sp.wingOpen=false;const r0=sp.wing.rotation.z;
 tween(450,e=>{const r=r0+(Math.PI-r0)*ease.inout(e);sp.wing.rotation.z=r;setWingFold(sp,1-r/Math.PI);});target.set(0,0.35,0.2);viewZ=1;home();}
let cardOut=false,cardHome=null;
function pullCard(i){const sp=SP[i];if(busy||i!==cur||cardOut)return;drawCard(sp);cardOut=true;sfx.flap();const g=sp.cardG;cardHome={p:g.position.clone(),q:g.quaternion.clone()};
 const p1=g.position.clone();p1.z-=0.95;tween(450,e=>{g.position.copy(cardHome.p).lerp(p1,ease.out(e));},0,()=>{
  const fwd=new T.Vector3();cam.getWorldDirection(fwd);const pT=cam.position.clone().addScaledVector(fwd,2.3);
  const qT=cam.quaternion.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2));const q0=g.quaternion.clone();sfx.whoosh();
  tween(700,e=>{const t=ease.inout(e);g.position.copy(p1).lerp(pT,t);g.quaternion.copy(q0).slerp(qT,t);},0,()=>{g.visible=false;$('#cardImg').src=sp.cardC.toDataURL('image/png');$('#modal').hidden=false;$('#mclose').focus();});});}
function putCardBack(sp,instant){if(!cardOut||!sp.cardG)return;$('#modal').hidden=true;const g=sp.cardG,h=cardHome;cardOut=false;
 g.visible=true;if(instant){g.position.copy(h.p);g.quaternion.copy(h.q);return;}const p0=g.position.clone(),q0=g.quaternion.clone(),p1=h.p.clone();p1.z-=0.95;sfx.whoosh();
 tween(700,e=>{const t=ease.inout(e);g.position.copy(p0).lerp(p1,t);g.quaternion.copy(q0).slerp(h.q,t);},0,()=>{sfx.flap();tween(650,e=>{g.position.copy(p1).lerp(h.p,ease.inout(e));});});}
function pickTab(i,o){const sp=SP[i];if(busy||i!==cur||S.striking)return;if(S.choice[i]){(EP.verse?say('One attack a round, my friend,','Now turn the page, it isn\'t the end.'):say('One attack per round!','Rules are rules. Even here.'));return;}
 S.choice[i]=o.k;tween(400,e=>{o.m.position.z=o.z0+0.32*ease.out(e);});strike(i);}
function turnDial(i){const sp=SP[i];if(busy||i!==cur||S.striking||S.struck[i])return;const n=sp.dialKeys.length;sp.dialIdx=(sp.dialIdx+1)%n;S.choice[i]=sp.dialKeys[sp.dialIdx];
 const step=Math.PI*2/n,r0=sp.dialM.rotation.y,g0=sp.gearM.rotation.y,t=-sp.dialIdx*step,d=((t-r0)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-2*Math.PI;sfx.click(5);
 tween(600,e=>{const k=ease.back(e);sp.dialM.rotation.y=r0+d*k;sp.gearM.rotation.y=g0-d*k*1.85;});focus(1.2,1.2,0.8,1400);drawL(i);ui();}
function pullLever(i){const sp=SP[i];if(busy||i!==cur||S.striking||S.struck[i])return;
 if(!S.choice[i]){const p=sp.leverPiv;tween(400,e=>{p.rotation.x=-0.75+Math.sin(e*Math.PI*3)*0.08;});(EP.verse?say('First turn the dial and pick a plan,','Then pull the lever, if you can!'):say('Turn the dial first!','A lever with no plan is just exercise.'));return;}
 const p=sp.leverPiv;nz(0.15,{type:'lowpass',f0:900,gain:0.3});tween(260,e=>{p.rotation.x=-0.75+1.6*ease.out(e);},0,()=>tween(600,e=>{p.rotation.x=0.85-1.6*ease.inout(e);},1500));strike(i);}

function boing(p){if(!p)return;tn(160,640,0.22,{type:'triangle',gain:0.12});tn(640,320,0.2,{type:'triangle',gain:0.08,delay:0.22});
 tween(900,e=>{p.g.position.y=p.by+Math.abs(Math.sin(e*Math.PI*3))*0.4*(1-e);p.g.scale.set(1-Math.sin(e*Math.PI*6)*0.05*(1-e),1+Math.sin(e*Math.PI*6)*0.09*(1-e),1);},0,()=>{p.g.position.y=p.by;p.g.scale.set(1,1,1);});}
function strike(i){const sp=SP[i],d=sp.d;if(S.striking||S.struck[i])return;const k=S.choice[i];
 if(!k){(EP.verse?say('Pick a tab and pull it through,','The fighter waits to strike for you.'):say('Pick an attack first!','Choose something. Anything.'));return;}
 S.striking=true;sfx.tab();const A=popOf(sp,d.attacker),D=popOf(sp,d.defender),a=ATK[k],tk=toks(FD[d.attacker],FD[d.defender],d.injury);ui();
 const wv=EP.verse&&EP.verse.windup&&EP.verse.windup[k];if(wv)say(wv[0],wv[1]);else if(a.call)say(fill(a.call[0],tk),fill(a.call[1],tk));focus(A.g.position.x,A.g.position.z,0.72,1500);sfx.drum&&sfx.drum();
 tween(1300,e=>{A.g.rotation.z=Math.sin(e*Math.PI*6)*0.05*e;A.g.scale.set(1,1+Math.sin(e*Math.PI)*0.06,1);},0,()=>{A.g.rotation.z=0;A.g.scale.set(1,1,1);
  swingArm(A,'hit');focus(sp.wide?0:1.6,0.5,sp.wide?0.86:0.8,3600);
  setTimeout(()=>runSteps(a.steps,{sp,i,A,D,part:d.injury,hit:once(()=>impact(i,sp,D)),ko:()=>{}}),350);});}
function losePart(i,sp,D,part){const P=FD[D.fid].parts[part],dir=P.dir||(D.bx<0?-1:1);S.lost[D.fid].push(part);const key=fkey(D.fid,S.lost[D.fid],'',S.cond[D.fid]);if(TEX[key]){setTex(D.m,key);D.key=key;}
 fling(D.fid+'~'+part,P.fly[0],P.fly[1],worldOf(D,0.6).add(V3(dir*0.25,0,0.08)),sp.R,dir*0.9);burst(worldOf(D,0.7),140,1,EP.gore!==false);splats(sp,V3(D.g.position.x,0,D.g.position.z+0.1),5);sfx.squelch();}
function impact(i,sp,D){const d=sp.d,P=FD[d.defender].parts[d.injury],dir=P.dir||(D.bx<0?-1:1);
 S.lost[d.defender].push(d.injury);const key=fkey(D.fid,S.lost[D.fid],'',S.cond[D.fid]);if(TEX[key]){setTex(D.m,key);D.key=key;}
 showPow(sp,D.bx+dir*0.35);fling(D.fid+'~'+d.injury,P.fly[0],P.fly[1],worldOf(D,0.75).add(V3(dir*0.25,0,0.05)),sp.R,dir*0.9);burst(worldOf(D,0.8),200,1.2,EP.gore!==false);splats(sp,V3(D.bx+dir*0.3,0,D.g.position.z+0.1),7);refreshFighters(i+1);S.struck[i]=true;
 shake(D,0);sfx.hit();sfx.squelch();sfx.cheer(1.8,1);shakeA=0.12;S.striking=false;setTimeout(()=>{drawL(i);SP.forEach((s,k)=>{if(s.type==='winner')drawL(k);});ui();},300);}
function eatBugs(sp,v,tab){const z=v.g.position.z+0.08,mouth=()=>{const a=tab.mouth||[146,96];return V3(v.bx+(a[0]/200-0.5)*v.w,v.g.position.y+(1-a[1]/280)*v.h,z);},n=tab.count||4;
 for(let k=0;k<n;k++){const b=prop(sp,tab.bug||'cricket',0.24,0.18);b.visible=false;const st=V3(v.bx+1.2+Math.random()*0.4,1.2+Math.random()*0.6,z),wob=Math.random()*6;
  tween(1100,e=>{b.visible=true;const m=mouth(),p=st.clone().lerp(m.clone().add(V3(0.28,0.12,0)),ease.out(e));p.y+=Math.sin(e*12+wob)*0.08;b.position.copy(p);b.rotation.z=Math.sin(e*20+wob)*0.3;},k*650,()=>{
   const m=mouth(),tg=new T.Mesh(new T.BoxGeometry(1,0.035,0.02).translate(0.5,0,0),new T.MeshStandardMaterial({color:'#e85d75',roughness:0.4}));tg.position.copy(m);sp.R.add(tg);const L=b.position.distanceTo(m),ang=Math.atan2(b.position.y-m.y,b.position.x-m.x);tg.rotation.z=ang;
   sfx.snap();tween(140,e=>{tg.scale.x=Math.max(0.01,L*e);},0,()=>tween(220,e=>{tg.scale.x=Math.max(0.01,L*(1-e));b.position.copy(m.clone().lerp(b.position,1-e));b.scale.setScalar(Math.max(0.05,1-e));},0,()=>{sp.R.remove(tg);kill(sp,b);sfx.gulp();
    tween(300,e=>{v.g.scale.set(1+Math.sin(e*Math.PI)*0.06,1-Math.sin(e*Math.PI)*0.04,1);});}));});}}
function mechTap(i){const sp=SP[i];if(busy||i!==cur)return;sp.mech.tap(sp,i);}
function pull(i){if(busy||i!==cur)return;const sp=SP[i],d=sp.d;
 if(sp.type==='finish'){if(!(S.mech[i]&&S.mech[i].done)){const x0=sp.tabX;tween(400,e=>{sp.tab.position.x=x0+Math.sin(e*Math.PI*3)*0.06;});say(...(d.talk.notYet||['Not yet!','Not yet.']));return;}
  if(S.ko||S.striking)return;S.striking=true;sfx.tab();focus(1.7,0.75,0.76,3800);sp.tab.position.x=sp.tabX;tween(500,e=>{sp.tab.position.x=sp.tabX+0.45*ease.out(e);});
  const A=popOf(sp,d.attacker),D=popOf(sp,d.defender);swingArm(A,'hold');
  runSteps(ATK[d.finisher].steps,{sp,i,A,D,part:d.injury||null,hit:()=>{},lose:once(()=>{if(d.injury)losePart(i,sp,D,d.injury);}),ko:once(()=>{if(d.injury&&!S.lost[d.defender].includes(d.injury))losePart(i,sp,D,d.injury);S.ko=true;S.striking=false;showPow(sp,D.bx+0.35);sfx.hit();sfx.squelch();sfx.cheer(2.6,1.3);shakeA=0.18;
   D.down=-1.52;tween(800,e=>{D.g.rotation.x=-1.52*e*e;D.g.rotation.z=0.25*e;});burst(worldOf(D,0.6),220,1.3,EP.gore!==false);setTimeout(()=>splats(sp,V3(D.g.position.x,0,D.g.position.z+0.3),9),700);drawL(i);ui();})});return;}
 S.fire[i]=!S.fire[i];const I=sp.introF.intro,on=S.fire[i];sfx.tab();if(on){if(I.tab.sound&&sfx[I.tab.sound])sfx[I.tab.sound]();focus(1.6,0.1,0.86,1600);}
 const x0=sp.tab.position.x,x1=sp.tabX+(on?0.45:0);tween(500,e=>{sp.tab.position.x=x0+(x1-x0)*ease.out(e);});
 if(I.tab.type==='lift'){const v=popOf(sp,'hero'),y0=v.g.position.y,y1=v.by+(on?0.9:0);tween(900,e=>{v.g.position.y=y0+(y1-y0)*ease.back(e);});if(on)for(let q=0;q<40;q++)emit(V3(v.bx+(Math.random()-.5)*0.2,0.25,v.g.position.z),V3((Math.random()-.5)*0.6,-0.4-Math.random()*0.6,0),Math.random()<.5?'#ff7a1a':'#9aa3ad',0.6,0,1);}
 if(I.tab.type==='swap'){const v=popOf(sp,'hero'),F=sp.introF,key=fkey(F.id,[],'',on?{[I.tab.cond]:true}:{});if(TEX[key]){setTex(v.m,key);v.key=key;}
  const y0=v.g.position.y,y1=v.by+(on?(I.tab.lift||0):0);tween(700,e=>{v.g.position.y=y0+(y1-y0)*ease.back(e);v.g.scale.set(1+Math.sin(e*Math.PI)*0.08,1+Math.sin(e*Math.PI)*0.12,1);},0,()=>v.g.scale.set(1,1,1));if(on&&I.tab.fx==='eat')setTimeout(()=>eatBugs(sp,v,I.tab),500);if(on&&I.tab.fx==='chalk')for(let q=0;q<60;q++)emit(V3(v.bx+(Math.random()-.5)*0.5,0.9+Math.random()*0.4,v.g.position.z+0.1),V3((Math.random()-.5)*0.8,Math.random()*0.5,(Math.random()-.5)*0.3),'#f7f4ee',1.0,-0.1,1.2);
  if(I.tab.pop){const dd=popOf(sp,'late'),f=dd.g.rotation.x,t=on?0:-Math.PI/2;dd.g.visible=true;tween(800,e=>{dd.g.rotation.x=f+(t-f)*(on?ease.soft(e):ease.out(e));},0,on?null:()=>{dd.g.visible=false;});}}
 if(I.tab.type==='reveal'){const dd=popOf(sp,'late'),f=dd.g.rotation.x,t=on?0:-Math.PI/2;dd.g.visible=true;tween(800,e=>{dd.g.rotation.x=f+(t-f)*(on?ease.soft(e):ease.out(e));},0,on?null:()=>{dd.g.visible=false;});}
 ui();}

const ray=new T.Raycaster(),mp=new T.Vector2();let drag=null;
function pick(e){const r=cv.getBoundingClientRect();mp.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mp,cam);
 const sp=SP[cur];if(!S.opened)return ray.intersectObject(coverBoard,false)[0];const list=sp.flapObjs.map(o=>o.front);if(sp.flap)list.push(sp.flap.g.children.find(c=>c.geometry&&c.geometry.type==='CylinderGeometry')||sp.disc);if(sp.tab&&sp.tab.isMesh)list.push(sp.tab);if(sp.disc)list.push(sp.disc);if(sp.atkObjs)sp.atkObjs.forEach(o=>list.push(o.m));if(sp.dialM)list.push(sp.dialM,sp.gearM,...sp.leverHits);if(sp.flipHits)list.push(...sp.flipHits);if(sp.wing&&!sp.wingOpen)list.push(sp.wingOut);if(sp.cardM)list.push(sp.cardM,sp.pocketM);list.push(sp.pL,sp.pR);
 return ray.intersectObjects(list,false)[0];}
function pageDir(h){const ud=h.object.userData;if(!ud.page||!S.opened)return 0;
 if(ud.page==='R'&&h.uv.x>0.6&&cur<SP.length-1&&!gate())return 1;if(ud.page==='L'&&h.uv.x<0.4&&cur>0)return -1;return 0;}
cv.addEventListener('pointerdown',e=>{if(busy)return;const h=pick(e);if(!h)return;const ud=h.object.userData;
 if(ud.hold){drag={k:'hold',f:ud.hold};ud.hold(true);}
 else if(ud.flap)drag={k:'flap',o:ud.flap,y0:e.clientY,a0:ud.flap.g.rotation.x,m:0};
 else if(ud.hit)drag={k:'tap',f:ud.hit,x0:e.clientX,y0:e.clientY};
 else{const d=pageDir(h);if(d)drag={k:'page',dir:d,x0:e.clientX,on:false,p:0};}
 if(drag){try{cv.setPointerCapture(e.pointerId);}catch(_){}}});
cv.addEventListener('pointermove',e=>{
 if(!drag){if(e.pointerType==='mouse'&&!busy){const h=pick(e);let c='';if(h){const ud=h.object.userData;if(ud.flap||ud.hit||ud.hold)c='pointer';else if(pageDir(h))c='grab';}cv.style.cursor=c;}return;}
 if(drag.k==='flap'){const dy=drag.y0-e.clientY;drag.m=Math.max(drag.m,Math.abs(dy));if(drag.m>6)drag.o.g.rotation.x=Math.max(-3.0,Math.min(0,drag.a0-dy/110*1.7));}
 else if(drag.k==='page'){const dx=e.clientX-drag.x0,prog=drag.dir>0?-dx:dx;
  if(!drag.on&&prog>14){drag.on=true;beginTurn(drag.dir);cv.style.cursor='grabbing';}
  if(drag.on){drag.p=Math.max(0,Math.min(1,prog/(cv.clientWidth*0.42)));turning.th=drag.dir>0?drag.p*Math.PI:Math.PI-drag.p*Math.PI;applyTurn(turning.th);}}});
function endDrag(e){if(!drag)return;const d=drag;drag=null;cv.style.cursor='';
 if(d.k==='flap'){if(d.m<=6)lift(cur,d.o);else if(d.o.g.rotation.x<-1.3)openFlap(cur,d.o);else closeFlap(d.o);}
 else if(d.k==='page'){if(d.on){if(d.p>0.35)animLeaf(d.dir>0?Math.PI:0,finishTurn);else animLeaf(d.dir>0?0:Math.PI,cancelTurn);}}
 else if(d.k==='hold'){d.f(false);}
 else if(d.k==='tap'){if(Math.hypot(e.clientX-d.x0,e.clientY-d.y0)<10)d.f();}}
cv.addEventListener('pointerup',endDrag);cv.addEventListener('pointercancel',endDrag);


/* ---------- UI ---------- */
const WI=SP.findIndex(s=>s.type==='winner');
function say(a,b){if(EP.verse){const r=$('#rhyme');$('#r1').textContent=a?fill(a,TK0):'';$('#r2').textContent=b?fill(b,TK0):'';r.hidden=!(a||b);if(a||b){r.classList.remove('pop');void r.offsetWidth;r.classList.add('pop');}return;}$('#b1').textContent=fill(a||'',TK0);$('#b2').textContent=fill(b||'',TK0);}
function gate(){const sp=SP[cur];if(!S.opened)return true;return (sp.type==='round'&&!S.struck[cur])||(sp.type==='finish'&&!S.ko);}
function actText(){const sp=SP[cur],i=cur;if(!S.opened)return S.opening?'':'Open the book';
 if(sp.type==='title')return !S.met?'Lift the flap':!S.flicked?'Flick the flip-book':'';
 if(sp.type==='intro')return S.fire[i]?'Push the tab back':'Pull the tab';
 if(sp.type==='round')return CHOOSERS[sp.d.choose.type].act(i);
 if(sp.type==='finish')return S.ko?'':S.mech[i]&&S.mech[i].done?'Pull the tab':sp.mech.act;
 if(sp.type==='winner')return sp.wingOpen?'Pull out my fight card':'Open the gatefold';return '';}
function ui(){document.body.classList.toggle('verse',!!EP.verse);const sp=SP[cur],tk=sp.d.attacker?toks(FD[sp.d.attacker],FD[sp.d.defender]):TK0;
 if(!S.opened){$('#story').innerHTML='<b>'+EF[0].name+' vs '+EF[1].name+'</b><br>Ultimate Teams Deathmatch, '+EP.title+'.';if(EP.verse)say('','');else say('The book is closed, folks!','Somebody open it. Gently.');$('#hint').textContent='Tap the cover to open the book.';}
 else{const sb=sp.sub().join(' ');$('#story').innerHTML='<b>'+sp.story().replace(/\n/g,'<br>')+'</b>'+(sb?'<br>'+sb.replace(/\n/g,'<br>'):'');
 const t=sp.talk()||[];say(t[0],t[1]);$('#hint').textContent=fill(sp.hint(),tk);}
 $('#prev').disabled=busy||cur===0;$('#next').disabled=busy||cur===SP.length-1||gate();
 $('#next').textContent=gate()?'Finish this page first':'Turn the page';
 const actTxt=actText();
 $('#act').style.display=actTxt?'':'none';$('#act').textContent=actTxt;$('#act').disabled=busy||!!S.striking;
 const last=cur===SP.length-1;$('#copy').style.display=last?'':'none';$('#again').style.display=last?'':'none';$('#next').style.display=last?'none':'';}
$('#next').addEventListener('click',()=>turn(1));$('#prev').addEventListener('click',()=>turn(-1));
addEventListener('keydown',e=>{if(e.key==='ArrowRight'&&!$('#next').disabled)turn(1);if(e.key==='ArrowLeft'&&!$('#prev').disabled)turn(-1);});
$('#act').addEventListener('click',()=>{const sp=SP[cur],i=cur;if(!S.opened){openCover();return;}
 if(sp.type==='title'){if(!S.met){const o=sp.flapObjs[0];if(o)lift(i,o);}else riffle(i);}
 else if(sp.type==='intro')pull(i);
 else if(sp.type==='round')CHOOSERS[sp.d.choose.type].run(i);
 else if(sp.type==='finish'){S.mech[i]&&S.mech[i].done?pull(i):sp.mech.auto?sp.mech.auto(sp,i):mechTap(i);}
 else if(sp.type==='winner'){sp.wingOpen?pullCard(i):openWing(i);}});
async function copyFight(msgEl){let k=0;const parts=[];EP.spreads.forEach((s,j)=>{if(s.type==='round'){const a=ATK[S.choice[j]];parts.push(FD[s.attacker].short+(k++?' answered':' opened')+' with the '+(a?a.name:'?'));}});
 const t='UTD '+EP.title+', fight card #'+(S.serial||'')+': '+WIN.name+' beat '+LOSE.name+' by '+EP.methodText+'. In my copy, '+parts.join(' and ')+'. What did yours look like?';
 try{await navigator.clipboard.writeText(t);msgEl.textContent='Copied. Paste it in the Teams chat.';}catch(e){msgEl.textContent=t;}}
$('#copy').addEventListener('click',()=>copyFight($('#note')));$('#mcopy').addEventListener('click',()=>copyFight(document.querySelector('.mbox .note')));
$('#mclose').addEventListener('click',()=>putCardBack(SP[WI],false));$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')putCardBack(SP[WI],false);});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#modal').hidden)putCardBack(SP[WI],false);});
$('#again').addEventListener('click',()=>location.reload());
$('#snd').addEventListener('click',()=>{muted=!muted;$('#snd').textContent=muted?'Sound off':'Sound on';$('#snd').setAttribute('aria-pressed',String(!muted));if(!muted){ac();sfx.pop(0);}});
addEventListener('pointerdown',()=>{ac();},{once:true});
if(EPS.length>1){const s=document.createElement('select');s.className='btn lite';s.setAttribute('aria-label','Episode');EPS.forEach(e=>{const o=document.createElement('option');o.value='episode-'+e.id;o.textContent='Episode '+e.id;if(e===EP)o.selected=true;s.appendChild(o);});
 s.addEventListener('change',()=>{location.hash=s.value;location.reload();});$('.ctrls').appendChild(s);}
addEventListener('hashchange',()=>location.reload());

let last=performance.now();
function loop(t){const dt=Math.min(0.05,(t-last)/1000);last=t;now=t;for(let k=TICKS.length-1;k>=0;k--)if(TICKS[k](dt))TICKS.splice(k,1);
 for(let k=tw.length-1;k>=0;k--){const a=tw[k];if(now<a.s)continue;const p=Math.min(1,(now-a.s)/a.d);a.fn(p);if(p>=1){tw.splice(k,1);if(a.done)a.done();}}
 physics(dt);applyCam(dt);renderer.render(scene,cam);requestAnimationFrame(loop);}
const fonts=document.fonts?Promise.race([Promise.all([document.fonts.load('italic 700 40px Fraunces'),document.fonts.load('italic 500 40px Fraunces')]),new Promise(r=>setTimeout(r,2500))]):Promise.resolve();
fit();
Promise.all([fonts,loadArt()]).then(()=>{build();
 {const ct=drawCover();ct.repeat.set(-1,-1);coverMat[3]=CARD_MAT({map:ct,roughness:0.75});coverBoard.material=coverMat;coverBoard.userData.hit=()=>openCover();
  book.remove(SP[0].L);coverG.add(SP[0].L);coverG.rotation.z=Math.PI;target.set(0.9,0.75,0.2);viewZ=1.05;home();curT.copy(goalT);curZ=goalZ;dirGoal.copy(SIDE);camDir.copy(SIDE);}
 ui();$('#load').style.opacity=0;setTimeout(()=>$('#load').remove(),700);requestAnimationFrame(t=>{last=t;now=t;setFold(SP[0],0);loop(t);});})
 .catch(e=>{$('#load').textContent='The book got stuck. Try reloading.';console.error(e);});
}
};
})();
