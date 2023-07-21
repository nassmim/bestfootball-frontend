// This mixin is for functions that enable to redirect the user depending on certain criteria like his connexion status, his role, etc.

export default {

    methods: {

        // If the user goes to a page not available when already connected
        redirectToRightHome(connectedUserUsername, routeUsername) {

            if (connectedUserUsername !== routeUsername) {
                this.$router.push({
                    name: 'Home',
                    params: {
                        username: connectedUserUsername
                    }
                })

                return true
            }

            return false
        },

        // If the user goes to a page not available when already connected
        redirectToHome(user, isConnected) {

            if (user && isConnected) { 
                this.$router.push({ 
                    name: 'Home', 
                    params: {
                        username: user.username ? user.username : user.id
                    }
                })

                return true
            }
            
            return false
        },

        // If the user does an action that requires to be connected whereas he is not
        redirectToLogin(isConnected, language) {

            if(!isConnected) {
                this.$swal(this.$i18n.messages[language]['needToLoginYourself'])
                this.$router.push({name: 'Login'})

                return true
            }
            
            return false
        },

        /* If the user does an action that requires a specific role that he has not
        Takes as arguments the user's roles, the roles he must be to access the screen, the error message language 
        and the route to which we redirect him if he has not the required role
        Sends back true if that's the case to stop further functions to run in the component where this function got called 
        */
        checkRole(userRole, roleToMatch, language, routeTo='LandingHome') {

            if (userRole !== roleToMatch) {
            // The user has not the required role to be on the screen he's trying to reach

                // This gets the role name in a more interpretable way to display to the user (like 'Player' for 'ROLE_PLAYER')
                const roleName = this.$options.filters.getRoleName(roleToMatch)
                this.$swal(`${this.$i18n.messages[language]['needToBe']} ${roleName}`)

                this.$router.push(routeTo)
                return true 
            }

            return false
        },
    }
}