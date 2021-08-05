<template>
    <section class="flexCenter user-wall">

        <button class="user-wall-btn" @click="showUserWall()">Mon mur</button>
        
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
            showUserWall() {
                document.querySelector(".actu").style.zIndex = "5";
                document.querySelector(".user-wall").style.zIndex = "10";
                document.querySelector(".profile").style.zIndex = "5";
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

    $pageColor: rgb(255, 150, 0);

    .empty-wall {
        align-content: flex-start;
        height: 95%;
        width: 90%;
        background: white;
        border-radius: 15px;
    }

    .empty-wall p {
        margin-top: 50px;
        border-radius: 15px;
        font-size: 120%;
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
</style>