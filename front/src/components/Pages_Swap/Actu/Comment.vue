<template>
    <div class="flexCenter comment-frame" :id="comment.id">

        <CommentUserInfos :userId="comment.userId"
            :isCommentOwner="isCommentOwner"
            :isEditingComment="isEditingComment"
            @editComment="isEditingComment = !isEditingComment"
            @textModif="textModif = comment.textContent"
        />
        
        <span v-show="!isUpdated" class="flexCenter time-stamp">Publié le : <h3>{{ createdTime }}</h3></span>
        <span v-show="isUpdated" class="flexCenter time-stamp">Modifié le : <h3>{{ updatedTime }}</h3></span>
       
        <p v-show="!isEditingComment">{{ comment.textContent }}</p>
        <textarea v-show="isEditingComment" class="modif-content" type="text" v-model="textModif"></textarea>
        
        <button v-if="checkEditing()" class="btn green-btn post-comment-btn" @click="postModifsComment()">Re-publier</button>
    </div>
</template>


<script>
    import CommentUserInfos from "./CommentUserInfos.vue"
    import generic from "../../../generic-methods.js"
    
    export default {
        name: "Comment",

        mixins: [
            generic,
        ],

        components: {
            CommentUserInfos,
        },

        props: {
            comment: Object,
        },

        data() {
            return {
                user: {},
                textModif: "",
                
                isUpdated: false,
                isCommentOwner: false,
                isEditingComment: false,

                createdTime: new Date(this.comment.createdAt).toLocaleString(),
                updatedTime: new Date(this.comment.updatedAt).toLocaleString(),

                token: window.localStorage.getItem("Token"),
            }
        },

        async beforeMount() {
            await this.loggedUser();
            if(this.createdTime !== this.updatedTime) this.isUpdated = true;
        },

        methods: {
            checkEditing() {
                if(this.isEditingComment && this.isCommentOwner) { return true }
            },


            async loggedUser() {
                this.user = await this.getLoggedUserInfos();

                if(this.comment) {
                    this.$emit("hasNoComment");
                    if(this.comment.userId === this.user.id || this.user.isAdmin) this.isCommentOwner = true;
                }
            },


            async postModifsComment() {
                this.isEditingComment = false;

                const formData = new FormData();
                formData.set("id", this.comment.id);
                formData.set("textContent", this.textModif);
                formData.forEach((key, value) => formData[value] = key);

                const response = await fetch("http://localhost:3000/api/comment/modify", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.token}`
                    },
                    method: "PUT",
                    body: JSON.stringify(formData)
                });
                        
                try {
                    await response.json();
                    this.$emit("getComments");
                }
                catch(error) { console.log("error", error) }
            },
        }
    }
</script>


<style scoped>
    .comment-frame {
        height: auto;
        width: 90%;
        margin-bottom: 20px;
        border: solid 1px black;
        border-radius: 15px;
        background: linear-gradient(to bottom right, white, darkviolet);
    }

    .time-stamp,
    .modif-content,
    p {
        margin-top: 15px;
    }

    .time-stamp {
        align-content: space-between;
        height: auto;
        width: 90%;

        font-family: "Raleway-Medium";
        font-size: 100%;
        line-height: 100%;
        font-weight: 400;
    }

    h3 {
        margin: 0;
        margin-left: 5px;
        font-style: italic;
        font-size: 100%;
        font-weight: 400;
    }

    p,
    .modif-content {
        width: 100%;
        margin: 10px;
        padding: 10px;
        font-size: 100%;
        line-height: 110%;
        border-radius: 10px;
    }

    p {
        background: white;
    }

    .modif-content {
        height: 50px;
    }

    .post-comment-btn {
        width: 60%;
        margin-top: 5px;
        margin-bottom: 15px;
    }



    /* =============================================================================== */
    /*      Tablet Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 421px) and (max-width : 768px) {

        .time-stamp,
        .modif-content,
        p {
            margin-top: 20px;
            font-size: 110%;
        }

        .post-comment-btn {
            width: 50%;
        }
    }


    /* =============================================================================== */
    /*      Laptop Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 769px) and (max-width : 992px) {

        .time-stamp,
        .modif-content,
        p {
            width: 80%;
            margin-top: 20px;
            font-size: 115%;
        }

        p {
            margin-bottom: 20px;
        }

        .post-comment-btn {
            height: 60px;
            width: 40%;
            margin: 20px;
        }
    }


    /* =============================================================================== */
    /*      Laptop Big Size      */
    /* =============================================================================== */
    @media screen and (min-width: 993px) and (max-width : 1366px) {
        
        .time-stamp,
        .modif-content,
        p {
            width: 80%;
            margin-top: 20px;
            font-size: 115%;
            transform: translateY(-15px);
        }

        p {
            margin-bottom: 20px;
        }

        .post-comment-btn {
            height: 60px;
            width: 40%;
            margin: 20px;
            transform: translateY(-15px);
        }
    }


    /* =============================================================================== */
    /*      Screen Normal Size && Over      */
    /* =============================================================================== */
    @media screen and (min-width: 1367px) {
        
        .time-stamp,
        .modif-content,
        p {
            width: 65%;
            margin-top: 20px;
            font-size: 120%;
            transform: translateY(-15px);
        }

        .modif-content {
            height: 150px;
        }

        p {
            margin-bottom: 20px;
        }

        .post-comment-btn {
            height: 60px;
            width: 30%;
            margin-left: 100px;
            margin-right: 100px;
            transform: translateY(-5px);
        }
    }
</style>