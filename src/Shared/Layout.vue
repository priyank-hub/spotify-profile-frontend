<template>
  <div class="">
    <div class="content">
        <nav class="my-nav text-white">
            <div class="brand">
                <img src="/assets/Spotify_icon.png" height="60px" alt="">
            </div>

            <div class="menu w-100">
                <ul class="p-0 m-0">
                    <li>
                        <router-link to="/" class="text-decoration-none">
                            <div class="p-2 my-3">
                                <div class="">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="text-center font-size-xs text-grey">
                                    Profile
                                </div>
                            </div>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/artists" class="text-decoration-none">
                            <div class="p-2">
                                <div>
                                    <i class="fas fa-microphone"></i>
                                </div>
                                <div class="text-center font-size-xs text-grey">
                                    Top Artists
                                </div>
                            </div>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/tracks" class="text-decoration-none">
                            <div class="p-2 my-3">
                                <div>
                                    <i class="fas fa-music"></i>
                                </div>
                                <div class="text-center font-size-xs text-grey">
                                    Top Tracks
                                </div>
                            </div>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/playlists" class="text-decoration-none">
                            <div class="p-2 my-3">
                                <div>
                                    <i class="fas fa-headphones"></i>
                                </div>
                                <div class="text-center font-size-xs text-grey">
                                    Playlists
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="brand">
                <span class="">
                    <i class="fab fa-2x fa-github text-grey"></i>
                </span>
            </div>
        </nav>

        <div class="slot">
            <slot />
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'Layout',
    props: {
        
    },
    data() {
        return {
            loading: false,
            userData: null,
        }
    },
    mounted() {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    min-height: 100vh;
    width: 100px;
    top: 0;
    left: 0;
    position: fixed;
    background: black;
    z-index: 100;
    box-shadow: rgb(0 0 0 / 30%) 0px 0px 10px;
    padding: 10px;
}

.content {
    padding-left: 100px;
}

.slot {
    min-height: 100vh;
    
}

@media screen  and (max-width: 768px){
    .my-nav {
        top: auto;
        bottom: 0;
        right: 0;
        min-height: 70px;
        height: 70px;
        width: 100%;
        flex-direction: row;
    }

    .content {
        padding-left: 0px;
        padding-bottom: 70px;
    }

    .my-nav li {
        display: block;
        float: left;
    }

    .my-nav .brand {
        display: none;
    }

    .my-nav ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
}

.my-nav li {
    list-style-type: none;
}
</style>
