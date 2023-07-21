<template lang="html">
  <div class="wide-video-section themeix-ptb">
    <div class="container">
      <div class="col-xs-12 col-md-10 col-md-offset-1 themeix-section-hs  text-center">
        <div class="panel panel-default">
          <div class="panel-head">
            <h2><span class="h2_first_part">{{$t('form')}} </span><span class="h2_second_part">{{$t('contact')}}</span></h2>
          </div>
          <div class="panel-body">
            <form id="contact" v-on:submit.prevent="contact">
              <div v-if="globalErrors" class="alert alert-danger global_errors">
                {{globalErrors}}
              </div>   

              <div class="form-group">
                <label htmlFor="name" class="text-left label">{{$t('lastName')}} - {{$t('firstName')}}</label>                
                <input type="text" :placeholder="$t('lastAndFirstNamesPlaceholder')"
                  class="form-control" id="name" 
                  :class="{error: !name && globalErrors}"
                  v-model="name"/>
              </div>

              <div class="form-group">
                <label htmlFor="email" class="text-left label">{{$t('emailAddress')}}</label>                 
                <input type="text" placeholder="example@example.com"
                  class="form-control" id="email" 
                  :class="{email, error: !email.valid}"
                  v-model="email.value"/>
              </div>              

              <div class="form-group">
                <label htmlFor="subject" class="text-left label">{{$t('subject')}}</label>
                <select class="form-control budget" id="subject":v-model="selection.subject">
                 <option  v-for="subjectOption in selection.subjects" :value="subjectOption">
                   {{subjectOption}}
                 </option>
               </select>
              </div> 

              <div class="form-group">
                <label htmlFor="textarea" class="text-left label">{{$t('message')}}</label>
                <textarea name="textarea" 
                  id="textarea"
                  :class="{error: !message && globalErrors}"
                  v-model="message"/>
              </div>

              <button class="link right green">{{$t('send')}}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import swal from 'sweetalert2'
import {mapState} from 'vuex'

export default {
  data() {
    return {
      $t: this.$router.app.$t,
      name: "",
      email: {
        value: "",
        valid: true
      },
      selection: {
        subject: "",
        subjects: "",
      },
      message: "",
      globalErrors:"",
    };
  },

  computed: {
    ...mapState ({
      user: state => state.user.data,
      userConnected: state => state.userConnected
    }),
  },

  created() {
    this.selection.subject = this.$t('partnership')
    this.selection.subjects = [this.$t('partnership'), this.$t('sponsor'), this.$t('usageIssue'), this.$t('newIdeas'), this.$t('reportAVideo'), this.$t('other')]
  },

  methods: {
/* Main work :
  - enabling someone to contact us 
*/

    // Post request to send the message written by the visitor to us
    contact() {
        const userId = this.userConnected ? this.user.id : 0

        this.validate()
        if(this.globalErrors) {
            swal(this.$t('missedPiecesOfInformation')) 
            return false        
        }

        const data = {
            userId: userId,
            name: this.name,
            email: this.email.value,
            subject: this.selection.subject,
            message: this.message            
        }

        this.$store.dispatch("contactUs", data)
            .then(()=> this.$swal(this.$i18n.t('actionSuccessMessage')))
            .catch(() => this.$swal(this.$store.state.apiInternalError))
    },

    // validate by type and value
    validate() {
      this.globalErrors=""

      const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

      if(!this.email.value) {
        this.globalErrors += `${this.$t('noEmail')}
        `
        this.email.valid = false
      } else if(!emailRegExp.test(this.email.value)) {
        this.globalErrors += `${this.$t('invalidEmail')}
        `
        this.email.valid = false
      }

      if(!this.name.trim()) {
        this.globalErrors += `${this.$t('noName')}
        ` 
      } 

      if(!this.message.trim()) {
        this.globalErrors += `${this.$t('noMessage')}
        ` 
      }       

    }
  }
}
</script>



<style scoped lang="css">

.wide-video-section {
  margin-top: 2%;
}

#overrides_bootstrap .green {
  color: black;
}

#overrides_bootstrap .error {
  border-color: #e94b35;
}

.label {
  color: #94aab0;
}

.label {
  display: block;
}

textarea,
.label {
  color: #2b3e51;
}

textarea {
  height: 20vh;
  width: 130vh;
  overflow: auto;
}

@media all and (max-width: 767px) {
  #overrides_bootstrap .green {
    text-shadow: none;
  }  

  textarea {
    height: 10vh;
    width: 30vh;
  }  
}
</style>
