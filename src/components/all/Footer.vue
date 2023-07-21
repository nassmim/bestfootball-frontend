<template>
  <footer style="background:#3FB389;" class="page-footer font-small indigo">
    <!-- Footer Links -->
    <div class="container">
      <!-- Grid row-->
      <div class="footer_nav mb-5">
        <center>
          <ul class="footer_nav mt-5">
            <li style="border-right:2px solid #fff;">
              <router-link
                style="color:#fff !important;"
                :to="{ name: 'PrivacyPolicy' }"
              >
                {{ $t("privacyPolicy") }}
              </router-link>
            </li>
            <li style="border-right:2px solid #fff;">
              <router-link
                style="color:#fff !important;"
                :to="{ name: 'TermsOfUse' }"
              >
                {{ $t("termsAndConditions") }}
              </router-link>
            </li>
            <li style="border-right:2px solid #fff;">
              <router-link
                style="color:#fff !important;"
                :to="{ name: 'AboutUs' }"
              >
                {{ $t("aboutUs") }}
              </router-link>
            </li>
            <li>
              <router-link
                style="color:#fff !important;"
                :to="{ name: 'Contact' }"
              >
                {{ $t("contact") }}
              </router-link>
            </li>
          </ul>
        </center>
      </div>
      <!-- Grid row-->

      <!--<hr class="rgba-white-light" style="margin: 0 15%;">-->

      <!-- Grid row-->

      <!-- Grid row-->
      <div class="row pb-3">
        <!-- Grid column -->
        <div class="col-md-12">
          <div style="display:flex;" class="main">
            <div style="width:40%;" class="left_side">
              <hr
                class="left_line"
                style="border-top:1px solid #FFE18C; margin: 8% 6%;"
              />
            </div>
            <div style="width:40%;" class="middle_side">
              <ul
                style="display:flex; align-items: center; justify-content: center;"
              >
                <li class="footer_li">
                  <a style="color:#fff;" class="text text-center" href="#">
                    <i
                      class="fa fa-facebook footer_icons"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
                <li class="footer_li">
                  <a style="color:#fff;" href="#">
                    <i
                      class="fa fa-twitter footer_icons"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
                <li class="footer_li">
                  <a style="color:#fff;" href="#">
                    <i
                      class="fa fa-instagram footer_icons"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
                <li class="footer_li">
                  <a style="color:#fff;" href="#">
                    <i
                      class="fa fa-youtube footer_icons"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
            <div style="width:40%;" class="right_side">
              <hr
                class="right_line"
                style="border-top:1px solid #FFE18C; margin: 8% 6%;"
              />
            </div>
          </div>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row-->
    </div>
    <!-- Footer Links -->

    <!-- Copyright -->
    <div
      style="color:#fff !important;"
      class="footer-copyright text-center py-3"
    >
      © {{ new Date().getFullYear() }} BestFootball. {{ $t("allRights") }}
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer End -->
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer_nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.footer_nav li {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  padding: 0px 20px;
}

@media only screen and (min-width: 320px) and (max-width: 700px) {
  .footer_icons {
    color: #fff;
    text-align: center !important;
    padding-top: 4px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 18px;
  }
  .footer_nav li {
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    padding: 0px 10px;
  }
}

@media screen and (min-width: 800px) {
  .footer_icons {
    color: #fff;
    text-align: center !important;
    padding-top: 3px;
    padding-left: 4px;
    font-size: 21px;
  }
  .footer_li {
    border: 2px solid #fff;
    border-radius: 100%;
    width: 45px;
    height: 45px;
    margin: 0.5em;
    padding: 0.5em;
  }
}
@media only screen and (min-width: 320px) and (max-width: 700px) {
  footer {
    display: none !important;
  }
}
</style>
