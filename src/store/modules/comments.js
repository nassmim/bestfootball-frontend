import Vue from 'vue'
import store from '@/store'

export default {

  // Post request to comment a video
  commentChallengeVideo(rootState, videoId, userId, comment, callbacks)   {
    Vue.axios.post(`${rootState.baseUrl}/comments/challenge-video`,
      {challenge_video_id: videoId, user_id: userId, comment: comment}, 
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

  // Get all comments associated to a specific video
  getComments(rootState, id, callbacks)   {
      Vue.axios.get(`${rootState.baseUrl}/comments/challenge-video/${id}`, {headers: rootState.headers}).then((response) => {
          if (response.data)  {
              if (callbacks.success)  {
                  callbacks.success(response.data);
              }
              return response.data;
          }
          else  {
              if (callbacks.fail)  {
                  callbacks.fail();
              }
          }
          return response.data;
      }).catch((err) => {
          if(callbacks.error) {
            callbacks.error(err)
          }
      });
  },
}
