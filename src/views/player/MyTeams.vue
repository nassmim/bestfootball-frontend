<template>
  <div class="home">
    <!-- COMPONENTS BLOCK -->
    <Preloader />
    <Header />
    <Breadcrumbs/>
    <MyTeamsComponent/>
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
import MyTeamsComponent from "@/components/player/MyTeams.vue";
import Footer from "@/components/all/Footer.vue";
// IMPORTING COMPONENTS--END

export default {
  name: "MyTeams",
  components: {
    Preloader,
    Header,
    Breadcrumbs,
    MyTeamsComponent,
    Footer,
  }
};
</script>