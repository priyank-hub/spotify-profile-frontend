<template>
  <div>
    <layout>
      <div v-if="loading">
        Loading
      </div>

      <div v-else-if="userData" class="container pt-5 text-white">
        <div class="header">
          <div class="row mx-0 align-items-center">
            <div class="col-12 col-lg-2 mb-4">
              <b-avatar v-if="userData.images && userData.images.length > 0" :src="userData.images[0].url" size="6em"></b-avatar>
              <b-avatar v-else size="6em" src="/assets/user.png"></b-avatar>
            </div>
            <div class="col-12 col-lg-10 px-4">
              <div class="text-lg-left">
                <div class="font-size-sm fw-bold">
                  Profile
                </div>
                
                <div class="display-2 fw-bolder">{{ userData.display_name }}</div>
                
                <div class="d-flex flex-row mx-0 mt-4 fw-bolder">
                  <div class="">
                    <div class="text-accent fw-bold text-center">
                      {{ userData.followers && userData.followers.total }} 
                    </div>
                    <div class="text-grey font-size-sm">
                      FOLLOWERS
                    </div>
                  </div>

                  <div class="mx-4">
                    <div class="text-accent fw-bold text-center">
                      {{ playlistsData && playlistsData.items.length }} 
                    </div>
                    <div class="text-grey font-size-sm">
                      PLAYLISTS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="my-5">
          <b-button class="bg-transparent button-spotify px-5 py-2" @click="logoutSpotify()">
            Logout
          </b-button>
        </div>

        <div class="row mx-0 my-5">
          <div class="col-12 col-lg-6" v-if="topArtistsData">
            <div class="row mx-0 justify-content-between align-items-center mb-4">
              <h5 class="col mb-0 text-left font-size-lg fw-bolder">Top 10 Artists</h5>

              <div class="col text-right">
                <b-button class="bg-transparent button-spotify px-4">
                  <router-link to="/artists" class="text-decoration-none text-white">
                    <span class="font-size-sm">
                      SEE MORE
                    </span>
                  </router-link>
                </b-button>
              </div>
            </div>
            <div class="">
              <ul class="p-0">
                <li v-for="item in topArtistsData.items" :key="item.id" class="mb-4" style="list-style-type: none">
                  <router-link class="text-decoration-none text-white" :to="{
                    name: 'artist',
                    params: {
                      id: item.id
                    }
                  }">
                    <div class="row mx-0 align-items-center justify-content-start">
                      <div class="col">
                        <img v-if="item.images && item.images.length > 0" :src="item.images[0].url" width="92%" class="rounded-circle" alt="">
                      </div>
                      <div class="col-10 text-left">
                        <span class="fw-bold">
                          {{ item.name }}
                        </span>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>

          <hr class="d-lg-none my-4">

          <div class="col-12 col-lg-6">
            <!-- <h5 class="font-size-lg fw-bolder mb-4">Top 10 tracks of all time</h5>  -->
            <div class="row mx-0 justify-content-between align-items-center mb-4">
              <h5 class="col mb-0 text-left font-size-lg fw-bolder">Top 10 Tracks</h5>

              <div class="col text-right">
                <b-button class="bg-transparent button-spotify px-4">
                  <router-link to="/artists" class="text-decoration-none text-white">
                    <span class="font-size-sm">
                      SEE MORE
                    </span>
                  </router-link>
                </b-button>
              </div>
            </div>

            <div class="row mx-0">
              <ul class="p-0">
                <li v-for="item in topTracksData.items" :key="item.id" class="mb-4" style="list-style-type: none">
                  <div class="row mx-0 align-items-center justify-content-start">
                    <div class="col">
                      <img v-if="item.album.images && item.album.images.length > 0" :src="item.album.images[0].url" width="92%" class="rounded-0" alt="">
                    </div>
                    <div class="col-10 text-left">
                      <div class="fw-bold">
                        {{ item.name }}
                        <!-- <span class="font-size-xs text-grey">
                          ({{ Math.ceil(parseFloat(item.duration_ms) /  1000 / 60) }}m)
                        </span> -->
                      </div>
                      <div class="text-grey fw-bolder font-size-sm mt-1">
                        <span v-for="(artist, index) in item.artists" :key="index">
                          {{ artist.name }}
                          <span v-if="index != item.artists.length - 1">
                            ,
                          </span>
                        </span>
                        <span class="mx-1">
                          ·  
                        </span>
                        <span class="font-size-xs text-grey">
                          ({{ Math.ceil(parseFloat(item.duration_ms) /  1000 / 60) }}m)
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <!-- <div class="col-6 col-md-4 col-lg-3 mb-4" v-for="item in playlistsData.items" :key="item.id">
                <img :src="item.images[0].url" width="100%" alt="">
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </layout>
  </div>
</template>

<script>
import axios from 'axios';
import { getAccessToken, logout } from '@/Utils/index';
export default {
  name: 'UserProfile',
  props: {
    
  },
  data() {
    return {
      loading: false,
      userData: null,
      followingData: null,
      playlistsData: null,
    }
  },
  async mounted() {
    this.loading = true;

    let headers = {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    };

    await axios.all([this.getUser(headers), this.getFollowing(headers), this.getPlaylists(headers), this.getTopArtistsLong(headers), this.getTopTracksLong(headers)])
    .then(
      axios.spread((user, following, playlists, topArtists, topTracks) => {
        this.userData = user.data;
        this.followingData = following.data;
        this.playlistsData = playlists.data;
        this.topArtistsData = topArtists.data;
        this.topTracksData = topTracks.data;
      }),
    );

    //   .get('https://api.spotify.com/v1/me', { headers })
    //   .then(response => {
    //     if (response.status == 200) {
    //       this.userData = response.data;
    //       this.loading = false;
    //     }
    // });

    this.loading = false;
  },

  methods: {
    logoutSpotify() {
      logout();
    },

    getUser(headers) {
      return axios.get('https://api.spotify.com/v1/me', { headers });
    },

    getFollowing(headers) {
      return axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });
    },

    getPlaylists(headers) {
      return axios.get('https://api.spotify.com/v1/me/playlists', { headers });
    },

    getTopArtistsLong(headers) {
      return axios.get('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term', { headers }); 
    },

    getTopTracksLong(headers) {
      return axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term', { headers });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 3.5rem;
  font-weight: 900;
}
</style>
