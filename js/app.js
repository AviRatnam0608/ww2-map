(function() {
  'use strict';

  // ─── State ─────────────────────────
  let selectedEventIndex = 0;
  let selectedCity = null;
  let selectedCityEventIdx = 0;
  let isPlaying = false;
  let playInterval = null;
  let activeYearFilter = 'all';
  let filteredEvents = [...WW2_EVENTS];
  const imageCache = {};

  // ─── Leaflet Map Setup ─────────────
  const map = L.map('map', {
    center: [48.5, 18],
    zoom: 4,
    minZoom: 3,
    maxZoom: 10,
    zoomControl: true,
    attributionControl: true,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    pane: 'shadowPane',
    opacity: 0.35,
  }).addTo(map);

  // ─── Territory Layer Group ─────────
  let territoryLayers = L.layerGroup().addTo(map);

  function renderTerritories(phase) {
    territoryLayers.clearLayers();
    const data = TERRITORY_PHASES[phase];
    if (!data) return;

    ['soviet', 'allied', 'axis'].forEach(faction => {
      (data[faction] || []).forEach(territory => {
        const polygon = L.polygon(territory.coords, {
          color: territory.borderColor,
          weight: 1.5,
          fillColor: territory.color,
          fillOpacity: 1,
          opacity: 0.8,
          smoothFactor: 1.5,
        });

        polygon.bindTooltip(territory.label, {
          permanent: false,
          direction: 'center',
          className: 'city-label',
        });

        territoryLayers.addLayer(polygon);
      });
    });
  }

  // ─── City Markers ──────────────────
  let cityMarkerLayers = L.layerGroup().addTo(map);
  let cityMarkerRefs = {};

  function createCityMarkers() {
    CITY_MARKERS.forEach(city => {
      const icon = L.divIcon({
        className: 'city-marker-icon',
        html: '<div class="city-marker-dot" id="dot-' + city.id + '"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = L.marker([city.lat, city.lng], { icon })
        .on('click', () => openCityPanel(city));

      marker.bindTooltip(city.name, {
        permanent: true,
        direction: 'right',
        offset: [10, 0],
        className: 'city-label',
      });

      cityMarkerRefs[city.id] = marker;
      cityMarkerLayers.addLayer(marker);
    });
  }

  // ─── Wikipedia Image Fetching ──────
  async function fetchWikiImage(articleTitle) {
    if (!articleTitle) return null;
    if (imageCache[articleTitle] !== undefined) return imageCache[articleTitle];

    try {
      const resp = await fetch(
        'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(articleTitle)
      );
      if (!resp.ok) { imageCache[articleTitle] = null; return null; }
      const data = await resp.json();
      const url = data.thumbnail?.source || null;
      imageCache[articleTitle] = url;
      return url;
    } catch {
      imageCache[articleTitle] = null;
      return null;
    }
  }

  function loadImageIntoContainer(articleTitle) {
    const img = document.getElementById('city-event-img');
    const placeholder = document.getElementById('city-img-placeholder');
    const spinner = document.getElementById('city-img-spinner');
    const icon = document.getElementById('city-img-icon');

    // Reset
    img.classList.remove('loaded');
    img.src = '';
    placeholder.classList.remove('hidden');
    spinner.style.display = 'block';
    icon.style.display = 'none';

    fetchWikiImage(articleTitle).then(url => {
      if (url) {
        img.onload = () => {
          img.classList.add('loaded');
          placeholder.classList.add('hidden');
        };
        img.onerror = () => {
          spinner.style.display = 'none';
          icon.style.display = 'block';
        };
        img.src = url;
        img.alt = articleTitle ? articleTitle.replace(/_/g, ' ') : '';
      } else {
        spinner.style.display = 'none';
        icon.style.display = 'block';
      }
    });
  }

  // ─── City Info Panel Logic ─────────
  const cityPanel = document.getElementById('city-panel');
  const cityPanelName = document.getElementById('city-panel-name');
  const cityEventTabs = document.getElementById('city-event-tabs');
  const cityEventTitle = document.getElementById('city-event-title');
  const cityEventDate = document.getElementById('city-event-date');
  const cityEventText = document.getElementById('city-event-text');
  const cityEventSource = document.getElementById('city-event-source');
  const cityEventStats = document.getElementById('city-event-stats');
  const notablePeopleSection = document.getElementById('city-notable-people');
  const notablePeopleList = document.getElementById('notable-people-list');

  function openCityPanel(city) {
    if (selectedCity) {
      const prevDot = document.getElementById('dot-' + selectedCity.id);
      if (prevDot) prevDot.classList.remove('active');
    }

    if (selectedCity && selectedCity.id === city.id) {
      closeCityPanel();
      return;
    }

    selectedCity = city;
    selectedCityEventIdx = 0;

    const dot = document.getElementById('dot-' + city.id);
    if (dot) dot.classList.add('active');

    cityPanelName.textContent = city.name;

    // Notable people
    if (city.notablePeople && city.notablePeople.length > 0) {
      notablePeopleSection.style.display = 'block';
      notablePeopleList.innerHTML = city.notablePeople
        .map(p => '<span class="person-tag">' + p + '</span>')
        .join('');
    } else {
      notablePeopleSection.style.display = 'none';
    }

    // Tabs
    cityEventTabs.innerHTML = '';
    if (city.events.length > 1) {
      cityEventTabs.classList.add('visible');
      city.events.forEach((evt, idx) => {
        const tab = document.createElement('button');
        tab.className = 'city-tab' + (idx === 0 ? ' active' : '');
        tab.textContent = evt.date;
        tab.addEventListener('click', () => {
          selectedCityEventIdx = idx;
          document.querySelectorAll('.city-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          renderCityEvent();
        });
        cityEventTabs.appendChild(tab);
      });
    } else {
      cityEventTabs.classList.remove('visible');
    }

    renderCityEvent();
    cityPanel.classList.add('open');
  }

  function renderCityEvent() {
    if (!selectedCity) return;
    const evt = selectedCity.events[selectedCityEventIdx];
    cityEventTitle.textContent = evt.title;
    cityEventDate.textContent = evt.date;
    cityEventText.textContent = evt.text;

    // Load image from Wikipedia
    loadImageIntoContainer(evt.wikiArticle);

    // Casualties / stats
    if (evt.casualties) {
      cityEventStats.innerHTML = '<div class="stat-item"><span class="stat-value">' + evt.casualties + '</span>Casualties</div>';
      cityEventStats.style.display = 'flex';
    } else {
      cityEventStats.style.display = 'none';
    }

    cityEventSource.textContent = evt.wikiArticle
      ? '\uD83D\uDCDA Source: Wikipedia \u2013 ' + evt.wikiArticle.replace(/_/g, ' ')
      : '';
  }

  function closeCityPanel() {
    if (selectedCity) {
      const dot = document.getElementById('dot-' + selectedCity.id);
      if (dot) dot.classList.remove('active');
    }
    selectedCity = null;
    cityPanel.classList.remove('open');
  }

  document.getElementById('close-city-btn').addEventListener('click', closeCityPanel);

  // ─── Year Filter ───────────────────
  function setYearFilter(year) {
    activeYearFilter = year;

    // Update button states
    document.querySelectorAll('.year-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.year === String(year));
    });

    // Filter events
    if (year === 'all') {
      filteredEvents = [...WW2_EVENTS];
    } else {
      filteredEvents = WW2_EVENTS.filter(e => e.year === parseInt(year));
    }

    // Reset selection to first filtered event
    selectedEventIndex = 0;
    if (filteredEvents.length > 0) {
      selectEvent(0);
    }
  }

  // Wire up year selector buttons
  document.querySelectorAll('.year-btn').forEach(btn => {
    btn.addEventListener('click', () => setYearFilter(btn.dataset.year));
  });

  // ─── Timeline Rendering ────────────
  const timelineList = document.getElementById('timeline-list');

  function renderTimeline() {
    timelineList.innerHTML = '';

    // Add year header if filtering by year
    if (activeYearFilter !== 'all') {
      const header = document.createElement('div');
      header.style.cssText = 'padding: 8px 24px; font-size: 12px; color: var(--gold-dim); letter-spacing: 2px; text-transform: uppercase; font-family: var(--font-mono);';
      header.textContent = activeYearFilter + ' \u2022 ' + filteredEvents.length + ' events';
      timelineList.appendChild(header);
    }

    filteredEvents.forEach((event, index) => {
      const btn = document.createElement('button');
      const phaseColor = PHASE_LABELS[event.phase]?.color || '#888';

      let classes = 'timeline-event';
      if (index === selectedEventIndex) classes += ' active';
      if (index < selectedEventIndex) classes += ' past';
      btn.className = classes;

      if (index === selectedEventIndex) {
        btn.style.borderLeftColor = phaseColor;
      }

      btn.innerHTML =
        '<div class="event-dot-col">' +
          '<div class="event-dot" style="background: ' + (index === selectedEventIndex ? phaseColor : '') + '; ' + (index === selectedEventIndex ? 'box-shadow: 0 0 12px ' + phaseColor + '60;' : '') + '"></div>' +
          (index < filteredEvents.length - 1 ? '<div class="event-line"></div>' : '') +
        '</div>' +
        '<div class="event-content">' +
          '<div class="event-date" style="color: ' + (index === selectedEventIndex ? phaseColor : '') + '">' + event.date + '</div>' +
          '<div class="event-title">' + event.title + '</div>' +
          '<div class="event-description">' + event.description + '</div>' +
        '</div>';

      btn.addEventListener('click', () => selectEvent(index));
      timelineList.appendChild(btn);
    });
  }

  // ─── Core State Transitions ────────
  function selectEvent(index) {
    selectedEventIndex = index;
    closeCityPanel();

    const event = filteredEvents[index];
    if (!event) return;
    const phase = PHASE_LABELS[event.phase] || PHASE_LABELS.invasion_poland;

    // Update phase indicator
    document.getElementById('phase-dot').style.background = phase.color;
    document.getElementById('phase-dot').style.boxShadow = '0 0 10px ' + phase.color + '80';
    document.getElementById('phase-label').textContent = phase.label;
    document.getElementById('phase-label').style.color = phase.color;
    document.getElementById('phase-date').textContent = event.date;

    // Update progress bar
    const pct = ((index + 1) / filteredEvents.length) * 100;
    const fill = document.getElementById('progress-bar-fill');
    fill.style.width = pct + '%';
    fill.style.background = 'linear-gradient(90deg, ' + phase.color + ', ' + phase.color + '80)';

    document.getElementById('phase-indicator').style.borderColor = phase.color + '40';

    // Render territories
    renderTerritories(event.phase);

    // Re-render timeline
    renderTimeline();

    // Scroll active event into view
    const activeBtn = timelineList.querySelector('.timeline-event.active');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // ─── Play/Pause ────────────────────
  const playBtn = document.getElementById('play-btn');

  function togglePlay() {
    if (isPlaying) {
      clearInterval(playInterval);
      isPlaying = false;
      playBtn.textContent = '\u25B6 Play Through War';
      playBtn.classList.remove('playing');
      return;
    }

    isPlaying = true;
    playBtn.textContent = '\u23F8 Pause Timeline';
    playBtn.classList.add('playing');

    let idx = selectedEventIndex;
    playInterval = setInterval(() => {
      idx++;
      if (idx >= filteredEvents.length) {
        clearInterval(playInterval);
        isPlaying = false;
        playBtn.textContent = '\u25B6 Play Through War';
        playBtn.classList.remove('playing');
        return;
      }
      selectEvent(idx);
    }, 2500);
  }

  playBtn.addEventListener('click', togglePlay);

  // ─── Keyboard Navigation ───────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedEventIndex < filteredEvents.length - 1) selectEvent(selectedEventIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedEventIndex > 0) selectEvent(selectedEventIndex - 1);
    } else if (e.key === ' ') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'Escape') {
      closeCityPanel();
    }
  });

  // ─── Initialize ────────────────────
  createCityMarkers();
  selectEvent(0);

})();
