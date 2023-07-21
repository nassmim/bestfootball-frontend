<template>
    <div class="home">
        <Header />
        <Breadcrumbs />
        <template v-if="isConnected">
            <ProfilePlayer v-if="user.player"/>
            <ProfileCoach v-else-if="user.coach"/>
            <ProfileClub v-else/>
        </template>
        <Footer />
    </div>
</template>

<script>
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import ProfilePlayer from "@/components/player/Profile.vue";
import ProfileCoach from "@/components/coach/Profile.vue";
import ProfileClub from "@/components/club/Profile.vue";
import Footer from "@/components/all/Footer.vue";

import routeRedirectionMixin from '../../mixins/routeRedirectionMixin';

export default {

    name: "Profile",
    
    components: {
        Header,
        Breadcrumbs,
        ProfilePlayer,
        ProfileCoach,
        ProfileClub,
        Footer
    },

    mixins: [routeRedirectionMixin],

    computed: {
        user() {
            return this.$store.getters.User
        },
        isConnected() {
            return this.$store.state.user.isConnected
        }
    },   
    
    created() {
        // Redirects the user to the login page if he's not yet logged in
        this.redirectToLogin(this.isConnected, this.$i18n.locale)        
    }
};
</script>
