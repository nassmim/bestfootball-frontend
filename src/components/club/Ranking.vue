<template>
  <!-- Result Info Section Start -->
  <div class="rs-result inner pt-100 md-pt-80">
    <div class="container">
      <div class="rs-products">
        <div class="shop-guide mb-30">
          <div class="row rs-vertical-middle">
            <div class="col-lg-4 col-md-4 col-sm-4 xs-mb-15">
              <div class="title-style pb-50 md-pb-30">
                <h2 class="margin-0 uppercase">Les Classements</h2>
                <span class="line-bg y-b pt-10 left-line"></span>
                <span class="mt-5">
                  <strong>For {{ choiceType }}</strong>
                </span>
              </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 text-right xs-text-left">
              <div class="sorting container">
                <form>
                  <select
                    class="col-lg-1.5"
                    style="float: left !important"
                    v-model="choiceType"
                    @change="loadRanks"
                  >
                    <option disabled selected value="all">-- Type --</option>
                    <option value="bestfootball">Bestfootball</option>
                    <option value="equipe(s)">Equipe(s)</option>
                  </select>
                  
                  <template v-if="choiceType == 'bestfootball'">
                  <select
                    class="col-lg-1.5"
                    style="float: left !important"
                    v-model="choiceGender"
                    @change="loadRanks"
                  >
                    <option disabled value="all">Mixte</option>
                    <option value="M">Garçons</option>
                    <option value="F">Filles</option>
                  </select>
                  
                  <select
                    class="col-md-2"
                    style="float: left !important"
                    v-model="choiceCountry"
                    @change="loadRanks"
                  >
                    <option disabled value="all">-- Tous les pays --</option>
                    <option
                      v-for="country in countries"
                      :key="country.id"
                      :value="country.id"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                  <select
                    class="mr-3 col-md-2"
                    style="float: left !important"
                    v-model="choiceSection"
                    @change="loadRanks"
                  >
                    <option disabled value="all">-- Section --</option>
                    <option value="challenge">Les Challenges BF</option>
                    <option value="duel">Les Duels</option>
                  </select>
                  </template>
                  <template v-else>
                              <select class="col-md-2" style="float: left !important">
                                <option disabled selected value="">-- Season --</option>
                                <option value="2018-2019">2018-2019</option>
                                <option value="2019-2020">2019-2020</option>
                              </select>
                            
                              <select class="col-lg-1.5" style="float: left !important">
                                <option disabled selected value="">-- Teams --</option>
                                <option value="Team 2">Team 1</option>
                                <option value="Team 2">Team 2</option>
                              </select>

                  </template>
                  
                  <select
                    class="mr-3 col-md-2"
                    style="float: left !important"
                    v-model="choiceCategory"
                    @change="loadRanks"
                  >
                    <option disabled value="all">
                      -- Tous les types d'exercice --
                    </option>
                    <option
                      v-for="cat in challengesCategories"
                      :key="cat.id"
                      :value="cat.id"
                    >
                      {{ cat.english_name }}
                    </option>
                  </select>
                  <select
                    class="mr-3 col-md-2"
                    style="float: left !important"
                    v-model="choiceChallenge"
                    @change="loadRanks"
                  >
                    <option disabled value="all">
                      -- Tous les challenges --
                    </option>
                    <option
                      v-for="challenge in challengesList"
                      :key="challenge.id"
                      :value="challenge.id"
                    >
                      {{ challenge.name }}
                    </option>
                  </select>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Point Table Start -->
      <div class="rs-pointtable inner-style pt-30 md-pt-80 md-pb-80">
        <div class="container">
          <div class="point-table-wrap pb-100 md-pb-80">
            <table>
              <tbody style="text-align: center !important">
                <tr>
                  <th>
                    <img
                      style
                      class="mr-2"
                      src="/images/icons/BFicon.png"
                      alt
                      width="40"
                      height="40"
                    />
                  </th>
                  <th>Rang</th>
                  <th>Foot Coins</th>
                  <th>Status</th>
                  <th>Pays</th>
                </tr>
                <template v-if="playerRankings.length > 0">
                  <tr v-for="(player, index) in playerRankings" :key="index">
                    <td>
                      <img
                        style="
                          border: 3px solid #3fb389;
                          border-radius: 100%;
                          background: #3fb58a;
                          width: 70px;
                          height: 70px;
                        "
                        :src="`/upload/images/users/${player.player.avatar}`"
                        alt
                      />
                      <br />
                      <p>
                        <strong
                          >{{ player.player.first_name }}
                          {{ player.player.last_name }}</strong
                        >
                      </p>
                    </td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ player.total_footcoin }} FootCoins</td>
                    <td>{{ player.status }} Tu es une légende</td>
                    <td>
                      <ul class="classement_li">
                        <li v-if="player.country" class="mr-2">
                          {{ player.country }}
                        </li>
                        <li v-else class="mr-2">France</li>
                        <li>
                          <img
                            v-if="player.country"
                            style="
                              width: 40px;
                              height: 30px;
                              border-radius: 3px;
                            "
                            :src="player.drapeau"
                          />
                          <img
                            v-else
                            style="
                              width: 40px;
                              height: 30px;
                              border-radius: 3px;
                            "
                            :src="`/images/flags/france.png`"
                          />
                        </li>
                      </ul>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <div class="container">
                    <div
                      style="
                        background: #fff;
                        padding: 30px 30px 1px 30px;
                        text-align: center !important;
                      "
                      class="mb-80"
                      id="no_data_div"
                    >
                      <center>
                        <h6 style="color: gray">No Exercises to display</h6>
                      </center>
                    </div>
                  </div>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Point Table End -->
    </div>
  </div>
  <!-- Result Info Section End -->
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Ranking",
  data() {
    return {
      userId: "all",
      teamsIds: "all",
      seasonId: "all",
      ageCategoryId: "all",
      choiceGender: "all",
      choiceCountry: "all",
      choiceSection: "all",
      choiceCategory: "all",
      choiceChallenge: "all",
      choiceType: "bestfootball",
      pageNumber: "all",
      fromPage: this.$route.name,
      size: "all",
      orderChallenges: "name",
      teamIdentifier: "all",
      teamIndex: "",
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.user.data,
      countries: (state) => state.countries.list,
      challengesList: (state) => state.trainings.challengesList,
      challengesCategories: (state) => state.trainings.categories,
      playerRankings: (state) => state.ranking.all,
      teams: (state) => state.teams.list,
    }),
  },
  mounted() {
    this.getAllChallenges();
    this.getAllCategories();
    this.getAllCountries();
    this.loadRanks();
  },

  methods: {
    ...mapActions("trainings", ["getChallenges"]),
    ...mapActions("trainings", ["getChallengeCategories"]),
    ...mapActions("countries", ["getCountries"]),
    ...mapActions("ranking", ["getRanking"]),
    ...mapActions("teams", ["getTeams"]),

    getCoachTeams() {
      let data = {
        teamIdentifier: this.teamIdentifier,
        userId: this.userId,
        role: this.userRole,
        index: this.teamIndex,
      };
      this.getTeams(data);
    },

    switchTeam(index) {
      this.teamIndex = index;
      this.getCoachTeams();
    },

    getAllChallenges() {
      let data = {
        name: this.userId,
        teamsIds: this.teamsIds,
        seasonId: this.seasonId,
        ageCategoryId: this.ageCategoryId,
        categoryId: this.choiceCategory,
        size: this.size,
        pageNumber: this.pageNumber,
        page: this.fromPage,
        order: this.orderChallenges,
      };
      this.getChallenges(data);
    },

    getAllCategories() {
      let data = {
        choiceChallenge: this.choiceChallenge,
      };
      this.getChallengeCategories(data);
    },

    getAllCountries() {
      this.getCountries();
    },

    loadRanks() {
      let data = {
        userId: this.userId,
        teamsIds: this.teamsIds,
        seasonId: this.seasonId,
        ageCategoryId: this.ageCategoryId,
        categoryId: this.choiceCategory,
        countryId: this.choiceCountry,
        section: this.choiceSection,
        challengeId: this.choiceChallenge,
        size: this.size,
        gender: this.choiceGender,
        pageNumber: this.pageNumber,
        page: this.fromPage,
      };
      this.getRanking(data);
    },
  },
};
</script>
