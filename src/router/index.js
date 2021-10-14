import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Characters from '../views/Characters.vue';
import CharacterDetails from '../views/CharacterDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/characters',
  },
  {
    path: '/characters',
    name: 'Character list',
    component: Characters,
  },
  {
    path: '/characters/:id',
    name: 'Character',
    props: true,
    component: CharacterDetails,
  },

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
