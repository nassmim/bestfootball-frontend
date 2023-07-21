<template>
    <div class="about">
        <Preloader />
        <Header />
        <Breadcrumbs />
        <Activate />
        <Footer />
    </div>
</template>

<script>
// IMPORTING COMPONENTS
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import Activate from "@/components/all/registration/Activate.vue";
import Footer from "@/components/all/Footer.vue";
// IMPORTING COMPONENTS--END

export default {
    components: {
        Preloader,
        Header,
        Breadcrumbs,
        Activate,
        Footer,
    },
};
</script>
