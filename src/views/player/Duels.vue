
<template>
  <div class="player-home">
    <Header />
    <Breadcrumbs />
    <DuelsComponent />
    <Footer />
  </div>
</template>
<script>
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import DuelsComponent from "@/components/player/Duels.vue";
import Footer from "@/components/all/Footer.vue";
export default { 
  name: "Duels",
  components: {
    Header,
    Breadcrumbs,
    DuelsComponent,
    Footer,
  }, 
};
</script>