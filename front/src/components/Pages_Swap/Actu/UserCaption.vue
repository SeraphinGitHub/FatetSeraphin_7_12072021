<template>
    <figure class="flexCenter user-pict">

        <img class="circle-user-img" :src="user.imageUrl" alt="photo du profile">

        <figcaption class="flexCenter user-infos">
            <h2>{{ user.userName }}</h2>
            <p>{{ user.position }}</p>
            <p>{{ user.department }}</p>
        </figcaption>

    </figure>
</template>


<script>
    import generic from "../../../generic-methods.js"

    export default {
        name: "UserCaption",

        mixins: [
            generic,
        ],

        props: {
            isPostOwner: Boolean,
            isCommentOwner: Boolean,
            post: Object,
            userId: Number,
        },

        data() {
            return {
                user: {},
                token: window.localStorage.getItem("Token"),
            }
        },

        async beforeMount() {
            await this.loggedUser();
        },

        methods: {
            async loggedUser() {
                this.user = await this.getLoggedUserInfos();
                
                if(this.$parent.post) {
                    if(this.$parent.post.userId === this.user.id || this.user.isAdmin) this.$parent.isPostOwner = true;
                }
            },
        },
    }
</script>


<style scoped>
    .user-pict {
        justify-content: flex-start !important;
        height: 70px;
        width: 100%;
        margin: 15px;
        margin-left: 15px !important;
        margin-bottom: 8px;
    }

    .circle-user-img {
        object-fit: cover;
        height: 100%;
        width: 70px;

        border-radius: 50% !important;
        box-shadow: black 5px 5px 5px;
    }



    /* =============================================================================== */
    /*      Tablet Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 421px) and (max-width : 576px) {

        .user-pict {
            height: 100px;
            margin-left: 30px !important;
        }

        .circle-user-img {
            width: 100px;
        }

        .user-infos {
            margin-left: 20px;
        }

        .user-infos h2,
        .user-infos p {
            font-size: 120%;
        }
    }


    /* =============================================================================== */
    /*      Tablet Big Size       */
    /* =============================================================================== */
    @media screen and (min-width: 577px) and (max-width : 768px) {

        .user-pict {
            height: 100px;
            margin-left: 30px !important;
        }

        .circle-user-img {
            width: 100px;
        }

        .user-infos {
            margin-left: 20px;
        }

        .user-infos h2,
        .user-infos p {
            font-size: 120%;
        }
    }


    /* =============================================================================== */
    /*      Laptop Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 769px) and (max-width : 992px) {
        
        .user-pict {
            height: 120px;
            margin: 15px !important;
            margin-left: 40px !important;
        }

        .circle-user-img {
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


    /* =============================================================================== */
    /*      Laptop Big Size      */
    /* =============================================================================== */
    @media screen and (min-width: 993px) and (max-width : 1366px) {
        
        .user-pict {
            height: 100px;
            margin: 15px !important;
            margin-left: 50px !important;
        }

        .circle-user-img {
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
    /*      Screen Normal Size && Over      */
    /* =============================================================================== */
    @media screen and (min-width: 1367px) {
        .user-pict {
            height: 100px;
            margin: 20px !important;
            margin-left: 45px !important;
        }

        .circle-user-img {
            width: 100px;
        }

        .user-infos {
            margin-left: 30px;
        }

        .user-infos h2,
        .user-infos p {
            font-size: 110%;
        }
    }
</style>