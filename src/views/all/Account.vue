<template>
  <div class="compte">
    <Header />
    <Breadcrumbs />
    <AccountComponent />
    <Footer />
  </div>
</template>
<script>
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import AccountComponent from "@/components/all/Account.vue";
import Footer from "@/components/all/Footer.vue";
export default {
  name: "Account",
  components: {
    Header,
    Breadcrumbs,
    AccountComponent,
    Footer
  }
};
</script>
<style>
.compte {
  background: url(/images/background/football-1350720_1920.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
