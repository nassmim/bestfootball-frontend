<template>
  <div class="entrainementsViews">
    <Preloader />
    <Header />
    <Breadcrumbs />
    <ChallengeContainer heading="Entrainements Page" />
    <Footer />
    <SearchModal />
  </div>
</template>
<script>
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/components/player/Header.vue";
import Breadcrumbs from "@/components/player/Breadcrumbs.vue";
import ChallengeContainer from "@/components/all/videos/GamePresentation.vue";
import Footer from "@/components/all/Footer.vue";
import SearchModal from "@/components/all/SearchModal.vue";

export default {
  name: "Challenge",
  components: {
    Preloader,
    Header,
    Breadcrumbs,
    ChallengeContainer,
    Footer,
    SearchModal,
  },
};
</script>
