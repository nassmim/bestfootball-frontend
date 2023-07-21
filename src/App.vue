<template>
    <div id="app" @click="closeNavBar()">
        <div id="install_button">
            <img src="/images/Install on phone/install_button_4.png" alt="App installation button" />      
        </div>    
        <div class="fab fab__push">
            <div class="fab__ripple"></div>
            <img class="fab__image" src="/images/icons/push-off.png" alt="Push Notification" />
        </div>
        
        <div class="toast__container"></div>             
        <router-view />
    </div>
</template>

<script>

export default {

    name: "app",

    data() {
        return {
            fabPushElement: document.getElementsByClassName('fab__push')[0],
            fabPushImgElement: document.getElementsByClassName('fab__image')[0]
        }
    },

    computed: {
        user() {
            return this.$store.state.user.data
        },
        isConnected() {
            return this.$store.state.user.isConnected
        },
        deferredPrompt() {
            return this.$store.state.general.deferredPrompt
        },
        promptAnswer() {
            return this.$store.state.general.promptAnswer
        },
    },

    watch: {
        
        isConnected(val) {
            if(val) {
                this.displayNotifIcon()
            } else {
                this.fabPushElement.style.display = 'none'
            } 
        },

        $route (to, from) {
            const w = window.innerWidth

            if(w<1024) {
                if(to.name==='Account') {
                    // The notification prompt button is always displayed in the edit account screen
                    this.fabPushElement.style.display = 'flex'
                } else if(this.fabPushElement.classList.contains('active')) {
                    // In other screens, the notification prompt is displayed only if the user is not yet subscribed
                    this.fabPushElement.style.display = 'none'
                }
            } else {
                this.fabPushElement.style.display = 'none'
            }
        }    
    },

    mounted() {

        const installButton = document.getElementById('install_button')
        this.fabPushElement = document.getElementsByClassName('fab__push')[0]
        this.fabPushImgElement = document.getElementsByClassName('fab__image')[0]

        this.fabPushElement.style.display = 'none'
        this.displayInstallButton(installButton)
        
        // Catches the before install event 
        window.addEventListener('beforeinstallprompt', (e) => {
        // Prevents Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault()

            // Stashes the event so it can be triggered later.
            this.$store.commit('UPDATE_DEFERRED_PROMPT', e)
            installButton.style.display = 'block'
        })

        // User clicks on the icon that enables him to install the app
        installButton.addEventListener('click', (e) => {

        // The install prompt is displayed
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    this.$store.commit('UPDATE_PROMPT_ANSWER', true)
                }
                this.$store.commit('UPDATE_DEFERRED_PROMPT', null)
                installButton.style.display = 'none';
            });
        })    

        // Click event for push notification subscribing/unsubscribing 
        let self = this

        this.fabPushElement.addEventListener('click',  () => {

            const isSubscribed = (self.fabPushElement.dataset.checked === 'true');

            if (isSubscribed) {
                // The user is already subscribed to our push notifications service
                // This means he has clicked to unsubscribe 
                self.unsubscribePush(self);
                self.$swal('Désinscription', `T'es sûr ? Les notifs t'aident à garder en tête tes duels et te disent quand il y a de nouveaux cadeaux !`, 'success')
            } else {
                self.changePushStatus(self, true)
                // The user has clicked to subscribe to our push notifications service
                // Checks if push notification is possible in the current browser
                self.checkPushSupported(self)
                    .then(isPushSupported => {
                        if (!isPushSupported) {
                            // Push notification is not possible so we don't proceed
                            self.changePushStatus(self, false)
                            return
                        }
                        // Push notification is available, we proceed to subscription
                        self.subscribePush(self);
                    })
            }
        });

        window.addEventListener('appinstalled', (evt) => {
        // Once the app is installed we set the install prompt event to null
            this.$store.commit('UPDATE_DEFERRED_PROMPT', null)
            installButton.style.display = 'none';
        }); 

        this.displayNotifIcon(this.fabPushElement)
    },

    methods: {
        closeNavBar() {
            $(document).click(function(event) {
                var clickover = $(event.target);
                var _opened = $(".navbar-collapse").hasClass("show");
                if (_opened === true && !clickover.hasClass("navbar-toggle")) {
                    $(".navbar-collapse").removeClass("show");
                }
            });
        },

        displayInstallButton(installButton) {

            // The install icon won't be displayed for iOS as they don't have a prompt install event
            const devicePlatform = ['iPhone', 'iPad', 'iPod'].includes(navigator.platform)

            if(this.deferredPrompt && !this.promptAnswer && !devicePlatform) {
                installButton.style.display = 'block'
            } else {
                installButton.style.display = 'none'
            }      
        },

            displayNotifIcon() {
                
                const w = window.innerWidth
                
                // The notification icon won't be displayed for iOS as they don't support push notifications yet
                const devicePlatform = ['iPhone', 'iPad', 'iPod'].includes(navigator.platform)

                if(w>=1024 || !this.userConnected || (this.user && !this.user.player) || devicePlatform) {
                    // We have a larger screen than desktops, or in a iOS device, or the user is not connected or not a player, we don't display the notification button
                    return 
                } 

                /* Checks if notification has been refused or if the browser does not include a push service */
                if(Notification.permission !== 'granted' || !('PushManager' in window)) {

                    // Displays the notification button so that user can trigger the notification process and we can explain what to do
                    this.fabPushElement.classList.remove('active')
                    this.fabPushImgElement.src = '/images/icons/push-off.png';
                    this.fabPushElement.dataset.checked = 'false' 
                    this.fabPushElement.style.display = 'flex'     
                    return
                }    

                this.checkSubscription()
                    .then(result=> {

                        if(!result) {
                            // The user is not yet subscribed thus we display the notification button 
                            this.fabPushElement.style.display = 'flex'
                        } else {
                            this.fabPushElement.classList.add('active')
                            this.fabPushImgElement.src = '/images/icons/icons/push-on.png';
                            this.fabPushElement.dataset.checked = 'true'
                            if(this.$route.name === 'Account') {
                                // The user is alredy subscribed thus we display the notification button prompt only on the edit account screen
                                this.fabPushElement.style.display = 'flex'
                            }            
                        }
                    })
        },

        // Checks if the user is currently subscribed or not
        checkSubscription() {
            return new Promise(resolve=> {
                navigator.serviceWorker.ready
                .then(registration=> {
                    // Gets the user's push notification subscription information
                    registration.pushManager.getSubscription()
                    .then(subscription=> {  
                        
                        if(!subscription || !this.user.notification_subscription_endpoint) {
                            return resolve(false) 
                        } else {
                            return resolve(true)
                        }
                    })
                })
            })
        },

        // Gets the user subscribed to our notifications
        subscribePush(self) {
            navigator.serviceWorker.ready
                .then(function (registration) {
                    const vapidPublicKey = process.env.VUE_APP_VAPID_PUBLIC_KEY
                    const convertedVapidKey = self.urlBase64ToUint8Array(vapidPublicKey);
                    // Subscribes to the browser web push manager
                    registration.pushManager.subscribe({
                        userVisibleOnly: true, //Always show notification when received,
                        applicationServerKey: convertedVapidKey
                    })
                        .then(function (subscription) {
                            // Saves the subscription info in our db
                            self.saveSubscriptionID(self, subscription, 1);
                        })
                        .catch(function (error) {
                            self.changePushStatus(self, false)
                            console.error('The web push service or the save function failed: ', error);
                        });
                }).catch(function (error) {
                    self.$swal('Oops...', "Il y a eu un souci on dirait ! La cloche est encore barrée ou grise ? Si oui, vérifie dans les réglages que tu autorises bien nos notifs, et re-clique sur la cloche. Si ça marche pas, contacte-nous sinon tu vas louper plein de cadeaux ! ", 'error')
                    self.changePushStatus(self, false)
                    console.error('Push notification subscription error: ', error);
                });
        },


        // Unsubscribes the user from push notifications
        unsubscribePush(self) {
            navigator.serviceWorker.ready
                .then(function (registration) {
                    //Get `push subscription` information
                    registration.pushManager.getSubscription()
                        .then(function (subscription) {
                            if (!subscription) {
                                // There is no `push subscription`
                                self.fabPushElement.classList.remove('active')
                                self.fabPushImgElement.src = '/images/icons/push-off.png';
                                self.fabPushElement.dataset.checked = 'false'
                                self.fabPushElement.style.display = 'flex'
                                return
                            }

                            //Unsubscribes from the `push notification` service
                            subscription.unsubscribe()
                                .then(function () {
                                    // Updates the subscription info to null in our db  
                                    self.saveSubscriptionID(self, null, 0);
                                })
                                .catch(function (error) {
                                    console.error('sending unsubscription to database failed: ', error);
                                });
                        })
                        .catch(function (error) {
                            self.$swal('Oops...', "Il y a eu un souci. Recharge la page et essaie de nouveau, sinon contacte-nous pour qu'on répare ça ;)", 'error')
                            console.error('Failed to unsubscribe push notification: ', error);
                        });
                })
        },


        // Post request to send the subscription information to the api
        async saveSubscriptionID(self, subscription, digit) {

            let notification_subscription

            if (digit === 1) {
                notification_subscription = subscription
            } else {
                notification_subscription = null
            }

            const dataForNotification = {
                userId: this.user.id,
                notification_subscription: notification_subscription
            }

            try {

                const response = await self.$store.dispatch('subscribeNotifications', dataForNotification)

                self.changePushStatus(self, digit ? true : false)

                // Updates the store with the new subscription information
                if (response.data) {
                    const dataToUpdate = {
                        notification_subscription_endpoint: response.data.notification_subscription_endpoint,
                        notification_subscription_auth: response.data.notification_subscription_auth,
                        notification_subscription_p256dh: response.data.notification_subscription_p256dh
                    }
                    self.$store.commit('USER_UPDATE_DATA', response.data)
                }

            } catch (err) {

                if (digit) {
                    /* The is an error while doing the post request, the data has not been sent to the api
                        thus we must unsubscribe the user from the push service so that it matches what we have in the db */
                    self.unsubscribePush(self)
                    self.$swal('Oops...', "Il y a eu un souci on dirait ! La cloche est encore barrée ou grise ? Si oui, recharge la page et essaie de nouveau. Si ça marche pas, contacte-nous sinon tu vas louper plein de cadeaux ! ", 'error')
                }
                console.error('sending subscription info to the database function failed: ', err)
            }
        },


        // Checks if Push notification is supported and asks for permission
        checkPushSupported(self) {
            return new Promise(function (resolve) {

                if (Notification.permission === 'granted') {
                    return resolve(true)
                } else {
                    // Push notification permission has been denied by user
                    // Asks user for permission
                    self.askPermission()
                        .then(permission => { return resolve(true) })
                        .catch(err => {
                            self.$swal('Oops...', "Ton navigateur bloque par défaut les notifications. Va dans les réglages de ton navigateur pour les autoriser.  Puis clique de nouveau sur la petite cloche ;)", 'error')
                            return resolve(false);
                        })
                }

                //Checks if a `push notification` service is available or not
                if (!('PushManager' in window)) {
                    self.$swal('Oops...', "Les notifications ne sont pas encore possibles sur ton navigateur. Pense à installer sa mise à jour sinon tu vas louper plein de cadeaux !", 'error')
                    return resolve(false);
                }
            })
        },


        // Ask the browser for push notification permission
        askPermission() {
            return new Promise(function (resolve, reject) {
                const permissionResult = Notification.requestPermission(function (result) {
                    resolve(result);
                });
                if (permissionResult) {
                    permissionResult.then(resolve, reject);
                }
            })
                .then(function (permissionResult) {
                    if (permissionResult !== 'granted') {
                        throw new Error(`Notification permission has not been granted`);
                    }
                });
        },


        // Changes icon's style depending on user's subscribion status
        changePushStatus(self, status) {
            self.fabPushElement.dataset.checked = status;
            self.fabPushElement.checked = status;
            if (status) {
                self.fabPushElement.classList.add('active');
                self.fabPushImgElement.src = '/images/icons/push-on.png';
            }
            else {
                self.fabPushElement.classList.remove('active');
                self.fabPushImgElement.src = '/images/icons/push-off.png';
            }
        },

        urlBase64ToUint8Array(base64String) {
            var padding = '='.repeat((4 - base64String.length % 4) % 4);
            var base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');

            var rawData = window.atob(base64);
            var outputArray = new Uint8Array(rawData.length);

            for (var i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

    },  
};
</script>

<style>
#app {
  font-family: Avenir;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.vertical_scroll_bar {
    padding: 0px 15px 10px 15px;
    margin-top: -26px;
    overflow: auto;
    height: 800px;
} 

#install_button {
  position: fixed;
  z-index: 9999;
}

#install_button img {
  width: 50px;
  float: right;
  max-height: 55px;
}

.fab {
    width: 56px;
    height: 56px;
    background: #6b6b6b;
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    position: fixed;
    z-index: 10;
    bottom: 70px;
    right: 10px;
    -webkit-tap-highlight-color: transparent;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    overflow: hidden;
}

.fab.active {
    background: #F44336;
}

.fab__ripple {
    position: absolute;
    left: -17px;
    bottom: -12px;
    width: 56px;
    height: 56px;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    background: #fff;
    border-radius: 50%;
    -webkit-transform-origin: 50%;
    transform-origin: 50%;
    -webkit-transition: -webkit-transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;
    transition: -webkit-transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;
    transition: transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;
    transition: transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms, -webkit-transform 0.35s cubic-bezier(0, 0, 0.3, 1) 0ms;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    will-change: transform;
    z-index: 2;
    opacity: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.fab:active .fab__ripple {
    opacity: 0.2;
    -webkit-transform: scale(1) translate(31%, -22%);
    transform: scale(1) translate(31%, -22%);
}

.fab__image {
    overflow: hidden;
    z-index: 3;
}

.toast__container { 
  position: fixed;
  bottom: 20px;
  left: 20px;
  pointer-events: none;
}

.toast__msg {
  width: 250px;
  min-height: 50px;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  padding-left: 15px;
  padding-right: 10px;
  word-break: break-all;
  -webkit-transition: opacity 3s cubic-bezier(0, 0, 0.30, 1) 0;
  -webkit-transition: opacity 0.30s cubic-bezier(0, 0, 0.30, 1) 0;
  transition: opacity 0.30s cubic-bezier(0, 0, 0.30, 1) 0;
  text-transform: initial;
  margin-bottom: 10px;
  border-radius: 2px;
}

.toast__msg--hide {
  opacity: 0;
}
</style>
