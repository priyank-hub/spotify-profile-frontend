import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TopArtists from '../components/TopArtists'
import Artist from '../components/Artist'
import Login from '../components/Login'
import { getAccessToken, setLocalAccessToken, setLocalRefreshToken } from '@/Utils/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/artists',
    name: 'artists',
    component: TopArtists,
  },
  {
    path: '/artist/:id',
    name: 'artist',
    props: true,
    component: Artist,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  let isAuthenticated = false;

  if (to.name == 'home' && to.query.success == 'true') {
    console.log('setting token');
    await setLocalAccessToken(to.query.access_token);
    await setLocalRefreshToken(to.query.refresh_token);
    isAuthenticated = true;
  }
  else if (getAccessToken()) {
    isAuthenticated = true;
  }
  
  if (!isAuthenticated && to.name !== 'login') {
    console.log('to login page')
    next({ name: 'login' });
  }

  next();
});

export default router
