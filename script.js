const ENTITIES = [
    { id: 'Q204871',   name: 'Charles Bridge'},
    { id: 'Q29169058', name: 'Head of Franz Kafka'},
    { id: 'Q729370', name: 'Prague Astronomical Clock'},
    { id: 'Q193369', name: 'Prague Castle'},
    { id: 'Q220086', name: 'Prague Zoo'},
    { id: 'Q5949', name: 'St. Vitus Cathedral'},
    { id: 'Q1630131', name: 'Lennon Wall'}
];

// Φτιάχνω τα κουμπιά δυναμικά
const btnContainer = document.getElementById('select-buttons');

ENTITIES.forEach(entity => {
    const btn = document.createElement('button');
    btn.textContent = entity.name;
    btn.onclick = () => {
        showScreen('viewer');
        loadEntity(entity.id);
    };
    btnContainer.appendChild(btn);
});


// Εναλλαγή screens
function showScreen(name) {
    document.getElementById('screen-select').style.display = name === 'select' ? '' : 'none';
    document.getElementById('screen-viewer').style.display = name === 'viewer' ? '' : 'none';
}

// Κουμπί "Πίσω"
document.getElementById('btn-back').onclick = () => {
    showScreen('select');
    document.title = 'Prague Sightseeings'
    resetViewer();
};


// Καθαρισμός viewer για νέα επιλογή
function resetViewer() {
    document.getElementById('label').textContent       = '';
    document.getElementById('description').textContent = '';
    const img = document.getElementById('image');
    img.src   = '';
    img.style.display = 'none';
    if (leafletMap) { leafletMap.remove(); leafletMap = null; }
}


// Φόρτωση entity από Wikidata
function loadEntity(ENTITY_ID) {

    document.getElementById('label').textContent = 'Φορτώνει…';

    const url = `https://www.wikidata.org/w/api.php`
              + `?action=wbgetentities`
              + `&ids=${ENTITY_ID}`
              + `&format=json`
              + `&languages=en|el`
              + `&origin=*`;

    fetch(url)
        .then(r => r.json())
        .then(data => {

            const entity = data.entities[ENTITY_ID];

            // Label
            const label = entity.labels?.en?.value
                       ?? entity.labels?.el?.value
                       ?? ENTITY_ID;
            document.getElementById('label').textContent = label;
            document.title = label;

            // Description
            const descr = entity.descriptions?.el?.value
                       ?? entity.descriptions?.en?.value
                       ?? '—';
            document.getElementById('description').textContent = get_first_upper(descr);

            // Εικόνα (P18)
            const imageName = entity.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
            if (imageName) fetchImage(imageName, 800);

            // Χάρτης (P625)
            const coords = entity.claims?.P625?.[0]?.mainsnak?.datavalue?.value;
            if (coords) showMap(coords.latitude, coords.longitude, label);

        }
    );
}


// Εικόνα
function fetchImage(filename, size) {
    filename = filename.replaceAll(' ', '_');
    const img = document.getElementById('image');
    img.src   = `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${size}`;
    img.style.display = 'block';
}


// Χάρτης
let leafletMap = null;

function showMap(lat, lng, title) {
    if (leafletMap) { leafletMap.remove(); leafletMap = null; }

    leafletMap = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(leafletMap);

    L.marker([lat, lng]).addTo(leafletMap).bindPopup(title).openPopup();

    // ← αυτό λύνει το πρόβλημα
    setTimeout(() => leafletMap.invalidateSize(), 1000);
}

// First Upper
function get_first_upper(value) {
    if (typeof value === 'string' || value instanceof String)
        value = value.charAt(0).toUpperCase() + value.slice(1);
    return value;
}