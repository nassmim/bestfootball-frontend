<template>
  <!-- Header for a player -->

  <div class="full-width-header">
    <!--Header Start-->
    <header id="rs-header" class="rs-header homestyle">
      <!-- Menu Start -->
      <nav class="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm">
        <div class="container">
          <router-link
            :to="{ name: 'Home', params: { username: user.id } }"
            class="navbar-brand"
          >
            <!-- Logo Image -->
            <img
              src="/images/logos/bestfootball logo-white.png"
              width="250"
              alt=""
              class="d-inline-block align-middle mr-2"
            />
            <!-- Logo Text -->
          </router-link>

          <button
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            class="navbar-toggler"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div id="navbarSupportedContent" class="collapse navbar-collapse">
            <ul class="nav-menu navbar-nav ml-auto">
              <li id="header-user-avatar-left" class="last-item nav-item dropdown">
                <a
                  style="margin-top:-12px;"
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span id="flag_container" class="mr-2">
                    <img
                      :src="
                        profile.avatar
                          ? `/upload/images/users/${profile.avatar}`
                          : '/images/users/mourinho.jpg'
                      "
                      class="nav_bar_img dropbtn"
                      width="45"
                      height="45"
                    />
                  </span>
                </a>
                <div
                  :class="[
                    'dropdown-menu',
                    'dropdown-menu-right',
                    { show: myDropdown },
                  ]"
                  aria-labelledby="navbarDropdown"
                >
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'Home', params: { username: user.id } }"
                    >{{
                      $options.filters.capitalizeText($tc("myMasculine")) +
                        " " +
                        $t("homeAsPersonalEspace")
                    }}</router-link
                  >
                  <div class="dropdown-divider"></div>
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'GiftsEarned' }"
                    >{{
                      $options.filters.capitalizeText($tc("myMasculine", 2)) +
                        " " +
                        $tc("gift", 2)
                    }}</router-link
                  >
                  <div class="dropdown-divider"></div>
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'Profile' }"
                    >{{
                      $options.filters.capitalizeText($tc("myMasculine")) +
                        " " +
                        $tc("profile")
                    }}</router-link
                  >
                  <div class="dropdown-divider"></div>
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'Account' }"
                    >{{
                      $options.filters.capitalizeText($tc("myMasculine")) +
                        " " +
                        $tc("account")
                    }}</router-link
                  >
                  <div class="dropdown-divider"></div>
                  <router-link
                    class="dropdown-item"
                    to="#"
                    @click.native="$emit('logged-out')"
                    >{{ $t("logoff") }}</router-link
                  >
                </div>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'Games' }">
                  <img
                    class="mr-2"
                    src="/images/icons/bestfootball-play-white.png"
                    alt
                    width="25"
                    height="25"
                  />
                  {{ $tc("game", 2) }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'Exercises' }">
                  <img
                    class="mr-2"
                    src="/images/icons/bestfootball-start-no-bg-white.png"
                    alt
                    width="17"
                    height="17"
                  />
                  {{ $tc("training", 2) }}
                </router-link>
              </li>
              <li class="last-item">
                <router-link class="nav-link" :to="{ name: 'Ranking' }">
                  <img
                    class="mr-2"
                    src="/images/icons/bestfootball-medal-white.png"
                    alt
                    width="17"
                    height="17"
                  />
                  {{ $tc("ranking", 2) }}
                </router-link>
              </li>
              <li class="last-item">
                <router-link class="nav-link" :to="{ name: 'Gifts' }">
                  <img
                    class="mr-2"
                    src="/images/icons/bestfootball-tags-white.png"
                    alt
                    width="17"
                    height="17"
                  />
                  {{ $tc("gift", 2) | capitalizeText }}
                </router-link>
              </li>

              <li class="last-item nav-item dropdown">
                <PlayerSimpleSearch
                  @player-searched="
                    (playerUsername) => $emit('player-searched', playerUsername)
                  "
                />
              </li>
              <li class="last-item nav-item dropdown">
                <LanguageChoice />
              </li>
              <li id="header-user-avatar-right" class="last-item nav-item dropdown">
                <a
                  style="margin-top:-12px;"
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span id="flag_container" class="mr-2">
                    <img
                      :src="
                        profile.avatar
                          ? `/upload/images/users/${profile.avatar}`
                          : '/images/users/mourinho.jpg'
                      "
                      class="nav_bar_img dropbtn"
                      width="45"
                      height="45"
                    />
                  </span>
                </a>
                <div
                  :class="[
                    'dropdown-menu',
                    'dropdown-menu-right',
                    { show: myDropdown },
                  ]"
                  aria-labelledby="navbarDropdown"
                >
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'Home', params: { username: user.id } }"
                    >{{
                      $options.filters.capitalizeText($tc("myMasculine")) +
                        " " +
                        $t("homeAsPersonalEspace")
                    }}</router-link
                  >
                  <div class="dropdown-divider"></div>
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'GiftsEarned' }"
                    >{{
                      $options.filters.capitalizeText($tc("myMasculine", 2)) +
                        " " +
                        $tc("gift", 2)
                    }}</router-link
                  >
                  <div class="dropdown-divider"></div>
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'Profile' }"
                    >{{
                      $options.filters.capitalizeText($tc("myMasculine")) +
                        " " +
                        $tc("profile")
                    }}</router-link
                  >
                  <div class="dropdown-divider"></div>
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'Account' }"
                    >{{
                      $options.filters.capitalizeText($tc("myMasculine")) +
                        " " +
                        $tc("account")
                    }}</router-link
                  >
                  <div class="dropdown-divider"></div>
                  <router-link
                    class="dropdown-item"
                    to="#"
                    @click.native="$emit('logged-out')"
                    >{{ $t("logoff") }}</router-link
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Menu End -->
    </header>
    <!--Header End-->
  </div>
  <!--Full width header End-->
</template>

<script>
import LanguageChoice from "../all/LanguageChoice";
import PlayerSimpleSearch from "../all/PlayerSimpleSearch";

export default {
  name: "Header",

  components: {
    LanguageChoice,
    PlayerSimpleSearch,
  },

  data() {
    return {
      teamIndex: "",
      myDropdown: false,
    };
  },

  computed: {
    user() {
      return this.$store.getters.User;
    },

    profile() {
      return this.user.id ? this.user.club : {};
    },

    teams() {
      return this.$store.state.teams.userOnes;
    },
  },

  methods: {
    switchTeam(index) {
      this.teamIndex = index;
      // this.getCoachTeams();
    },
  },
};
</script>

<style scoped>
.rs-breadcrumbs .breadcrumbs-wrap{
    min-height: 100px !important;
}
#header-user-avatar-left {
  margin-left: 70px;
}
#header-user-avatar-right {
  margin-left: 20px;
}
#header-user-avatar-left {
  display: none;
}
#flag_language {
  max-width: none;
}
.dropdown_lang_img {
  margin: 5px !important;
}
.footcoins_btn {
  background: #3fb389 !important;
  color: #fff;
  padding: 2px 10px 2px 10px !important;
  border-radius: 20px 20px 20px 20px;
  float: right;
}
.topnav {
  background-color: none;
  overflow: hidden;
  padding-top: 10px !important;
  padding-bottom: 0px !important;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.navbar-dark .navbar-nav .nav-link:hover {
  color: #ffe18c;
}
.navbar-dark .navbar-nav .nav-link {
  color: rgb(255 255 255);
}

.bg-dark {
  background-color: #343a4000 !important;
}
.btn-success {
  color: #fff;
  background-color: #3fb389;
  border-color: #3fb389;
}
.dropdown {
  margin-top: 10px !important;
}
.fa-gold {
  color: #ffe18c;
  font-size: 25px;
  font-weight: 900;
}

.nav-menu > li > a {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  line-height: 50px;
}
.bg-dark {
  background-color: #343a4000 !important;
}
.btn-success {
  color: #fff;
  background-color: #3fb389;
  border-color: #3fb389;
}
.navbar-collapse {
  -ms-flex-preferred-size: 100%;
  flex-basis: 100%;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* background: #3fb389; */
}

.navbar-dark .navbar-nav .nav-link:hover {
  color: #ffe18c;
}

.navbar-dark .navbar-nav .nav-link {
  color: rgb(255 255 255);
}

.dropdown-menu {
  min-width: 20rem;
  padding: 15px 15px 15px 15px;
  margin: 0.125rem 0 0;
}

.full-width-header .rs-header .menu-area .main-menu .rs-menu .nav-menu li {
  margin-right: 14px;
}

.nav-menu > li > a {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
}
.topnav {
  display: none !important;
}

/* Smartphone & kindle (portrait and landscape) ----------- */

@media only screen and (min-width: 320px) and (max-width: 700px) {
  .topnav {
    display: block !important;
  }
  #header-user-avatar-left {
    margin-left: 0px;
  }
  #header-user-avatar-right {
    margin-left: 0px;
  }
  #header-user-avatar-right {
    display: none;
  }
  #header-user-avatar-left {
    display: block;
  }
  .ml-auto {
    background: #42b983;
    border-radius: 8px;
    padding: 10px;
  }
  .navbar-toggler {
    padding: 0.25rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: #3fb389;
    border: 1px solid #ffffffab;
    border-radius: 0.25rem;
  }
  .navbar-collapse {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #3fb389 !important;
  }
}

/* iPads (portrait and landscape) ----------- */

@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .navbar-toggler {
    padding: 0.25rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: #3fb389;
    border: 1px solid #ffffffab;
    border-radius: 0.25rem;
  }
  .ml-auto {
    background: #42b983;
    border-radius: 8px;
    padding: 10px;
  }
  #header-user-avatar-right {
    margin-left: 0px;
  }
  .navbar-collapse {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #3fb389 !important;
  }
}
</style>
