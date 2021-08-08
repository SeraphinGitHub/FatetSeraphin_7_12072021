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
        
        .user-pict {
            height: 100px;
            margin: 30px !important;
            margin-bottom: 0 !important;
        }

        .user-pict img {
            width: 100px;
        }

        .user-infos {
            margin-left: 20px;
        }

        .user-infos h2,
        .user-infos p {
            font-size: 110%;
        }
    }


    /* =============================================================================== */
    /*      Tablet Big Size       */
    /* =============================================================================== */
    @media screen and (min-width: 577px) and (max-width : 992px) {

        .user-pict {
            height: 100px;
            margin: 30px !important;
            margin-bottom: 0 !important;
        }

        .user-pict img {
            width: 100px;
        }

        .user-infos {
            margin-left: 40px;
        }

        .user-infos h2,
        .user-infos p {
            font-size: 110%;
        }
    }


    /* =============================================================================== */
    /*      Laptop Big Size      */
    /* =============================================================================== */
    @media screen and (min-width: 993px) and (max-width : 1366px) {
        
        .user-pict {
            height: 110px;
            margin: 40px !important;
            margin-bottom: 20px !important;
        }

        .user-pict img {
            width: 110px;
        }

        .user-infos {
            margin-left: 40px;
        }

        .user-infos h2,
        .user-infos p {
            font-size: 110%;
        }
    }


    /* =============================================================================== */
    /*      Screen Normal Size && Over      */
    /* =============================================================================== */
    @media screen and (min-width: 1367px) {
        
        .user-pict {
            height: 120px;
            margin: 40px !important;
            margin-left: 150px !important;
            margin-bottom: 20px !important;
        }

        .user-pict img {
            width: 120px;
        }

        .user-infos {
            margin-left: 40px;
        }

        .user-infos h2,
        .user-infos p {
            font-size: 110%;
        }
    }
</style>