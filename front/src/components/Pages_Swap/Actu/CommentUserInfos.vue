<template>
    <figure class="flexCenter user-pict">

        <img :src="commentUser.imageUrl" alt="photo de profile">

        <figcaption class="flexCenter user-infos">
            <h2>{{ commentUser.userName }}</h2>

            <div v-if="isCommentOwner" class="flexCenter btn-container">

                <button v-if="!isEditingComment" class="btn edit-btn" @click="editComment()">
                    <i class="fas fa-pencil-alt"></i>
                </button>

                <button v-if="isEditingComment" class="btn cancel-btn" @click="editComment()">
                    <i class="fas fa-undo-alt"></i>
                </button>

                <button class="btn red-btn" @click="deleteComment()">
                    <i class="fas fa-trash-alt"></i>
                </button>

            </div>
        </figcaption>

    </figure>
</template>


<script>
    import generic from "../../../generic-methods.js"
    
    export default {
        name: "CommentUserInfos",

        mixins: [
            generic,
        ],

        props: {
            userId: Number,
            comment: Object,
            textModif: String,
            isCommentOwner: Boolean,
            isEditingComment: Boolean,
        },
        
        data() {
            return {
                commentUser: {},
                token: window.localStorage.getItem("Token"),
            };
        },

        async beforeMount() {
            await this.commentUserInfos();
        },

        methods: {
            editComment() {
                this.$parent.isEditingComment = !this.$parent.isEditingComment;
                this.$parent.textModif = this.$parent.comment.textContent;
            },


            async deleteComment() {
                const response = await fetch("http://localhost:3000/api/comment/delete", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.token}`
                    },
                    method: "DELETE",
                    body: JSON.stringify({ id: this.$parent.comment.id })
                });
                try {
                    await response.json();
                    this.$parent.$parent.getPublishComments();
                }
                catch(error) { console.log("error", error) }
            },


            async commentUserInfos() {
                this.commentUser = await this.getPostUserInfos();
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
        margin-bottom: 0px;
    }

    .user-pict img {
        object-fit: cover;
        height: 100%;
        width: 60px;
        border-radius: 50%;
        box-shadow: black 5px 5px 5px;
    }

    .user-infos {
        justify-content: flex-start;
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
        width: 95%;
    }

    .btn-container button {
        height: 95%;
        width: 45%;
        margin-top: 5px;
    }
</style>