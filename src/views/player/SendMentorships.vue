<template>
  <div class="parrainages">
    <PlayerHeader />
    <!-- <PlayerBreadcrumbs /> -->
    <ParrainagesForm />
    <Footer />
  </div>
</template>
<script>
import PlayerHeader from "@/components/player/Header.vue";
import PlayerBreadcrumbs from "@/components/player/Breadcrumbs.vue";
import ParrainagesForm from "@/components/player/ParrainagesForm.vue";
import Footer from "@/components/all/Footer.vue";
export default {
  name: "PlayerParrainages",
  components: {
    PlayerHeader,
    // PlayerBreadcrumbs,
    ParrainagesForm,
    Footer
  }
};
</script>
<style>
.parrainages {
  background: url(/images/background/football-1350720_1920.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
