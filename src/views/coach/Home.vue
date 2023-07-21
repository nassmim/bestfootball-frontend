<template>
  <div class="home">
    <Header />
    <Breadcrumbs />
    <HomeComponent />
    <Footer />
  </div>
</template>
<script> 
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import HomeComponent from "@/components/coach/Home.vue";
import Footer from "@/components/all/Footer.vue";
export default {
  name: "Home",
  components: {
    Header, 
    Breadcrumbs,
    HomeComponent,
    Footer
  }
};
</script>
