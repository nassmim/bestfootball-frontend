import Vue from 'vue'
import store from '@/store'

export default {

  // The user makes an advanced research of other users
  advancedResearch(rootState, statusId, bestSkillId, gender, clubName, categoryId, positionId, preferredFootId, cityName, countryName, size, pageNumber, callbacks)   {
    Vue.axios.get(`${rootState.baseUrl}/search/advanced-research/${statusId}/${bestSkillId}/${gender}/${clubName}/${categoryId}/${positionId}/${preferredFootId}/${cityName}/${countryName}/${size}/${pageNumber}`, 
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
