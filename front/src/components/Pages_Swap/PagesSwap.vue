<template>
    <section class="flexCenter pages-container">
                
        <Profile/>
        <PrivateWall/>
        <Actu/>

    </section>
</template>


<script>
    import Actu from './Actu/Actu.vue'
    import PrivateWall from './Wall/PrivateWall.vue'
    import Profile from './Profile/Profile.vue'
    // import Publish from './Wall/Publish.vue'

    export default {
        name: 'PagesSwap',
        
        components: {
            Actu,
            PrivateWall,
            Profile,
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