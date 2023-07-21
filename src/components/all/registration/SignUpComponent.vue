<template>
  <!-- This page is for the user signing up
It presents different registration forms to the user depending on his role 
-->

  <div class="RegisterFormContainer">
    <div id="rs-my-account" class="rs-my-account pt-200 md-pb-80 md-pt-80">
      <div class="container">
        <div class="row pb-100 md-pb-72">
          <div class="col-lg-3"></div>
          <div class="col-lg-7 md-mb-70">
            <div class="regi-side">
              <div class="container register_container">
                <div class="sec-title">
                  <h2 class="title">{{ $t("registration") }}</h2>
                </div>
                <br />
                <section id="tabs">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-12">
                        <nav>
                          <div
                            class="nav nav-tabs nav-fill mb-30"
                            id="nav-tab"
                            role="tablist"
                          >
                            <a
                              v-for="roleName in Object.values(roles)"
                              :key="roleName"
                              :class="[
                                'nav-item',
                                'nav-link',
                                { active: role == roleName },
                              ]"
                              :id="
                                `nav-${$options.filters.getModel(roleName)}-tab`
                              "
                              data-toggle="tab"
                              :href="
                                `#${$options.filters.getModel(roleName)}-tab`
                              "
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected="true"
                              @click="
                                role = roleName;
                                switchForm(roleName);
                              "
                            >
                              {{
                                $tc(
                                  $options.filters.getModel(roleName)
                                ).toUpperCase()
                              }}
                            </a>
                          </div>
                        </nav>

                        <div
                          class="tab-content py-3 px-3 px-sm-0"
                          id="nav-tabContent"
                        >
                          <div
                            class="tab-pane fade show active col-md-12"
                            :id="`${$options.filters.getModel(role)}-tab`"
                            role="tabpanel"
                            :aria-labelledby="
                              `nav-${$options.filters.getModel(role)}-tab`
                            "
                          >
                            <form
                              :id="
                                `register-${$options.filters.getModel(
                                  role
                                )}-form`
                              "
                              class="register-form"
                              :ref="
                                `sign-up-form-${$options.filters.getModel(
                                  role
                                )}`
                              "
                            >
                              <label class="input-label">
                                <span v-if="signUpErrorMessage" class="req">{{
                                  signUpErrorMessage
                                }}</span>
                              </label>

                              <div class="form-group">
                                <label class="input-label">
                                  {{ $t("emailAddress") | capitalizeText }}
                                  <span class="req">*</span>
                                </label>
                                <input
                                  class="custom-placeholder"
                                  type="email"
                                  name="email"
                                  v-model.trim="form.email"
                                  @input="$v.form.email.$reset"
                                  @blur="
                                    setFieldValue($event.target.value, 'email')
                                  "
                                />
                                <template v-if="$v.form.email.$error">
                                  <label class="input-label">
                                    <span
                                      v-if="!$v.form.email.required"
                                      class="req"
                                      >{{ $t("fieldRequired") }}</span
                                    >
                                    <span
                                      v-if="!$v.form.email.email"
                                      class="req"
                                      >{{ $t("emailNotValid") }}</span
                                    >
                                  </label>
                                </template>
                              </div>

                              <div class="form-group">
                                <label class="input-label">
                                  {{
                                    role !== roles.club
                                      ? $t("username")
                                      : $t("clubName") | capitalizeText
                                  }}
                                  <span class="req">*</span>
                                </label>
                                <input
                                  v-if="role !== roles.club"
                                  class="custom-placeholder"
                                  type="text"
                                  name="username"
                                  autocomplete="off"
                                  v-model.trim="form.username"
                                  @input="$v.form.username.$reset"
                                  @blur=" setFieldValue( $event.target.value, 'username' ) "
                                />
                                <template v-else>
                                    <input
                                        class="custom-placeholder"
                                        type="text"
                                        name="username"
                                        autocomplete="off"
                                        v-model.trim="form.username"
                                        @input="$v.form.username.$reset"
                                        @blur=" setFieldValue( $event.target.value, 'username' ) "
                                        @focus="model = true"
                                    />

                                    <div v-if="model && form.username.length > 0 " >
                                    <ul class="list-group list-group-flush">
                                        <li
                                            class="list-group-item username_sug"
                                            v-for="(club, index) in filteredClubs"
                                            :key="index"
                                            @click.prevent="form.username = club;model = false"
                                        >
                                        {{ club }}
                                        </li>
                                    </ul>
                                    </div>
                                </template>
                                <template v-if="$v.form.username.$error">
                                  <label class="input-label">
                                    <span
                                      v-if="!$v.form.username.required"
                                      class="req"
                                      >{{ $t("fieldRequired") }}</span
                                    >
                                    <span
                                      v-if="!$v.form.username.nameNotTaken"
                                      class="req"
                                      >{{ $t("nameAlreadyTaken") }}</span
                                    >
                                  </label>
                                </template>
                              </div>

                              <div class="row">
                                <div class="col-md-6">
                                  <label class="input-label">
                                    {{ $t("password") | capitalizeText }}
                                    <span class="req">*</span>
                                  </label>
                                  <input
                                    class="custom-placeholder"
                                    type="password"
                                    name="password1"
                                    v-model="$v.form.password1.$model"
                                    @blur="
                                      setFieldValue(
                                        $event.target.value,
                                        'password1'
                                      )
                                    "
                                  />
                                  <template v-if="$v.form.password1.$error">
                                    <label class="input-label">
                                      <span
                                        v-if="!$v.form.password1.required"
                                        class="req"
                                        >{{ $t("fieldRequired") }}</span
                                      >
                                    </label>
                                  </template>
                                </div>

                                <div class="col-md-6">
                                  <label class="input-label">
                                    {{
                                      role !== roles.club
                                        ? $t("passwordConfirmPlaceholder")
                                        : $t("passwordConfirmPlaceholderPolite")
                                    }}
                                    <span class="req">*</span>
                                  </label>
                                  <input
                                    class="custom-placeholder"
                                    type="password"
                                    name="password2"
                                    v-model="$v.form.password2.$model"
                                    @blur="
                                      setFieldValue(
                                        $event.target.value,
                                        'password2'
                                      )
                                    "
                                  />
                                  <template v-if="$v.form.password2.$error">
                                    <label class="input-label">
                                      <span
                                        v-if="!$v.form.password2.sameAsPassword"
                                        class="req"
                                        >{{ $t("notIdenticalPasswords") }}</span
                                      >
                                    </label>
                                  </template>
                                </div>
                              </div>

                              <label class="input-label">
                                {{ $tc("mentorship") | capitalizeText }}
                              </label>
                              <input
                                class="custom-placeholder"
                                type="text"
                                name="mentorship"
                                v-model="form.mentorship"
                              />

                              <input
                                class="checkbox"
                                type="checkbox"
                                name="agreement"
                                v-model="$v.form.termsOfUseAccepted.$model"
                              />
                              {{ $t("agreeUserAgreement") }} {{ $t("and") }}
                              <a
                                href=""
                                data-toggle="modal"
                                data-target="#exampleModal"
                                >{{ $t("generalTermsAndConditions") }}.</a
                              >
                              <template
                                v-if="$v.form.termsOfUseAccepted.$error"
                              >
                                <label class="input-label">
                                  <span
                                    v-if="!$v.form.termsOfUseAccepted.accepted"
                                    class="req"
                                    >{{ $t("fieldRequired") }}</span
                                  >
                                </label>
                              </template>

                              <div class="submit-btn">
                                <button
                                  class="readon"
                                  type="submit"
                                  @click.prevent="emailSignUp"
                                >
                                  {{ $t("startSignUp") }}
                                </button>
                              </div>

                              <center>
                                <div class="mt-5">
                                  {{ $t("alreadyRegistered") }}
                                  <router-link :to="{ name: 'Login' }">
                                    {{
                                      role !== roles.club
                                        ? $t("loginYourself")
                                        : $t("loginYourselfPolite")
                                    }}
                                  </router-link>
                                </div>

                                <template v-if="role !== roles.club">
                                  <p style="margin:0px 0px 3px !important;">
                                    <b>{{ $t("socialSignupTitle") }}:</b>
                                  </p>
                                  <div
                                    class="btn-group text-center mt-2"
                                    role="group"
                                    aria-label="Basic example"
                                  >
                                    <button
                                      type="button"
                                      class="btn btn-primary"
                                      @click="socialSignup('facebook')"
                                    >
                                      <i
                                        style="color:white;"
                                        class="fa fa-facebook"
                                      ></i>
                                      {{ $t("facebookConnexion") }}
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-danger"
                                      @click="socialSignup('google')"
                                    >
                                      <i
                                        style="color:white;"
                                        class="fa fa-google"
                                      ></i>
                                      {{ $t("googleConnexion") }}
                                    </button>
                                  </div>
                                </template>
                              </center>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div class="col-lg-12">
            <!-- Button trigger modal -->
            <button
              style="display:none;"
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              {{ $t("termsAndConditions") }}
            </button>

            <!-- Modal -->
            <TermsAndConditions :role="role" />
          </div>
          <div class="col-lg-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email, sameAs } from "vuelidate/lib/validators";

import TermsAndConditions from "./TermsAndConditions";

export default {
  name: "SignUpComponent",

  components: {
    TermsAndConditions,
  },

  mixins: [validationMixin],

  data() {
    return {
      role: "ROLE_PLAYER",
      networkName: "",
      roles: this.$store.state.rolesNames,
      model: false,
      form: {
        email: "",
        username: "",
        password1: "",
        password2: "",
        mentorship: "",
        termsOfUseAccepted: false,
      },
      signUpErrorMessage: "",
    };
  },

  computed: {
    ...mapState({
        users: (state) => state.general.users,
        clubs: (state) => state.general.clubs,
      user: (state) => state.user.data,
      isConnected: (state) => state.user.isConnected,
    }),
        
        registeredClubsNames() {
            if(this.role === this.roles.club) {
                // Gets the clubs' usernames in lowercase among the users who are either players or coaches
                const [role, isRegistered, keepName] = [this.$store.state.rolesNames.club, true, false]
                return this.$store.getters.usersNames(role, isRegistered, keepName)            
            }
        },

        clubsNames() {
            if(this.role === this.roles.club) {
                // Gets the clubs' usernames in lowercase among the users who are either players or coaches
                const [role, isRegistered, keepName] = [this.$store.state.rolesNames.club, undefined, true]
                return this.$store.getters.usersNames(role, isRegistered, keepName)            
            }
        },
        
        filteredClubs() {
            if(this.clubsNames) {
                return this.clubsNames.filter(name=> name.toLowerCase().indexOf(this.form.username.toLowerCase()) > -1)
            }      
        }  
  },

  validations: {
    form: {
      email: {
        required,
        email,
      },

      username: {
        required,

        nameNotTaken: function(username) {
          let role, isRegistered, usersNames

          if (this.role === this.roles.club) {

              if(!this.registeredClubsNames || !this.registeredClubsNames.length) {
                  return true
              }

            role = this.role;
            isRegistered = true;
            // Gets the clubs namaes in lowercase among the users who are either players or coaches
            usersNames = this.registeredClubsNames

          } else {

              if(!this.users || !this.users.length) {
                  return true
              }              
            // Gets the users' usernames in lowercase among the users who are either players or coaches
            usersNames = this.$store.getters.usersNames(
                role,
                isRegistered,
                false
            );              
          }

          // Checks if the username chosen by the user is already taken by someone
          return !usersNames.includes(
            username.toLowerCase().replace(/\s+/g, "")
          );
        },
      },

      password1: {
        required,
      },

      password2: {
        sameAsPassword: sameAs("password1"),
      },

      termsOfUseAccepted: {
        accepted: (value) => value,
      },
    },
  },

    created() {

        // Gets all the users from the db
        if(!this.users || !this.users.length) {
            this.$store.dispatch('getUsers')
                .then(response => this.$store.commit("USERS_LIST_UPDATE", response.data))
                .catch(() => this.$swal(this.$store.state.apiInternalError))                    
        }       
    },

  mounted() {

    /* If the users connects himself from social networks, a new window will be opened
        Once the connexion succeeds, the user is brought back to this screen, we need to reload it
        so that it 
        */
    window.addEventListener("storage", (event) => {
      if (event.key === this.$store.state.vuexLocalStorage) {
        document.location.reload(false);
      }
    });
  },

  destroyed() {
    window.removeEventListener("storage", (e) => {});
  },

  methods: {

    // Registers a user using form info
    emailSignUp() {
      if (this.$v.$invalid) {
        // The form has not been filled correctly
        this.$v.form.$touch();
        return;
      }

      const user_info = {
        email: this.form.email,
        username: this.form.username,
        password: this.form.password1,
        mentorship: this.form.mentorship,
        role: this.role,
      };

      // Dispatches the store action to sign up a user
      this.$store
        .dispatch("emailSignUp", user_info)

        .then((response) => {
          const data = response.data;

          if (data.user) {
            // The api has well sent back the user object that we wanted, we can proceed to the account activation

            // Updates the role in the store so that we show the relevant pages to this user even if his registration is not finished
            this.$store.commit("USER_UPDATE_ROLE", this.role);

            this.activateUser(data.user);
          } else {
            // The api request went well but something wrong with the user infos
            this.signUpErrorMessage = this.selectErrorsMessage(data);
          }
        }) 

        .catch((error) => {
          // The api call did not work properly
          this.$swal(this.$store.state.apiInternalError);
        });
    },

    // Once the sign-up is done, redirects the user either to the activate page or the reminder to verify his email address
    activateUser(user) {
      if (this.role === this.roles.player) {
        /* Temporary condition --> The user is a player, we activate his account without email verification. We do not want to lose them due to that
         */

        // We keep the mentor as he will earn point once the user is activated
        const mentorship = this.form.mentorship ? this.form.mentorship : "null";

        this.$router.push({
          name: "Activate",
          params: {
            username: this.form.username,
            mentorship: mentorship,
          },
        });
      } else {
        // The user is a coach or a club, he needs to activate his account from his inbox
        this.$router.push({ name: "PendingActivation" });
      }
    },

    // Defines the error message to display depending on sign-up api response
    selectErrorsMessage(data) {
      switch (data) {
        case 1:
          return this.$t("emailAndUsernameTakenSignUp");
          break;

        case 2:
          return this.$t("emailTakenSignUp");
          break;

        case 3:
          return this.$t("usernameTakenSignUp");
          break;
      }
    },

    // Registering a user using social platforms info
    socialSignup(provider) {
      window.open(
        `${process.env.VUE_APP_API_URL}/${this.$store.state.userURL}/socialauthentication/${provider}/start/${this.role}`
      );
    },

    // Switches to the right form and clear the fields and errors from validation process
    switchForm(role) {

        // If the user wants to register as a club, gets all the clubs in the db
        if(role === this.roles.club & (!this.clubs || !this.clubs.length)) {
            this.$store.dispatch('getClubs')
                .then(response => this.$store.commit("CLUBS_LIST_UPDATE", response.data))
                .catch(() => {throw new Error})             
        }

      this.signUpErrorMessage = "";

      const formFields = Object.keys(this.form);

      for (let field of formFields) {
        this.form[field] = "";
      }

      this.$v["form"].$reset();
    },

    // Used to trigger the validation process
    setFieldValue(value, field) {
      this.$v["form"][field].$touch();
    },
  },
};
</script>

<style scoped>

.list-group {
    max-height: 200px;
    overflow-y: overlay;
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
.rs-my-account .regi-side {
  margin-top: 50px;
  padding: 40px 20px;
  background: #f9f9f9;
  border-radius: 10px;
}
section .section-title {
  text-align: center;
  color: #007b5e;
  margin-bottom: 50px;
  text-transform: uppercase;
}
#tabs {
  background: #f9f9f9;
}
#tabs h6.section-title {
  color: #eee;
}

#tabs .nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #f3f3f3;
  background-color: transparent;
  border-color: transparent transparent #f3f3f3;
  border-bottom: 4px solid !important;
  font-size: 20px;
  font-weight: bold;
}
#tabs .nav-tabs .nav-link {
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  color: #3fb389;
  font-size: 20px;
}
/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width: 320px) and (max-width: 700px) {
  /* .register_container{
        margin-top: 90px;
    } */
  #tabs .nav-tabs .nav-link {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    color: #3fb389;
    font-size: 15px;
  }
  .rs-my-account .regi-side {
    margin-top: 100px;
    padding: 40px 0px;
    background: #f9f9f9;
    border-radius: 10px;
  }
  .container {
    width: 92%;
    padding-right: 0px;
    padding-left: 0px;
    margin-right: auto;
    margin-left: auto;
  }
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  /* .register_container{
        margin-top: 90px;
    }  */

  .rs-my-account .regi-side {
    margin-top: 100px;
    padding: 40px 20px;
    background: #f9f9f9;
    border-radius: 10px;
  }
}
.readon {
  background-image: linear-gradient(
    to right,
    #56d0a6 0%,
    #3fb389 51%,
    #82d5b9 100%
  );
  color: #fff;
  border: none;
  padding: 15px 35px 13px;
  display: inline-block;
  position: relative;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  text-transform: uppercase;
  background-size: 200% auto;
  outline: none;
  box-shadow: unset;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}
</style>
