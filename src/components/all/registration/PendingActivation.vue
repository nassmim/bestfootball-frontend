<template lang="html">
<!-- This page is for the user who just signed up but still has to verify his account 
-->

    <div>
        <div class="container mt-30 mb-30">
            <center>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header text-center">
                        <span style="font-weight:600;">{{$t('accountVerification')}}</span>
                        </div>

                        <div class="card-body text-center">
                            <div>
                                <div class="alert alert-success" role="alert">
                                    {{$t('SuccessAccountRegistered')}}
                                </div>
                                <router-link
                                style="color: #fff; background-color: #3fb389; border-color: #3fb389;"
                                class="btn btn-success"
                                :to="{name: 'Login'}"
                                >
                                    {{$t('toLogin')}}
                                </router-link >
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PendingActivation',
}

</script>

<style scoped lang="css">
h3 {
  font-size: 20px;
}
</style>
