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
                this.$emit("editComment");
                this.$emit("textModif");
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
                    this.$parent.$emit("getComments");
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



    /* =============================================================================== */
    /*      Tablet Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 421px) and (max-width : 576px) {
        
        .user-infos {
            margin-left: 25px;
        }

        .user-pict {
            height: 80px;
            width: 95%;
            margin-top: 15px;
        }

        .user-pict img {
            width: 80px;
        }

        .btn-container {
            height: 65%;
            width: 80%;
        }

        .btn-container button {
            height: 90%;
            width: 43%;
            margin-top: 10px;
        }
    }


    /* =============================================================================== */
    /*      Tablet Big Size       */
    /* =============================================================================== */
    @media screen and (min-width: 577px) and (max-width : 768px) {

        .user-infos {
            margin-left: 30px;
        }

        .user-infos h2,
        .user-infos p {
            font-size: 120% !important;
        }

        .user-pict {
            height: 95px;
            width: 95%;
            margin-top: 15px;
        }

        .user-pict img {
            width: 95px;
        }

        .btn-container {
            height: 60%;
            width: 80%;
        }

        .btn-container button {
            height: 90%;
            width: 37%;
            margin-top: 15px;
        }
    }


    /* =============================================================================== */
    /*      Laptop Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 769px) and (max-width : 992px) {
        
        .user-infos {
            margin-left: 40px;
        }

        .user-infos h2,
        .user-infos p {
            font-size: 125% !important;
        }

        .user-pict {
            height: 100px;
            width: 95%;
            margin-top: 15px;
        }

        .user-pict img {
            width: 100px;
        }

        .btn-container {
            height: 55%;
            width: 70%;
            margin-left: 50px;
        }

        .btn-container button {
            height: 100%;
            width: 35%;
            margin-top: 15px;
        }
    }


    /* =============================================================================== */
    /*      Laptop Big Size      */
    /* =============================================================================== */
    @media screen and (min-width: 993px) and (max-width : 1366px) {
        
        .user-infos {
            width: 65% !important;
            margin-left: 40px;
        }

        .user-infos h2,
        .user-infos p {
            font-size: 125% !important;
        }

        .user-pict {
            height: 120px;
            width: 85%;
            margin-top: 15px;
        }

        .user-pict img {
            width: 120px;
        }

        .btn-container {
            height: 55%;
            width: 80%;
        }

        .btn-container button {
            height: 100%;
            width: 35%;
            margin-top: 15px;
        }
    }


    /* =============================================================================== */
    /*      Screen Normal Size && Over      */
    /* =============================================================================== */
    @media screen and (min-width: 1367px) {
        
        .user-infos {
            width: 75% !important;
            margin-left: 40px;
        }

        .user-infos h2,
        .user-infos p {
            font-size: 125% !important;
        }

        .user-pict {
            height: 120px;
            width: 90%;
            margin-top: 15px;
            margin-left: 70px;
        }

        .user-pict img {
            width: 120px;
        }

        .btn-container {
            height: 55%;
            width: 80%;
            margin-left: 240px;
            transform: translateY(-50px);
        }

        .btn-container button {
            height: 100%;
            width: 35%;
            margin-top: 15px;
        }
    }
</style>