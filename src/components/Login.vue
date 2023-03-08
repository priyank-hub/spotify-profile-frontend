<template>
  <div class="row align-items-center justify-content-center mx-0 bg-dark text-white" style="min-height: 100vh">
    <div class="">
      <div>
        Spotify Profile
      </div>
      <div class="my-3">
        <b-button class="bg-accent text-white fw-bold border-0 py-2 px-4">
          <a href="https://spotify-profile-backend.herokuapp.com/api/spotify-login" class="text-decoration-none text-white">
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
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
