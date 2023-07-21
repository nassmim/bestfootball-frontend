<template>
  <div class="plans">
    <!-- COMPONENTS BLOCK -->
    <Preloader />
    <Header />
    <Breadcrumbs />
    <PrivacyPolicyComponent />
    <Footer />
    <SearchModal />
    <!-- COMPONENTS BLOCK--END -->
  </div>
</template>

<script>
// IMPORTING COMPONENTS
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import PrivacyPolicyComponent from "@/components/all/PrivacyPolicy.vue";
import Footer from "@/components/all/Footer.vue";
import SearchModal from "@/components/all/SearchModal.vue";
// IMPORTING COMPONENTS--END

export default {
  name: "PrivacyPolicy",
  components: {
    Preloader,
    Header,
    Breadcrumbs,
    PrivacyPolicyComponent,
    Footer,
    SearchModal,
  },
};
</script>