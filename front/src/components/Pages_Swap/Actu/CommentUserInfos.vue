<template>

    <figure class="flexCenter user-pict">
        <img :src="commentUser.imageUrl" alt="photo de profile">

        <figcaption class="flexCenter user-infos">
            <h2>{{ commentUser.userName }}</h2>

            <figure v-if="isCommentOwner" class="flexCenter btn-container">
                <button class="btn ">M</button>
                <button class="btn red-btn">S</button>
            </figure>
        </figcaption>
    </figure>

</template>


<script>
    export default {
        name: "CommentUserInfos",

        props: {
            userId: Number,
        },
        
        data() {
            return {
                user: {},
                commentUser: {},
                isCommentOwner: false,
                token: window.localStorage.getItem("Token"),
            };
        },

        async beforeMount() {
            await this.getCommentUserInfos();
            await this.getLoggedUserInfos();
        },

        methods: {
            async getCommentUserInfos() {
                const response = await fetch("http://localhost:3000/api/auth/postUser", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.token}`
                    },
                    method: "POST",
                    body: JSON.stringify({ id: this.userId })
                });
                
                try {
                    const resObj = await response.json();
                    this.commentUser = resObj;
                }
                catch(error) { console.log("error", error) }
                return {}
            },


            async getLoggedUserInfos() {
                const response = await fetch("http://localhost:3000/api/auth/user", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.token}`
                    },
                    method: "GET",
                });
                
                try {
                    const resObj = await response.json();
                    this.user = resObj;

                    if(this.$parent.comment) {
                        if(this.$parent.comment.userId === this.user.id || this.user.isAdmin) this.isCommentOwner = true;
                    }
                }
                catch(error) { console.log("error", error) }
                return {}
            },
        },
    }
</script>


<style scoped>
    .user-pict {
        justify-content: flex-start !important;
        height: 60px;
        width: 100%;
        margin: 7px;
        margin-right: 0px;
    }

    .user-pict img {
        object-fit: cover;
        height: 100%;
        width: 60px;
        border-radius: 50%;
        box-shadow: black 5px 5px 5px;
    }

    .user-infos {
        align-content: center;
        height: 100%;
        width: 65% !important;
        margin-left: 15px;
    }

    h2 {
        font-size: 100% !important;
    }

    /* ========== BUTTONS ========== */
    .btn-container {
        justify-content: space-between;
        height: 60%;
        width: 100%;
    }

    .btn-container button {
        height: 100%;
        width: 45%;
    }
</style>