<template>
    <div>
        <!-- COMPONENTS BLOCK -->
        <HomeCoach v-if="user.coach && isAllowed" />
        <HomeClub v-else-if="user.club && isAllowed"/>
        <HomePlayer v-else/>
        <!-- COMPONENTS BLOCK--END -->
    </div>
</template>

<script> 
// @ is an alias to /src

// IMPORTING COMPONENTS
import HomePlayer from "../player/Home";
import HomeCoach from "../coach/Home";
import HomeClub from "../club/Home";
// IMPORTING COMPONENTS--END

export default {

    name: "HomeUser",

    components: {
        HomePlayer,
        HomeCoach,
        HomeClub
    },
 
    data() {
        return {
            isAllowed: false
        }
    },

    computed: {
        user() {
            return this.$store.getters.User
        },     
    },

    watch: {
        /* The user can search another user while he's already on a user's home screen
            In that case, the created() hooks is not called again, therefore the state would not be updated
            we force the update through this watcher
        */
        $route (to, from) {
            if(to.name === 'Home') {
                this.checkAllowance()
            }
        }
    },

    created() { 
        // Checks if the user is allowed to access this home page
        this.checkAllowance()
    },

    methods: {

        checkAllowance() {
            
            const usernameRoute = this.$route.params.username + this.$route.hash

            if(this.user.username === usernameRoute || this.user.id === parseInt(usernameRoute)) {
            /* The user's identifier (username or id) matches the one from the route, so we are on the user's home page
            Since only players home screen can be seen by other users (i.e. coach and club pages are private), the opposite would make us consider the user is trying to look at a player page
            and if he was actually trying to look at a coach/club page, we would prevent him from reaching the page, this is why we initially set
            the boolean to false in the data
            */
                this.isAllowed = true
            }             
        }        
    }
};
</script>
