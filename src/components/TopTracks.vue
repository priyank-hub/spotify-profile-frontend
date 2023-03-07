<template>
    <layout>
        <div class="text-white">
            <div v-if="loading" class="mt-5">
                Loading
            </div>

            <div v-else-if="tracksData" class="tracks">
                <div class="text-left mx-3 mt-4">
                    <div class="font-weight-bold font-size-xl">Top Tracks Of All Time</div>
                    <!-- {{ tracksData }} -->
                    <div class="row mx-0 my-5">
                        <div class="col-12 col-lg-6 p-3 track" v-for="item in tracksData.items" :key="item.id">
                            <div class="">
                                <div class="">
                                    <router-link class="d-flex flex-row align-items-center text-decoration-none" :to="{
                                        name: 'track',
                                        params: {
                                            id: item.id
                                        }
                                    }">
                                        <div class="position-relative" style="width: 90px">
                                            <img v-if="item.album.images && item.album.images.length > 0" :src="item.album.images[0].url" class="rounded" width="90px" alt="">
                                        </div>
                                        <div class="">
                                            <div class="mx-3">
                                                <span class="font-size-md font-weight-bold text-white">{{ item.name }}</span>
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
                                    </router-link>
                                </div>
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
  name: 'TopTracks',
  props: {
    
  },
  data() {
    return {
      loading: false,
      tracksData: false,
    }
  },
  
  async mounted() {
    let headers = {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    };

    this.loading = true;

    await this.getTopTracksLong(headers)
    .then(response => {
      this.loading = false;
      if (response.status == 200) {
        this.tracksData = response.data;
      }
    });

    this.loading = false;
  },

  methods: {
    getTopTracksLong(headers) {
      return axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers }); 
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 768px) {
  .tracks {
    margin: 0px !important;
  }
}

.tracks {
  margin: 30px;
}

.track {
    transition: 0.3s all;
}

.track:hover {
    background: black;
    border-radius: 20px;
}
</style>
