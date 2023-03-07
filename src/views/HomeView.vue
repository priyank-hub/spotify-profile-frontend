<template>
  <div class="home">
    <div>
      <div>
        <UserProfile />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/Login.vue'
import UserProfile from '@/components/UserProfile.vue'
// import { getAccessToken, setLocalAccessToken, setLocalRefreshToken } from '@/Utils/index'

export default {
  name: 'HomeView',
  components: {
    UserProfile
  },
  data() {
    return {
      isAuthenticated: false,
    }
  },
  async mounted() {
    console.log('homeview component mounted');
    this.$router.replace('/');
  }
}
</script>
