<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted, watch, defineProps } from 'vue'
import * as L from 'leaflet'
import type { Map } from '../types'

const props = defineProps<Map>()

let map: L.Map | undefined
let marker: L.Marker | undefined

onMounted(() => {
  map = L.map('map').setView(props.center, props.zoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  marker = L.marker(props.markerPosition).addTo(map).openPopup()
})

watch(
  () => props.center,
  (newCenter) => {
    if (map) {
      map.setView(newCenter, map.getZoom())
    }
  }
)

watch(
  () => props.markerPosition,
  (newMarkerPosition) => {
    if (marker) {
      marker.setLatLng(newMarkerPosition).openPopup()
    }
  }
)

watch(
  () => props.zoom,
  (newZoom) => {
    if (map) {
      map.setZoom(newZoom)
    }
  }
)
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
