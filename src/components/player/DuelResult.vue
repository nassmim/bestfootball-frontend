<template>

  <!-- Component displaying the result of a duel between two users -->
  
    <div class="rs-single-club md-pb-80">
        <div class="container" style="margin-top: 100px;">

            <div class="pb-90 md-pb-70">
                <div class="row">

                    <div class="col-lg-4 col-md-12 md-mb-30">
                        <div class>
                        <h2 class="text-center">
                            <router-link :to="{name: 'Home', params: {username: duel.userAsking.username}}" >
                                {{duel.userAsking.username}}
                            </router-link>
                            </h2>
                        </div>
                    </div>
                    <div class="col-lg-4 md-mb-30">
                        <div class>
                        <h1 class="text-center">VS</h1>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class>
                        <h2 class="text-center">
                            <router-link :to="{name: 'Home', params: {username: duel.userAsked.username}}" >
                                {{duel.userAsked.username}}
                            </router-link>
                        </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div class="club-videos pb-90 md-pb-70">
                <div class="row">

                    <div class="col-lg-4 col-md-12 md-mb-30">
                        <div class="video-wrap">
                            <video
                                controls controlsList="nodownload"
                                :src="`/upload/videos/duels/${duel.user_asking_duel_path}`"
                                class="col-lg-4 col-md-12 md-mb-30"
                            >
                                <i class="fa fa-play video_play_icon"></i>
                            </video>
                        </div>
                    </div>

                    <div class="col-lg-4 md-mb-30"></div>

                    <div class="col-lg-4">
                        <div class="video-wrap">
                            <video
                                controls controlsList="nodownload"
                                :src="`/upload/videos/duels/${duel.user_asked_duel_path}`"
                                class="col-lg-4 col-md-12 md-mb-30"
                            >
                                <i class="fa fa-play video_play_icon"></i>
                            </video>
                        </div>
                    </div>

                </div>
            </div>

            <div class="pb-90 md-pb-70">
                <div class="row">
                    <div class="col-lg-4 col-md-12 md-mb-30">
                        <div class>
                        <h2 class="text-center">{{duel.user_asking_score}}</h2>
                        </div>
                    </div>
                    <div class="col-lg-4 md-mb-30">
                        <div class>
                        <h1 class="text-center">{{$tc('point', 2).toUpperCase()}}</h1>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class>
                        <h2 class="text-center">{{duel.user_asked_score}}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <!-- Single Club Section End -->
</template>

<script>

export default {
    name: "DuelResult",
    props: ['duel']
};
</script> 

<style scoped>
.rs-single-club .club-videos .video-wrap i {
  position: absolute;
  content: "";
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  color: #ffffff;
  z-index: 1;
}
</style>
