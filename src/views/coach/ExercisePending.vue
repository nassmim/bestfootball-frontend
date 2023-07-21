<template>
  <div class="home">
    <!-- COMPONENTS BLOCK -->
    <Preloader />
    <Header />
    <Breadcrumbs />
    <ExercisePendingComponent />
    <Footer />

    <!-- COMPONENTS BLOCK--END -->
  </div>
</template>

<script>
// @ is an alias to /src

// IMPORTING COMPONENTS
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/components/coach/Header.vue";
import Breadcrumbs from "@/components/coach/Breadcrumbs.vue";
import ExercisePendingComponent from "@/components/coach/ExercisePending.vue";
import Footer from "@/components/coach/Footer.vue";
// IMPORTING COMPONENTS--END

export default {
  name: "ExercisePending",
  components: {
    Preloader,
    Header,
    Breadcrumbs,
    ExercisePendingComponent,
    Footer,
  },
};
</script>