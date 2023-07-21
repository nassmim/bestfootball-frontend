<template>
  <div class="entrainementsViews">
    <Preloader />
    <Header />
    <Breadcrumbs />
    <GamePresentationComponent/>
    <Footer />
    <SearchModal />
  </div>
</template>
<script>
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import GamePresentationComponent from "@/components/all/videos/GamePresentation.vue";
import Footer from "@/components/all/Footer.vue";
import SearchModal from "@/components/all/SearchModal.vue";

export default {
  name: "GamePresentation",
  components: {
    Preloader,
    Header,
    Breadcrumbs,
    GamePresentationComponent,
    Footer,
    SearchModal,
  },
};
</script>
