<template>
    <layout>
        <div class="text-white">
            <div v-if="loading" class="mt-5">
                Loading
            </div>

            <div class="playlists" v-else-if="playlistsData">
                <div class="font-weight-bold font-size-xl text-left mx-3 mt-4">Playlists</div>
                <div class="row mx-0 my-5">
                    <div class="col-6 col-md-3 col-lg-2 mb-5" v-for="item in playlistsData.items" :key="item">
                        <router-link class="text-decoration-none text-white" :to="{
                            name: 'playlist',
                            params: {
                                id: item.id
                            }
                        }">
                            <div class="avatar position-relative">
                                <img v-if="item.images && item.images.length > 0" :src="item.images[0].url" class="w-100 rounded" alt="">
                                <div class="info">
                                    <i class="fas fa-info-circle"></i>
                                </div>
                            </div>
                            <div class="mt-3">
                                <div class="text-white fw-bold font-size-sm">
                                    {{ item.name }}
                                </div>
                                <div class="text-grey font-size-sm">
                                    {{ item.tracks && item.tracks.total }} Tracks
                                </div>
                            </div>
                        </router-link>
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
  name: 'Playlists',
  props: {
    
  },
  data() {
    return {
      loading: false,
      playlistsData: false,
    }
  },
  
  async mounted() {
    let headers = {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    };

    this.loading = true;

    await this.getPlaylists(headers)
    .then(response => {
      this.loading = false;
      if (response.status == 200) {
        this.playlistsData = response.data;
      }
    });

    this.loading = false;
  },

  methods: {
    getPlaylists(headers) {
      return axios.get('https://api.spotify.com/v1/me/playlists', { headers }); 
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 768px) {
  .playlists {
    margin: 0px !important;
  }
}

.playlists {
  margin: 30px;
}

.playlist {
    transition: 0.3s all;
}

.playlist:hover {
    background: black;
    border-radius: 20px;
}

.info {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: absolute;
  /* width: 100%;
  height: 100%; */
  background-color: rgba(0, 0, 0, 0.5);
  inset: 0px;
  font-size: 20px;
  color: rgb(255, 255, 255);
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1) 0s;
}

.avatar:hover .info{
  opacity: 1 !important;
}
</style>
