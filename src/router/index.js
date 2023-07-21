import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "LandingHome", 
        component: require('@/views/all/LandingHome.vue').default,
    },
    {
        path: "/home/:username?",
        name: "Home",
        component: require('@/views/all/Home.vue').default,
    },    
    {
        path: "/gifts",
        name: "Gifts",
        component: require('@/views/all/gifts/Gifts.vue').default,
    },
    {
        path: "/gifts/:name",
        name: "GiftDetails",
        component: require('@/views/all/gifts/GiftDetails.vue').default,
    },
    {
        path: "/signup",
        name: "SignUp",
        component: require('@/views/all/registration/SignUp.vue').default,
    },
    {
        path: "/login",
        name: "Login",
        component: require('@/views/all/registration/Login.vue').default,
    },
    {
        path: '/user/socialauthentication/finished/:id/:role/:optional?',
        name: 'SocialAuthenticationFinished',
        component: require('@/views/all/registration/SocialAuthenticationFinished.vue').default
    },
    {
        path: '/user/socialauthentication/error/:optional?',
        name: 'SocialAuthenticationError',
        component: require('@/views/all/registration/SocialAuthenticationError.vue').default
    }, 
    {
        path: "/forgotten-password",
        name: "ForgottenPassword",
        component: require('@/views/all/registration/ForgottenPassword.vue').default,
    },
    {
        path: "/logout",
        name: "Logout",
        component: require('@/components/all/Logout.vue').default,
    },
    {
        path: "/ranking",
        name: "Ranking",
        component: require('@/views/all/Ranking.vue').default,
    },
    {
        path: "/training/games",
        name: "Games",
        component: require('@/views/all/videos/Games.vue').default,
    },
    {
        path: "/trainings/game/tutorial/:name",
        name: "Tutorial",
        component: require('@/views/all/videos/Tutorial.vue').default, 
    },
    {
        path: "/contact",
        name: "Contact",
        component: require('@/views/all/Contact.vue').default,
    },
        {
            path: '/privacy-policy',
            name: 'PrivacyPolicy',
            component: require('@/views/all/PrivacyPolicy.vue').default,
        },
        {
            path: '/terms-of-use',
            name: 'TermsOfUse',
            component: require('@/views/all/TermsOfUse.vue').default,
        },    
    {
        path: "/trainings/games/videos",
        name: "GamesVideos",
        component: require('@/views/all/videos/GamesVideos.vue').default,
    },
    {
        path: "/training/games/video/:id",
        name: "GameVideo",
        component: require('@/views/all/videos/GameVideo.vue').default,
    },

    {
        path: "/trainings/game/presentation/:name",
        name: "GamePresentation",
        component: require('@/views/all/videos/GamePresentation.vue').default,
    },
    {
        path: "/team/:name",
        name: "Team",
        component: require('@/views/all/Team.vue').default,
    },
    {
        path: "/player/my-teams",
        name: "MyTeamsPlayer",
        component: require('@/views/player/MyTeams.vue').default,
    },   
    {
        path: "/trainings/exercises",
        name: "Exercises",
        component: require('@/views/all/exercises/Exercises.vue').default,
    },
    {
        path: "/trainings/exercises/single/:name",
        name: "Exercise",
        component: require('@/views/all/exercises/Exercise.vue').default,
    },
    {
        path: "/trainings/exercises/create-exercise",
        name: "CreateExercise",
        component: require('@/views/coach/CreateExercise.vue').default
    },
    {
        path: "/team/:name/add-players",
        name: "AddTeamPlayers",
        component: require('@/views/coach/AddTeamPlayers.vue').default
    },
    {
        path: "/trainings/games/create-game",
        name: "CreateGame",
        component: require('@/views/coach/CreateGame.vue').default
    },
    {
        path: "/duel/:id",
        name: "Duel",
        component: require('@/views/player/Duel.vue').default
    },
    {
        path: "/player/:username/duels",
        name: "Duels",
        component: require('@/views/player/Duels.vue').default
    },
    {
        path: "/player/duel/request/:username",
        name: "DuelRequest",
        component: require('@/views/player/DuelRequest.vue').default,
    },
    {
        path: "/player/my-gifts",
        name: "GiftsEarned",
        component: require('@/views/all/gifts/GiftsEarned.vue').default,
    },
    {
        path: "/send-mentorships",
        name: "SendMentorships",
        component: require('@/views/player/SendMentorships.vue').default,
    },
    {
        path: "/profile",
        name: "Profile",
        component: require('@/views/all/Profile.vue').default,
    },
    {
        path: "/account",
        name: "Account",
        component: require('@/views/all/Account.vue').default,
    },
    {
        path: "/how-it-works",
        name: "HowItWorks",
        component: require('@/views/all/HowItWorks.vue').default,
    },
    {
        path: "/club/checkout/:result",
        name: "CheckoutResult",
        component: require('@/views/club/CheckoutResult.vue').default,
    },
    {
        path: "/user/activate/:username/:sponsorship?",
        name: "Activate",
        component: require('@/views/all/registration/Activate.vue').default,
    },
    {
        path: "/user/pending-activation",
        name: "PendingActivation",
        component: require('@/views/all/registration/PendingActivation.vue').default,
    }, 
    {
        path: "/about-us",
        name: "AboutUs",
        component: require('@/views/all/AboutUs.vue').default,
    }     
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
