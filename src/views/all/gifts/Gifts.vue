<template>
    <div>
        <Header />
        <Breadcrumbs />
        <GiftsComponent />
        <Footer />
<!--         <GiftsCoach v-else-if="user.coach" />
        <GiftsClub v-else/> -->
    </div>
</template>

<script>

import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import GiftsComponent from "@/components/all/gifts/Gifts.vue";
import Footer from "@/components/all/Footer.vue";

export default {

    name: "PlayerCadeaux",

    components: {
        Header,
        Breadcrumbs,
        GiftsComponent,
        Footer
    },
};
</script>
