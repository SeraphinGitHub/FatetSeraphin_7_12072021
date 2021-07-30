<template>

    <button class="flexCenter btn red-btn logout-btn" @click.prevent="logout()" type="submit">
        <figure class="flexCenter">
            <i class="fas fa-power-off"></i>
        </figure>
    </button>

</template>


<script>
    import routesAPI from "../routesAPI.js"

    export default {
        name: "LogoutBtn",

        mixins: [
            routesAPI,
        ],

        methods: {
            logout() { this.logoutUser_API() }
        }
    }
</script>


<style scoped>
    .logout-btn {
        position: absolute;
        top: 10px;
        right: 10%;
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }

    .svg-inline--fa {
        font-size: 110%;
    }
</style>