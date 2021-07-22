<template>
    <section class="flexCenter pages-container">
                
        <UserProfile/>
        <UserWall/>
        <Actu/>

    </section>
</template>


<script>
    import Actu from './Actu/Actu.vue'
    import UserWall from './Wall/UserWall.vue'
    import UserProfile from './Profile/UserProfile.vue'
    // import Publish from './Wall/Publish.vue'

    export default {
        name: 'PagesSwap',
        
        components: {
            Actu,
            UserWall,
            UserProfile,
            // Publish,
        },
    }
</script>


<style>
    .flow {
        justify-content: flex-start !important;
        overflow: scroll;
        height: 410px;
        width: 95% !important;
        margin-left: 25px;
    }

    /* ======== Pages Swap => Buttons ======== */
    .actu-btn,
    .private-wall-btn,
    .profile-btn {
        width: 32%;
    }
</style>