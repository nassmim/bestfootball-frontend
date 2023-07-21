<template>
  <!-- Team Pyaler Section Start -->
  <div class="rs-team style3 pt-100 md-pt-80">
    <div class="container">
      <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
        <div class="title-style pb-50 md-pb-30 our_team_title">
          <h2 class="margin-0 uppercase">Our Team</h2>
          <span class="line-bg y-b pt-10 left-line"></span>
        </div>
      </div>

      <div class="row pb-100 md-pb-80 text-center">
        <div class="col-lg-4 col-md-6 mb-30 left_member">
          <div style="border-radius: 8px !important;" class="single-team">
            <div class="team-img">
              <a href="#"
                ><img
                  src="images/bf_team/BestFootball-Nassim-Ezzakraoui.jpg"
                  alt="image"
              /></a>
              <div class="team-social">
                <a href="#" class="social-icon"
                  ><i class="fa fa-linkedin"></i
                ></a>
                <a href="#" class="social-icon"
                  ><i class="fa fa-facebook"></i
                ></a>
                <a href="#" class="social-icon"
                  ><i class="fa fa-twitter"></i
                ></a>
              </div>
            </div>
            <div class="team-item-text">
              <div class="team-details">
                <h3 class="team-name">
                  <a href="#">Nassim Ezzakraoui</a>
                </h3>
                <span class="team-title">CEO & Co-founder</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 mb-30">
          <div class="single-team">
            <div class="team-img">
              <a href="#"
                ><img src="images/bf_team/BestFootball-Jeremie-Karege.jpg" alt="image"
              /></a>
              <div class="team-social">
                <a href="#" class="social-icon"
                  ><i class="fa fa-linkedin"></i
                ></a>
                <a href="#" class="social-icon"
                  ><i class="fa fa-facebook"></i
                ></a>
                <a href="#" class="social-icon"
                  ><i class="fa fa-twitter"></i
                ></a>
              </div>
            </div>
            <div class="team-item-text">
              <div class="team-details">
                <h3 class="team-name">
                  <a href="#">Jérémie Karege</a>
                </h3>
                <span class="team-title">CPO & Co-founder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Team Pyaler Section End -->
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
.left_member{
  margin-left: 209px;
}
.our_team_title{
  margin-left: 196px;
}

/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width : 320px) and (max-width : 700px) {
.left_member{
  margin-left: 0px;
}
.our_team_title{
  margin-left: 0px;
}
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width : 768px) and (max-width : 1024px) {
  .left_member{
  margin-left: 0px;
}
.our_team_title{
  margin-left: 0px;
}
}
</style>
