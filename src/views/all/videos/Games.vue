<template>
  <div class="entrainementsViews">
    <Preloader />
    <Header />
    <Breadcrumbs />
    <GamesComponent/>
    <Footer />
    <SearchModal />
  </div>
</template>
<script>
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import GamesComponent from "@/components/all/videos/Games.vue";
import Footer from "@/components/all/Footer.vue"; 
import SearchModal from "@/components/all/SearchModal.vue";

export default {
  name: "Games",
  components: {
    Preloader,
    Header,
    Breadcrumbs,
    GamesComponent,
    Footer,
    SearchModal
  }
};
</script>
