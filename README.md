# Kim & Dennis in Londen

Statische, mobiele reiswebsite voor een driedaags verblijf in Londen vanuit Croydon.

## Inhoud
- 3-daags sightseeingprogramma
- Aankomst vanaf London Stansted naar Leonardo Hotel London Croydon
- Bezienswaardigheden met detailpagina's en foto's
- Interactieve Leaflet/OpenStreetMap-kaart
- Openbaar vervoer vanaf East Croydon
- Live OV-reisplanner met huidige locatie, vrije bestemmingskeuze, TfL-reisopties en routekaart (#planner)
- Betalen in Londen en betalen in het OV
- Afvinkfunctie per bezienswaardigheid (localStorage)
- Deelknop en basis-PWA/offline shell

## Publiceren

De reisplanner gebruikt de openbare TfL Journey API zonder sleutel en Leaflet met OpenStreetMap-tegels. Hiervoor is internet nodig. Locatie wordt uitsluitend na een klik op de locatieknop opgevraagd, blijft in het werkgeheugen en wordt voor het reisadvies aan TfL doorgegeven. Reisadviezen worden niet offline opgeslagen. Bij ontbrekende locatiepermissie kan een vertrekpunt worden getypt; bij een storing is Google Maps als alternatief beschikbaar. Alle reistijden worden getoond zoals TfL ze in lokale Londense tijd aanlevert.
Geschikt voor GitHub Pages, Vercel, Netlify of iedere statische webhost. `index.html` staat in de root.
