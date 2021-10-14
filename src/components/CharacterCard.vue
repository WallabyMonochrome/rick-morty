<template>
  <router-link :to="{ path: '/characters/' + this.id }">
    <div class="character_card">
      <div style="display: flex">
        <img v-bind:src="image" />
      </div>
      <div class="character_info">
        <div class="character_info__name">
          {{ name }}
        </div>
        <div class="character_info__species">
          {{ status }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    name: String,
    image: String,
    status: String,
    id: Number,
    router: Object,
  },
};
</script>

<style lang='scss' scoped>
.character_card {
  width: 300px;
  margin: var(--spacing_0);
  position: relative;
  overflow: hidden;
  transform: transform 0.75s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  animation: reveal 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    transform: translate(0%, 200%);
    background: rgba(139, 247, 42, 0.8);
    transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    border-radius: 16px;
    pointer-events: none;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    .character_info {
      opacity: 1;
    }
    &::after {
      transform: translate(0%, 0%);
    }
  }
  .character_info {
    opacity: 0;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    transform: translateY(50%);
    transition: opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    .character_info__name {
      font-size: var(--font_4);
      font-weight: 600;
      color: var(--font_dark);
    }
    .character_info__species {
      font-size: var(--font_2);
      font-weight: 500;
      color: var(--font_medium);
    }
  }
}
</style>
