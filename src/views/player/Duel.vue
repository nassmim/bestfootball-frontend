<template>
    <div class="player-home">
        <Header />
        <Breadcrumbs />
        <DuelResult v-if="duel.closed" :duel="duel"/>
        <DuelParticipation v-else :duel="duel" @duel-updated="updatedDuel => duel = updatedDuel"/>
        <Footer />
    </div>
</template>

<script> 
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import DuelResult from "@/components/player/DuelResult.vue";
import DuelParticipation from "@/components/player/DuelParticipation.vue";
import Footer from "@/components/all/Footer.vue";

export default {

    name: "Duel",

    components: {
        Header,
        Breadcrumbs,
        DuelResult,
        DuelParticipation,
        Footer,
    },

    data() {
        return {
            duel: {
                userAsked: {player: {}},
                userAsking: {player: {}},
                challenge: {},
            }
        }
    },

    created() {
        // Runs the api call to get the duel from its id indicated in the route
        this.$store.dispatch('getDuel', {duelId: this.$route.params.id})
            .then(response => this.duel = response.data)
            .catch(() => this.$swal(this.$store.state.apiInternalError))
    }  
};
</script>
