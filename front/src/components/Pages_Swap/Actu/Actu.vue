<template>
    <section class="flexCenter actu">
       
        <button class="actu-btn" @click="showActu()">Actu</button>

        <button v-show="!isPublish" class="flexCenter btn toggle-publish-btn " @click="isPublish = !isPublish">Exprimez-vous</button>
        <button v-show="isPublish" class="btn cancel-btn" @click="isPublish = !isPublish" type="button">Annuler</button>
        

        <transition name="slidePublish">
            <component v-if="isPublish" :is="publishComp"></component>
        </transition>

        <transition-group name="slideFlow">
            
            <!-- <ul v-for="item in items" :key="item.id" v-show="!isPublish" class="flexCenter flow"> -->
            
            <ul v-for="item in items" :key="item" v-show="!isPublish" class="flexCenter flow">
                
                <Publication :key="item.id" :post="item"/>

            </ul>
        </transition-group>

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
                   
                // isOwner:"",

                items: {

                    post: {
                        name: "Seraphin",
                        email: "aze@aze.aze",
                        age: "456",
                    }

                    // {
                    //     postId:"3",
                    //     userPhoto:"",
                    //     userName:"Séraphin",
                    //     position:"Welder",
                    //     service:"Workshop",
                    //     publishedTime:"20/07/2021",
                    //     filePicture:"",
                    //     textContent:"Thi is a line of text for test.",
                    // }
                },
            }
        },

        methods: {
            showActu() {
                document.querySelector(".actu").style.zIndex = "10";
                document.querySelector(".private-wall").style.zIndex = "5";
                document.querySelector(".profile").style.zIndex = "5";


                this.getAllPublish_API();
            },

            async getAllPublish_API() {
                return await fetch("http://localhost:3000/api/publish")
                .then(response => response.json())
                .then(data => { return data });
            },
        }
    }
</script>


<style>
    .user-pict {
        justify-content: flex-start !important;
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
        margin-left: 15px;
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

    $flowHeight: 420px;
    $flowMarginTop: 10px;
    
    .flow {
        height: $flowHeight;
        margin-top: $flowMarginTop;
    }

    .toggle-publish-btn,
    .cancel-btn {
        margin-top: $flowMarginTop;
        margin-bottom: 5px;
    }

    .toggle-publish-btn {
        width: 65%;
        background: linear-gradient(to bottom right, rgb(179, 0, 255), violet);
    }

    .cancel-btn {
        width: 50%;
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


    // ****************************************************************************************************
    // ==>      Transitions     <==
    // ****************************************************************************************************
    
    $slideDuration: 1s;

    .slidePublish-enter-active,
    .slideFlow-enter-active {
        transition-delay: $slideDuration;
        transition-duration: $slideDuration;
    }

    .slidePublish-leave-active,
    .slideFlow-leave-active {
        transition-duration: $slideDuration;
    }


    // ========== Flow ==========
    .slideFlow-enter-from,
    .slideFlow-leave-to { 
        height: 0;
    }

    .slideFlow-leave-from,
    .slideFlow-enter-to {
        height: $flowHeight;
    }

    
    // ========== Publish ==========
    .slidePublish-enter-from,
    .slidePublish-leave-to { 
        height: 0;
    }

    .slidePublish-leave-from,
    .slidePublish-enter-to {
        height: 90%;
    }
</style>