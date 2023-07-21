<template>
<!-- Page that explains to the player how to use the app and what they can do -->
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
        
        <div class="club-videos pb-90 md-pb-70">
            <div class="row">
            <center>    
                <p>
            {{$t('howItWorksStartMessage')}}
        </p> 
            <div class="col-lg-8 col-md-8 md-mb-30">
                <div>
                    <iframe src="https://www.youtube.com/embed/o7loECB72Gk">
                    </iframe>                    
                </div>
            </div>
            </center>
            </div>
        </div> 
    </div>   
</template>

<script>
export default {
    name: 'HowItWorksPlayer'
}
</script>
