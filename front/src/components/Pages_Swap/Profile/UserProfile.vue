<template>
    <section class="flexCenter profile">
        
        <button class="profile-btn" @click="showProfile()">Profile</button>
        
        <div class="flexCenter flow">
            <UserData/>
        </div>

    </section>
</template>


<script>
    import UserData from "./UserData.vue"

    export default {
        name: 'Profile',

        components: {
            UserData,
        },

        methods: {
            showProfile: function() {
                document.querySelector(".actu").style.zIndex = "5";
                document.querySelector(".private-wall").style.zIndex = "5";
                document.querySelector(".profile").style.zIndex = "10";
            },
        }
    }
</script>


<style scoped lang="scss">

    $pageColor: rgb(135, 60, 255);

    .profile {
        z-index: 1;
        border-radius: 20px 0 20px 20px;
        background: linear-gradient(to top, lightgray, $pageColor);
    }

    .profile,
    .profile-btn {
        border: solid $pageColor 3px;
    }

    .profile-btn {
        right: -3px;
        background-color: $pageColor;
    }
</style>