import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import HomeView from '../views/HomeView.vue'
import TopArtists from '../components/TopArtists'
import TopTracks from '../components/TopTracks'
import Playlists from '../components/Playlists'
import Playlist from '../components/Playlist'
import Artist from '../components/Artist'
import Track from '../components/Track'
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
  },
  {
    path: '/tracks',
    name: 'tracks',
    component: TopTracks,
  },
  {
    path: '/track/:id',
    name: 'track',
    props: true,
    component: Track,
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: Playlists,
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    props: true,
    component: Playlist,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  let isAuthenticated = false;

  if (to.name == 'home' && to.query.success == 'true') {
    console.log('setting token', to);
    await setLocalAccessToken(to.query.access_token);
    await setLocalRefreshToken(to.query.refresh_token);
    isAuthenticated = true;
  }
  else if (getAccessToken()) {
    isAuthenticated = true;
  }
  
  if (!isAuthenticated && to.name !== 'login') {
    console.log('to login page')
    next({ name: 'login'});
  }

  const hasQueryParams = Object.keys(to.query).length > 0;
  if (hasQueryParams) {
    next({ path: to.path, query: null });
  } else {
    next();
  }
});

export default router
