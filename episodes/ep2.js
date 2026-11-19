/* Episode 2: Dusty Scales vs Madame Bristle. Rhyming script by Gemini, wired in as verse mode (no commentators).
   Scripted ending: Bristle wins by KO in round three (cold draft through the tent flap, then the Human Cannonball). */
UTD.episode({
 id:'2',title:'Season 2, Episode 2',cardTitle:'Ultimate Teams Deathmatch · Season 2 · Episode 2 · Whiskers Versus Scales',
 fighters:['dusty','bristle'],
 winner:'bristle',loserCond:'cold',method:'KO · Round three',methodText:'KO in round three',
 signs:{A:[[70,'SCALES!','#a1551f'],[230,'HONK IF BEARDED','#a8326e']],C:[[150,'BEARD POWER','#a8326e']],
  A2:[[80,'BRISTLE!','#a8326e'],[220,'FRILL ME','#a1551f']],C2:[[150,'SAWDUST OR BUST','#c0392b']]},
 verse:{
  dusty:{intro:'Meet Dusty Scales from ninety-four,\nA scaly lizard on the floor.\nHe hates the chill, he loves a crunch,\nAnd eats live beetles for his lunch.',fired:['He puffs his throat and opens wide,','Four crunchy crickets slide inside.']},
  bristle:{intro:'Now Madame Bristle, eighty-six,\nHas braided whiskers, iron tricks.\nShe swings a heavy kettlebell,\nAnd smells of chalk and circus hell.',fired:['She dusts her palms in clouds of white,','And flexes muscles, grim and tight.']},
  windup:{
   tail:['Dusty spins and whips his tail,','Kicking up a gritty gale.'],
   cricket:['He grabs a locust, fat and green,','And chucks it hard across the scene.'],
   bob:['He bobs his head and drops his chin,','Then charges fast to take the win.'],
   whisker:['She swings her braided beard around,','It whistles with a wicked sound.'],
   armswing:['She grabs her own detached right hand,','The strangest club in all the land.'],
   clap:['She claps him with her giant palm,','Against her hip, completely calm.']},
  finisher:{
   a:['She lifts the icy lizard high,','His frightened tail falls from the sky.'],
   b:['She stuffs him in the cannon\'s snout,','And lights the fuse without a doubt.'],
   c:['KABOOM! He blasts across the air,','And splatters in a row F chair!']}
 },
 spreads:[
  {type:'title',arena:{type:'bigTop'},bg:['#f2c94c','#6b2433'],banner:['Whiskers vs Scales','a big top brawl'],
   story:'Step right up to the rotting tent,\nWhere all your pocket change gets spent.\nTwo bearded freaks will bleed and brawl,\nWith red confetti for us all!',sub:[],talk:[]},
  {type:'intro',fighter:'dusty',bg:['#f6dfae','#f2b872']},
  {type:'intro',fighter:'bristle',bg:['#f5d0dc','#3d2a5c']},
  {type:'round',attacker:'dusty',defender:'bristle',injury:'armR',bg:['#6b2433','#6b2433'],
   arena:{type:'bigTop',size:'spread',towers:true},choose:{type:'tabs',options:['tail','cricket','bob'],sub:'Pull a tab along the bottom edge to pick his attack.'},spring:'dusty',
   story:'The bell goes ding, the crowd goes mad,\nRound one begins, and things look bad.',
   texts:{tail:'Her kettlebell arm pops right off,\nRed confetti makes them cough!',
    cricket:'It chews her right arm clean away,\nConfetti showers down today!',
    bob:'Her right arm rips off at the joint,\nConfetti proves he made his point!'}},
  {type:'round',attacker:'bristle',defender:'dusty',injury:'armR',bg:['#6b2433','#6b2433'],
   arena:{type:'bigTop',size:'spread',towers:true},choose:{type:'dial',options:['whisker','armswing','clap'],sub:'Turn the dial to pick her comeback, then pull the lever.'},
   story:'She\'s down one arm, she\'s feeling sore,\nNow Bristle wants his claw, and more.',
   texts:{whisker:'His right claw arm goes flying high,\nRed confetti fills the sky!',
    armswing:'She bats his right claw arm away,\nConfetti rains on the display!',
    clap:'His right claw snaps off with a pop,\nConfetti paints the circus top!'}},
  {type:'finish',attacker:'bristle',defender:'dusty',injury:'tail',bg:['#efe2c4','#6b2433'],arena:{type:'bigTop',size:'page'},
   mechanism:{type:'tentFlap',secs:3.4,labels:['','A chilly draft creeps through the seam.','He shivers hard and starts to scream.','The Arctic blast destroys his dream!']},finisher:'cannon',
   story:'A freezing wind howls past the tent,\nThe lizard\'s warmth is nearly spent.',
   texts:{start:[],progress:[],
    done:['He\'s frozen stiff, a lizard pop,\nNow pull the tab to make him drop!'],ko:['KABOOM! He blasts across the air,\nAnd splatters in a row F chair!']},
   talk:{start:[],progress:['{v}'],done:['The Arctic blast destroys his dream!'],ko:[],notYet:['The flap slams shut, he thaws too soon!']},
   card:['Two limbs, one tail, confetti red,','The bearded lady wins instead.']},
  {type:'winner',bg:['#a8326e','#38b6c2'],story:'With one good arm, she takes a bow,\nThe circus crowd is cheering now.\nThey sweep the limbs into a bin,\nAnd wait for showtime to begin.',talk:[]}
 ]
});
