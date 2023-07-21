<template>
    
<!-- Component reusable to upload videos through the app -->

    <div
        class="modal fade "
        id="upload_modal"
        tabindex="-1"
        role="dialog" 
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div style="background: #f7f7f7;" class="modal-content">
                <div style="border-bottom: none !important;" class="modal-header">
                    <img class="mr-2" src="/images/icons/icons8-video-48.png" alt width="30" height="30" />
                    <h6 style="color: #3FB389;" class="modal-title">
                        {{title}}
                    </h6>
                    <button id="closeUploadTop" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div
                    style="background: #fff; padding: 30px 30px; margin-top: -10px; border-radius: 10px;"
                    class="container"
                    >
                        <center>
                            <div class="form-group">
                            <vueDropzone 
                                ref="myVueDropzone"
                                id="dropzone" 
                                :options="dropzoneOptions"
                                :headers="headers"
                                @vdropzone-sending="(file, xhr, formData) => $emit('file-being-sent', file, xhr, formData)"
                                @vdropzone-success="(file, response) => {
                                    $emit('file-uploaded', file, response) 
                                    updateStatus(true)
                                }"
                                @vdropzone-removed-file="$emit('file-removed');updateStatus(false)"
                                @vdropzone-error="$emit('upload-error');updateStatus(false)"
                            />
                            </div>
                            <div class="form-group" v-show="scoreNeeded && fileUploaded">
                                <input
                                    type="number"
                                    :placeholder="$tc('myMasculine') + ' ' + $t('reachedScore')"
                                    class="form-control"
                                    id="score"
                                    v-model="score"
                                    min="0"
                                />
                            </div>                        
                        </center>
                    </div>
                </div>

                <div style="justify-content: center; border-top: none !important;" class="modal-footer">
                    <button
                        id="closeUploadBottom"
                        style="float:left !important; border-radius: 50px; padding: 5px 40px;"
                        type="button"
                        class="btn btn-danger"
                        data-dismiss="modal"
                    >   
                        {{$t('close') | capitalizeText}}
                    </button>
                    <button
                        id="saveUpload"
                        v-if="!hideSaveButton" 
                        style="float:left !important; border-radius: 50px; padding: 5px 40px;"
                        type="button"
                        class="btn btn-success"
                        data-dismiss="modal"
                        :disabled="!fileUploaded"
                        @click="$emit('file-saved', score)"
                    >
                        {{$t('save') | capitalizeText}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import vue2Dropzone from 'vue2-dropzone'

const getTemplate = () => `
    <div class="dz-preview dz-file-preview">
        <div class="dz-progress" style="width: 100px; height: 5px !important; background-color: green"><span class="dz-upload" data-dz-uploadprogress></span></div>
        <div v-if="success" class="dz-success-mark"><span>✔</span></div>
        <template v-else>
            <div class="dz-error-mark"><span>✘</span></div>
            <div class="dz-error-message"><span data-dz-errormessage></span></div>
        </template>
    </div>
`

export default {

    name: 'Upload',
    
    components: {
        vueDropzone: vue2Dropzone
    },

    props: ['title', 'scoreNeeded', 'dropzoneInitialOptions', 'hideSaveButton'],

    data() {
        return {
            fileUploaded: false,
            score: 0,
            success: false,
            dropzoneOptions: {
                ...this.dropzoneInitialOptions,
                url: process.env.VUE_APP_API_URL + this.dropzoneInitialOptions.url,
                dictFallbackMessage: this.$t('browserNotRecentEnough'),
                dictInvalidFileType: this.$t('acceptedFilesTypesOnly') + ':' + this.dropzoneInitialOptions.acceptedFiles,
                dictResponseError: this.$store.state.apiInternalError,
                previewTemplate: getTemplate(),
                init: function () {

                    var myDropzone = this;

                    $("#closeUploadTop").click(function () {
                        myDropzone.removeAllFiles();
                    });  

                    $("#closeUploadBottom").click(function () {
                        myDropzone.removeAllFiles();
                    });   
                    
                    $("#saveUpload").click(function () {
                        myDropzone.removeAllFiles();
                    });                      
                }                  
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Cache-Control": "",
                "X-Requested-With": ""
            },            
        }
    },

    methods: {

        // Updates the status of the upload process
        updateStatus(value) {
            this.fileUploaded = !this.fileUploaded
            this.success = value
        }
    }
}
</script>