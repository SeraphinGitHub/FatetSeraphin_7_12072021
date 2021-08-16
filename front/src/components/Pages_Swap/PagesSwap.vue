<template>
    <section class="flexCenter pages-swap">
                
        <UserProfile @profile="toggleProfile()" @refreshActu="refreshActu()"/>
        <UserWall @wall="toggleWall()" :key="upWall"/>
        <Actu @actu="toggleActu()" :key="upActu"/>

    </section>
</template>


<script>
    import Actu from "./Actu/Actu.vue"
    import UserWall from "./Wall/UserWall.vue"
    import UserProfile from "./Profile/UserProfile.vue"
    import generic from "../../generic-methods.js"

    export default {
        name: "PagesSwap",

        mixins: [
            generic,
        ],
        
        components: {
            Actu,
            UserWall,
            UserProfile,
        },

        data() {
            return  {
                upActu: 0,
                upWall: 0,
            }
        },

        mounted() {
            const currentPage = window.localStorage.getItem("Current Page");
            if(currentPage === "Actu") this.pageToggling("actu");
            if(currentPage === "Wall") this.pageToggling("wall");
            if(currentPage === "Profile") this.pageToggling("profile");
        },
        
        methods: {
            refreshActu() {
                this.upActu++;
                setTimeout(() => this.pageToggling("profile"),0);
            },
            
            toggleActu() {
                this.pageToggling("actu");
                localStorage.setItem("Current Page", "Actu");
            },

            toggleWall() {
                this.pageToggling("wall");
                localStorage.setItem("Current Page", "Wall")
                this.upWall++;
                setTimeout(() => this.pageToggling("wall"),0);
            },

            toggleProfile() {
                this.pageToggling("profile");
                localStorage.setItem("Current Page", "Profile")
            },
        },
    }
</script>


<style>
    .flow {
        justify-content: flex-start !important;
        overflow: scroll;
        overflow-x: hidden;
        width: 95% !important;
        margin-left: 25px;
    }

    /* ======== Pages Swap => Buttons ======== */
    .actu-btn,
    .user-wall-btn,
    .profile-btn {
        width: 32%;
    }

    textarea {
        text-align: left;
        resize: vertical;
        height: 60px;
        min-height: 100px;
        max-height: 300px;
        width: 100%;
        margin-top: 8px;
        padding: 15px;
        padding-top: 5px;
        border-radius: 8px;
        border: solid black 1px;
        white-space: pre-wrap;

        font-family: "Raleway-Medium";
        line-height: 100%;
        font-weight: 400;
        font-size: 95%;
    }
</style>


<style scoped>
    /* --- Alert Message --- */
    .form-alert {
        height: 30px;
        bottom: -38px;
    }

    .server-alert {
        position: absolute;
        top: 0;
        left: 50%;
        height: 40px;
        margin-top: 30px;
        font-size: 100%;
        font-weight: 400;
        transform: translateX(-50%);
    }
</style>