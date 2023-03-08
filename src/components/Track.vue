<template>
    <layout>
        <div class="text-white">
            <div v-if="loading" class="mt-5">
                Loading
            </div>

            <div class="text-left artist" v-else-if="trackData">
                <div class="font-weight-bold font-size-xl">
                    <span class="text-accent">
                        <!-- <router-link to="/tracks" class="text-decoration-none text-accent">
                            <i class="fas fa-chevron-left"></i>
                            Tracks
                        </router-link> -->
                        <span @click="$router.go(-1)" class="cursor-pointer">
                            <i class="fas fa-chevron-left"></i>
                            Back
                        </span>
                    </span>
                    / {{ trackData.name }}
                </div>

                <div class="my-5">
                    <div class="row mx-0 align-items-center">
                        <div class="col-12 col-lg-3 mb-3">
                            <img v-if="trackData.album.images && trackData.album.images.length > 0" :src="trackData.album.images[0].url" width="100%">
                        </div>

                        <div class="col-12 col-lg-9 mb-3">
                            <div class="">
                                <div class="text-white fw-bold display-5">
                                    {{ trackData.name }}
                                </div>
                            </div>

                            <div class="mt-2">
                                <span v-for="(artist, index) in trackData.artists" :key="index" class="font-weight-bold font-size-lg text-grey">
                                    <router-link class="text-accent" :to="{
                                        name: 'artist',
                                        params: {
                                            id: artist.id
                                        }    
                                    }">
                                        {{ artist.name }}
                                    </router-link>
                                    <span v-if="index != trackData.artists.length - 1">
                                        ,
                                    </span>
                                </span>
                            </div>
                            <div class="text-grey font-size-lg fw-bold">
                                {{ trackData.album.name }}
                            </div>
                            <div class="font-size-md text-grey">
                                {{ Math.ceil(parseFloat(trackData.duration_ms) /  1000 / 60) }}m
                            </div>
                            <div class="mt-3">
                                <a :href="trackData.external_urls.spotify" target="_blank" class="text-decoration-none text-white">
                                    <b-button class="bg-accent text-white button-spotify-accent px-4 py-2">
                                        <span class="font-size-sm">
                                            PLAY ON SPOTIFY
                                        </span>
                                    </b-button>
                                </a>
                            </div>

                            <div class="mt-3">
                                <div class="text-grey font-size-sm">
                                    Preview
                                </div>
                                <video controls name="media">
                                    <source :src="trackData.preview_url" type="audio/mpeg">
                                </video>
                            </div>
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
  name: 'Track',
  props: {
    id: String
  },
  data() {
    return {
        loading: false,
        trackData: null,
    }
  },
  async mounted() {
    let headers = {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    };

    this.loading = true;

    await this.getTrack(headers)
    .then(response => {
        if (response.status == 200){
            this.trackData = response.data;
        }
    })

    this.loading = false;
  },
  methods: {
    getTrack(headers) {
        return axios.get(`https://api.spotify.com/v1/tracks/${this.id}?market=AE`, { headers }); 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 768px) {
  .artist {
    margin: 10px !important;
  }

  .tracks img {
    width: 70px !important;
  }

  video {
    width: 100% !important;
}
}

.tracks img {
    width: 90px;
}

.artist {
  margin: 30px;
}

video {
    height: 60px;
    width: 50%;
}
</style>
