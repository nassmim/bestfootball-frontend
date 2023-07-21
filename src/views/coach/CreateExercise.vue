<template>
  <div class="home">
    <!-- COMPONENTS BLOCK -->
    <Preloader />
    <Header />
    <Breadcrumbs />
    <CreateExerciseComponent />
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
import CreateExerciseComponent from "@/components/coach/CreateExercise.vue";
import Footer from "@/components/all/Footer.vue";
// IMPORTING COMPONENTS--END

export default {
  name: "CreateExercise",
  components: {
    Preloader,
    Header,
    Breadcrumbs,
    CreateExerciseComponent,
    Footer,
  },
};
</script>
