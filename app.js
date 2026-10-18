const SITE = {
  updated: '5 oktober 2026',
  title: 'Kim & Dennis in Londen',
  hotel: 'Leonardo Hotel London Croydon',
};

const commonsImg = (file, width=1400) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=${width}`;
const commonsPage = file => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file).replace(/%20/g,'_')}`;
const maps = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const spots = {
  buckingham: {
    slug:'buckingham', name:'Buckingham Palace', day:1, emoji:'👑',
    photo:'Buckingham Palace from gardens, London, UK - Diliff (cropped).jpg',
    credit:'Foto: Diliff / Wikimedia Commons',
    lat:51.5014, lng:-0.1419,
    summary:'De officiële Londense residentie van de Britse monarch en hét herkenningspunt van koninklijk Londen.',
    why:'Mooi startpunt voor de eerste dag. Vanaf Victoria loop je er in ongeveer een kwartier naartoe en daarna wandel je logisch verder door St James’s Park richting Westminster.',
    practical:'Eind oktober zijn de State Rooms normaal gesproken niet regulier geopend. Voor jullie route is het paleis daarom vooral een buitenstop en fotomoment.',
    time:'30–45 min', cost:'Buitenzijde gratis', nearest:'Victoria / Green Park',
    official:'https://www.rct.uk/visit/buckingham-palace',
    mapQuery:'Buckingham Palace, London'
  },
  stjames: {
    slug:'stjames', name:'St James’s Park', day:1, emoji:'🌳',
    photo:"St James's Park Lake, St James's Park, Westminster - geograph.org.uk - 7399634.jpg",
    credit:'Foto: Bryn Holmes / Geograph / Wikimedia Commons',
    lat:51.5022, lng:-0.1352,
    summary:'Een groen lint tussen Buckingham Palace, The Mall en Westminster, met vijver, watervogels en zichtlijnen op Londen.',
    why:'Dit is niet alleen een parkstop, maar ook de prettigste wandelverbinding van Buckingham Palace naar Westminster.',
    practical:'Reken ongeveer 20–30 minuten voor een ontspannen wandeling. Bij slecht weer kun je The Mall/Whitehall als snellere route nemen.',
    time:'20–35 min', cost:'Gratis', nearest:'St James’s Park / Green Park',
    official:'https://www.royalparks.org.uk/visit/parks/st-jamess-park',
    mapQuery:"St James's Park London"
  },
  abbey: {
    slug:'abbey', name:'Westminster Abbey', day:1, emoji:'⛪',
    photo:'Westminster Abbey, west facade, August 2014.jpg',
    credit:'Foto: Wikimedia Commons',
    lat:51.4993, lng:-0.1273,
    summary:'Gotische abdijkerk waar Britse vorsten worden gekroond en waar een groot deel van de Britse geschiedenis tastbaar samenkomt.',
    why:'Een van de inhoudelijk rijkste historische gebouwen in het centrum. Zeker de moeite waard als jullie één grote kerk van binnen willen bezoeken.',
    practical:'Voor een interieurbezoek is vooraf reserveren verstandig. Alleen van buiten bekijken past ook prima in de wandelroute.',
    time:'20 min buiten / 1,5–2 uur binnen', cost:'Buiten gratis · entree binnen', nearest:'Westminster',
    official:'https://www.westminster-abbey.org/visit-us', mapQuery:'Westminster Abbey London'
  },
  bigben: {
    slug:'bigben', name:'Big Ben & Palace of Westminster', day:1, emoji:'🕰️',
    photo:'Big Ben at sunset - 2014-10-27 17-30.jpg', credit:'Foto: Wikimedia Commons',
    lat:51.5007, lng:-0.1246,
    summary:'De Elizabeth Tower met de beroemde klok Big Ben en het parlementsgebouw aan de Thames.',
    why:'Dit is het klassieke Londense beeld. De beste combinatie van uitzichtpunten ligt rond Parliament Square en Westminster Bridge.',
    practical:'Loop Westminster Bridge een stukje op voor foto’s van Big Ben en het Parliament met de Thames op de voorgrond.',
    time:'30–45 min', cost:'Buitenzijde gratis', nearest:'Westminster',
    official:'https://www.parliament.uk/visiting/', mapQuery:'Big Ben London'
  },
  londoneye: {
    slug:'londoneye', name:'London Eye', day:1, emoji:'🎡',
    photo:'London-Eye-2009.JPG', credit:'Foto: Wikimedia Commons',
    lat:51.5033, lng:-0.1195,
    summary:'Het grote reuzenrad aan de South Bank met een breed uitzicht over Westminster en centraal Londen.',
    why:'Voor een eerste bezoek aan Londen is het uitzicht erg effectief: je ziet in korte tijd hoe de stad ruimtelijk in elkaar zit.',
    practical:'De rit zelf duurt ongeveer een half uur. Reserveer vooraf als jullie op een specifiek tijdstip willen gaan; in half-term kan het drukker zijn.',
    time:'45–75 min incl. wachtrij', cost:'Betaalde attractie', nearest:'Waterloo / Westminster',
    official:'https://www.londoneye.com/', mapQuery:'London Eye'
  },
  trafalgar: {
    slug:'trafalgar', name:'Trafalgar Square', day:1, emoji:'🦁',
    photo:'Trafalgar Square, London 2 - Jun 2009.jpg', credit:'Foto: Wikimedia Commons',
    lat:51.5080, lng:-0.1281,
    summary:'Monumentaal plein met Nelson’s Column, fonteinen en de National Gallery.',
    why:'Logische tussenstop op de wandeling van Westminster naar Covent Garden en het West End.',
    practical:'Als jullie kunst leuk vinden, ligt de National Gallery direct aan het plein en is de vaste collectie gratis toegankelijk.',
    time:'20–40 min', cost:'Plein gratis', nearest:'Charing Cross',
    official:'https://www.london.gov.uk/programmes-strategies/arts-and-culture/trafalgar-square', mapQuery:'Trafalgar Square London'
  },
  covent: {
    slug:'covent', name:'Covent Garden', day:1, emoji:'🎭',
    photo:'Covent Garden 7277.jpg', credit:'Foto: ClemRutter / Wikimedia Commons',
    lat:51.5117, lng:-0.1240,
    summary:'Historische markthallen, winkels, horeca, straatartiesten en theaters in een compact voetgangersgebied.',
    why:'Een fijne plek voor de late middag: sfeer, eten en rondkijken zonder dat je nog een vaste attractie hoeft af te werken.',
    practical:'Combineer met Seven Dials, Leicester Square of Chinatown. De afstanden zijn klein.',
    time:'1–2 uur', cost:'Gratis rondlopen', nearest:'Covent Garden / Leicester Square',
    official:'https://www.coventgarden.london/', mapQuery:'Covent Garden London'
  },
  chinatown: {
    slug:'chinatown', name:'Chinatown', day:1, emoji:'🏮',
    photo:'Chinatown, London.jpg', credit:'Foto: Aurelien Guichard / Wikimedia Commons',
    lat:51.5113, lng:-0.1302,
    summary:'Compacte wijk rond Gerrard Street met Chinese poorten, restaurants, bakkerijen en avondverlichting.',
    why:'Ligt precies tussen Leicester Square, Soho en Piccadilly. Daardoor kost het vrijwel geen extra reistijd om mee te pakken.',
    practical:'Vooral in de avond sfeervol. Goed moment voor diner als jullie na Covent Garden richting Piccadilly lopen.',
    time:'30–90 min', cost:'Gratis rondlopen', nearest:'Leicester Square',
    official:'https://chinatown.co.uk/', mapQuery:'Chinatown London Gerrard Street'
  },
  piccadilly: {
    slug:'piccadilly', name:'Piccadilly Circus', day:1, emoji:'✨',
    photo:'Piccadilly Circus London.jpg', credit:'Foto: Wikimedia Commons',
    lat:51.5101, lng:-0.1340,
    summary:'Bekend kruispunt in het West End met lichtreclames, Eros-fontein en directe aansluiting op Regent Street en Soho.',
    why:'Een leuke afsluiter van dag 1, vooral wanneer het donker is en de schermen en gevelverlichting sterker uitkomen.',
    practical:'Van hier kun je gemakkelijk terug via Victoria of nog doorlopen naar Soho.',
    time:'20–40 min', cost:'Gratis', nearest:'Piccadilly Circus',
    official:'https://www.visitlondon.com/things-to-do/place/281625-piccadilly-circus', mapQuery:'Piccadilly Circus London'
  },
  towerbridge: {
    slug:'towerbridge', name:'Tower Bridge', day:2, emoji:'🌉',
    photo:'Tower Bridge,London Getting Opened 5.jpg', credit:'Foto: Wikimedia Commons',
    lat:51.5055, lng:-0.0754,
    summary:'Iconische basculebrug over de Thames, met torens, hoge loopbruggen en glazen vloer.',
    why:'Een van de sterkste fotolocaties van Londen en een mooi beginpunt van dag 2 vanuit London Bridge.',
    practical:'De brug zelf oversteken is gratis. Voor de tentoonstelling, machinekamers en glazen vloer heb je een ticket nodig.',
    time:'30 min buiten / 60–90 min bezoek', cost:'Oversteken gratis · tentoonstelling betaald', nearest:'London Bridge / Tower Hill',
    official:'https://www.towerbridge.org.uk/', mapQuery:'Tower Bridge London'
  },
  tower: {
    slug:'tower', name:'Tower of London', day:2, emoji:'🏰',
    photo:'Exterior of Tower of London.jpg', credit:'Foto: Wikimedia Commons',
    lat:51.5081, lng:-0.0759,
    summary:'Middeleeuws fort, paleis en gevangeniscomplex met de Crown Jewels en de White Tower.',
    why:'Dit is de grote inhoudelijke attractie van dag 2. De combinatie van gebouw, verhalen en kroonjuwelen maakt het veel meer dan alleen een fotostop.',
    practical:'Reserveer 2–3 uur. Ga indien mogelijk vroeg; de Crown Jewels worden later op de dag vaak drukker.',
    time:'2–3 uur', cost:'Betaalde attractie', nearest:'Tower Hill',
    official:'https://www.hrp.org.uk/tower-of-london/', mapQuery:'Tower of London'
  },
  borough: {
    slug:'borough', name:'Borough Market', day:2, emoji:'🍴',
    photo:'Borough Market (4701274756).jpg', credit:'Foto: Wikimedia Commons',
    lat:51.5055, lng:-0.0910,
    summary:'Historische foodmarket onder en rond de spoorbogen bij London Bridge.',
    why:'Perfect lunchpunt tussen de Tower-zone en de wandeling langs de South Bank naar Tate Modern.',
    practical:'Ga met trek, maar verwacht op populaire tijden drukte. Veel eten is eenvoudig mee te nemen.',
    time:'45–75 min', cost:'Gratis entree · eten naar keuze', nearest:'London Bridge',
    official:'https://boroughmarket.org.uk/', mapQuery:'Borough Market London'
  },
  shard: {
    slug:'shard', name:'The Shard', day:2, emoji:'🏙️',
    photo:"'The Shard' from River Thames London England.jpg", credit:'Foto: Wikimedia Commons',
    lat:51.5045, lng:-0.0865,
    summary:'De 309,6 meter hoge glazen wolkenkrabber naast London Bridge, ontworpen door Renzo Piano.',
    why:'De toren is voortdurend zichtbaar tijdens dag 2 en is een handig oriëntatiepunt. De betaalde uitzichtverdieping is optioneel.',
    practical:'Omdat jullie al veel uitzichtpunten zien, zou ik de View from The Shard alleen boeken als hoog uitzicht een prioriteit is.',
    time:'10–20 min buiten / 1 uur uitzicht', cost:'Buiten gratis · uitzicht betaald', nearest:'London Bridge',
    official:'https://www.theviewfromtheshard.com/', mapQuery:'The Shard London'
  },
  tate: {
    slug:'tate', name:'Tate Modern', day:2, emoji:'🎨',
    photo:'Tate Modern - Bankside Power Station.jpg', credit:'Foto: Wikimedia Commons',
    lat:51.5076, lng:-0.0994,
    summary:'Museum voor moderne en hedendaagse kunst in de voormalige Bankside Power Station.',
    why:'Ligt precies op jullie wandelroute langs de Thames en is daardoor makkelijk kort of langer in te passen.',
    practical:'De vaste collectie is gratis; tijdelijke tentoonstellingen kunnen betaald zijn. Ook het gebouw zelf is de moeite waard.',
    time:'30 min–2 uur', cost:'Vaste collectie gratis', nearest:'Southwark / Blackfriars',
    official:'https://www.tate.org.uk/visit/tate-modern', mapQuery:'Tate Modern London'
  },
  millennium: {
    slug:'millennium', name:'Millennium Bridge', day:2, emoji:'🌁',
    photo:'Millennium Bridge in London.jpg', credit:'Foto: Dmarcovitz / Wikimedia Commons (CC0)',
    lat:51.5095, lng:-0.0983,
    summary:'Voetgangersbrug tussen Tate Modern en St Paul’s Cathedral met een sterke zichtas op de koepel.',
    why:'Dit is de mooiste natuurlijke overgang van de South Bank naar de City en levert goede foto’s op.',
    practical:'Neem op de brug even tijd om terug te kijken naar Tate Modern en vooruit naar St Paul’s.',
    time:'15–25 min', cost:'Gratis', nearest:'Blackfriars / St Paul’s',
    official:'https://www.citybridgefoundation.org.uk/our-bridges/millennium-bridge', mapQuery:'Millennium Bridge London'
  },
  stpauls: {
    slug:'stpauls', name:'St Paul’s Cathedral', day:2, emoji:'⛪',
    photo:'St Pauls Cathedral from West adj.JPG', credit:'Foto: Wikimedia Commons',
    lat:51.5138, lng:-0.0984,
    summary:'Barokke kathedraal van Christopher Wren met een van de beroemdste koepels van Londen.',
    why:'Mooie afsluiting van de historische City-route en visueel sterk na de wandeling over Millennium Bridge.',
    practical:'Een interieurbezoek kost meer tijd. Voor dag 2 zou ik afhankelijk van energie kiezen tussen uitgebreid St Paul’s of eerder terug naar het hotel.',
    time:'30 min buiten / 1,5 uur binnen', cost:'Buiten gratis · interieur betaald', nearest:'St Paul’s',
    official:'https://www.stpauls.co.uk/', mapQuery:"St Paul's Cathedral London"
  },
  museum: {
    slug:'museum', name:'British Museum', day:3, emoji:'🏛️',
    photo:'British Museum from NE 2.JPG', credit:'Foto: Ham / Wikimedia Commons',
    lat:51.5194, lng:-0.1270,
    summary:'Wereldmuseum met onder meer de Rosetta Stone, Egyptische collectie, Griekse sculpturen en Mesopotamische topstukken.',
    why:'Voor jullie derde dag een inhoudelijke ochtendstop voordat je naar het lossere Camden en West End gaat.',
    practical:'Probeer niet alles te zien. Kies 4–5 zalen of hoogtepunten. De hoofdcollectie is gratis; een gratis tijdslot kan handig zijn.',
    time:'2–2,5 uur', cost:'Hoofdcollectie gratis', nearest:'Tottenham Court Road / Holborn',
    official:'https://www.britishmuseum.org/visit', mapQuery:'British Museum London'
  },
  camden: {
    slug:'camden', name:'Camden Market', day:3, emoji:'🎪',
    photo:'Camden Town Streetcorner -- 2015 -- London, UK.jpg', credit:'Foto: Wikimedia Commons',
    lat:51.5413, lng:-0.1468,
    summary:'Alternatieve wijk en markt rond Camden Lock met streetfood, muziek, vintage, winkels en uitgesproken gevels.',
    why:'Bewuste sfeerwisseling na twee dagen klassiek en historisch Londen.',
    practical:'Lunch hier is logisch. Loop naast de hoofdstraat ook langs Camden Lock en de kanaalzone.',
    time:'2–3 uur', cost:'Gratis rondlopen', nearest:'Camden Town',
    official:'https://camdenmarket.com/', mapQuery:'Camden Market London'
  },
  oxford: {
    slug:'oxford', name:'Oxford & Regent Street', day:3, emoji:'🛍️',
    photo:'Regent Street-London.jpg', credit:'Foto: Yair Haklai / Wikimedia Commons',
    lat:51.5152, lng:-0.1419,
    summary:'De bekendste winkelas van het West End, met Oxford Circus als kruispunt en de elegante bocht van Regent Street richting Piccadilly.',
    why:'Makkelijk te combineren met Soho, Carnaby Street en de avond in het West End.',
    practical:'Zie dit vooral als wandelroute en sfeerstop; plan alleen echte shoptijd als jullie dat leuk vinden.',
    time:'45–90 min', cost:'Gratis rondlopen', nearest:'Oxford Circus',
    official:'https://www.visitlondon.com/things-to-do/place/5041693-oxford-street', mapQuery:'Oxford Circus London'
  }
};

const days = {
  1: {
    title:'Koninklijk Londen & West End', subtitle:'Buckingham Palace · Westminster · South Bank · Covent Garden',
    start:'East Croydon → London Victoria', color:'#b33a3a',
    photo:spots.buckingham.photo,
    intro:'De klassieke eerste kennismaking. Na de trein naar Victoria blijft vrijwel de hele dag een logische wandelroute door Westminster en het West End.',
    schedule:[
      ['08:30','Hotel → East Croydon','Loop vanaf Leonardo Hotel naar East Croydon.'],
      ['09:00','Trein naar London Victoria','Rechtstreekse National Rail-trein; doorgaans ongeveer 16–18 minuten.'],
      ['09:30','Buckingham Palace','Buitenzijde, Victoria Memorial en The Mall.','buckingham'],
      ['10:15','St James’s Park','Wandel via het park richting Westminster.','stjames'],
      ['11:00','Westminster Abbey','Van buiten of uitgebreid van binnen.','abbey'],
      ['12:00','Big Ben & Parliament','Parliament Square en Westminster Bridge.','bigben'],
      ['12:45','Lunch aan de South Bank','Steek de Thames over en zoek iets rond South Bank.'],
      ['14:00','London Eye','Optioneel geboekt tijdslot; rit ±30 minuten.','londoneye'],
      ['15:15','Whitehall → Trafalgar Square','Loop via Whitehall terug richting West End.','trafalgar'],
      ['16:15','Covent Garden','Markthallen, straatartiesten en rondkijken.','covent'],
      ['18:00','Chinatown','Diner of korte wandeling via Gerrard Street.','chinatown'],
      ['19:15','Piccadilly Circus / Soho','Avondsfeer en daarna terug richting Victoria.','piccadilly']
    ],
    tips:['Reserveer London Eye vooraf als jullie een specifiek tijdslot willen.','Draag goede schoenen: dit is vooral een wandeldag.','Na Piccadilly kun je met de Victoria Line vanaf Green Park/Oxford Circus richting Victoria en daar de trein naar East Croydon nemen.']
  },
  2: {
    title:'Tower, Thames & de City', subtitle:'Tower Bridge · Tower of London · Borough Market · St Paul’s',
    start:'East Croydon → London Bridge', color:'#2f7667', photo:spots.towerbridge.photo,
    intro:'Historisch Londen aan de oostkant van het centrum. Veel bezienswaardigheden liggen direct langs de Thames, zodat metrogebruik beperkt blijft.',
    schedule:[
      ['08:30','Hotel → East Croydon','Loop naar het station.'],
      ['09:00','Trein naar London Bridge','Rechtstreeks waar mogelijk; controleer die ochtend de actuele vertrekborden.'],
      ['09:30','Tower Bridge','Loop langs de rivier naar de brug.','towerbridge'],
      ['10:30','Tower of London','Groot bezoek van ongeveer 2–3 uur.','tower'],
      ['13:30','Borough Market','Lunch en rondkijken.','borough'],
      ['14:45','The Shard','Fotostop; uitzichtplatform alleen als jullie dit echt willen.','shard'],
      ['15:15','South Bank naar Tate Modern','Wandel westwaarts langs de Thames.','tate'],
      ['16:15','Millennium Bridge','Steek te voet over richting de City.','millennium'],
      ['16:40','St Paul’s Cathedral','Buitenzijde of interieur afhankelijk van tijd en energie.','stpauls'],
      ['18:00','Terug naar Croydon','Via Blackfriars, London Bridge of Victoria, afhankelijk van de beste verbinding.']
    ],
    tips:['Tower of London is de prioriteit van deze dag; plan daar niet te krap.','Borough Market is ideaal als lunchstop en ligt direct op de route.','The Shard hoeft niet als betaalde attractie: de skyline zie je de hele dag al goed.']
  },
  3: {
    title:'Museum, Camden & West End', subtitle:'British Museum · Camden Market · Oxford Street · Soho',
    start:'East Croydon → centraal Londen', color:'#7a5aa6', photo:spots.camden.photo,
    intro:'Een lossere derde dag: eerst een sterk museum, daarna Camden en tot slot winkels, straten en avondleven in het West End.',
    schedule:[
      ['09:00','East Croydon → centrum','Reis richting Victoria/Blackfriars en verder naar Tottenham Court Road of Holborn.'],
      ['10:00','British Museum','Kies hoogtepunten in plaats van alles te willen zien.','museum'],
      ['12:30','Naar Camden Town','Northern Line richting Camden Town.'],
      ['13:00','Camden Market','Lunch, Camden Lock en markten.','camden'],
      ['15:30','Terug richting Oxford Circus','Underground naar het West End.'],
      ['16:00','Oxford & Regent Street','Wandelen, winkelen en eventueel Carnaby Street.','oxford'],
      ['18:00','Soho / Chinatown','Kies spontaan waar jullie willen eten.','chinatown'],
      ['19:30','Covent Garden of Piccadilly','Herhaal de plek die jullie op dag 1 het leukst vonden, of kies een musical.','piccadilly']
    ],
    tips:['British Museum: 2–2,5 uur is voor een eerste bezoek prettiger dan een hele dag.','Camden is vooral sfeer; laat ruimte om rond te dwalen.','Dag 3 is bewust flexibel zodat jullie kunnen terugkeren naar favorieten.']
  }
};

const allSpots = Object.values(spots);
let mapInstance = null;
let activeFilter = 'all';

function esc(str=''){return String(str).replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[s]));}
function photo(file){return commonsImg(file,1400)}
function dayLabel(n){return n ? `Dag ${n}` : 'Extra'}
function openExternal(url,label='Open link'){ return `<a class="btn btn-soft btn-small" href="${url}" target="_blank" rel="noopener">${label} ↗</a>`; }
function spotBtn(slug,label='Meer info'){return `<a class="btn btn-soft btn-small" href="#spot=${slug}">${label} →</a>`}
function visitedKey(slug){return `kd-london-visited-${slug}`}
function isVisited(slug){return localStorage.getItem(visitedKey(slug)) === '1'}

function hero(){
  return `<section class="hero">
    <img class="hero-bg" src="${photo(spots.buckingham.photo)}" alt="Buckingham Palace in Londen">
    <div class="hero-inner">
      <div class="eyebrow">Onze stedentrip · eind oktober 2026</div>
      <h1>Kim & Dennis<br>in Londen</h1>
      <p>Drie dagen sightseeing vanuit Croydon, met slimme routes, bezienswaardigheden, OV-uitleg, betaalinformatie en een interactieve kaart.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#dag1">Start met dag 1 →</a>
        <a class="btn btn-secondary" href="#kaart">Bekijk de kaart</a>
        <a class="btn btn-secondary" href="#planner">📍 OV-route plannen</a>
      </div>
    </div>
  </section>`;
}

function renderHome(){
  const done = allSpots.filter(s=>isVisited(s.slug)).length;
  return `${hero()}
  <section class="section"><div class="shell">
    <div class="section-title"><div><div class="kicker">Snel naar</div><h2>Alles voor onderweg</h2></div><p>De website is gemaakt voor mobiel gebruik. Je kunt bezienswaardigheden afvinken; die status blijft op dit apparaat bewaard.</p></div>
    <div class="quick-grid">
      <a class="quick-card" href="#aankomst"><div class="emoji">✈️</div><h3>Aankomst & hotel</h3><p>Stansted → Croydon en hotel → centrum.</p></a>
      <a class="quick-card" href="#kaart"><div class="emoji">🗺️</div><h3>Interactieve kaart</h3><p>Alle stops per dag op een interactieve kaart.</p></a>
      <a class="quick-card" href="#ov"><div class="emoji">🚆</div><h3>OV vanuit Croydon</h3><p>Trein, Underground en contactloos reizen.</p></a>
      <a class="quick-card" href="#betalen"><div class="emoji">💳</div><h3>Betalen in Londen</h3><p>Ponden, kaarten, contactloos en betaalkeuzes.</p></a>
    </div>
  </div></section>
  <section class="section tight"><div class="shell">
    <div class="section-title"><div><div class="kicker">Programma</div><h2>Drie dagen, drie gebieden</h2></div><div class="progress-wrap"><div class="progress"><span style="width:${Math.round(done/allSpots.length*100)}%"></span></div><span class="progress-label">${done}/${allSpots.length} bezocht</span></div></div>
    <div class="day-grid">${[1,2,3].map(n=>dayCard(n)).join('')}</div>
  </div></section>
  <section class="section"><div class="shell">
    <div class="info-strip"><div><h3>Waarom Croydon handig is</h3><p>East Croydon ligt in zone 5 en heeft zeer frequente National Rail-verbindingen. Naar London Victoria duurt de snelste rechtstreekse trein ongeveer 16–18 minuten. Voor Tower Bridge en Borough Market is London Bridge vaak de logischste toegang.</p></div><div class="info-list"><div class="info-line">🚆 <strong>Westminster / West End:</strong> trein naar Victoria</div><div class="info-line">🌉 <strong>Tower / City:</strong> trein naar London Bridge</div><div class="info-line">💳 <strong>Betalen:</strong> contactloos met dezelfde kaart of hetzelfde apparaat</div></div></div>
  </div></section>`;
}

function dayCard(n){const d=days[n];return `<article class="day-card"><img class="day-photo" src="${photo(d.photo)}" alt="${esc(d.title)}"><div class="day-body"><span class="day-pill">Dag ${n}</span><h3>${d.title}</h3><p>${d.subtitle}</p><div class="meta-row"><span class="meta-chip">🚆 ${d.start}</span><span class="meta-chip">🚶 Veel te voet</span></div><a class="btn btn-dark" href="#dag${n}">Bekijk dag ${n} →</a></div></article>`}

function renderDay(n){
  const d=days[n];
  const route = d.schedule.filter(x=>x[3]).map(x=>spots[x[3]].name);
  return `<section class="page-head"><div class="shell"><div class="breadcrumb"><a href="#home">Home</a> / Dag ${n}</div><div class="kicker">Dag ${n}</div><h1>${d.title}</h1><p>${d.intro}</p><div class="route-summary">${route.map(x=>`<span class="route-stop">${x}</span>`).join('')}</div></div></section>
  <section class="section"><div class="shell two-col"><div><div class="section-title"><div><div class="kicker">Planning</div><h2>Van ochtend tot avond</h2></div></div><div class="timeline">${d.schedule.map(row=>timelineRow(row)).join('')}</div></div><aside><div class="panel"><h3>Dag ${n} in één oogopslag</h3><p><strong>Start:</strong> ${d.start}</p><p><strong>Karakter:</strong> ${d.subtitle}</p><a class="btn btn-dark" href="#kaart">Open dag ${n} op kaart</a></div><div class="panel" style="margin-top:16px"><h3>Tips</h3><ul>${d.tips.map(t=>`<li>${t}</li>`).join('')}</ul></div><div class="callout green" style="margin-top:16px"><strong>Handig:</strong> vink stops af wanneer jullie er geweest zijn. De vinkjes blijven lokaal op jullie telefoon bewaard.</div></aside></div></section>`;
}
function timelineRow(row){const [time,title,desc,slug]=row; const s=slug?spots[slug]:null;return `<div class="time-item"><time>${time}</time><h3>${title}</h3><p>${desc}</p>${s?`<div class="mini-actions">${spotBtn(slug)}<button class="check-btn ${isVisited(slug)?'done':''}" data-check="${slug}">${isVisited(slug)?'✓ Bezocht':'○ Afvinken'}</button></div>`:''}</div>`}

function renderArrival(){return `<section class="page-head"><div class="shell"><div class="breadcrumb"><a href="#home">Home</a> / Aankomst</div><div class="kicker">Van vliegtuig naar hotel</div><h1>Aankomst & Croydon</h1><p>Een praktisch stappenplan van London Stansted naar Leonardo Hotel London Croydon, plus de vaste route naar het centrum.</p></div></section>
<section class="section"><div class="shell"><div class="section-title"><div><div class="kicker">Heenreis</div><h2>Stansted → Leonardo Croydon</h2></div><p>De route met frequente verbindingen en eenvoudige overstappen.</p></div><div class="steps">
<div class="step"><h3>Stansted Airport → Tottenham Hale</h3><p>Volg de borden naar het treinstation onder de luchthaven. Neem de Stansted Express richting London Liverpool Street en stap uit bij Tottenham Hale.</p></div>
<div class="step"><h3>Tottenham Hale → Victoria</h3><p>Stap over op de <strong>Victoria Line</strong> van de Underground richting Brixton. Uitstappen bij Victoria.</p></div>
<div class="step"><h3>Victoria → East Croydon</h3><p>Ga naar National Rail en neem een Southern-trein naar East Croydon. De snelle rit duurt vaak ongeveer 16–18 minuten.</p></div>
<div class="step"><h3>East Croydon → hotel</h3><p>Vanaf het station is het nog ongeveer vijf minuten lopen naar Leonardo Hotel London Croydon aan Wellesley Road.</p></div>
</div>
<div class="two-col" style="margin-top:26px"><div class="panel"><h3>Elke ochtend naar Londen</h3><p><strong>Naar Westminster / Buckingham / West End:</strong><br>East Croydon → London Victoria.</p><p><strong>Naar Tower Bridge / Borough Market / City:</strong><br>East Croydon → London Bridge.</p><a class="btn btn-dark" href="#ov">Lees de OV-uitleg</a></div><div class="callout"><strong>Belangrijk:</strong> East Croydon is een National Rail-station, geen Underground-station. Je gebruikt dus eerst de gewone trein en stapt in het centrum eventueel over op de Tube.</div></div></div></section>`}

function renderSpots(){
  return `<section class="page-head"><div class="shell"><div class="breadcrumb"><a href="#home">Home</a> / Bezienswaardigheden</div><div class="kicker">Ontdekken</div><h1>Bezienswaardigheden</h1><p>Foto, achtergrond, bezoektijd, praktische tips en een knop naar de locatie. Filter op dag of zoek op naam.</p></div></section>
  <section class="section"><div class="shell"><div class="filterbar"><input id="spotSearch" type="search" placeholder="Zoek bijvoorbeeld Tower, museum of markt…" aria-label="Zoek bezienswaardigheid"><button class="filter-btn active" data-filter="all">Alles</button><button class="filter-btn" data-filter="1">Dag 1</button><button class="filter-btn" data-filter="2">Dag 2</button><button class="filter-btn" data-filter="3">Dag 3</button></div><div class="cards-grid" id="spotGrid">${allSpots.map(spotCard).join('')}</div></div></section>`;
}
function spotCard(s){return `<article class="spot-card" data-day="${s.day}" data-name="${esc(s.name.toLowerCase())}"><img loading="lazy" src="${photo(s.photo)}" alt="${esc(s.name)}"><div class="spot-card-body"><div class="kicker"><span class="day-dot d${s.day}"></span>${dayLabel(s.day)}</div><h3>${s.name}</h3><p>${s.summary}</p><div class="spot-actions">${spotBtn(s.slug)}<button class="check-btn ${isVisited(s.slug)?'done':''}" data-check="${s.slug}">${isVisited(s.slug)?'✓ Bezocht':'○ Afvinken'}</button></div></div></article>`}

function renderSpot(slug){const s=spots[slug]; if(!s) return render404();return `<section class="spot-hero"><img src="${photo(s.photo)}" alt="${esc(s.name)}"><div class="spot-hero-inner"><div class="kicker">${dayLabel(s.day)}</div><h1>${s.name}</h1><p>${s.summary}</p><div class="hero-actions"><a class="btn btn-primary" href="#planner=${s.slug}">Plan OV-route hiernaartoe →</a><button class="btn btn-secondary check-btn ${isVisited(s.slug)?'done':''}" data-check="${s.slug}">${isVisited(s.slug)?'✓ Bezocht':'○ Afvinken'}</button></div></div></section>
<section class="section"><div class="shell"><div class="fact-grid"><div class="fact"><small>Bezoektijd</small><strong>${s.time}</strong></div><div class="fact"><small>Kosten</small><strong>${s.cost}</strong></div><div class="fact"><small>Dichtstbij</small><strong>${s.nearest}</strong></div><div class="fact"><small>Programma</small><strong>${dayLabel(s.day)}</strong></div></div><div class="two-col"><div class="panel"><h3>Waarom deze stop?</h3><p>${s.why}</p><h3>Praktisch</h3><p>${s.practical}</p><div class="hero-actions">${openExternal(s.official,'Officiële website')}${openExternal(maps(s.mapQuery),'Google Maps')}</div></div><div><div class="callout green"><strong>Op de route:</strong> bekijk de volledige planning van <a href="#dag${s.day}">dag ${s.day}</a> om te zien welke stop ervoor en erna komt.</div><p class="credit" style="margin-top:18px">${s.credit}. <a href="${commonsPage(s.photo)}" target="_blank" rel="noopener">Bron en licentie op Wikimedia Commons ↗</a></p></div></div></div></section>`}

function renderMap(){return `<section class="page-head"><div class="shell"><div class="breadcrumb"><a href="#home">Home</a> / Kaart</div><div class="kicker">Oriëntatie</div><h1>Interactieve kaart</h1><p>Alle hoofdlocaties van de drie dagen. Gebruik de knoppen om één dag te tonen en tik op een marker voor de detailpagina.</p></div></section><section class="section"><div class="shell"><div class="map-controls"><button class="filter-btn active" data-map-day="all">Alle dagen</button><button class="filter-btn" data-map-day="1">Dag 1</button><button class="filter-btn" data-map-day="2">Dag 2</button><button class="filter-btn" data-map-day="3">Dag 3</button></div><div id="map"></div><div class="map-legend"><span><span class="day-dot d1"></span>Dag 1 · Westminster</span><span><span class="day-dot d2"></span>Dag 2 · Tower/City</span><span><span class="day-dot d3"></span>Dag 3 · Camden/West End</span></div><p class="credit">Kaartweergave: OpenFreeMap · kaartdata © OpenStreetMap-bijdragers.</p></div></section>`}

function renderOV(){return `<section class="page-head"><div class="shell"><div class="breadcrumb"><a href="#home">Home</a> / Openbaar vervoer</div><div class="kicker">Van Croydon naar Londen</div><h1>Openbaar vervoer</h1><div class="hero-actions"><a class="btn btn-dark" href="#planner">📍 Plan een OV-route vanaf hier →</a></div><p>Het belangrijkste onderscheid: vanaf East Croydon neem je eerst een <strong>National Rail-trein</strong>. Pas in centraal Londen gebruik je zo nodig de Underground.</p></div></section>
<section class="section"><div class="shell">
<div class="two-col"><div class="panel"><h3>🚆 East Croydon → Victoria</h3><p>Voor Buckingham Palace, Westminster en West End. Southern vermeldt een reistijd van ongeveer <strong>16–18 minuten</strong> voor de snelste rechtstreekse treinen.</p><p><strong>East Croydon ligt in zone 5.</strong></p></div><div class="panel"><h3>🚆 East Croydon → London Bridge</h3><p>Voor Tower Bridge, Tower of London, Borough Market, The Shard en de South Bank. Vanaf London Bridge kun je veel van dag 2 lopen.</p></div></div>
<div class="section-title" style="margin-top:38px"><div><div class="kicker">Contactloos</div><h2>Zo betaal je in het OV</h2></div></div>
<div class="steps"><div class="step"><h3>Gebruik één kaart óf één apparaat</h3><p>Gebruik voor alle ritten dezelfde fysieke kaart, of steeds dezelfde telefoon/watch. Een fysieke kaart en diezelfde kaart in Apple Pay/Google Pay tellen voor TfL als verschillende betaalmiddelen.</p></div><div class="step"><h3>Trein & Tube: in én uitchecken</h3><p>Houd je kaart of apparaat bij het begin én einde tegen de gele kaartlezer.</p></div><div class="step"><h3>Bus & tram: alleen inchecken</h3><p>Bij bussen en trams tik je alleen bij instappen in; niet bij uitstappen.</p></div><div class="step"><h3>Daglimiet werkt automatisch</h3><p>Voor reizen door zones 1–5 is de volwassen contactless/Oyster daglimiet in 2026 <strong>£15,30</strong>. Zodra de toepasselijke cap is bereikt, worden verdere in aanmerking komende ritten die dag niet meer extra berekend.</p></div></div>
<div class="callout red" style="margin-top:24px"><strong>Nederlandse betaalkaarten:</strong> TfL meldt dat de meeste buitenlandse contactloze kaarten werken, maar dat sommige kaarten die buiten het VK zijn uitgegeven — waaronder sommige kaarten uit Nederland — geweigerd kunnen worden. Neem daarom bij voorkeur twee onafhankelijke betaalmogelijkheden mee.</div>
<div class="two-col" style="margin-top:24px"><div class="panel"><h3>Oyster nodig?</h3><p>Voor twee volwassenen met geschikte contactloze kaarten is een Oyster-kaart meestal niet nodig. Contactless gebruikt hetzelfde pay-as-you-go-systeem en dezelfde dagelijkse capping.</p><p>Een Visitor Oyster kost bovendien een uitgiftebedrag en moet worden opgeladen.</p></div><div class="panel"><h3>Peak / off-peak</h3><p>De enkele ritprijs kan verschillen per tijdstip. De dagelijkse cap voor zones 1–5 is in 2026 echter zowel peak als off-peak £15,30.</p><p>Reis je met National Rail, Tube, DLR, Overground of Elizabeth line: check altijd correct in en uit.</p></div></div>
<div class="section-title" style="margin-top:40px"><div><div class="kicker">Bronnen</div><h2>Actuele OV-links</h2></div></div><div class="source-list"><div class="source-item"><a target="_blank" rel="noopener" href="https://tfl.gov.uk/campaign/fares-from-2-march-2025">TfL · Fares effective from 1 March 2026 ↗</a><br><small>Daglimieten, Tube-/railprijzen en bus/tram.</small></div><div class="source-item"><a target="_blank" rel="noopener" href="https://tfl.gov.uk/fares/find-fares/bus-and-tram-fares">TfL · Bus & tram fares ↗</a></div><div class="source-item"><a target="_blank" rel="noopener" href="https://www.southernrailway.com/journey/east-croydon-to-london-victoria">Southern · East Croydon → London Victoria ↗</a></div></div><p class="credit">Informatie bijgewerkt ${SITE.updated}. Controleer op de reisdag storingen en werkzaamheden in TfL Go / National Rail.</p>
</div></section>`}

function renderPayments(){return `<section class="page-head"><div class="shell"><div class="breadcrumb"><a href="#home">Home</a> / Betalen</div><div class="kicker">Geldzaken</div><h1>Betalen in Londen</h1><p>De praktische versie: Britse ponden, contactloos waar mogelijk, en bij betaalterminals altijd goed kijken welke valuta je kiest.</p></div></section>
<section class="section"><div class="shell"><div class="payment-hero"><h2>£ Britse pond (GBP)</h2><p>In Londen betaal je in Britse ponden. Contactloos betalen is op veel plekken de standaard en is voor jullie OV ook de eenvoudigste optie.</p><div class="payment-badges"><span class="payment-badge">💳 Visa / Mastercard</span><span class="payment-badge">📱 Apple Pay / Google Pay</span><span class="payment-badge">💷 GBP</span><span class="payment-badge">🚆 TfL contactless</span></div></div>
<div class="two-col" style="margin-top:24px"><div class="panel"><h3>In winkels, restaurants en pubs</h3><p>Contactloos betalen is zeer gebruikelijk. Houd wel een tweede kaart of een kleine hoeveelheid contant geld achter de hand voor uitzonderingen.</p><p>Je bank bepaalt of er een koersopslag of buitenlandse transactiekosten gelden.</p></div><div class="panel"><h3>Kies GBP, niet EUR</h3><p>Als een betaalautomaat of geldautomaat vraagt of je in euro’s of ponden wilt afrekenen, is <strong>GBP</strong> doorgaans de verstandigste keuze. Daarmee voorkom je dat de winkel of ATM zelf via Dynamic Currency Conversion een eigen wisselkoers toepast.</p></div></div>
<div class="section-title" style="margin-top:38px"><div><div class="kicker">OV</div><h2>Betalen tijdens het reizen</h2></div></div>
<div class="table-wrap"><table><thead><tr><th>Vervoer</th><th>Wat doe je?</th><th>Belangrijk</th></tr></thead><tbody><tr><td>National Rail binnen contactless-gebied</td><td>In- én uitchecken</td><td>Zelfde kaart/apparaat</td></tr><tr><td>Underground / DLR / Overground / Elizabeth line</td><td>In- én uitchecken</td><td>Gele kaartlezers</td></tr><tr><td>Bus / tram</td><td>Alleen inchecken</td><td>Niet uitchecken</td></tr><tr><td>Overstap via roze reader</td><td>Roze reader aantikken indien route dit vraagt</td><td>Kan route/fare correct registreren</td></tr></tbody></table></div>
<div class="callout" style="margin-top:24px"><strong>Voor jullie hotel:</strong> omdat East Croydon in zone 5 ligt en de meeste sightseeing in zone 1 plaatsvindt, is de relevante volwassen dagcap voor zones 1–5 in 2026 <strong>£15,30 per persoon per dag</strong>, mits je consequent hetzelfde betaalmiddel gebruikt.</div>
<div class="two-col" style="margin-top:24px"><div class="panel"><h3>Kaart en telefoon niet door elkaar</h3><p>Gebruik je 's ochtends de fysieke bankpas en 's avonds dezelfde pas via je telefoon, dan kan TfL dat als twee verschillende contactless-identiteiten zien. Je ritten worden dan niet netjes samen gecapt.</p></div><div class="panel"><h3>Contant geld</h3><p>Voor dagelijks gebruik heb je weinig cash nodig. Een klein bedrag in ponden is wel prettig als reserve. In de bus kun je niet simpelweg met cash een regulier TfL-ticket kopen.</p></div></div>
<p class="credit">OV-tarieven en contactless-regels: Transport for London, bijgewerkt ${SITE.updated}. Bankkosten en wisselkoersen verschillen per bank.</p></div></section>`}

function renderPhotoSources(){return `<section class="page-head"><div class="shell"><div class="breadcrumb"><a href="#home">Home</a> / Fotobronnen</div><div class="kicker">Credits</div><h1>Foto’s & bronnen</h1><p>De reisgids gebruikt vrij gelicentieerde foto’s via Wikimedia Commons. De precieze maker en licentie staan op de bronpagina van elk beeld.</p></div></section><section class="section"><div class="shell"><div class="source-list">${allSpots.map(s=>`<div class="source-item"><strong>${s.name}</strong><br><span>${s.credit}</span><br><a href="${commonsPage(s.photo)}" target="_blank" rel="noopener">Open fotobron en licentie ↗</a></div>`).join('')}</div></div></section>`}

function render404(){return `<section class="page-head"><div class="shell"><h1>Pagina niet gevonden</h1><p>Deze route bestaat niet in de reisgids.</p><a class="btn btn-dark" href="#home">Terug naar home</a></div></section>`}

function router(){
  disposePlanner();
  if(mapInstance){mapInstance.remove();mapInstance=null;}
  window.scrollTo({top:0,behavior:'instant'});
  const hash=(location.hash||'#home').slice(1);
  const main=document.getElementById('main');
  if(hash.startsWith('spot=')) main.innerHTML=renderSpot(hash.split('=')[1]);
  else if(hash==='home') main.innerHTML=renderHome();
  else if(hash==='aankomst') main.innerHTML=renderArrival();
  else if(hash==='dag1') main.innerHTML=renderDay(1);
  else if(hash==='dag2') main.innerHTML=renderDay(2);
  else if(hash==='dag3') main.innerHTML=renderDay(3);
  else if(hash==='bezienswaardigheden') main.innerHTML=renderSpots();
  else if(hash==='kaart') main.innerHTML=renderMap();
  else if(hash==='ov') main.innerHTML=renderOV();
  else if(hash==='planner' || hash.startsWith('planner=')) main.innerHTML=renderPlanner(hash.split('=')[1]);
  else if(hash==='betalen') main.innerHTML=renderPayments();
  else if(hash==='fotobronnen') main.innerHTML=renderPhotoSources();
  else main.innerHTML=render404();
  bindPageEvents();
  if(hash==='planner' || hash.startsWith('planner=')) initPlanner();
  if(hash==='kaart') setTimeout(()=>initMap('all'),80);
  closeDrawer();
  document.title = hash==='home' ? SITE.title : `${pageTitle(hash)} · ${SITE.title}`;
}
function pageTitle(hash){if(hash.startsWith('planner=')) return 'OV-route plannen';if(hash.startsWith('spot=')){return spots[hash.split('=')[1]]?.name||'Bezienswaardigheid'};return ({aankomst:'Aankomst',dag1:'Dag 1',dag2:'Dag 2',dag3:'Dag 3',bezienswaardigheden:'Bezienswaardigheden',kaart:'Kaart',planner:'OV-route plannen',ov:'Openbaar vervoer',betalen:'Betalen',fotobronnen:'Fotobronnen'})[hash]||'Reisgids'}

function bindPageEvents(){
  document.querySelectorAll('[data-check]').forEach(btn=>btn.addEventListener('click',()=>toggleVisited(btn.dataset.check)));
  const search=document.getElementById('spotSearch'); if(search) search.addEventListener('input',filterSpots);
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));filterSpots();}));
  document.querySelectorAll('[data-map-day]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-map-day]').forEach(x=>x.classList.toggle('active',x===b));initMap(b.dataset.mapDay)}));
}
function toggleVisited(slug){localStorage.setItem(visitedKey(slug),isVisited(slug)?'0':'1');showToast(isVisited(slug)?`${spots[slug].name} afgevinkt ✓`:`${spots[slug].name} weer open`);router()}
function filterSpots(){const q=(document.getElementById('spotSearch')?.value||'').trim().toLowerCase();document.querySelectorAll('.spot-card').forEach(card=>{const matchDay=activeFilter==='all'||card.dataset.day===activeFilter;const matchText=!q||card.dataset.name.includes(q);card.style.display=matchDay&&matchText?'flex':'none';})}

function initMap(day){
  if(typeof L==='undefined'){document.getElementById('map').innerHTML='<p style="padding:20px">De kaartbibliotheek kon niet worden geladen. De rest van de reisgids werkt wel.</p>';return}
  if(mapInstance){mapInstance.remove();mapInstance=null}
  mapInstance=L.map('map',{scrollWheelZoom:false}).setView([51.512,-0.115],13);
  if(typeof L.maplibreGL==='function'){
    L.maplibreGL({style:'https://tiles.openfreemap.org/styles/liberty'}).addTo(mapInstance);
    mapInstance.attributionControl.addAttribution('<a href="https://openfreemap.org/" target="_blank" rel="noopener">OpenFreeMap</a> · © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>');
  }else{
    document.getElementById('map').insertAdjacentHTML('afterbegin','<div style="position:absolute;z-index:500;left:12px;right:12px;top:12px;background:rgba(255,255,255,.95);padding:10px 12px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,.12)">Kaartachtergrond kon niet worden geladen; de locaties blijven zichtbaar.</div>');
  }
  const subset=allSpots.filter(s=>day==='all'||String(s.day)===String(day));
  const colors={1:'#b33a3a',2:'#2f7667',3:'#7a5aa6'};
  const bounds=[];
  subset.forEach(s=>{const marker=L.circleMarker([s.lat,s.lng],{radius:8,color:'#fff',weight:2,fillColor:colors[s.day],fillOpacity:1}).addTo(mapInstance);marker.bindPopup(`<strong>${s.name}</strong><br><a href="#spot=${s.slug}">Meer info →</a>`);bounds.push([s.lat,s.lng]);});
  if(bounds.length) mapInstance.fitBounds(bounds,{padding:[30,30],maxZoom:14});
}

const drawer=document.getElementById('drawer'),scrim=document.getElementById('scrim'),menuBtn=document.getElementById('menuBtn');
function openDrawer(){drawer.classList.add('open');scrim.classList.add('open');drawer.setAttribute('aria-hidden','false');menuBtn?.setAttribute('aria-expanded','true')}
function closeDrawer(){drawer.classList.remove('open');scrim.classList.remove('open');drawer.setAttribute('aria-hidden','true');menuBtn?.setAttribute('aria-expanded','false')}
menuBtn?.addEventListener('click',openDrawer);document.getElementById('closeMenuBtn')?.addEventListener('click',closeDrawer);scrim?.addEventListener('click',closeDrawer);

document.getElementById('shareBtn')?.addEventListener('click',async()=>{try{if(navigator.share){await navigator.share({title:SITE.title,text:'Onze reisgids voor Londen',url:location.href});}else{await navigator.clipboard.writeText(location.href);showToast('Link gekopieerd');}}catch(e){}});
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2200)}
window.addEventListener('hashchange',router);
if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(()=>{});
router();
