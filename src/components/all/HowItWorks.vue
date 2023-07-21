<template>
  <!-- Result Info Section Start -->
    <div class="rs-result inner pt-100 md-pt-80">
        <div class="container">
        <div class="rs-tab pb-100 md-pb-80">
            <div class="single-team-data">
            <ul class="nav nav-pills">
                <li class="nav-item">
                <a 
                    :class="['nav-link', {'active': role === rolesNames.player}]"
                    data-toggle="tab"
                    href="#joueurs"
                    @click="role === rolesNames.player"
                >
                    {{$tc('player', 1)}}
                </a>
                </li>
                <li class="nav-item">
                <a
                    :class="['nav-link', {'active': role === rolesNames.coach}]"
                    data-toggle="tab"
                    href="#coach"
                    @click="role === rolesNames.coach"
                >
                    {{$tc('coach', 1) | capitalizeText}}
                </a>
                </li>
                <li class="nav-item">
                <a
                    :class="['nav-link', {'active': role === rolesNames.club}]"
                    data-toggle="tab"
                    href="#club"
                    @click="role === rolesNames.club"
                >
                    {{$tc('club', 1) | capitalizeText}}
                </a>
                </li>
            </ul>

            <div class="tab-content">

                <div :class="['tab-pane fade', {['show active']: role === rolesNames.player}]" id="joueurs">
                    <HowItWorksPlayer/>
                </div>

                <div
                    class="tab-pane fade rs-pointtable inner-style pt-10 md-pt-80 md-pb-80"
                    :class="{['show active']: role === rolesNames.coach}"
                    id="coach"
                >
                    <HowItWorksCoach/>
                </div>

                <div
                    class="tab-pane fade rs-pointtable inner-style pt-10 md-pt-80 md-pb-80"
                    :class="{['show active']: role === rolesNames.club}"
                    id="club"
                >
                    <HowItWorksClub/>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  <!-- Result Info Section End -->
</template>


<script>
import { mapState } from 'vuex';

import HowItWorksPlayer from "../player/HowItWorksPlayer"
import HowItWorksCoach from "../coach/HowItWorksCoach"
import HowItWorksClub from "../club/HowItWorksClub"

export default {
    
    name: "HowItWorks",

    components: {
        HowItWorksPlayer,
        HowItWorksCoach,
        HowItWorksClub
    },

    data() {
        return {
            role: null,
            rolesNames: {}
        }
    },

    mounted() {
        this.rolesNames = this.$store.state.rolesNames
        this.role = this.$store.state.user.role
    }
};
</script>

<style>
.btn-warning {
  border-color: #3fb389;
}
</style>