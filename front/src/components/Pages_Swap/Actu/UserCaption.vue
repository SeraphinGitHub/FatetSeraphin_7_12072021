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
    .circle-user-img {
        object-fit: cover;
        height: 100%;
        width: 80px;

        border-radius: 50% !important;
        box-shadow: black 5px 5px 5px;
    }
    
    .user-pict {
        justify-content: flex-start !important;
        height: 80px;
        width: 100%;
        margin: 15px;
        margin-bottom: 8px;
    }
</style>