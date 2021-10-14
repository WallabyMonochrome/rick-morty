<template>
  <div>
    <div v-if="!loadingCharacterDetails" id="character-page">
      <div id="character-image">
        <img :src="info.image" alt="character image" />
      </div>
      <div id="character-data">
        <div class="title">{{ info.name }}</div>
        <div class="info">
          <div class="info-type">Status</div>
          {{ info.status }}
        </div>
        <div class="info">
          <div class="info-type">Species</div>
          {{ info.species }}
        </div>
        <div v-if="info.type" class="info">
          <div class="info-type">Type</div>
          {{ info.type }}
        </div>
        <div class="info">
          <div class="info-type">Gender</div>
          {{ info.gender }}
        </div>
        <div class="info">
          <div class="info-type">Origin</div>
          {{ info.origin.name }}
        </div>
        <div class="info">
          <div class="info-type">Location</div>
          {{ info.location.name }}
        </div>
        <div class="info">
          <div class="info-type">Appearances</div>
          {{ info.episode.length }} / 51
        </div>
        <div class="info">
          <div class="info-type">Created</div>
          {{ creationDate }}
        </div>
      </div>
      <router-link class="back-link" to="/characters">
        <span class="material-icons">arrow_back</span>
      </router-link>
    </div>
    <div v-else class="loader-container">
      <div v-if="loadingCharacterDetails">
        <Loader :loading="loadingCharacterDetails" type="big"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Loader from '@/components/Loader.vue';

export default {
  name: 'CharacterDetails',
  components: {
    Loader,
  },
  props: {
    id: String,
  },
  mounted() {
    this.$store.dispatch('fetchSelectedCharacterInfo', parseInt(this.id, 10));
  },
  computed: {
    info() {
      return this.$store.getters.getSelectedCharacterInfo;
    },
    creationDate() {
      if (this.info) {
        return moment(this.info.created).format('L');
      }
      return '';
    },
    loadingCharacterDetails() {
      return this.$store.getters.getLoaderCharacterDetails;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/characterDetails.scss";
</style>
