<template>
  <div class="player-home">
    <Header />
    <Breadcrumbs />
    <HowItWorksComponent /> 
    <Footer />
  </div>
</template>
<script>
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import HowItWorksComponent from "@/components/all/HowItWorks.vue";
import Footer from "@/components/all/Footer.vue";
export default {
  name: "HowItWorks",
  components: {
    Header,
    Breadcrumbs,
    HowItWorksComponent,
    Footer
  }
};
</script>
