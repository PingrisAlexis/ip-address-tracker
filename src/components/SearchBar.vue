<template>
  <div :class="{ shake: isInvalidAfterSubmit }">
    <input
      v-model="inputIPAddress"
      @input="handleInput"
      placeholder="Search for any IP address"
      :class="{ invalid: isInvalidAfterSubmit && !isValid }"
    />
    <button @click="searchIp">
      <img src="../assets/icon-arrow.svg" alt="" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{ inputIPAddress: string }>()

const emit = defineEmits(['update:inputIPAddress'])

const inputIPAddress = ref<string>(props.inputIPAddress)
const isValid = ref<boolean>(true)
const isInvalidAfterSubmit = ref<boolean>(false)

watch(
  () => props.inputIPAddress,
  (newVal) => {
    inputIPAddress.value = newVal
  }
)

const validateIp = (): void => {
  const ipRegex =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  isValid.value = ipRegex.test(inputIPAddress.value)
}

const handleInput = (): void => {
  validateIp()
  if (isValid.value) {
    isInvalidAfterSubmit.value = false
  }
}

const searchIp = (): void => {
  validateIp()
  if (isValid.value) {
    emit('update:inputIPAddress', inputIPAddress.value)
  } else {
    isInvalidAfterSubmit.value = true
    setTimeout(() => {
      isInvalidAfterSubmit.value = false
    }, 500)
  }
}
</script>

<style scoped lang="scss">
div {
  display: flex;
  width: 40rem;
  height: 20rem !important;
  position: relative;
  top: 3rem;
  @media (max-width: 1050px) {
    width: 33rem;
  }
  @media (max-width: 950px) {
    top: 11rem;
  }
  input {
    height: 100%;
    font-size: 1.7rem;
    width: 85%;
    border-radius: 0.5rem 0rem 0rem 0.5rem;
    @media (max-width: 1050px) {
      font-size: 1.5rem;
    }
    @media (max-width: 950px) {
      top: 10rem;
    }
    &::placeholder {
      color: #9e9e9e;
    }
    &:focus {
      outline: none;
      border: none;
    }
  }
  .invalid {
    color: red;
    border: 1px solid red;
    background-color: #ffe6e6;
  }
  button {
    width: 15%;
    border-radius: 0rem 0.5rem 0.5rem 0rem;
    cursor: pointer;
    background-color: #333;
  }
  input,
  button {
    border: none;
    height: 5rem;
    @media (max-width: 1050px) {
      height: 4rem;
    }
    @media (max-width: 768px) {
      top: 10rem;
    }
  }
  .shake {
    animation: shake 0.5s;
  }
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0);
    }
  }
  .error-message {
    color: red;
    font-size: 1rem;
    position: absolute;
    top: 8rem;
    left: 0;
  }
}
</style>
