# WW2 Interactive Atlas

An interactive map of World War II in Europe (1939-1945), built with Leaflet.js. Explore 35 major battles and events, watch territory boundaries shift after each engagement, and click city markers to learn about key battles, casualties, and notable figures.

## Features

- **Year selector** — filter the timeline by year (1939-1945) or view all events
- **Animated timeline** — play through the war automatically or click individual battles
- **Territory overlays** — 11 map phases showing Axis expansion and Allied liberation
- **City info panels** — 20 clickable markers with battle details, casualty figures, and notable people
- **Wikipedia images** — historical photographs loaded dynamically from Wikipedia's REST API
- **Keyboard navigation** — arrow keys to step through events, spacebar to play/pause, Escape to close panels

## Project Structure

```
├── index.html              HTML shell
├── styles/
│   ├── base.css            Reset & CSS variables
│   ├── timeline.css        Left panel, year selector, legend
│   ├── map.css             Map container, Leaflet overrides
│   ├── cityPanel.css       City info panel, images, stats
│   └── animations.css      Keyframes, scrollbar, markers
├── data/
│   ├── events.js           35 battle/event entries + phase labels
│   ├── cityMarkers.js      20 city markers with event data
│   └── territories.js      11 territory phase polygons
└── js/
    └── app.js              Application logic
```

## Dependencies

- [Leaflet 1.9.4](https://leafletjs.com/) — map rendering (loaded via CDN)
- [CartoDB Dark Matter](https://carto.com/basemaps/) — dark map tiles
- [EB Garamond](https://fonts.google.com/specimen/EB+Garamond) — serif font (loaded via Google Fonts)
- [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) — historical photographs
