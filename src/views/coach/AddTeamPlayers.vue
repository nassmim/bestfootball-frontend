<template>
  <div class="home">
    <!-- COMPONENTS BLOCK -->
    <Preloader />
    <Header />
    <Breadcrumbs />
    <AddTeamPlayersComponent />
    <Footer />

    <!-- COMPONENTS BLOCK--END -->
  </div>
</template>

<script>
// @ is an alias to /src

// IMPORTING COMPONENTS
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import AddTeamPlayersComponent from "@/components/coach/AddTeamPlayers.vue";
import Footer from "@/components/all/Footer.vue";
// IMPORTING COMPONENTS--END

export default {
  name: "ChangeTeam",
  components: {
    Preloader,
    Header,
    Breadcrumbs,
    AddTeamPlayersComponent,
    Footer,
  },
};
</script>