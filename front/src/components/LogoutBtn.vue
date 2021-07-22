<template>

    <button class="flexCenter btn logout-btn" @click.prevent="logOut()" type="submit">
        <figure class="flexCenter">
            <i class="fas fa-power-off"></i>
        </figure>
    </button>

</template>


<script>
    export default {
        name: 'LogoutBtn',

        methods: {
            logOut: function() {
                
            },
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
        background: linear-gradient(to bottom right, pink, red);
    }

    .svg-inline--fa {
        font-size: 110%;
    }
</style>