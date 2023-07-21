<template>

  <!-- Component displaying a duel between two users -->
  
    <div>
        <DuelResult v-if="duel.closed" :duel="duel"/>
        <DuelParticipation v-else :duel="duel"/>
    </div>
  <!-- Single Club Section End -->
</template>

<script>

import DuelResult from "./DuelResult"
import DuelParticipation from "./DuelParticipation"

export default {
    name: "Duel",

    components: {
        DuelResult,
        DuelParticipation
    },

    computed: {

        duel() {
            return this.$store.state.duels.singleDuel.id ? this.$store.state.duels.singleDuel : { userAsked: {}, userAsking: {} }
        }
    },

    created() { 
        // If the duel id is not the same as the one from the route, runs the api call to get the duel from its id indicated in the route
        if(this.duel.id !== this.$route.params.id) {
            this.$store.dispatch('getDuel', {duelId: this.$route.params.id})
                .then(response => this.$store.commit('USER_DUEL_UPDATE', response.data))
                .catch(() => this.$swal(this.$store.state.apiInternalError))
        }
    }
};
</script> 