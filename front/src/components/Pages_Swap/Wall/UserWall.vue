<template>
    <section class="flexCenter user-wall">

        <button class="user-wall-btn" @click="toggleWall()">Mon mur</button>
        
        <div v-if="isWallEmpty" class="flexCenter empty-wall">
            <p>Vous n'avez encore rien publier</p>
        </div>
        
        <ul v-if="!isWallEmpty" :key="post" class="flexCenter flow">
                
            <Publication v-for="post in userPosts" :key="post.id"
                :post="post"
            />
        </ul>

    </section>
</template>


<script>
    import Publication from '../Actu/Publication.vue'

    export default {
        name: "UserWall",

        components: {
            Publication,
        },

        data() {
            return {
                isWallEmpty: true,

                post: {},
                userPosts: {},
                
                token: window.localStorage.getItem("Token"),
            }
        },

        async beforeMount() {
            await this.getUserPosts();
        },

        methods: {
            toggleWall() {
                this.$emit("wall");
            },

            async getUserPosts() {
                const allPostsUser = await fetch("http://localhost:3000/api/auth/wall", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.token}`
                    },
                    method: "GET",
                }).then(data => { return data.json() })
                .catch(error => console.log("error", error));

                this.userPosts = allPostsUser.sort().reverse();

                if(this.userPosts.length) this.isWallEmpty = false;
            },
        }
    }
</script>


<style scoped lang="scss">

    // -----------------------------------
    $pageColor: rgb(255, 150, 0);
    // -----------------------------------
    

    .empty-wall {
        align-content: flex-start;
        height: 95%;
        width: 90%;
        background: white;
        border-radius: 15px;
    }

    .empty-wall p {
        margin-top: 50px;
        font-size: 120%;
        line-height: 140%;
        font-weight: 600;
    }

    .user-wall {
        z-index: 5;
        border-radius: 20px;
        background: linear-gradient(to top, lightgray, $pageColor);
    }

    .user-wall,
    .user-wall-btn {
        border: solid $pageColor 3px;
    }
    
    .user-wall-btn {
        left: center;
        background-color: $pageColor;
    }

    .flow {
        height: 460px;
    }



    /* =============================================================================== */
    /*      Tablet Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 421px) and (max-width : 576px) {

        .flow {
            height: 630px;
        }
    }


    /* =============================================================================== */
    /*      Tablet Big Size       */
    /* =============================================================================== */
    @media screen and (min-width: 577px) and (max-width : 768px) {

        
    }


    /* =============================================================================== */
    /*      Laptop Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 769px) and (max-width : 992px) {
        
    }


    /* =============================================================================== */
    /*      Laptop Big Size      */
    /* =============================================================================== */
    @media screen and (min-width: 993px) and (max-width : 1366px) {
        
    }


    /* =============================================================================== */
    /*      Screen Normal Size && Over      */
    /* =============================================================================== */
    @media screen and (min-width: 1367px) {
        
    }
</style>