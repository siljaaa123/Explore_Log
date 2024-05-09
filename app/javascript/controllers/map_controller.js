import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl' // Don't forget this!
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"


export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
    // journeyLocation: Array
  }

  connect() {

    mapboxgl.accessToken = this.apiKeyValue
    if (this.markersValue === null) {
      this.markersValue = [];
    }

    console.log(this.markersValue)
    if (this.element.dataset.journeyLocation) {
      const journeyLocation = JSON.parse(this.element.dataset.journeyLocation)
      this.map = new mapboxgl.Map({
        container: this.element,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [journeyLocation.lng, journeyLocation.lat],
        zoom: 10
      })
    } else {
      this.map = new mapboxgl.Map({
        container: this.element,
        style: "mapbox://styles/mapbox/satellite-streets-v12"
      })
      this.#addMarkersToMap()
      this.#fitMapToMarkers()
    }
    this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }))
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
        // this.#centerMapToLocation()
    }
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }

  // #centerMapToLocation() {

  //   console.log(journeyLocation.lat)
  // }
}
