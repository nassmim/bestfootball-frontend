<template>
  <div class="about">
    <!-- COMPONENTS BLOCK -->
    <Preloader />
    <Header />
    <ForgottenPasswordForm />
    <Footer />
    <SearchModal />
    <!-- COMPONENTS BLOCK--END -->
  </div>
</template>

<script>
// IMPORTING COMPONENTS
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/views/all/Header.vue";
import ForgottenPasswordForm from "@/components/all/registration/ForgottenPasswordForm.vue";
import Footer from "@/components/all/Footer.vue";
import SearchModal from "@/components/all/SearchModal.vue";
// IMPORTING COMPONENTS--END

export default {
  name: "ForgottenPassword",
  components: {
    Preloader,
    Header,
    ForgottenPasswordForm,
    Footer,
    SearchModal,
  },
};
</script>

<style scoped>
.about {
  background: url(/images/background/bestfootball-bg-login.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.footer_nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.footer_nav li {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  padding: 0px 20px;
}

@media screen and (min-width: 400px) {
  .footer_icons {
    color: #fff;
    text-align: center !important;
    padding-top: 4px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 18px;
  }
}

@media screen and (min-width: 800px) {
  .footer_icons {
    color: #fff;
    text-align: center !important;
    padding-top: 3px;
    padding-left: 4px;
    font-size: 21px;
  }
  .footer_li {
    border: 2px solid #fff;
    border-radius: 100%;
    width: 45px;
    height: 45px;
    margin: 0.5em;
    padding: 0.5em;
  }
}
</style>
