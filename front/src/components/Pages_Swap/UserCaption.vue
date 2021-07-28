<template>
    <figure class="flexCenter user-pict">

        <img class="circle-user-img" :src="userPhoto" alt="photo de profile">

        <figcaption class="flexCenter user-infos">
            <h2>{{ userName }}</h2>
            <p>{{ position }}</p>
            <p>{{ service }}</p>
        </figcaption>

    </figure>
</template>


<script>
    export default {
        name: "UserCaption",

        data() {
            return {
                // userPhoto: null,
                // userName: null,
                // position: null,
                // service: null,

                userPhoto: require("../../../public/Onin_Pecker.jpg"), 
                userName: "Fatet séraphin",                         // ==> Infos of logged User
                position: "Développeur web",
                service: "Recherche et développement",
            };
        },

        methods: {
            getUserInfos: function() {

            },
        }
    }
</script>


<style scoped>
    .circle-user-img {
        border-radius: 50% !important;
    }
</style>