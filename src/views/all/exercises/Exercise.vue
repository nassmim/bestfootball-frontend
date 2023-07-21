<template>
  <div class="home">
    <!-- COMPONENTS BLOCK -->
    <ExerciseFinished v-if="exercise && exercise.id && exerciseIsFinished" />
    <ExercisePending v-else-if="exercise && exercise.id" />

    <!-- COMPONENTS BLOCK--END -->
  </div>
</template>

<script>
// @ is an alias to /src

// IMPORTING COMPONENTS
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import ExerciseFinished from "@/views/all/exercises/ExerciseFinished.vue";
import ExercisePending from "@/views/coach/ExercisePending.vue";
import Footer from "@/components/all/Footer.vue";
// IMPORTING COMPONENTS--END

export default {

    name: "Exercise",
    
    components: {
        Preloader,
        Header,
        Breadcrumbs,
        ExerciseFinished,
        ExercisePending,
        Footer,
    },

    computed: {

        exercise() {
            return this.$store.state.trainings.singleExercise
        },

        team() {
            return this.$store.state.teams.singleOne
        },

        exerciseIsFinished() {
            return new Date().getTime() - new Date(this.exercise.date).getTime() > 1000 * 60 * 60 * 24         
        }
    },

    created() {

        // Checks if the exercise name matches the one from the route and gets the right exercise if not
        const routeName = this.$route.params.name + this.$route.hash

        if(!this.exercise || this.exercise.name !== routeName) {
        // No exercise is stored in the state or the name of the stored one doesn't match with the name from the route
            if(this.team.id) {
            // A team is stored in the state, we can get the exercise from the name in the route
                this.getExercise(routeName) 
            } else {
            // Since there is no team stored, we cannot retrieve the exercise as the name is not enough to retrieve the right exercise (2 coachs might have created a exercise with same name)
                this.$swal(this.$t('selectExerciseFromList'))
                this.$router.push({
                    name: 'Exercises'
                })
            }
        }        
    },

    methods: {

        // Gets the exercise thanks to its name from the route
        async getExercise(routeName) {
            
            const data = {
                name: routeName,
                teamsIds: this.team.id,
                seasonId: "all",
                ageCategoryId: "all",
                moduleId: "all",
                size: "all",
                page: "all",
                order: "name"
            };

            // Dispatches the action to get the exercise
            var response = await this.$store.dispatch('getExercises', data).catch(() => {
                this.$swal(this.$store.state.apiInternalError)
                throw new Error 
            })

            // Updates the store
            this.$store.commit('EXERCISE_DATA_UPDATE', response.data.exercise)
        },         
    }
};
</script>