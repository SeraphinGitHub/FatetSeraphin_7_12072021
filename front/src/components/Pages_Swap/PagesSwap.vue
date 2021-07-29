<template>
    <section class="flexCenter pages-container" v-if="isVisible">
                
        <UserProfile/>
        <UserWall/>
        <Actu/>

    </section>
</template>


<script>
    import Actu from "./Actu/Actu.vue"
    import UserWall from "./Wall/UserWall.vue"
    import UserProfile from "./Profile/UserProfile.vue"

    export default {
        name: "PagesSwap",
        
        components: {
            Actu,
            UserWall,
            UserProfile,
        },

        data() {
            return {
                // ***********************************

                isVisible: true,
                // isVisible: false,
                
                // ***********************************
            }
        },
    }
</script>


<style>
    .flow {
        /* display: none !important; */
        
        justify-content: flex-start !important;
        overflow: scroll;
        width: 95% !important;
        margin-left: 25px;
    }

    /* ======== Pages Swap => Buttons ======== */
    .actu-btn,
    .private-wall-btn,
    .profile-btn {
        width: 32%;
    }

    textarea {
        text-align: left;
        resize: none;
        height: 80px;
        width: 100%;
        margin-top: 8px;
        padding: 15px;
        padding-top: 5px;
        border-radius: 8px;
        border: solid black 1px;

        font-family: "Raleway-Medium";
        line-height: 100%;
        font-weight: 400;
        font-size: 95%;
    }
</style>