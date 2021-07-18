<template>
    <div class="flexCenter pages-container">
        <button class="btn logout" @click.prevent="logOut()" type="submit">Déconnexion</button>
        
        <div class="flexCenter my-page">
            <button class="profile" @click="showProfile()">Profile</button>
            
            <div class="flexCenter flow">
                
            </div>
        </div>


        <div class="flexCenter publications">
            <button class="wall" @click="showWall()">Publications</button>
            <Publish/>
            
            <ul class="flexCenter flow">
                <Publication/>
                <Publication/>
            </ul>
        </div>

    </div>
</template>


<script>
    import Publication from './Publication.vue'
    // import Publish from './Publish.vue'

    export default {
        name: 'PagesSwap',
        
        components: {
            Publication,
            // Publish,
        },

        methods: {
            showProfile: function() {
                document.querySelector(".my-page").style.zIndex = "10";
                document.querySelector(".publications").style.zIndex = "5";
            },

            showWall: function() {
                document.querySelector(".publications").style.zIndex = "10";
                document.querySelector(".my-page").style.zIndex = "5";
            },

            logOut: function() {
                
            },
        }
    }
</script>


<style scoped>
    .pages-container {
        position: relative;
        height: 500px;
    }

    .logout {
        position: absolute;
        top: -3px;
        height: 35px;
        width: 150px;
        background: linear-gradient(to bottom right, pink, red);
    }
    
    .publications {
        left: 48%;
        border-radius: 0 15px 15px 15px;
        background: linear-gradient(to top, lightgray, rgb(255, 185, 0));
    }
    
    .flow {
        overflow: scroll;
        height: 410px;
        width: 98%;
    }

    .my-page {
        left: 52%;
        border-radius: 15px 0 15px 15px;
        background: linear-gradient(to top, lightgray, rgb(0, 195, 255));
    }

    .publications,
    .wall {
        border: solid rgb(255, 185, 0) 3px;
    }

    .my-page,
    .profile {
        border: solid rgb(0, 195, 255) 3px;
    }

    .publications,
    .my-page {
        position: absolute;
        height: 500px;
        height: 90%;
        width: 95%;
        top: 62%;
        transform: translate(-50%, -50%);
    }
    
    .wall,
    .profile {
        position: absolute;
        height: 40px;
        width: 50%;
        top: -43px;
        padding-top: 10px;
        padding-bottom: 30px;
        border-bottom: transparent;
        border-radius: 15px 15px 0 0;

        font-family: "Roboto-Medium";
        line-height: 100%;
        font-weight: 400;
        font-size: 120%;
    }

    .wall {
        left: -3px;
        background-color: rgb(255, 185, 0);
    }

    .profile {
        right: -3px;
        background-color: rgb(0, 195, 255);
    }
</style>