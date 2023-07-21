<template>
  <!-- How It Works Player -->
  <div class="player_usability">
    <div id="player">
      <div
        style="background:#3fb389; padding:30px 0px 35px 0px;"
        class="title-style text-center mb-30 md-mb-30"
      >
        <center>
          <img
            class="functionality_icon"
            src="images/icons/bestfootball How it works.png"
            alt=""
            width="50"
            height="50"
          />
          <h4
            style="color:#fff; font-family: Avenir !important;"
            class="margin-0 black-color uppercase mt-3"
          >
            {{$tc('player')}}
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
                  src="/images/icons/bestfootball-how-it-works-icon.png"
                  alt=""
                  width="80"
                  height="80"
                />
                <h6 class="mt-2">{{$t('learn')}}</h6>
                <p style="padding: 0px 20px 0px 20px;">
                    {{$t('HomeLearnPhrasePlayer')}}
                </p>
              </center>
            </div>
            <div class="col-md-4">
              <center>
                <img
                  class="functionality_icon"
                  src="images/icons/bestfootball-how-it-works-icon2.png"
                  alt=""
                  width="80"
                  height="80"
                />
                <h6 class="mt-2">{{$t('practiceYourself')}}</h6>
                <p style="padding: 0px 20px 0px 20px;">
                  {{$t('HomePracticePhrasePlayer')}}
                </p>
              </center>
            </div>
            <div class="col-md-4">
              <center>
                <img
                  class="functionality_icon"
                  src="images/icons/coach-gift-yellow.png"
                  alt=""
                  width="80"
                  height="80"
                />
                <h6 class="mt-2">{{$t('enjoy')}}</h6>
                <p style="padding: 0px 20px 0px 20px;">
                    {{$t('HomeEnjoyPhrasePlayer')}}
                </p>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
  <!-- How It Works Player -->
</template>

<script>
export default {
  name: "PlayerUsability",
};
</script>

<style scoped>
	body {margin:2rem;}
</style>
