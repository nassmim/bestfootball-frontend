<template>
  <!-- How It Works Coach -->
  <div class="coach_usability">
    <div id="coach">
      <div
        style="background:#3fb389; padding:30px 0px 35px 0px;"
        class="title-style text-center mb-30 md-mb-30"
      >
        <center>
          <img
            class="functionality_icon"
            src="images/icons/bestfootball How it works.png"
            alt
            width="50"
            height="50"
          />
          <h4
            style="color:#fff; font-family: Avenir !important;"
            class="margin-0 black-color uppercase mt-3"
          >
            {{$t('coach')}} & {{$t('club')}}
          </h4>
        </center>
      </div>
    </div>
    <div class="container mb-50 mt-90">
      <div class="container">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4">
              <center>
                <img
                  class="functionality_icon"
                  src="images/icons/players-train-yellow.png"
                  alt
                  width="80"
                  height="80"
                />
                <h6 class="mt-2">{{$t('emulateYourPlayers')}}</h6>
                <p style="padding: 0px 20px 0px 20px;">
                    {{$t('homeEmulateYourPlayersPhrase')}}
                </p>
              </center>
            </div>
            <div class="col-md-4">
              <center>
                <img
                  class="functionality_icon"
                  src="images/icons/track-player.png"
                  alt
                  width="80"
                  height="80"
                />
                <h6 class="mt-2">{{$t('followTeamPerformance')}}</h6>
                <p style="padding: 0px 20px 0px 20px;">
                    {{$t('homeFollowTeamPerformancePhrase')}}
                </p>
              </center>
            </div>
            <div class="col-md-4">
              <center>
                <img
                  class="functionality_icon"
                  src="images/icons/coach-gift-yellow.png"
                  alt
                  width="80"
                  height="80"
                />
                <h6 class="mt-2">{{$t('earnGiftsCoachClubTitle')}}</h6>
                <p style="padding: 0px 20px 0px 20px;">
                    {{$t('homeEarnGiftsCoachClubPhrase')}}
                </p>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
  <!-- How It Works Coach -->
</template>

<script>
export default {
  name: "CoachUsability",
};
</script>
