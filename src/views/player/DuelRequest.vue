<template>
  <div class="player-home">
    <PlayerHeader />
    <PlayerBreadcrumbs />
    <DuelRequestComponent />
    <Footer />
  </div>
</template>
<script> 
import PlayerHeader from "@/components/player/Header.vue";
import PlayerBreadcrumbs from "@/components/player/Breadcrumbs.vue";
import DuelRequestComponent from "@/components/player/DuelRequest.vue";
import Footer from "@/components/all/Footer.vue";
export default {
  name: "DuelRequest",
  components: {
    PlayerHeader,
    PlayerBreadcrumbs,
    DuelRequestComponent,
    Footer,
  },
};
</script>