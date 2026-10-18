// Live journey planning; coordinates remain in memory and are never saved.
let journeyPlanner = null;

function renderPlanner(slug) {
  const destination = spots[slug]?.name || '';
  return `<section class="page-head"><div class="shell"><div class="breadcrumb"><a href="#home">Home</a> / OV-route plannen</div><div class="kicker">Onderweg in Londen</div><h1>Waar gaan we naartoe?</h1><p>Kies jullie volgende stop. Bekijk welke trein, metro, bus of tram je nodig hebt, inclusief lopen en overstappen.</p></div></section>
  <section class="section"><div class="shell">
    <form id="journey-form" class="panel journey-form">
      <div><label for="journey-from">Vertrekpunt</label><input id="journey-from" list="journey-places" placeholder="Adres, station of bezienswaardigheid" required maxlength="200" autocomplete="off"><button type="button" class="btn btn-soft" id="journey-locate">📍 Gebruik mijn huidige locatie</button></div>
      <div><label for="journey-to">Bestemming</label><input id="journey-to" list="journey-places" placeholder="Kies of typ een locatie in Londen" value="${esc(destination)}" required maxlength="200" autocomplete="off"><p class="journey-hint">Kies een stop uit jullie reisgids of typ zelf een adres, station of Britse postcode.</p></div>
      <datalist id="journey-places">${allSpots.map(s=>`<option value="${esc(s.name)}"></option>`).join('')}<option value="Leonardo Hotel London Croydon"></option><option value="East Croydon Station"></option></datalist>
      <div class="journey-submit"><button type="submit" class="btn btn-dark" id="journey-plan">Zoek OV-routes →</button><span>Vertrek nu · tijden in Londen</span></div>
    </form>
    <p class="journey-hint">Je browser vraagt toestemming voor je locatie. Deze wordt alleen voor deze route gebruikt en met Transport for London gedeeld. Je kunt ook zelf een vertrekpunt typen. Internet nodig.</p>
    <p id="journey-status" role="status" aria-live="polite">Vul een vertrekpunt en bestemming in om te beginnen.</p>
    <div id="journey-choices"></div>
    <div id="journey-fallback" hidden></div>
    <div class="journey-layout"><div id="journey-results"></div><div><div id="journey-map" aria-label="Kaart van de geselecteerde OV-route"></div><p class="journey-hint" id="journey-legend">Na het zoeken verschijnt hier de route. Stippellijnen geven loopstukken aan.</p></div></div>
    <p class="credit">Reisadvies: <a href="https://tfl.gov.uk/plan-a-journey/" target="_blank" rel="noopener">Transport for London</a>. Controleer vertrekborden en meldingen onderweg. De vervoersinstructies van TfL staan in het Engels.</p>
  </div></section>`;
}

function disposePlanner() {
  if (!journeyPlanner) return;
  journeyPlanner.controller?.abort();
  journeyPlanner.map?.remove();
  journeyPlanner = null;
}

function initPlanner() {
  const state = journeyPlanner = {map:null, layer:null, controller:null, selected:{}, journeys:[], revision:0};
  const from = document.getElementById('journey-from');
  const to = document.getElementById('journey-to');
  const status = document.getElementById('journey-status');
  const locate = document.getElementById('journey-locate');
  const plan = document.getElementById('journey-plan');
  const choices = document.getElementById('journey-choices');
  const results = document.getElementById('journey-results');
  const fallback = document.getElementById('journey-fallback');
  const active = () => journeyPlanner === state;

  function clearRoute() {
    state.revision++;
    state.controller?.abort();
    state.journeys = [];
    results.replaceChildren(); choices.replaceChildren(); fallback.hidden = true;
    state.layer?.clearLayers();
    plan.disabled = false;
  }
  for (const [key,input] of [['from',from],['to',to]]) input.addEventListener('input',()=>{
    delete state.selected[key]; clearRoute();
    status.textContent = 'Locatie gewijzigd. Zoek opnieuw voor een actueel reisadvies.';
  });
  locate.addEventListener('click',()=>{
    if (!navigator.geolocation) {status.textContent='Je browser ondersteunt geen locatiebepaling. Typ je vertrekpunt hierboven.'; return;}
    clearRoute();
    const revision = state.revision;
    locate.disabled = true; status.textContent='Je huidige locatie wordt bepaald…';
    navigator.geolocation.getCurrentPosition(position=>{
      if (!active()) return;
      locate.disabled = false;
      if (revision !== state.revision) return;
      const {latitude:lat,longitude:lon,accuracy} = position.coords;
      state.selected.from = {value:`${lat},${lon}`,label:'Mijn huidige locatie'};
      from.value='Mijn huidige locatie';
      status.textContent=`Locatie gevonden (nauwkeurigheid circa ${Math.round(accuracy)} meter). Kies een bestemming en zoek je OV-route.`;
    },error=>{
      if (!active()) return;
      locate.disabled=false;
      if (revision !== state.revision) return;
      status.textContent=error.code===1 ? 'Geen locatietoestemming. Sta locatie toe in je browser of typ je vertrekpunt.' : 'Je locatie kon niet worden bepaald. Probeer opnieuw of typ je vertrekpunt.';
    },{enableHighAccuracy:true,timeout:15000,maximumAge:30000});
  });

  function endpoint(key,input) {
    if (state.selected[key]) return state.selected[key].value;
    const value=input.value.trim();
    const spot=allSpots.find(s=>s.name.toLowerCase()===value.toLowerCase());
    return spot ? `${spot.lat},${spot.lng}` : value;
  }
  function showFallback(origin,destination) {
    const url=new URL('https://www.google.com/maps/dir/');
    url.search=new URLSearchParams({api:'1',origin,destination,travelmode:'transit'});
    fallback.innerHTML=`<a class="btn btn-soft" target="_blank" rel="noopener" href="${esc(url.href)}">Bekijk deze OV-route in Google Maps ↗</a>`;
    fallback.hidden=false;
  }
  document.getElementById('journey-form').addEventListener('submit',async event=>{
    event.preventDefault(); clearRoute();
    const revision=state.revision;
    const origin=endpoint('from',from), destination=endpoint('to',to);
    if(!origin || !destination) return;
    showFallback(origin,destination);
    plan.disabled=true; status.textContent='Actuele OV-routes ophalen bij TfL…';
    state.controller=new AbortController();
    const timeout=setTimeout(()=>state.controller?.abort(),20000);
    try {
      const url=new URL(`https://api.tfl.gov.uk/Journey/JourneyResults/${encodeURIComponent(origin)}/to/${encodeURIComponent(destination)}`);
      url.searchParams.set('mode','tube,bus,dlr,overground,elizabeth-line,national-rail,tram,walking');
      const response=await fetch(url,{signal:state.controller.signal,cache:'no-store'});
      const data=await response.json();
      if(!active() || revision!==state.revision) return;
      const ambiguous=[['from',data.fromLocationDisambiguation],['to',data.toLocationDisambiguation]].filter(([,d])=>d?.disambiguationOptions?.length);
      if(ambiguous.length) {
        status.textContent='Er zijn meerdere locaties gevonden. Kies hieronder de juiste en zoek opnieuw.';
        for(const [key,d] of ambiguous) {
          const group=document.createElement('div'); group.className='panel journey-choice';
          const label=document.createElement('label'); label.textContent=key==='from'?'Kies het vertrekpunt':'Kies de bestemming';
          const select=document.createElement('select');
          select.add(new Option('Kies een locatie…',''));
          d.disambiguationOptions.forEach((o,i)=>select.add(new Option(o.place?.commonName || o.parameterValue,String(i))));
          select.addEventListener('change',()=>{
            const option=d.disambiguationOptions[Number(select.value)];
            if(select.value==='' || !option) {delete state.selected[key];return;}
            state.selected[key]={value:option.parameterValue,label:option.place?.commonName};
            (key==='from'?from:to).value=option.place?.commonName || option.parameterValue;
          });
          label.append(select);group.append(label);choices.append(group);
        }
        return;
      }
      if(!response.ok) throw new Error('TfL is op dit moment niet beschikbaar of herkent deze locatie niet.');
      if(!data.journeys?.length) {status.textContent='TfL heeft geen route gevonden. Controleer de locaties of probeer Google Maps.';return;}
      state.journeys=data.journeys;
      status.textContent=`${data.journeys.length} reisopties · zojuist opgehaald · vertrek nu · alle tijden zijn lokale tijden in Londen.`;
      results.innerHTML=data.journeys.map((j,i)=>`<button class="journey-option" type="button" data-journey="${i}" aria-pressed="false"><strong>${esc(j.duration)} min</strong><span>${journeyTime(j.startDateTime)} → ${journeyTime(j.arrivalDateTime)}</span><span>${esc(j.legs.map(l=>journeyMode(l)).join(' → '))}</span></button>`).join('')+'<div id="journey-details"></div>';
      results.querySelectorAll('[data-journey]').forEach(button=>button.addEventListener('click',()=>selectJourney(Number(button.dataset.journey))));
      selectJourney(0);
    } catch(error) {
      if(active() && revision===state.revision) status.textContent=error.name==='AbortError' ? 'Het ophalen duurt te lang. Probeer opnieuw of open de OV-route in Google Maps.' : 'Het reisadvies kon niet worden opgehaald. Controleer je verbinding en de locaties, of gebruik Google Maps.';
    } finally {
      clearTimeout(timeout);
      if(active() && revision===state.revision) plan.disabled=false;
    }
  });

  function selectJourney(index) {
    const journey=state.journeys[index];
    results.querySelectorAll('[data-journey]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.journey)===index)));
    document.getElementById('journey-details').innerHTML=`<h2>Zo reis je</h2><ol class="journey-legs">${journey.legs.map(leg=>`<li><strong>${esc(journeyMode(leg))} · ${esc(leg.duration)} min</strong><p>${journeyTime(leg.departureTime)} ${esc(leg.departurePoint?.commonName || 'Vertrek')} → ${journeyTime(leg.arrivalTime)} ${esc(leg.arrivalPoint?.commonName || 'Aankomst')}</p><p>${esc(leg.instruction?.detailed || leg.instruction?.summary || '')}</p>${leg.disruptions?.length?`<details><summary>Meldingen voor dit traject (${leg.disruptions.length})</summary>${leg.disruptions.map(d=>`<p>${esc(d.description || d.summary || 'Controleer de dienstregeling.')}</p>`).join('')}</details>`:''}</li>`).join('')}</ol>`;
    drawJourney(state,journey);
  }
}

function journeyTime(value) {return esc(value?.match(/T(\d{2}:\d{2})/)?.[1] || '');}
function journeyMode(leg) {
  const names={walking:'Lopen',tube:'Metro',bus:'Bus',dlr:'DLR',overground:'Overground','elizabeth-line':'Elizabeth line','national-rail':'Trein',tram:'Tram'};
  const lines=(leg.routeOptions || []).map(r=>r.name).filter(Boolean);
  return `${names[leg.mode?.id] || leg.mode?.name || 'OV'}${lines.length?' · '+lines.join(' / '):''}`;
}
function journeyPoints(leg) {
  try {
    const points=JSON.parse(leg.path?.lineString || '[]');
    return points.filter(p=>Array.isArray(p) && p.length>=2 && Number.isFinite(p[0]) && Number.isFinite(p[1]) && Math.abs(p[0])<=90 && Math.abs(p[1])<=180);
  } catch {return [];}
}
function drawJourney(state,journey) {
  const container=document.getElementById('journey-map');
  if(typeof L==='undefined') {container.textContent='De kaart kon niet laden. Je reisstappen staan hiernaast; Google Maps is ook beschikbaar.';return;}
  if(!state.map) {
    state.map=L.map(container,{scrollWheelZoom:false}).setView([51.51,-0.12],12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(state.map);
    state.layer=L.featureGroup().addTo(state.map);
  }
  state.layer.clearLayers();
  const colors=['#17324d','#b33a3a','#2f7667','#7a5aa6','#b06a08'];
  let missing=false;
  journey.legs.forEach((leg,i)=>{
    const points=journeyPoints(leg);
    if(points.length>1) L.polyline(points,{color:leg.mode?.id==='walking'?'#687783':colors[i%colors.length],weight:5,dashArray:leg.mode?.id==='walking'?'6 8':null}).bindPopup(esc(journeyMode(leg))).addTo(state.layer);
    else missing=true;
    for(const [point,label] of [[leg.departurePoint,'Vertrek'],[leg.arrivalPoint,'Aankomst']]) {
      if(Number.isFinite(point?.lat) && Number.isFinite(point?.lon)) L.circleMarker([point.lat,point.lon],{radius:6,color:'#fff',weight:2,fillColor:colors[i%colors.length],fillOpacity:1}).bindPopup(`${label}: ${esc(point.commonName || '')}`).addTo(state.layer);
    }
  });
  const bounds=state.layer.getBounds();
  if(bounds.isValid()) state.map.fitBounds(bounds,{padding:[24,24],maxZoom:16});
  document.getElementById('journey-legend').textContent=missing?'Voor een deel van deze route ontbreken kaartlijnen. Volg hiervoor de reisstappen.':'Stippellijn = lopen · gekleurde lijnen = OV. Tik op een lijn of halte voor informatie.';
}
