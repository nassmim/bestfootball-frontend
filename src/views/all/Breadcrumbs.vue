<template>
  <div class="home">
    <!-- COMPONENTS BLOCK -->
    <BreadcrumbsHome v-if="!isConnected" />
    <BreadcrumbsPlayer v-else-if="user.player" />
    <BreadcrumbsCoach v-else-if="user.coach" />
    <BreadcrumbsClub v-else/>
    <!-- COMPONENTS BLOCK--END -->
  </div>
</template>

<script>
// @ is an alias to /src

// IMPORTING COMPONENTS
import BreadcrumbsHome from "@/components/all/Breadcrumbs.vue";
import BreadcrumbsPlayer from "@/components/player/Breadcrumbs.vue";
import BreadcrumbsCoach from "@/components/coach/Breadcrumbs.vue";
import BreadcrumbsClub from "@/components/club/Breadcrumbs.vue";
// IMPORTING COMPONENTS--END


export default {

    name: "Breadcrumbs",

    components: {
        BreadcrumbsHome,
        BreadcrumbsPlayer,
        BreadcrumbsCoach,
        BreadcrumbsClub
    },

    computed: {
        user() {
            return this.$store.getters.User
        },
        isConnected() {
            return this.$store.state.user.isConnected
        }
    },
};
</script>
