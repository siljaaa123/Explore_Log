import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"


export default class extends Controller {
  static targets = ["button"]

  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {

    mapboxgl.accessToken = this.apiKeyValue
    if (this.markersValue === null) {
      this.markersValue = [];
    }

    if (this.element.dataset.journeyLocation) {
      const journeyLocation = JSON.parse(this.element.dataset.journeyLocation)
      this.map = new mapboxgl.Map({
        container: this.element,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [journeyLocation.lng, journeyLocation.lat],
        zoom: 4
      })

    } else {
      this.map = new mapboxgl.Map({
        container: this.element,
        style: "mapbox://styles/mapbox/satellite-streets-v12"
      })

      this.#addMarkersToMap()
      this.#fitMapToMarkers()
      this.#addRouteBetweenMarkers()

    }
    this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }))


    if (!Array.isArray(this.markersValue)) {
      this.markersValue = Object.values(this.markersValue);
    }

    }

  #addMarkersToMap() {
    if (this.markersValue.length > 0) {
      this.markersValue.forEach((marker) => {
        const popup = new mapboxgl.Popup().setHTML(marker.info_window_html)
        const customMarker = document.createElement("div")
        customMarker.innerHTML = marker.marker_html
        new mapboxgl.Marker(customMarker)
          .setLngLat([ marker.lng, marker.lat ])
          .setPopup(popup)
          .addTo(this.map)
      })
    } else {

    }
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }


  #addRouteBetweenMarkers() {
    if (this.markersValue.length >= 2) {
    let apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.markersValue[0].lng},${this.markersValue[0].lat}`;
    for (let i = 1; i < this.markersValue.length; i++) {
      apiUrl += `;${this.markersValue[i].lng},${this.markersValue[i].lat}`;
    }
    apiUrl += `?geometries=geojson&access_token=${this.apiKeyValue}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const routes = data.routes;
        routes.forEach((route, index) => {
          const routeGeometry = route.geometry;
          this.map.on("load", () => {
            this.map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                'type': 'geojson',
                'data': {
                  'type': 'Feature',
                  'properties': {},
                  'geometry': {
                    'type': 'LineString',
                    'coordinates': routeGeometry.coordinates
                  },
                }
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#FFD952',
                'line-width': 4,
                'line-opacity': 0.75
              }
            })
          })
        })
      })
    }
  }
}
