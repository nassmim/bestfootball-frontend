<template>
    <div>
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span id="flag_container" class="mr-3">
                <img 
                    id="languages"
                    :src="image"
                    :alt="`${$i18n.messages[$i18n.locale]['i18nLanguage']}`"
                    width="25"
                    height="20"
                />
          </span>
        </a>

        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <a v-for="(lang, i) in languages" class="dropdown-item" :key="i" href="#" :id="`${$i18n.messages[lang]['i18nLanguage']}`" @click="setLocale(lang)">
                <img
                    class="dropdown_lang_img"
                    :src="`/images/flags/${lang}.png`"
                    :alt="`${$i18n.messages[lang]['i18nLanguage']}`"
                    width="20"
                    height="20"
                />&nbsp;{{$i18n.messages[lang]['i18nLanguage']}}
                <div class="dropdown-divider"></div>
            </a>
         </div>
    </div>
</template>

<script>

export default {

    name: "LanguageChoice",

    data: () => {
        return {
            image: "/images/flags/fr.png",
            languages: [],
        };
    },
    
    mounted() {

        this.$i18n.locale = localStorage.getItem("lang") || this.$i18n.fallbackLocale;
        localStorage.setItem("lang", this.$i18n.locale);
        this.image = `/images/flags/${this.$i18n.locale}.png`;
        this.languages = Object.keys(this.$i18n.messages)
    },    

    methods: {

        // This changes the web app langage  
        setLocale(locale) {
            localStorage.setItem("lang", locale);
            this.$i18n.locale = localStorage.getItem("lang");
            this.image = `/images/flags/${this.$i18n.locale}.png`;
        },    
    } 
}
</script>

<style scoped>
#flag_language {
    max-width: none;
}
.dropdown_lang_img{
    margin:5px !important;
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
@media screen and (max-width: 500px) {
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
.bg-dark {
    background-color: #343a4000!important;
}
.btn-success {
    color: #fff;
    background-color: #3fb389;
    border-color: #3fb389;
}
</style>