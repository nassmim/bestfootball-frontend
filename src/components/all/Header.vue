<template>
<!-- This is the home header when the user is not yet logged in. 
There are the links to the main sections and the option to change the app language
 -->

    <div class="hello">
        <!--Full width header Start-->
        <!--Preloader area start here-->
        <!-- <div id="loading" class="loading">
                <div class="rs-loader">
                    <div class="rs-shadow"></div>
                    <div class="rs-gravity">
                        <div class="rs-ball"></div>
                    </div>
                </div>
        </div>-->
        <!--Preloader area End here-->
        <div class="full-width-header">
        <!--Header Start-->
            <header id="rs-header" class="rs-header homestyle">

                <div class="topnav">
                    <div class="container"> 
                         <router-link class="top_header_link link1" :to="{name: 'SignUp'}"
                        >{{$t('registration')}}
                        </router-link
                        >
                        <router-link class="top_header_link link2" :to="{name: 'Login'}"
                        >{{$t('connexion')}}</router-link
                        >
                       
                    </div>
                </div>

                <nav class="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm">
                    <div class="container">
                        <router-link to="/" class="navbar-brand">
                        <!-- Logo Image -->
                        <img src="/images/logos/bestfootball logo-white.png" width="250" alt="" class="d-inline-block align-middle mr-2">
                        <!-- Logo Text -->
                        </router-link>

                        <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

                        <div id="navbarSupportedContent" class="collapse navbar-collapse">
                            <ul class="nav-menu navbar-nav ml-auto">
                                <li class="nav-item">
                                <router-link class="nav-link" :to="{name: 'Games'}">
                                    <img class="mr-2" src="/images/icons/bestfootball-start-no-bg-white.png" alt width="17" height="17" />
                                    {{$tc('training', 2)}}
                                </router-link>
                                </li>
                                <li class="last-item"> 
                                <router-link class="nav-link" :to="{name: 'Ranking'}">
                                    <img class="mr-2" src="/images/icons/bestfootball-medal-white.png" alt width="17" height="17" />
                                    {{$tc('ranking', 2)}}
                                </router-link>
                                </li>
                                <li class="last-item">
                                <router-link class="nav-link" :to="{name: 'Gifts'}">
                                <img class="mr-2" src="/images/icons/bestfootball-tags-white.png" alt width="17" height="17" />
                                    {{$t('giftsPage')}}
                                </router-link>
                                </li>
                                <li class="last-item nav-item dropdown">
										<PlayerSimpleSearch @player-searched="playerUsername => $emit('player-searched', playerUsername)"/>
									</li>
                                <li class="nav-item dropdown">
                                    <LanguageChoice/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>


            </header>
        <!--Header End-->
        </div>
        <!--Full width header End-->
        <router-view />
    </div>
</template>

<script>

import LanguageChoice from "./LanguageChoice"
import PlayerSimpleSearch from "../all/PlayerSimpleSearch"

export default {

    name: "Header",

    components: {
        LanguageChoice,
        PlayerSimpleSearch
    },

    data: () => {
        return {
            image: "/images/icons/fr.png",
            languages: [],
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width : 320px) and (max-width : 700px) {
.ml-auto{
  background: #42b983;
  border-radius: 8px;
  padding: 10px;
}
.navbar-toggler {
    padding: .25rem .75rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: #3fb389;
    border: 1px solid #ffffffab;
    border-radius: .25rem;
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
.slider_content_headers{
  margin-top: 50px !important;
}
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width : 768px) and (max-width : 1024px) {
.ml-auto{
  background: #42b983;
  border-radius: 8px;
  padding: 10px;
}
.navbar-toggler {
    padding: .25rem .75rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: #3fb389;
    border: 1px solid #ffffffab;
    border-radius: .25rem;
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
.slider_content_headers{
  margin-top: 50px !important;
}
}
.footcoins_btn{
    background: #3FB389 !important;
    color: #fff;
    padding: 2px 10px 2px 10px !important;
    border-radius: 20px 20px 20px 20px;
    float: right;
}
.topnav {
    background-color: none;
    overflow: hidden;
    /* margin-bottom: -5px; */
    padding-top: 10px;
    padding-bottom: 10px;
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
.navbar-dark .navbar-nav .nav-link:hover{
  color: #FFE18C;
}
.navbar-dark .navbar-nav .nav-link {
    color: rgb(255 255 255);
}

.bg-dark {
    background-color: #343a4000!important;
}
.btn-success {
    color: #fff;
    background-color: #3fb389;
    border-color: #3fb389;
}
</style>