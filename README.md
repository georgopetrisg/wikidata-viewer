# Wikidata Viewer

A small static web app that showcases [Wikidata](https://www.wikidata.org) items - currently focused on Prague sightseeing landmarks.

This project was implemented as part of the "**Ionian Wikithon 2026**" event at the **Department of Informatics, Ionian University (2025-2026)**.

## What it does

Pick a landmark from the list and the app fetches live data from the Wikidata and Wikimedia Commons APIs to show:

- A photo of the location
- A short description
- An interactive map with the location pinned (via Leaflet.js + OpenStreetMap)

## Landmarks included

Charles Bridge, Head of Franz Kafka, Prague Astronomical Clock, Prague Castle, Prague Zoo, St. Vitus Cathedral, Lennon Wall and Palladium mall.

## Tech

- Vanilla JS, HTML, CSS - no framework
- [Leaflet.js](https://leafletjs.com/) for maps
- [Wikidata API](https://www.wikidata.org/wiki/Wikidata:Data_access) for entity data
- [Wikimedia Commons API](https://www.mediawiki.org/wiki/API:Main_page) for images

## Running it

Just open `index.html` in a browser — no build step needed.

## Roadmap

- Add more cities and Wikidata item categories
- Search/filter support
- More entity details (Wikipedia links, opening hours, etc.)
