<template>
  <!-- Account Login Start -->
  <div id="rs-my-account" class="rs-my-account pt-100 md-pb-80 md-pt-80">
    <div class="container">
      <div class="row pb-100 md-pb-72">
        <div class="col-lg-3"></div>
        <div class="col-lg-6">
          <div class="login-side">
            <div class="sec-title">
              <h2 class="title">Mes Parrainages</h2>
            </div>
            <form class="login-form" @submit.prevent="mentor()">
              <p>On invite qui alors?</p>
              <label class="input-label"
                >Amis 1 <span class="req">*</span></label
              >
              <input
                class="input-control"
                type="email"
                name="Partainage"
                required=""
                v-model="formdata.email1"
                placeholder="Address Email"
              />
              <label class="input-label"
                >Amis 2 <span class="req">*</span></label
              >
              <input
                class="input-control"
                type="email"
                name="Partainage"
                required=""
                placeholder="Address Email"
                v-model="formdata.email2"
              />
              <label class="input-label"
                >Amis 3 <span class="req">*</span></label
              >
              <input
                class="input-control"
                type="email"
                name="Partainage"
                required=""
                placeholder="Address Email"
                v-model="formdata.email3"
              />
              <label class="input-label"
                >Amis 4 <span class="req">*</span></label
              >
              <input
                class="input-control"
                type="email"
                name="Partainage"
                required=""
                placeholder="Address Email"
                v-model="formdata.email4"
              />
              <label class="input-label"
                >Amis 5 <span class="req">*</span></label
              >
              <input
                class="input-control"
                type="email"
                name="Partainage"
                required=""
                placeholder="Address Email"
                v-model="formdata.email5"
              />
              <div class="submit-btn">
                <button class="readon" type="submit">Envoyer</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-3"></div>
      </div>
    </div>
  </div>
  <!-- Account Login End -->
</template>
<script>
export default {
  name: "ParrainagesForm",
  data() {
    return {
      formdata: {
        mentor_username: this.$store.state.user.userVisited.username,
        email1: "",
        email2: "",
        email3: "",
        email4: "",
        email5: ""
      }
    };
  },
  methods: {
    mentor() {
      this.$store
        .dispatch("user/sendMentorCode", this.formdata)
        .then(response => {
          this.formdata = {
            mentor_username: this.$store.state.user.userVisited.username,
            email1: "",
            email2: "",
            email3: "",
            email4: "",
            email5: ""
          };
          this.$swal({
            icon: "success",
            title: "Success",
            text: "Mentor emails added Successfully!",
            showCancelButton: false,
            confirmButtonText: "Ok",
            confirmButtonColor: "#3FB389",
            showCloseButton: true,
            showLoaderOnConfirm: true
          });
        })
        .catch(error => {
          console.error(error);
          this.$swal({
            icon: "error",
            title: "Oops...",
            text: "Process Failed Try Again!!",
            showCancelButton: false,
            confirmButtonText: "Ok",
            confirmButtonColor: "#3FB389",
            showCloseButton: true,
            showLoaderOnConfirm: true
          });
        });
    }
  }
};
</script>
<style scoped></style>
