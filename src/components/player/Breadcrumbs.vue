<template>
  <!-- Breadcrumbs Section Start -->
  <div class="rs-breadcrumbs">
    <div class="breadcrumbs-wrap">
      <img src="/images/breadcrumbs/top_bg_pages.jpg" alt="Breadcrumbs Image" />
    </div>
  </div>
  <!-- Breadcrumbs Section End -->
</template>

<script>
export default {
  name: "Breadcrumbs",
};
</script>
<style scoped>
.rs-breadcrumbs .breadcrumbs-wrap {
  position: relative;
  overflow: hidden;
  height: 90px !important;
}

/* Smartphone & kindle (portrait and landscape) ----------- */
@media only screen and (min-width: 320px) and (max-width: 700px) {
  .rs-breadcrumbs .breadcrumbs-wrap {
    position: relative;
    overflow: hidden;
    height: 100px !important;
  }
}
</style>
