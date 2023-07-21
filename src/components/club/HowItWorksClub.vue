<template>
<!-- Page that explains to the club how to use the app and what they can do -->
    <div>
        <div class="shop-guide mb-30">
            <div class="row rs-vertical-middle">
            <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                <div class="title-style pb-50 md-pb-30">
                <h2 class="margin-0 uppercase">{{$t('HowItWorks')}}?</h2>
                <span class="line-bg y-b pt-10 left-line"></span>
                </div>
            </div>
            <div
                class="col-lg-6 col-md-6 col-sm-6 text-right xs-text-left"
            ></div>
            </div>
        </div>

        <div class="point-table-wrap pb-80 md-pb-80">
            <div class="row">
            <div class="col-lg-4 col-md-4">
                <table>
                <tbody>
                    <tr>
                    <th>
                        <p
                        class="text-center"
                        style="margin: 0 0 2px;font-size:18px;"
                        >
                            {{$t('club') | capitalizeText}}
                        </p>
                    </th>
                    </tr>
                    <tr>
                    <th
                        style="background:#fff;border-left:1px solid #ddd;border-right:1px #ddd solid;"
                    >
                        <h4 class="text-center" style="margin: 0 0 2px;">
                            {{$t('yourCoachesAndYou')}}
                        </h4>
                    </th>
                    </tr>
                    <tr>
                    <th
                        style="background:#fff;padding:1px;border-left:1px solid #ddd;border-right:1px #ddd solid;"
                    >
                        <p
                        class="text-center"
                        style="text-decoration:line-through;font-size:20px;margin: 0 0 2px;"
                        >
                        7.99€
                        </p>
                    </th>
                    </tr>
                    <tr>
                    <th
                        style="background:#fff;border-left:1px solid #ddd;border-right:1px #ddd solid;"
                    >
                        <h1
                        class="text-center"
                        style="margin: 0 0 2px;color:#387b31; color:#3fb389;"
                        >
                            {{$t('freeForMonths')}}!
                        </h1>
                    </th>
                    </tr>
                    <tr>
                    <th
                        style="background:#fff;border-left:1px solid #ddd;border-right:1px #ddd solid;"
                        class="text-center"
                    >
                        <a class="btn btn-success" @click="goToSignUp"
                        >
                            {{$t('signUp')}}!
                        </a
                        >
                    </th>
                    </tr>
                    <tr>
                    <th
                        style="background:#fff;border-left:1px solid #ddd;border-right:1px #ddd solid;border-bottom:1px #ddd solid;"
                        class="text-center"
                    >
                        <p
                        class="text-center"
                        style="color: black;margin: 0 0 2px;"
                        >
                            {{$t('priceAfterFree')}}**
                        </p>
                    </th>
                    </tr>
                </tbody>
                </table>
            </div>
            <div class="col-lg-8 col-md-8">
                <table>
                <tbody>
                    <tr style="border-top:1px #ddd solid;">
                    <td>{{$t('registerATeam')}}</td>
                    <td class="text-center">
                        <i class="fa fa-check"></i>
                    </td>
                    </tr>
                    <tr>
                    <td>{{$t('registerManyTeams')}}</td>
                    <td class="text-center">
                        <i class="fa fa-check"></i>
                    </td>
                    </tr>
                    <tr>
                    <td>{{$t('addPlayersNoLimit')}}</td>
                    <td class="text-center">
                        <i class="fa fa-check"></i>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        {{$t('createExercicesFeature')}}
                    </td>
                    <td class="text-center">
                        <i class="fa fa-check"></i>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        {{$t('watchExercicesFeature')}}
                    </td>
                    <td class="text-center">
                        <i class="fa fa-check"></i>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        {{$t('playerResearchAlgorithFeature')}}
                    </td>
                    <td class="text-center">
                        <i class="fa fa-check"></i>
                    </td>
                    </tr>
                    <tr>
                    <td>{{$t('earnVirtualMoneyFeature')}}</td>
                    <td class="text-center">
                        <i class="fa fa-check"></i>
                    </td>
                    </tr>
                    <tr style="border-bottom:1px #ddd solid;">
                    <td>{{$t('getExercicesNotesFeature')}}</td>
                    <td class="text-center">
                        <i class="fa fa-check"></i>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
        <p style="color:#333;">
            <strong>{{$tc('virtualMoney', 2)}}*:</strong>
            {{$t('virtualMoneyAsterixClub')}}
        </p>
        <p style="color:#333;">
            <strong>{{$t('playersAddedAsterix')}}**:</strong> 
            {{$t('playersAddedAsterixText')}}
        </p>
    </div>
</template>

<script>

export default {

name: 'HowItWorksCoach',

    methods: {
        goToSignUp() {
            this.$store.commit('USER_UPDATE_ROLE', this.$store.state.rolesNames.club)    
            this.$router.push({name: 'SignUp'})
        }
    }    
}
</script>
