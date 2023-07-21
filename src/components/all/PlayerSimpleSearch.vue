<template>
    <div>

        <a style="margin-top: 3px;" class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span id="flag_container">
                <i class="fa fa-search" aria-hidden="true" style="font-size:18px; color:#fff !important;"></i>
            </span>
        </a>
        
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">

            <div class="form-group">
                <div class="input-group">
                    <input
                        v-model.trim="playerUsername"
                        style="padding:10px !important;"
                        type="text"
                        class="custom-placeholder"
                        id="validationCustomUsername"
                        autocomplete="off"
                        aria-describedby="inputGroupPrepend"
                        @focus="model = true;getUsers()"
                        @click="(e) => e.stopPropagation()"
                    />

                    <div style="cursor: pointer;" class="input-group-prepend">
                        <span
                            style="background: #fff !important; padding: 13px !important; border-left: 1px solid #fff !important;"
                            class="input-group-text"
                            id="inputGroupPrepend"
                            @click="$emit('player-searched', playerUsername)"
                        >
                            <i class="fa fa-search"></i>
                        </span>
                    </div>
                                        
                    <div v-if="model && playerUsername" >
                        <ul class="list-group list-group-flush">
                            <li
                                class="list-group-item username_sug"
                                v-for="(name, index) in filteredNames"
                                :key="index"
                                @click.prevent="playerUsername = name;model = false"
                                @click="(e) => e.stopPropagation()"
                            >
                                {{ name }}
                            </li>
                        </ul>
                    </div>                           
                </div>
            </div>  
        </div>       
    </div>
</template>

<script>

export default {

    name: 'PlayerSimpleSearch',

    data() {
        return {
            playerUsername: '',
            model: false
        }
    },

    computed: {

        users(){
            return this.$store.state.general.users
        },

        usersNames() {
            // Gets the users' usernames in lowercase among the players
            return this.$store.getters.usersNames(this.$store.state.rolesNames.player, undefined, true)            
        }, 

        filteredNames() {
            if(this.usersNames) {
                return this.usersNames.filter(name=> name.toLowerCase().indexOf(this.playerUsername.toLowerCase()) > -1)
            }      
        },
    }, 
    
    methods: {

        // Gets all the users from the db
        getUsers() {
            if(!this.users || !this.users.length) {
                this.$store.dispatch('getUsers')
                    .then(response => this.$store.commit("USERS_LIST_UPDATE", response.data))
                    .catch(() => {throw new Error})                    
            }
        }
    }     
}
</script>

<style scoped>

.list-group {
    max-height: 100px;
    overflow-y: overlay;
}

    .dropdown-menu {
        min-width: 20rem;
        padding: 15px 15px 0px 15px;
        margin: .125rem 0 0;
    }
    .username_sug {
    cursor: pointer;
    color: #3fb389;
    -webkit-transition: background-color 0.4s ease;
    -moz-transition: background-color 0.4s ease;
    -o-transition: background-color 0.4s ease;
    transition: background-color 0.4s ease;
    }
    .username_sug:hover {
    color: #fff;
    background-color: #3fb389;
    font-weight: 500;
    }
</style>