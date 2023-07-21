<template>
  <div class="classements">
    <Preloader />
    <Header />
    <Breadcrumbs />
    <RankingComponent/>
    <Footer />
    <SearchModal />
  </div>
</template>
<script>
import Preloader from "@/components/all/Preloader.vue"; 
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import RankingComponent from "@/components/all/Ranking.vue";
import Footer from "@/components/all/Footer.vue";
import SearchModal from "@/components/all/SearchModal.vue";

export default {
    name: "Ranking",

    components: { 
        Preloader,
        Header,
        Breadcrumbs,
        RankingComponent,
        Footer,
        SearchModal
    },
};
</script>
