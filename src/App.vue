<template>
  <header>
    <h1>IP Address Tracker</h1>
    <SearchBar v-model:inputIPAddress="inputIPAddress" />
    <SearchResult
      v-if="!isLoading"
      :ip="ip"
      :city="city"
      :region="region"
      :country="country"
      :timezone="timezone"
      :utc="utc"
      :isp="isp"
    />
  </header>
  <main>
    <InteractiveMap :center="center" :zoom="zoom" :markerPosition="markerPosition" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Response } from './types'
import axios from 'axios'
import SearchBar from '@/components/SearchBar.vue'
import SearchResult from '@/components/SearchResult.vue'
import InteractiveMap from '@/components/InteractiveMap.vue'
import { formatTimezone } from '@/utils/formatUtc'

const inputIPAddress = ref<string>('')
const center = ref<[number, number]>([0, 0])
const zoom = ref<number>(5)
const markerPosition = ref<[number, number]>([0, 0])
const ip = ref<string>('')
const city = ref<string>('')
const region = ref<string>('')
const country = ref<string>('')
const timezone = ref<string>('')
const utc = ref<string>('')
const isp = ref<string>('')
const isLoading = ref<boolean>(true)

const getIpAndLocation = async (ipInput = ''): Promise<void> => {
  try {
    let ipToUse = ipInput || inputIPAddress.value
    if (!ipToUse) {
      const ipResponse = await axios.get('https://api.ipify.org?format=json')
      ipToUse = ipResponse.data.ip
    }

    ip.value = ipToUse

    const locationResponse = await axios.get<Response>(`https://ipapi.co/${ipToUse}/json/`)
    const {
      latitude,
      longitude,
      city: locCity,
      region: locRegion,
      country_name,
      timezone: locTimezone,
      utc_offset,
      org
    } = locationResponse.data

    center.value = [latitude, longitude]
    markerPosition.value = [latitude, longitude]
    city.value = locCity
    region.value = locRegion
    country.value = country_name
    timezone.value = locTimezone
    utc.value = formatTimezone(utc_offset)
    isp.value = org

    isLoading.value = false
  } catch (error) {
    console.error('Failed to retrieve IP or location data:', error)
  }
}

const initialize = async (): Promise<void> => {
  await getIpAndLocation()
}

onMounted(() => {
  initialize()
})

watch(inputIPAddress, (newIp) => {
  if (newIp) {
    getIpAndLocation(newIp)
  }
})
</script>

<style scoped lang="scss">
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25vh;
  background-image: url('./assets/pattern-bg-desktop.png');
  background-size: cover;
  background-repeat: no-repeat;
  h1 {
    position: relative;
    top: 1.5rem;
    color: white;
    @media (max-width: 950px) {
      top: 10rem;
    }
  }
}
main {
  height: 75vh !important;
  width: 100vw;
}
</style>
