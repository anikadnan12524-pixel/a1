(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  function $(i){return document.getElementById(i);}
  // 1. Seasonal market guide
  var SE=[['Blood oranges','Sweet-tart with deep crimson flesh. Slice into salads with fennel and olives, or squeeze for dressings.',['Salads','Dressings','Cakes'],'Lemons, fennel, cabbage, leeks'],
    ['Cauliflower','Roasted until deeply golden, it&#8217;s one of the best mezze dishes there is. Finish with tahini and pomegranate.',['Roasted','Fritters','Soups'],'Oranges, leeks, spinach, celery root'],
    ['Artichokes','A springtime treat. Trim, braise with lemon, garlic and olive oil, or stuff with herbs and breadcrumbs.',['Braised','Stuffed','Dips'],'Spinach, spring onions, peas, lemons'],
    ['Fava beans','Pop them from their pods, blanch and skin, then toss with mint, olive oil and a little feta.',['Salads','Dips','Pilafs'],'Asparagus, peas, artichokes, dill'],
    ['Apricots','Fragrant and juicy. Roast with honey and cardamom, or add dried apricots to pilafs and tagines.',['Desserts','Tagines','Jams'],'Cherries, zucchini, new potatoes, mint'],
    ['Zucchini','Grate into fritters with feta and dill, grill in ribbons or stuff with rice and herbs.',['Fritters','Grilled','Stuffed'],'Green beans, cucumbers, apricots, basil'],
    ['Tomatoes','At their peak. Slice thickly with olive oil, oregano and salt, or slow-roast for sauces.',['Salads','Shakshuka','Roasted'],'Eggplant, peppers, peaches, melons'],
    ['Figs','Honey-sweet and soft. Serve with labneh and pistachios, or roast with a drizzle of honey.',['Mezze','Desserts','Salads'],'Tomatoes, eggplant, grapes, corn'],
    ['Pistachios','Harvest time. Fresh-season nuts are sweet and vivid; toast them for dukkah, pilafs and sweets.',['Dukkah','Pilafs','Pastries'],'Grapes, figs, peppers, squash'],
    ['Pomegranates','Jewel-bright seeds for salads, dips and rice, and tangy molasses for dressings and glazes.',['Salads','Dips','Glazes'],'Quince, squash, apples, chard'],
    ['Quince','Fragrant and firm. Poach slowly until rosy pink, or bake with lamb or chicken and warm spices.',['Poached','Tagines','Paste'],'Pomegranates, pears, cabbage, leeks'],
    ['Clementines','Easy-peel and sweet. Add segments to salads with dates, or simmer with honey for a winter syrup.',['Salads','Syrups','Cakes'],'Pomegranates, celery root, kale, leeks']];
  var MN=['January','February','March','April','May','June','July','August','September','October','November','December'],sm=new Date().getMonth();
  function season(){if(!$('se-n'))return;var s=SE[sm];$('se-m').textContent=MN[sm];$('se-n').textContent=s[0];$('se-d').innerHTML=s[1];
    $('se-u').innerHTML=s[2].map(function(u){return '<span>'+u+'</span>';}).join('');$('se-c').textContent=(sm+1)+' / 12';
    var nx=[1,2,3].map(function(k){return (sm+k)%12;});
    $('se-also').innerHTML='<li><b>Also now:</b> '+s[3]+'</li>'+nx.map(function(k){return '<li><b>'+MN[k].slice(0,3)+':</b>'+SE[k][0]+'</li>';}).join('');}
  if($('se-p')){$('se-p').addEventListener('click',function(){sm=(sm+11)%12;season();});$('se-x').addEventListener('click',function(){sm=(sm+1)%12;season();});season();}
  // 2. Mezze planner: [name, unit, amount per person for a meal]
  var MZ={hummus:['Hummus','g',70],baba:['Baba ganoush','g',60],muhammara:['Muhammara','g',50],tzatziki:['Tzatziki','g',60],labneh:['Labneh with za’atar','g',50],
    pita:['Warm pita','pc',1.5],crackers:['Flatbread crackers','g',40],sourdough:['Grilled sourdough','slice',1.5],
    cucumber:['Cucumber','pc',0.25],tomato:['Cherry tomatoes','g',60],olives:['Olives','g',35],radish:['Radishes','g',30],herbs:['Fresh herbs','bunch',0.15],
    falafel:['Falafel','pc',4],halloumi:['Halloumi','g',60],vine:['Stuffed vine leaves','pc',3],chickpeas:['Spiced chickpeas','g',50],chicken:['Chicken skewers','skewer',1.5]};
  var GRP={d:'Dips',b:'Bread',f:'Fresh',h:'Hearty'},TIP={d:'Add a dip or two: hummus and something smoky or creamy is a good pair.',b:'Add some bread for scooping; warm pita disappears fast.',f:'Add something fresh and crunchy, like cucumber, radishes or herbs.',h:'Add a hearty dish such as falafel, halloumi or skewers to make it filling.'};
  var mzf=$('mzf'),mg=$('mz-g'),mt=$('mz-t');
  function fmt(v,u){if(u==='g'){var g=v>=1000?(Math.round(v/50)*50/1000)+' kg':(Math.ceil(v/25)*25)+' g';return g;}if(u==='bunch'){var c=Math.max(1,Math.ceil(v));return c+(c>1?' bunches':' bunch');}var x=Math.max(1,Math.ceil(v));return x+' '+(u==='pc'?'':u+(x>1?'s':''));}
  function mezze(){if(!mzf)return;var g=+mg.value,meal=mt.value==='meal',out='',cov=0,miss=[];$('mz-g-o').textContent=g;
    ['d','b','f','h'].forEach(function(k){var s=[].slice.call(mzf.querySelectorAll('input[name='+k+']:checked')).map(function(x){return x.value;});$('mz-m'+k).classList.toggle('on',s.length>0);
      if(!s.length){miss.push(k);return;}cov++;
      var share=k==='b'?1:Math.max(.45,1/s.length*1.35),scale=meal?1:(k==='h'?.4:.6);
      out+='<li class="h">'+GRP[k]+'</li>'+s.map(function(v){var it=MZ[v];return '<li><span>'+it[0]+'</span><b>'+fmt(it[2]*g*scale*Math.min(1,share),it[1])+'</b></li>';}).join('');});
    $('mz-l').innerHTML=out||'<li><span>Tick a few dishes to start planning.</span></li>';
    $('mz-s').textContent='For '+g+' guests, '+(meal?'as the whole meal':'as a starter or nibbles')+' · '+cov+' of 4 groups covered';
    $('mz-n').innerHTML=miss.length?'<b>To round it out:</b> '+TIP[miss[0]]:'<b>Nicely balanced.</b> Make the dips a day ahead and warm the bread just before everyone sits down.';}
  if(mzf){mzf.addEventListener('change',mezze);[mg,mt].forEach(function(x){x.addEventListener('input',mezze);x.addEventListener('change',mezze);});mezze();}
  // 3. Spice blend mixer: [name, parts, colour]
  var SB={zaatar:{n:'Za’atar',d:'Herby, tangy and nutty. Mix with olive oil for bread, or sprinkle over eggs, labneh and roasted vegetables.',s:[['Dried thyme',3,'#6E7F3B'],['Ground sumac',2,'#8E2F2A'],['Toasted sesame seeds',2,'#D9C08A'],['Dried oregano',1,'#4F6A35'],['Flaky salt',0.5,'#E8E2D4']],t:'Toast the sesame seeds in a dry pan until golden, and crumble the herbs between your fingers before mixing.',a:'sesame'},
    dukkah:{n:'Pistachio dukkah',d:'A crunchy Egyptian nut and spice mix. Dip bread in olive oil, then in dukkah, or scatter over salads, soups and yogurt.',s:[['Shelled pistachios',4,'#A3C46A'],['Sesame seeds',2,'#D9C08A'],['Coriander seeds',1.5,'#B4935A'],['Cumin seeds',1,'#A07035'],['Flaky salt',0.5,'#E8E2D4'],['Black pepper',0.25,'#3A3530']],t:'Toast the nuts and seeds separately, cool, then pulse briefly so it stays coarse and crunchy. Keeps 2 weeks in a jar.',a:'tree nuts (pistachios), sesame'},
    baharat:{n:'Baharat',d:'A warm all-purpose blend used across the Middle East. Rub onto chicken or lamb, or add to rice, lentils and tomato sauces.',s:[['Black pepper',2,'#3A3530'],['Ground cumin',2,'#A07035'],['Ground coriander',2,'#B4935A'],['Sweet paprika',2,'#B8553A'],['Ground cinnamon',1,'#8A5A32'],['Ground cloves',0.5,'#5A3A2A'],['Ground cardamom',0.5,'#7D8B5A'],['Ground nutmeg',0.5,'#9C6B45']],t:'Warm the blend briefly in oil at the start of cooking to wake up the flavours.',a:''},
    ras:{n:'Ras el hanout style',d:'A fragrant North African-style blend. Great in tagines, couscous, roasted carrots and squash.',s:[['Ground cumin',2,'#A07035'],['Ground ginger',2,'#D8B26A'],['Ground turmeric',1,'#E2A43A'],['Ground cinnamon',1,'#8A5A32'],['Ground coriander',1,'#B4935A'],['Black pepper',1,'#3A3530'],['Ground allspice',0.5,'#6B4A33'],['Ground cardamom',0.5,'#7D8B5A']],t:'Every family has its own version, so adjust the warm spices to taste.',a:''},
    sumac:{n:'Sumac and lemon salt',d:'A bright finishing salt. Sprinkle over grilled meat, avocado toast, salads and fried eggs.',s:[['Ground sumac',3,'#8E2F2A'],['Flaky sea salt',2,'#E8E2D4'],['Finely grated lemon zest, dried',1,'#E9C84A']],t:'Dry the lemon zest on a plate overnight, or in a very low oven for 20 minutes, before mixing.',a:''}};
  var sb=$('sb-b'),sj=$('sb-j');
  function amt(tbsp){var tsp=tbsp*3;if(tsp<0.9){var q=Math.round(tsp*4)/4;return ({0:'pinch',0.25:'¼ tsp',0.5:'½ tsp',0.75:'¾ tsp'})[q]||q+' tsp';}if(tsp<3){var r=Math.round(tsp*2)/2;if(r<3)return (r%1?Math.floor(r)+'½':r)+' tsp';}var t=Math.round(tbsp*2)/2;return (t%1?Math.floor(t)+'½':t)+' tbsp';}
  function blend(){if(!sb)return;var B=SB[sb.value],j=+sj.value,tot=B.s.reduce(function(a,x){return a+x[1];},0);
    $('sb-j-o').textContent=j+' tbsp';$('sb-t').textContent=B.n;$('sb-d').textContent=B.d;
    $('sb-bar').innerHTML=B.s.map(function(x){return '<span style="width:'+(x[1]/tot*100)+'%;background:'+x[2]+'"></span>';}).join('');
    $('sb-k').innerHTML=B.s.map(function(x){return '<span><i style="background:'+x[2]+'"></i>'+x[0]+'</span>';}).join('');
    $('sb-l').innerHTML=B.s.map(function(x){return '<li><span>'+x[0]+'</span><b>'+amt(j*x[1]/tot)+'</b></li>';}).join('');
    $('sb-n').innerHTML='<b>Tip:</b> '+B.t+(B.a?' <b>Contains:</b> '+B.a+'.':'')+(sb.value==='dukkah'?'':' Store airtight, away from heat and light, and use within about 3 months.');}
  if(sb){[sb,sj].forEach(function(x){x.addEventListener('input',blend);x.addEventListener('change',blend);});blend();}
  // contact
  var cf=$('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    if(!cf.checkValidity()){cf.reportValidity();return;}
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=$('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  var c=$('cookie'),v=null;try{v=localStorage.getItem('pg_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('pg_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=$('year');if(y)y.textContent=new Date().getFullYear();
})();
