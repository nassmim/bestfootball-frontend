<template lang="html">
  <div class="compte">
    <ClubHeader />
    <AccountComponent />
    <Footer />
  </div>
</template>
<script>
import ClubHeader from "@/components/club/Header.vue";
import ClubBreadcrumbs from "@/components/club/Breadcrumbs.vue";
import AccountComponent from "@/components/club/AccountComponent.vue";
import Footer from "@/components/all/Footer.vue";
export default {
  name: "ClubAccount",
  components: {
    ClubHeader,
    ClubBreadcrumbs,
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
