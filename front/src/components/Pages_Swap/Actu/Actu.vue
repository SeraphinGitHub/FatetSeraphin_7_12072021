<template>
    <section class="flexCenter actu">
       
        <button class="actu-btn" @click="showActu()">Actu</button>

        <button v-show="!isPublish" class="flexCenter btn toggle-publish-btn " @click="isPublish = !isPublish">Exprimez-vous</button>
        <button v-show="isPublish" class="btn cancel-btn" @click="isPublish = !isPublish" type="button">Annuler</button>
        
        <!-- <transition name="slide"> -->
            <component v-show="isPublish" :is="publishComp"></component>
        <!-- </transition> -->

        <transition name="slide">
            <ul v-show="!isPublish" class="flexCenter flow">
                <Publication/>
                <Publication/>
            </ul>
        </transition>

    </section>
</template>


<script>
    import Publication from "./Publication.vue"
    import Publish from "./Publish.vue"

    export default {
        name: "Actu",
        
        components: {
            Publication,
        },

        data() {
            return {
                isPublish: false,
                publishComp: Publish,
            }
        },

        methods: {
            showActu: function() {
                document.querySelector(".actu").style.zIndex = "10";
                document.querySelector(".private-wall").style.zIndex = "5";
                document.querySelector(".profile").style.zIndex = "5";
            },
        }
    }
</script>


<style>
    .user-pict {
        justify-content: space-between !important;
        height: 80px;
        width: 100%;
    }

    .user-pict img,
    .circle-user-img {
        object-fit: cover;
        height: 100%;
        width: 80px;
        box-shadow: black 5px 5px 5px;
    }

    .user-infos {
        height: 90%;
        width: 57% !important;
        justify-content: flex-start;
        align-content: space-between;
        text-align: left;
    }

    .user-infos h2,
    .user-infos p,
    .time-stamp {
        margin: 0;
        font-size: 95%;
        width: 100%;
    }

    /* ========== Background Color ========== */
    .post-form,
    .commentate {
        background: linear-gradient(to bottom right, rgb(245, 245, 245), rgb(110, 110, 110));
    }
</style>


<style scoped lang="scss">

    .toggle-publish-btn {
        width: 65%;
        background: linear-gradient(to bottom right, rgb(179, 0, 255), violet);
    }

    .toggle-publish-btn,
    .cancel-btn {
        margin-top: 10px;
        margin-bottom: 5px;
    }

    .cancel-btn {
        width: 50%;
    }
    
    .flow {
        height: 410px;
        margin-top: 10px;
    }

    $pageColor: rgb(60, 180, 255);

    /* ========== COMMENT CONTENT ========== */
    .commentate {
        padding-bottom: 10px;
        border-top: double rgb(0, 100, 200) 5px;
    }   
    
    .actu {
        align-content: flex-start;
        z-index: 10;
        border-radius: 0 20px 20px 20px;
        background: linear-gradient(to top, lightgray, $pageColor);
    }

    .actu,
    .actu-btn {
        border: solid $pageColor 3px;
    }
    
    .actu-btn {
        left: -3px;
        background-color: $pageColor;
    }

    // **************************************************
    // Transitions
    // **************************************************
    // .slide-enter-active {
    //     height: 410px !important;
    // }

    // .slide-leave-active {
    //     height: 0px;
    //     transition-duration: 1s;
    // }


    .slide-enter,
    .slide-leave-to { height: 0 }

    .slide-leave,
    .slide-enter-to { height: 410px }

    .slide-enter-active,
    .slide-leave-active { transition: height 1s }
</style>