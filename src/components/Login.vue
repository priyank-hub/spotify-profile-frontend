<template>
  <div class="row align-items-center justify-content-center mx-0 text-white" style="min-height: 100vh">
    <div class="">
      <div class="display-5" style="font-weight: 900">
        Spotify Profile
      </div>
      <div class="my-4">
        <b-button class="bg-accent text-white button-spotify fw-bold border-0 py-3 px-5">
          <a :href="url" class="text-decoration-none text-white">
            LOG IN TO SPOTIFY
          </a>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      url: process.env.VUE_APP_ENV == 'local' ? 'http://localhost:3000/api/spotify-login' : 'https://spotify-profile-backend.herokuapp.com/api/spotify-login',
    }
  },
  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
