import Vue from 'vue'
import store from '@/store'

export default {
   // Likes a video
  likeChallengeVideo(rootState, userId, videoId, callbacks)   {
    Vue.axios.put(`${rootState.baseUrl}/likes/challenge-video`,
      {user_id: userId, challenge_video_id: videoId}, 
      {headers: rootState.postHeaders}).then((response) => {
      if (response.data)  {
          if (callbacks.success)  {
              callbacks.success(response.data);
          }
      }
      else  {
          if (callbacks.fail)  {
              callbacks.fail(response);
          }
      }
    }).catch((err) => {
      if(callbacks.error) {
        callbacks.error(err)
      } 
    })
  },

  // Checks if the user already likes a video 
  checkLike(rootState, videoId, userId, callbacks)   {
    Vue.axios.get(`${rootState.baseUrl}/likes/check/challenge-video/${videoId}/${userId}`, 
      {headers: rootState.headers}).then((response) => {
      if (response.data)  {
          if (callbacks.success)  {
              callbacks.success(response.data);
          }
      }
      else  {
          if (callbacks.fail)  {
              callbacks.fail(response);
          }
      }
    }).catch((err) => {
      if(callbacks.error) {
        callbacks.error(err)
      } 
    })
  }  
}
