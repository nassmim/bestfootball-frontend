import axios from "@/axios";

const state = {
    id: null,
    data: {},
    seasons: [],
    categories: [],    
    role: null,
    token: null,
    isConnected: false,
    teamFeaturesVisible: false,
};

const getters = {
    User: (state) => { return state.data },
};

const mutations = {
    LOCAL_SIGNUP: (state, data) => (state.signupResponse = data),
    LOCAL_LOGIN: (state, data) => (state.loginResponse = data),
    REGISTER_EMAIL_CONFIRM: (state, error) => (state.error = error),
    USER_UPDATE_DATA: (state, data) => {
        state.data = {
            ...state.data,
            ...data
        }
    },
    USER_UPDATE_TOKEN: (state, data) => (state.token = data),
    USER_UPDATE_CONNECTED: (state, data) => state.isConnected = data,
    USER_UPDATE_ROLE: (state, data) => (state.role = data),
    TEAM_FEATURES_VISIBLE_UPDATE: (state, data) => (state.teamFeaturesVisible = data),
    USER_UPDATE_ISPLAYERFEATURE: (state, value) =>
        (state.isPlayerFeature = value),
    USER_UPDATE_CATEGORIES: (state, data) => (state.categories = data),
    USER_UPDATE_SEASONS: (state, data) => (state.seasons = data),        
    USERURL_UPDATE_DATA: (state, url) => (state.urlNoLogin = url),
    CONNECT_USER_ERROR: (state, error) => (state.error = error),
    FORGOTTEN_USER_PWD: (state, forgotten) => (state.forgotten = forgotten),
    RENEW_USER_PWD: (state, renew) => (state.renew = renew),
    REDIRECT_MESSAGE: (state, data) => (state.redirectMessage = data),
    CLEAR_DATA: (state) => {
        state.data = {};
        state.isConnected = false;
        state.token = null;
        state.role = null;
    },
};

const actions = {

    /* User Registration by email 
    Takes the user's email/username/password/mentor inputs
    Gets back either the user full object
    or numbers corresponding to an input error (email/username already taken)
    */
    emailSignUp({ rootState }, user_info) {

        return new Promise((resolve, reject) => {
            axios.post(`${rootState.userURL}/sign-up`, {
                email: user_info.email,
                username: user_info.username,
                password: user_info.password,
                sponsorship: user_info.sponsorship,
                roles: user_info.role,
            },
            { headers: rootState.postHeaders })
                .then((response) => { resolve(response) })
                .catch((error) => { reject(error) });
        });
    },

    /* The user's profile as been saved in the db but not necessarily in the right model
    as we did not know his role (cause of signing up from the login page). Now the user has indicated the role he wants to be
    Takes the user's id and role that will enable to update the model in database
    Gets back no data as a response
    */
    finishUserSocialNetworkRegistration({ rootState }, { userId, role }) {
        return new Promise((resolve, reject) => {
            axios
                .put(
                    `${rootState.userURL}/sign-up/update-social-profile`, 
                    {
                        userId: userId,
                        role: role
                    },
                    {
                        headers: rootState.headers,
                    }
                )
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => reject(error));
        });        
    },

    /* User's account activation
    Takes the user's username and mentor as arguments
    Gets back either the user object or a flag indicating the user already has validated his account
    */
    activateUser({ rootState }, user_info) {

        return new Promise((resolve, reject) => {
            axios
            .put(`${rootState.userURL}/activate`, {
                username: user_info.username,
                sponsorship: user_info.sponsorship,
            },
            { headers: rootState.postHeaders })
                .then(response => { resolve(response) })
                .catch(error => { reject(error) });
    });
    },

    /* User Logs in 
    Takes either the email or username as identifier and the password
    Gets back the user object if succeeded or numbers reflecting input errors 
    */
    emailLogin({ rootState }, credentials) {

        return new Promise((resolve, reject) => {
            axios
            .put(`${rootState.userURL}/login`, {
                identifier: credentials.identifier,
                password: credentials.password,
            },
            { headers: rootState.postHeaders })

                .then((response) => {
                    resolve(response);
                })

                .catch((error) => reject(error));
        });
  },

    /* This gets all the user's information
    Takes the identifier which can be either the user's id or username
    and his role which can be null if 
    Gets back the user object 
    */
    getUser({ rootState }, { identifier, role }) {
        return new Promise((resolve, reject) => {
            axios.get(
                `${rootState.userURL}/profile-information/${identifier}/${role}`,
                {
                    headers: rootState.headers,
                }
            )
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => reject(error));
        });
    },

    /* Updates the user's profile 
    Takes the data related to the user's information like his username, his country, his phone number, etc.
    Also takes the user's id and the role he's linked to (player, coach or club)
    Gets back the user 
    */
    updateProfile({ rootState }, data) {
        return new Promise((resolve, reject) => {
            axios.put("user/update-profile", data, {
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

    /* Updates the user's account, 
    Takes as argument the user's id, and some information like his name, his email etc.
    Sends back a boolean with true for success
    */
    updateAccount({ rootState }, data) {
        return new Promise((resolve, reject) => {
            axios.put(`user/update-account`, data, {
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

    /* Updates the user's password,
    Takes as argument the user's id and his password and sends back a boolean with true for success
    */
    updatePassword({ rootState }, data) {
        return new Promise((resolve, reject) => {
            axios.put(`user/update-password`, data, {
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

    /* The user asks for a new password
    Takes an email as argument and sends back a boolean with true for success
    */
    askForPasswordReset({ rootState }, credentials) {

        return new Promise((resolve, reject) => {
            axios
                .put(`${rootState.userURL}/password-forgotten`, {
                    email: credentials.email,
                },
                    { headers: rootState.postHeaders })

                .then((response) => {
                    resolve(response);
                })

                .catch((error) => reject(error));
        });
    },

    // Subscribes to the push notifications 
    async subscribeNotifications({ rootState }, { userId, notification_subscription }) {

        const response = await axios.put(`${rootState.userURL}/subscribe-notifications`, {
            userId: userId, notification_subscription: notification_subscription
        }, { headers: rootState.postHeaders })

            .catch(() => { throw new Error() })

        return response
    },

    // Deletes the user's account, takes as argument the user's id and sends back a boolean as true if the request achieved
    deleteAccount({ rootState }, { id }) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${rootState.userURL}/account/${id}`, { 
                    headers: rootState.headers 
                })

                .then((response) => {
                    resolve(response);
                })

                .catch((error) => reject(error));
        });
    }    
};


export default {
    state,
    getters,
    actions,
    mutations,
};
