<template>
    <layout>
      <div class="text-white">
        <div v-if="loading" class="mt-5">
          Loading
        </div>

        <div class="artists" v-else-if="artistsData">
          <div class="text-left">
            <div class="font-weight-bold font-size-xl">Top Artists Of All Time</div>
          </div>
          <div class="row mx-0 my-5">
            <div class="col-6 col-lg-3 col-xl-2 mb-5" v-for="item in artistsData.items" :key="item.id">
              <div class="">
                <div class="">
                  <router-link :to="{
                    name: 'artist',
                    params: {
                      id: item.id
                    }
                  }">
                    <div class="avatar position-relative m-auto" style="width: 90px">
                      <b-avatar v-if="item.images && item.images.length > 0" :src="item.images[0].url" size="90px"></b-avatar>
                      <b-avatar v-else size="90px" src="/assets/user.png"></b-avatar>

                      <div class="info">
                        <i class="fas fa-info"></i>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="mt-3">
                  <span class="font-size-md font-weight-bold text-grey">{{ item.name }}</span>
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
  name: 'TopArtists',
  props: {
    
  },
  data() {
    return {
      loading: false,
      artistsData: false,
    }
  },
  async mounted() {
    let headers = {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    };

    this.loading = true;

    await this.getTopArtistsLong(headers)
    .then(response => {
      console.log('response', response);
      this.loading = false;
      if (response.status == 200) {
        this.artistsData = response.data;
      }
    });

    this.loading = false;
  },
  methods: {
    getTopArtistsLong(headers) {
      return axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers }); 
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 768px) {
  .artists {
    margin: 0px;
  }
}

.artists {
  margin: 30px;
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
  border-radius: 100%;
  font-size: 20px;
  color: rgb(255, 255, 255);
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1) 0s;
}

.avatar:hover .info{
  opacity: 1 !important;
}
</style>
