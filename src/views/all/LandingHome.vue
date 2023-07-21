<template>
  <div class="home">
    <!-- COMPONENTS BLOCK -->
    <Preloader />
    <Header />
    <HomeTopVideo /> 
    <PlayerUsability />
    <CoachUsability />
    <Footer />
    <SearchModal />
    <!-- COMPONENTS BLOCK--END -->
  </div>
</template>

<script>
// @ is an alias to /src

// IMPORTING COMPONENTS
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/views/all/Header.vue";
import Footer from "@/components/all/Footer.vue";
import HomeTopVideo from "@/components/all/HomeTopVideo.vue";
import PlayerUsability from "@/components/all/PlayerUsability.vue";
import CoachUsability from "@/components/all/CoachUsability.vue";
import SearchModal from "@/components/all/SearchModal.vue";
// IMPORTING COMPONENTS--END

export default {

    name: "LandingHome",

    components: {
        Preloader,
        Header,
        Footer,
        HomeTopVideo,
        PlayerUsability,
        CoachUsability,
        SearchModal,
    },
};
</script>
