import axios from "@/axios";

const startingRoute = '/trainings'

const state = {
    challenges: [],
    singleChallenge: {},
    teamsChallenges: [],
    teamChallenges: [],
    teamsChallengesVideos: [],
    teamChallengesVideos: [],
    teamsExercises: [],
    teamExercises: [],
    teamsTutorials: [],
    teamTutorials: [],
    singleVideo: {},
    challengeStats: {},
    challengesVideosFromUser: [],
    categories: [],
    challengeTutorialData: [], 
    exercisesModules: [],
    exercises: [],
    singleExercise: {},
    exerciseStats: {},
};

const getters = {};

const mutations = {
    USER_CHALLENGESVIDEOS_UPDATE: (state, data) => (state.challengesVideosFromUser = data),
    CHALLENGES_LIST_UPDATE: (state, data) => (state.challenges = data),
    TEAMS_CHALLENGES_LIST_UPDATE: (state, data) => (state.teamsChallenges = data),
    TEAM_CHALLENGES_LIST_UPDATE: (state, data) => (state.teamChallenges = data),
    TEAMS_CHALLENGES_VIDEOS_LIST_UPDATE: (state, data) => (state.teamsChallengesVideos = data),
    TEAM_CHALLENGES_VIDEOS_LIST_UPDATE: (state, data) => (state.teamChallengesVideos = data),
    TEAMS_EXERCISES_LIST_UPDATE: (state, data) => (state.teamsExercises = data),
    TEAM_EXERCISES_LIST_UPDATE: (state, data) => (state.teamExercises = data),
    TEAMS_TUTORIALS_LIST_UPDATE: (state, data) => (state.teamsTutorials = data),
    TEAM_TUTORIALS_LIST_UPDATE: (state, data) => (state.teamTutorials = data),
    CHALLENGE_UPDATE: (state, data) => (state.singleChallenge = data),
    CHALLENGE_VIDEO_UPDATE: (state, data) => (state.singleVideo = data),
    CHALLENGE_STATS_UPDATE: (state, data) =>  state.challengeStats = data,    
    CHALLENGES_CATEGORIES_UPDATE: (state, data) => (state.categories = data),
    CHALLENGE_TUTORIAL_DATA_UPDATE: (state, data) => (state.challengeTutorialData = data),
    EXERCISES_LIST_UPDATE: (state, data) => (state.exercises = data),
    EXERCISE_DATA_UPDATE: (state, data) => {(state.singleExercise = data)},
    EXERCISE_STATS_UPDATE: (state, data) => { (state.exerciseStats = data)},
    EXERCISES_MODULES_UPDATE: (state, modules) => (state.exercisesModules = modules),
    CHALLENGESVIDEOS_LIST_UPDATE: (state, list) => (state.videosList = list),
    CHALLENGEVIDEO_DATA_UPDATE: (state, data) => (state.challengeVideo = data),
    CHALLENGEVIDEO_LIKES_UPDATE: (state, likes) => (state.likes = likes),
};

const actions = {

    /* Gets the list of all challenges depending on the chosen category 
        Takes the challenge name and category, the teams information for which the challenge has been created
        parameters to know how to paginate/scroll etc. and how to order the challenges
    */
    getChallenges({ rootState }, data) {
        return new Promise((resolve, reject) => {
            axios.get(`${startingRoute}/challenges/filter-by/${data.name}/${data.teamsIds}/${data.seasonId}/${data.ageCategoryId}/${data.categoryId}/${data.size}/${data.page}/${data.order}`, { 
                headers: rootState.headers 
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    /* Gets the user's results on a specific game
    Takes the video id that has been uploaded, the user's id, the video name,
    the challenge and its category the user participated in, and the score he made (optional, the size if we want to get the rank on this challenge)
    Returns the user stats on the challenges
    */
    async getChallengeStats({ rootState }, data) {
        const response = await axios
            .get(`${startingRoute}/challenges/stats/${data.challengeId}/${data.userId}/${data.size}`, { 
                headers: rootState.headers 
            })
            .catch(() => {
                throw new Error()
            })

        return response
    },

    getChallengeTutorials({ rootState }, data) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${startingRoute}/tutorials/filter-by/${data.name}/${data.teamsIds}/${data.seasonId}/${data.ageCategoryId}/${data.categoryId}/${data.challengeId}/${data.size}/${data.page}/${data.order}`,
                    {
                        headers: rootState.postHeaders,
                    }
                )
                .then((response) => {
                    if (response) {
                        commit("CHALLENGE_TUTORIAL_DATA_UPDATE", response.data.tutorials);
                        resolve(response);
                        console.log(response);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    },

    /* Participates to a game
    Takes the video id that has been uploaded, the user's id, the video name,
    the challenge and its category the user participated in, and the score he made
    Returns 
    */
    async participate({rootState}, data) {
        const response = await axios
            .put(`${startingRoute}/videos/participate`, {
                user_id: data.userId, 
                id: data.videoId, 
                name: data.videoName,
                challenges_ids: data.challengesIds, 
                challenge_category_id: data.categoryId,
                score: data.score
            }, { 
                headers: rootState.postHeaders 
            })
                .catch(() => {
                    throw new Error()
                })
            
            return response
    },

    /* Gets the full list of challenges videos or only its number 
        Takes the user id if we want the user's videos,
        the team information if we need the videos sent by users who belong to these teams
        the challenge information if we want the videos sent for this specific challenge,
        a boolean indicating if the video is being watched (i.e. the user is on the video screen)
        size parameters to know how to paginate/scroll etc.
        and a boolean indicating if we get the number of videos found by the request without the limit params
        Sends back either one video, the user's videos or all the users' videos
    */
    getChallengesVideos({ rootState }, data) {

        return new Promise((resolve, reject) => {
            axios.get(`trainings/videos/filter-by/${data.userId}/${data.teamsIds}/${data.seasonId}/${data.ageCategoryId}/${data.categoryId}/${data.challengeId}/${data.videoId}/${data.watched}/${data.size}/${data.page}/${data.getFullLength}`, {
                headers: rootState.headers,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    // Gets the category associated to all or a specific challenge
    getChallengesCategories({ rootState }, { challengeId }) {

        return new Promise((resolve, reject) => {
            axios.get(`trainings/challenges/categories/${challengeId}`, {
                headers: rootState.headers,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    /* Get the challenge statistics. Takes a user's id if we need the stats only for this user, 
    and the size to define the number of users to display
    Sends back the X first users of the challenge
    */
    async getChallengeStats({ rootState }, { challengeId, userId, size }) {
        const response = await axios.get(`${startingRoute}/challenges/stats/${challengeId}/${userId}/${size}`, { 
            headers: rootState.headers 
        })
            .catch(() => {throw new Error()})

        return response
    },

    /* Gets all the exercices depending on the filters selected by the use
    Takes as arguments the exercice name, the teams, seasons and age categories it has to be associated to,
    its module and some size/offset params to get the right number of exercices
    Sends back the list of exercices matching the filters 
    */
    getExercises({ rootState }, data) {
        return new Promise((resolve, reject) => {
            axios.get(`${startingRoute}/coach-exercices/filter-by/${data.name}/${data.teamsIds}/${data.seasonId}/${data.ageCategoryId}/${data.moduleId}/${data.size}/${data.page}/${data.order}`, {
                headers: rootState.postHeaders,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
            });
    },

    // Get the coach's exercice statistics
    async getExerciseStats({ rootState }, {exerciseId, userId}) {
        const response = await axios.get(`${startingRoute}/coach-exercices/stats/${exerciseId}/${userId}`, { 
            headers: rootState.headers
        })
        .catch(() => { throw new Error() })

        return response
    },

    getExercisesModules({ rootState }, {userId, exerciseId, teamId}) {
        return new Promise((resolve, reject) => {
            axios.get(`${startingRoute}/coach-exercices/modules/${userId}/${exerciseId}/${teamId}`, {
                headers: rootState.headers,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    /* Creates an exercise for a team
        Takes as arguments the user'id, the team id for which the exercise is created,
        the exercise name, the exercise module id and name,
        the descriptions, and the end date of this exercise
    */
    async createExercise({ rootState }, data) {
        const response = await axios
            .post(`${startingRoute}/coach-exercices/user-proposition`, data, {
            headers: rootState.postHeaders
        })
            .catch(() => { throw new Error() })

        return response
    },

    /* Creates an exercise for a team
    Takes as arguments the game, name and module id, the user's id, the description both in french and english,
    the tutorial and the partner link, the team id, the levels to reach, the type of reward, the reward description is custom reward,
    the video path and the game from the app to use if the user wants to use of of ours (a coach using one of our games for his team for instance)
    */
    async createGame({ rootState }, data) {
        const response = await axios
            .post(`${startingRoute}/challenges/user-proposition`, data, {
                headers: rootState.postHeaders
            })
            .catch(() => { throw new Error() })

        return response
    },

    /* Creates an exercise for a team
    Takes as arguments the tutorial id, name and module id, the user's id, the description both in french and english,
    the tutorial link, the team id, the video path and the game id to which the tutorial is associated
    */
    async createTutorial({ rootState }, data) {
        const response = await axios
            .post(`${startingRoute}/tutorials/user-proposition`, data, {
                headers: rootState.postHeaders
            })
            .catch(() => { throw new Error() })

        return response
    },


    /* Updates the player score on a specific exercise
    Takes as argument the exercise id, the player for which the user wants to add a new result,
    and the result (either a success or a failure)
    Sends back the player's number of attempts, success and success rate
    */
    async updateExercisePlayerScore({rootState}, data) {
        const response = await axios
            .put(`${startingRoute}/coach-exercices/player-score/update`, data, {
                headers: rootState.postHeaders
            })
            .catch(() => { throw new Error() })

        return response
    },

    // Users have status depending on the number of points they have. This gets all these possible status
    getAllStatus({ rootState }) {

        return new Promise((resolve, reject) => {

            axios
                .get(`${startingRoute}/challenges/all-status`, {
                    headers: rootState.headers
                })
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    // Deletes a game
    deleteGame({rootState}, {videoId}) {
        return new Promise((resolve, reject) => {
            axios.delete(`${startingRoute}/challenges/remove/${videoId}`, {
                headers: rootState.headers
            })
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    },
    
    // Deletes a game video
    deleteGameVideo({ rootState }, { videoId }) {
        return new Promise((resolve, reject) => {
            axios.delete(`${startingRoute}/videos/remove/${videoId}`, {
                headers: rootState.headers
            })
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    },
    
    // Deletes a tutorial video
    deleteTutorial({ rootState }, { videoId }) {
        return new Promise((resolve, reject) => {
            axios.delete(`${startingRoute}/tutorials/remove/${videoId}`, {
                headers: rootState.headers
            })
                .then((response) => resolve(response))
                .catch((err) => reject(err))
        })
    }      
};


export default {
  state,
  getters,
  actions,
  mutations,
};
