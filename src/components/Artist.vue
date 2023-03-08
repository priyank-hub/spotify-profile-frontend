<template>
    <layout>
        <div class="text-white">
            <div v-if="loading" class="mt-5">
                Loading
            </div>
            
            <div v-else-if="error">
                <div class="row mx-0 justify-content-center align-items-center text-white" style="min-height: 100vh">
                    <div class="">
                        <img src="/assets/warning.png" width="50px" alt="">
                        <div class="my-3">
                        {{ errorReason }}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-left artist" v-else-if="artistData">
                <div class="font-weight-bold font-size-xl">
                    <span class="text-accent">
                        <!-- <router-link to="/artists" class="text-decoration-none text-accent">
                            <i class="fas fa-chevron-left"></i>
                            Artists
                        </router-link> -->
                        <span @click="$router.go(-1)" class="cursor-pointer">
                            <i class="fas fa-chevron-left"></i>
                            Back
                        </span>
                    </span>
                    / {{ artistData.name }}
                </div>
                
                <div class="my-5">
                    <div class="text-center">
                        <b-avatar v-if="artistData.images && artistData.images.length > 0" :src="artistData.images[0].url" size="15em"></b-avatar>
                        <div class="text-white fw-bold display-5 my-4">
                            {{ artistData.name }}
                        </div>

                        <div class="row mx-0 justify-content-center">
                            <div class="col-12 col-lg-3 mb-3">
                                <div class="text-accent font-size-lg font-weight-bold">
                                    {{ artistData.followers && artistData.followers.total.toLocaleString() }}
                                </div>
                                <div class="text-grey font-size-sm fw-bold mt-2">
                                    FOLLOWERS
                                </div>
                            </div>

                            <div class="col-12 col-lg-3 mb-3">
                                <div class="text-accent font-size-lg font-weight-bold">
                                    <span v-if="artistData.genres && artistData.genres.length > 0">
                                        <span v-for="(genre, index) in artistData.genres" :key="index">
                                            {{ genre }}<span v-if="index != artistData.genres.length - 1">, </span>
                                        </span>
                                    </span>
                                    <span v-else>
                                        ---
                                    </span>
                                </div>
                                <div class="text-grey font-size-sm fw-bold mt-2">
                                    GENRES
                                </div>
                            </div>

                            <div class="col-12 col-lg-3 mb-3">
                                <div class="text-accent font-size-lg font-weight-bold">
                                    {{ artistData.popularity }} %
                                </div>
                                <div class="text-grey font-size-sm fw-bold mt-2">
                                    POPULARITY
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-left mt-5">
                        <h5 class="font-size-lg fw-bolder mb-4">Top Tracks Of {{ artistData.name }}</h5>

                        <div>
                            <ul class="p-0 tracks">
                                <li v-for="item in topTracksData.tracks" :key="item.id" class="item px-2 py-3" style="list-style-type: none">
                                    <router-link class="text-decoration-none text-white" :to="{
                                        name: 'track',
                                        params: {
                                            id: item.id
                                        }
                                    }">
                                        <div class="d-flex flex-row align-items-center justify-content-start">
                                            <div class="">
                                                <img v-if="item.album.images && item.album.images.length > 0" :src="item.album.images[0].url" class="rounded" alt="">
                                            </div>
                                            <div class="col-10 text-left">
                                                <div class="mx-3">
                                                    <div class="fw-bold">
                                                        {{ item.name }}
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
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </layout>
</template>

<script>
import axios from 'axios';
import { getAccessToken } from '@/Utils/index';
export default {
  name: 'Artist',
  props: {
    id: String
  },
  data() {
    return {
        loading: false,
        artistData: null,
        topTracksData: null,
        error: false,
        errorReason: null,
    }
  },
  async mounted() {
    let headers = {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    };

    this.loading = true;

    await axios.all([this.getArtist(headers), this.getArtistTopTracks(headers)])
    .then(
      axios.spread((artist, topTracks) => {
        this.artistData = artist.data;
        this.topTracksData = topTracks.data;
      }),
    )
    .catch(err => {
      this.error = true;
      this.errorReason = err.response.data;
    });

    this.loading = false;
  },
  methods: {
    getArtist(headers) {
      return axios.get(`https://api.spotify.com/v1/artists/${this.id}`, { headers }); 
    },
    getArtistTopTracks(headers) {
      return axios.get(`https://api.spotify.com/v1/artists/${this.id}/top-tracks?market=AE`, { headers }); 
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 768px) {
  .artist {
    margin: 0px;
  }

  .tracks img {
    width: 70px !important;
  }
}

.tracks img {
    width: 90px;
}

.artist {
  margin: 30px;
}

.item {
    transition: 0.3s all;
}

.item:hover {
    background: black;
    border-radius: 20px;
}
</style>
