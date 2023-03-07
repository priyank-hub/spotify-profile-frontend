<template>
    <layout>
        <div class="text-white">
            <div v-if="loading" class="mt-5">
                Loading
            </div>

            <div class="text-left artist" v-else-if="playlistData">
                <div class="font-weight-bold font-size-xl">
                    <span class="text-accent">
                        <span @click="$router.go(-1)" class="cursor-pointer">
                            <i class="fas fa-chevron-left"></i>
                            Back
                        </span>
                    </span>
                    / {{ playlistData.name }}
                </div>
                
                <div class="my-5">
                    <div class="row mx-0 align-items-start">
                        <div class="col-12 col-lg-3 mb-3">
                            <div class="">
                                <img v-if="playlistData.images && playlistData.images.length > 0" :src="playlistData.images[0].url" class="w-100 rounded" alt="">
                            </div>
                            <div class="text-white fw-bold display-5 mt-4 text-center">
                                {{ playlistData.name }}
                            </div>
                            <div class="text-grey font-size-sm mt-2 text-center">
                                By {{ playlistData.owner.display_name }}
                            </div>
                            <div class="text-white font-size-md mt-4 text-center">
                                {{ playlistData.tracks.items.length }} Tracks
                            </div>
                        </div>
                        <div class="col-12 col-lg-9 mb-3">
                            <div class="row mx-0">
                                <div class="col-12 pb-4 px-0" v-for="item in playlistData.tracks.items" :key="item.id">
                                    <router-link class="text-decoration-none text-white" :to="{
                                        name: 'track',
                                        params: {
                                            id: item.track.id
                                        }
                                    }">
                                        <div class="row mx-0 w-100 align-items-center">
                                            <div class="col-3 col-lg-1 px-0">
                                                <img width="70px" class="rounded" v-if="item.track.album.images && item.track.album.images.length > 0" :src="item.track.album.images[0].url" alt="">
                                            </div>
                                            <div class="col-9 col-lg-11 px-0">
                                                <div class="row mx-0 justify-content-between">
                                                    <div class="col-12">
                                                        <div class="fw-bold font-size-md">
                                                            {{ item.track.name }}
                                                        </div>
                                                        <div class="text-grey fw-bolder font-size-sm mt-1">
                                                            <span v-for="(artist, index) in item.track.artists" :key="index">
                                                                {{ artist.name }}
                                                                <span v-if="index != item.track.artists.length - 1">
                                                                    ,
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <!-- <div class="col-2 text-right">
                                                        <span class="font-size-sm text-grey">
                                                            {{ parseInt(parseInt(item.track.duration_ms) / 1000 / 60) }} : {{ parseInt(parseInt(item.track.duration_ms) / 1000) }}
                                                        </span>
                                                    </div> -->
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
  name: 'Playlist',
  props: {
    id: String
  },
  data() {
    return {
        loading: false,
        playlistData: null,
    }
  },
  async mounted() {
    let headers = {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    };

    this.loading = true;

    await this.getPlaylist(headers)
    .then(response => {
        if (response.status == 200){
            this.playlistData = response.data;
        }
    })

    this.loading = false;
  },
  methods: {
    getPlaylist(headers) {
        return axios.get(`https://api.spotify.com/v1/playlists/${this.id}`, { headers });
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
