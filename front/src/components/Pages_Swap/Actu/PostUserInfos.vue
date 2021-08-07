<template>

    <figure class="flexCenter user-pict">
        <img :src="postUser.imageUrl" alt="photo de profile">

        <figcaption class="flexCenter user-infos">
            <h2>{{ postUser.userName }}</h2>
            <p>{{ postUser.position }}</p>
            <p>{{ postUser.department }}</p>
        </figcaption>
    </figure>

</template>


<script>
    import generic from "../../../generic-methods.js"

    export default {
        name: "PostUserInfos",

        mixins: [
            generic,
        ],

        props: {
            userId: Number,
        },
        
        data() {
            return {
                postUser: {},
                token: window.localStorage.getItem("Token"),
            };
        },

        async beforeMount() {
            await this.postUserInfos();
        },

        methods: {
            async postUserInfos() {
                this.postUser = await this.getPostUserInfos();
            },
        },
    }
</script>


<style scoped>
    .user-pict {
        justify-content: flex-start !important;
        height: 80px;
        width: 100%;
        margin: 15px;
        margin-bottom: 8px;
    }

    .user-pict img {
        object-fit: cover;
        height: 100%;
        width: 80px;
        border-radius: 10px;
        box-shadow: black 5px 5px 5px;
    }



    /* =============================================================================== */
    /*      Tablet Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 421px) and (max-width : 576px) {
        
        
    }


    /* =============================================================================== */
    /*      Tablet Big Size       */
    /* =============================================================================== */
    @media screen and (min-width: 577px) and (max-width : 768px) {

        
    }


    /* =============================================================================== */
    /*      Laptop Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 769px) and (max-width : 992px) {
        
        
    }


    /* =============================================================================== */
    /*      Laptop Big Size      */
    /* =============================================================================== */
    @media screen and (min-width: 993px) and (max-width : 1366px) {
        
        
    }


    /* =============================================================================== */
    /*      Screen Normal Size && Over      */
    /* =============================================================================== */
    @media screen and (min-width: 1367px) {
        
    }
</style>