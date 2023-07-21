<template>
  <div class="home">
    <!-- COMPONENTS BLOCK -->
    <HeaderHome v-if="!isConnected" @player-searched="searchPlayer" @logged-out="logout"/>
    <HeaderPlayer v-else-if="user.player" @player-searched="searchPlayer" @logged-out="logout"/>
    <HeaderCoach v-else-if="user.coach" @player-searched="searchPlayer" @logged-out="logout"/>
    <HeaderClub v-else @player-searched="searchPlayer" @logged-out="logout"/>
    <!-- COMPONENTS BLOCK--END -->
  </div>
</template>

<script>
// @ is an alias to /src

// IMPORTING COMPONENTS
import HeaderHome from "@/components/all/Header.vue";
import HeaderPlayer from "@/components/player/Header.vue";
import HeaderCoach from "@/components/coach/Header.vue";
import HeaderClub from "@/components/club/Header.vue";
// IMPORTING COMPONENTS--END


export default {

    name: "Header",

    components: {
        HeaderHome,
        HeaderPlayer,
        HeaderCoach,
        HeaderClub
    },

    computed: {
        user() {
            return this.$store.getters.User
        },
        isConnected() {
            return this.$store.state.user.isConnected
        },
    },

    methods: {

        // Enables the user to look for another user and gets him to his home page
        searchPlayer(playerUsername) {

            const usernameRoute = this.$route.params.username + this.$route.hash

            if(usernameRoute.toLowerCase() === playerUsername.toLowerCase()) {
            // The user researches a player whereas he is already on his page, no need to run the research again
                return 
            }

            // Gets the data of the user who is researched
            this.$store.dispatch('getUser', {identifier: playerUsername, role: this.$store.state.rolesNames.player})
                .then(response => {
                    const userSearched = response.data

                    // Before going to this user screen, we update the state with his data so that his home screen will display the correct information
                    this.$store.commit('USER_VISITED_UPDATE', userSearched)
                    
                    // Gets to the user screen
                    this.$router.push({
                        name: 'Home',
                        params: {
                            username: userSearched.username
                        }
                    })
                })
                .catch(err => this.$swal(this.$store.state.apiInternalError))            
        },  
        
        // Logs out the user and clear all his data that was saved in the store
        logout() {
            this.$store.commit('CLEAR_DATA')
            this.$router.push({name: 'Login'})
        }        
    }
};
</script>
