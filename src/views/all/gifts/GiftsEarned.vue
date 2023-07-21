<template>
  <div class="mes-cadeaux">
    <Header />
    <Breadcrumbs />
    <GiftsEarnedComponent />
    <Footer />
  </div>
</template>
<script>
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import GiftsEarnedComponent from "@/components/all/gifts/GiftsEarned.vue";
import Footer from "@/components/all/Footer.vue";
export default {
  name: "GiftsEarned",
  components: {
    Header,
    Breadcrumbs,
    GiftsEarnedComponent,
    Footer
  }
};
</script>
