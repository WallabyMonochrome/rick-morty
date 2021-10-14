<template>
  <div>
    <button v-bind:class="type" v-on:click="action">{{ message }}</button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    message: String,
    action: Function,
    type: String,
  },
};
</script>

<style scoped lang="scss">
button {
  padding: var(--spacing_0) var(--spacing_2);
  font-size: var(--font_1);
    &:hover {
    transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    cursor: pointer;
    transform: scale(0.9);
  }
}
.main {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background: #16A7C3;
  color: white;
  border: 0px;
}
.secondary {
  background: transparent;
  border: 0px solid #16A7C3;
  color: #16A7C3;
  padding: var(--spacing_0) var(--spacing_0);

}
</style>
