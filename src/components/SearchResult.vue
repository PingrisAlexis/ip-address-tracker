<template>
  <ul>
    <li>
      <span>IP ADDRESS</span>
      <span>{{ props.ip }}</span>
    </li>
    <div class="separator"></div>
    <li>
      <span>LOCATION</span>
      <span>{{ props.city + ',' }}</span>
      <span>{{ props.region + ',' }}</span>
      <span>{{ props.country }}</span>
    </li>
    <div class="separator"></div>
    <li>
      <span>TIMEZONE</span>
      <span>{{ props.timezone + ',' }}</span>
      <span>{{ props.utc }}</span>
    </li>
    <div class="separator"></div>
    <li>
      <span>ISP</span>
      <span>{{ props.isp }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Data } from '../types'

const props = defineProps<Data>()
</script>

<style scoped lang="scss">
ul {
  display: flex;
  justify-content: space-around;
  background-color: white;
  border-radius: 0.5rem;
  height: max-content;
  position: relative;
  top: 6.5rem;
  z-index: 9999;
  padding: 0;
  @media (max-width: 950px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 14rem;
    width: 33rem;
  }
  li {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    @media (max-width: 1050px) {
      padding: 1rem;
    }
    @media (max-width: 950px) {
      justify-content: center;
      align-items: center;
      padding: 0.3rem;
    }
    span {
      font-size: 1.7rem;
      @media (max-width: 1050px) {
        font-size: 1.5rem;
        text-align: center;
      }
    }
    :nth-child(1) {
      color: #9e9e9e;
      font-weight: lighter;
    }
    :nth-child(n + 2) {
      color: #333;
      font-weight: 700;
    }
  }
  .separator {
    background-color: #d3d3d3;
    width: 0.22rem;
    height: 50%;
    position: relative;
    top: 4rem;
  }
}
</style>
