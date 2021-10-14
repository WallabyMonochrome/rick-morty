<template>
  <div id="characters-view">
    <div class="menu-bar">
      <img class="app-title" src="app-title.png" alt="Rick and morty finder" />
      <input
        v-on:input="(event) => updateSearch(event)"
        type="text"
        :value="searchValue"
        v-on:keyup.enter="fetchCharacters"
        placeholder="Rick, Morty, Jerry..."
      />
      <div style="display: flex">
        <Button message="Search" type="main" :action="fetchCharacters" />
        <Button message="Reset" type="secondary" :action="resetSearchValue" />
      </div>
      <div><vue-file-toolbar-menu :content="my_menu" /></div>
      <div id="page-container">
        <button
          class="material-icons button_icon"
          v-if="currentPage > 1"
          v-on:click="getPreviousPage"
          >arrow_back
        </button>
        <button class="material-icons button_icon disabled" v-else
          >arrow_back
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
          class="material-icons button_icon"
          v-on:click="getNextPage"
          v-if="currentPage < totalPages"
          >arrow_forward</button
        >
        <button class="material-icons button_icon disabled" v-else
          >arrow_forward</button>
      </div>
      <div v-if="loadingCharacters" class="loader-container">
        <div >
          <Loader />
        </div>
      </div>
    </div>
    <div>
      <div id="characters_list" v-if="!loadingCharacters">
        <div v-if="characters.length === 0">Well nothing was found...</div>
        <div v-for="info in characters" :key="info.id">
          <div>
            <CharacterCard
              :name="info.name"
              :image="info.image"
              :status="info.status"
              :id="info.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueFileToolbarMenu from 'vue-file-toolbar-menu';
import CharacterCard from '@/components/CharacterCard.vue';
import Loader from '@/components/Loader.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Characters',
  components: {
    CharacterCard,
    Loader,
    Button,
    VueFileToolbarMenu,
  },
  data() {
    return {
      appTitle: '@/assets/app-title.png',
      info: null,
    };
  },
  computed: {
    filtering() {
      return this.$store.getters.getFiltering;
    },
    searchValue() {
      return this.$store.getters.getSearchValue;
    },
    characters() {
      return this.$store.getters.getCharacter;
    },
    loadingCharacters() {
      return this.$store.getters.getLoaderCharacters;
    },
    currentPage() {
      return this.$store.getters.getCurrentPage;
    },
    totalPages() {
      return this.$store.getters.getTotalPage;
    },
    my_menu() {
      return [
        {
          text: 'Filtering',
          icon: 'filter_list',
          menu: [
            {
              text: 'All',
              icon:
                this.filtering === 'All'
                  ? 'check_box'
                  : 'check_box_outline_blank',
              click: () => this.toggleFilter('All'),
            },
            {
              text: 'Alive',
              emoji: 'ok_hand',
              icon:
                this.filtering === 'Alive'
                  ? 'check_box'
                  : 'check_box_outline_blank',
              click: () => this.toggleFilter('Alive'),
            },
            {
              text: 'Dead',
              emoji: 'skull',
              icon:
                this.filtering === 'Dead'
                  ? 'check_box'
                  : 'check_box_outline_blank',
              click: () => this.toggleFilter('Dead'),
            },
            {
              text: 'Unkown',
              emoji: 'question',
              icon:
                this.filtering === 'unknown'
                  ? 'check_box'
                  : 'check_box_outline_blank',
              click: () => this.toggleFilter('unknown'),
            },
          ],
        },
      ];
    },
  },
  methods: {
    toggleFilter(value) {
      this.$store.dispatch('setFiltering', value);
      this.$store.dispatch('fetchCharacters');
    },
    updateSearch(e) {
      const { value } = e.target;
      this.$store.dispatch('setSearchValue', value);
    },
    fetchCharacters() {
      this.$store.dispatch('fetchCharacters');
    },
    resetSearchValue() {
      this.$store.dispatch('setSearchValue', '');
      this.$store.dispatch('fetchCharacters');
    },
    getNextPage() {
      this.$store.dispatch('setCurrentPage', this.currentPage + 1);
      this.$store.dispatch('getOtherPage');
    },
    getPreviousPage() {
      this.$store.dispatch('setCurrentPage', this.currentPage - 1);
      this.$store.dispatch('getOtherPage');
    },
  },
  mounted() {
    if (!this.characters.length) {
      this.$store.dispatch('fetchCharacters');
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/characters.scss';
</style>
