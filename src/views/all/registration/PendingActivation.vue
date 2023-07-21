<template lang="html">
    <div class="about">
        <Preloader />
        <Header />
        <Breadcrumbs />
        <PendingActivation />
        <Footer />
    </div>
</template>

<script>

// IMPORTING COMPONENTS
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import PendingActivation from "@/components/all/registration/PendingActivation.vue";
import Footer from "@/components/all/Footer.vue";
// IMPORTING COMPONENTS--END

export default {
    components: {
        Preloader,
        Header,
        Breadcrumbs,
        PendingActivation,
        Footer,
    },
};

</script>

<style scoped lang="css">
h3 {
  font-size: 20px;
}
</style>
