<template>
  <div class="loader" v-bind:class="classObject">
    <img :src="pickle" alt="Pickle Rick loader" />
  </div>
</template>

<script>
import pickleRick from '@/assets/pickleRick.png';

export default {
  name: 'Loader',
  props: {
    type: String,
  },
  data() {
    return {
      classObject: {
        [this.type]: true,
      },
      pickle: pickleRick,
    };
  },
};
</script>

<style scoped lang="scss">
.big {
  img {
    height: 200px !important;
  }
}
.loader {
  z-index: 2;
  opacity: 1;
  transition: transform 0.5s ease-out;
  transition: opacity 0.5s ease-out;
  pointer-events: none;
  img {
    animation: rotate 2s ease-in-out infinite alternate;
    height: 60px;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
