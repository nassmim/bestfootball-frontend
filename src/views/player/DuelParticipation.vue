<template>
  <div class="player-home">
    <Header />
    <Breadcrumbs />
    <DuelParticipationComponent />
    <Footer />
  </div>
</template>

<script>
import Header from "../Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import DuelParticipationComponent from "@/components/player/DuelParticipation.vue";
import Footer from "@/components/all/Footer.vue";
export default {
  name: "DuelParticipation",
  components: {
    Header,
    Breadcrumbs,
    DuelParticipationComponent,
    Footer,
  },
};
</script>