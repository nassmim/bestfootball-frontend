<template>
  <div class="cadeaux">
    <!-- COMPONENTS BLOCK -->
    <Preloader />
    <Header />
    <Breadcrumbs />
    <GiftDetailsComponent />
    <Footer />
    <!-- COMPONENTS BLOCK--END -->
  </div>
</template>

<script>
// IMPORTING COMPONENTS 
import Preloader from "@/components/all/Preloader.vue";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import GiftDetailsComponent from "@/components/all/gifts/GiftDetails.vue";
import Footer from "@/components/all/Footer.vue";
// IMPORTING COMPONENTS--END

export default {
  name: "GiftDetails",
  components: {
    Preloader,
    Header,
    Breadcrumbs,
    GiftDetailsComponent,
    Footer,
  },
};
</script>