<template>
    <section class="flexCenter actu">
       
        <button class="actu-btn" @click="toggleActu(), refreshPosts()">Actu</button>

        <button v-show="!isPublish" class="flexCenter btn toggle-publish-btn " @click="isPublish=!isPublish">Exprimez-vous</button>
        <button v-show="isPublish" class="btn cancel-btn" @click="isPublish=!isPublish" type="button">Annuler</button>
        
        <component v-if="isPublish" @posted="isPublish=$event" :is="publishComponent"></component>
    
        <div :key="post" v-show="!isPublish" class="flexCenter flow">

            <Publication v-for="post in publications" :key="post.id" @refresh="refreshPosts()"
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
</style>