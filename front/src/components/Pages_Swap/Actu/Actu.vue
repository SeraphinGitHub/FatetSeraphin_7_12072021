<template>
    <section class="flexCenter actu">
       
        <button class="actu-btn" @click="toggleActu(), refreshPosts()">Actu</button>

        <button v-show="!isPublish" class="flexCenter btn toggle-publish-btn " @click="isPublish=!isPublish">Exprimez-vous</button>
        <button v-show="isPublish" class="btn cancel-btn" @click="isPublish=!isPublish" type="button">Annuler</button>
        
        <component v-if="isPublish" @posted="isPublish=$event" :is="publishComponent"></component>

        <div v-if="isActuEmpty" class="flexCenter empty-actu">
            <p>Il n'y a encore aucune publication à afficher</p>
        </div>

        <div v-if="!isActuEmpty" :key="post" v-show="!isPublish" class="flexCenter flow">

            <Publication v-for="post in publications" :key="post.id"
                @refresh="refreshPosts()"
                :post="post"
            />
        </div>

    </section>
</template>


<script>
    import Publication from "./Publication.vue"
    import Publish from "./Publish.vue"
    import generic from "../../../generic-methods.js"

    export default {
        name: "Actu",

        mixins: [
            generic
        ],

        components: {
            Publication,
        },

        data() {
            return {
                isActuEmpty: true,
                isPublish: false,
                allPostsReceived: false,

                post: {},
                publications: {},
                
                publishComponent: Publish,
                token: window.localStorage.getItem("Token"),
            }
        },

        async beforeMount() {
            await this.refreshPosts();
        },

        methods: {
            toggleActu() {
                this.$emit("actu");
            },


            async refreshPosts() {
                const response = await fetch("http://localhost:3000/api/publish", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.token}`
                    },
                    method: "GET",
                });

                try {
                    const allPosts = await response.json();
                    this.publications = allPosts.sort().reverse();
                    this.$emit("loading");
                    this.allPostsReceived = true;
                    this.isActuEmpty = false;
                }
                catch(error) { console.log("error", error) }                
            },
        },
    }
</script>


<style>
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

    // -----------------------------------
    $pageColor: rgb(60, 180, 255);
    // -----------------------------------


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

    .empty-actu {
        align-content: flex-start;
        height: 84%;
        width: 90%;
        margin-top: 10px;
        background: white;
        border-radius: 15px;
    }

    .empty-actu p {
        margin-top: 50px;
        line-height: 140%;
        font-size: 120%;
        font-weight: 600;
    }


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



    /* =============================================================================== */
    /*      Tablet Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 421px) and (max-width : 576px) {

        .flow {
            height: 570px;
        }
    }


    /* =============================================================================== */
    /*      Tablet Big Size       */
    /* =============================================================================== */
    @media screen and (min-width: 577px) and (max-width : 768px) {

        .flow {
            height: 660px;
            width: 90% !important;
        }

        .toggle-publish-btn {
            margin-top: 15px;
            height: 60px;
            width: 50%;
        }

        .cancel-btn {
            width: 45%;
        }
    }


    /* =============================================================================== */
    /*      Laptop Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 769px) and (max-width : 992px) {
        
        .flow {
            height: 790px;
            width: 90% !important;
        }

        .toggle-publish-btn {
            margin-top: 15px;
            height: 60px;
            width: 40%;
        }

        .cancel-btn {
            width: 35%;
        }
    }


    /* =============================================================================== */
    /*      Laptop Big Size      */
    /* =============================================================================== */
    @media screen and (min-width: 993px) and (max-width : 1366px) {
        
        .flow {
            height: 740px;
            width: 85% !important;
        }

        .toggle-publish-btn {
            margin-top: 15px;
            height: 60px;
            width: 35%;
        }

        .cancel-btn {
            width: 30%;
        }
    }


    /* =============================================================================== */
    /*      Screen Normal Size && Over      */
    /* =============================================================================== */
    @media screen and (min-width: 1367px) {
        .flow {
            height: 850px;
            width: 85% !important;
        }

        .toggle-publish-btn {
            margin-top: 20px;
            margin-bottom: 10px;
            height: 80px;
            width: 27%;
        }

        .cancel-btn {
            width: 22%;
            height: 80px;
            margin: 20px;
            margin-bottom: 15px;
            margin-left: 100px;
            margin-right: 100px;
        }
    }
</style>