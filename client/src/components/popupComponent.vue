<template>
  <transition name="popup">
    <div class="popup__bc" v-if="isOpen" @click.self="$emit('closing')">

      <div class="popup__body row p-0 m-0">
        <div class="col-10 offset-1 text-bg-light p-4 mt-5 rounded-3">
          <slot></slot>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: "popupComponent",
  props:{
    isOpen: {type: Boolean}
  },
}
</script>

<style scoped>
.popup__bc{
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(1,1,1,0.3);
  width: 100vw;
  height: 100vh;
  margin: 0;
  z-index: 2;
}
.popup-enter-active,
.popup-leave-active {
  transition: all 0.1s ease;
}

.popup-enter-from,
.popup-leave-to {
  transition: all 0.3s ease;
  opacity: 0;
}
.popup-enter-active .popup__body,
.popup-leave-active .popup__body {
  transition: all 0.2s ease 0.2s;
}

.popup-enter-from .popup__body,
.popup-leave-to .popup__body {
  transform: translateY(-300px);
  transition: all 0.3s ease;
}
</style>