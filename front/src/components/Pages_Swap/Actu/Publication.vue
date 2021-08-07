<template>
    <li class="flexCenter post" :id="post.id">

        <div class="flexCenter caption">
            <PostUserInfos :userId="post.userId"/>
            
            <div v-if="isPostOwner" class="flexCenter post-btn">
                <button v-show="!isEditingPost" class="btn edit-btn" @click="editPost()">Modifier</button>
                <button v-show="isEditingPost" class="btn cancel-btn" @click="isEditingPost=!isEditingPost">Annuler</button>
                <button class="btn red-btn delete-btn" @click.prevent="deletePost()" type="submit">Supprimer</button>
            </div>
            
            <h2 v-show="!isEditingPost" class="flexCenter post-title">{{ post.title }}</h2>
            <input v-show="isEditingPost" name="title" class="flexCenter modif-title" type="text" v-model="titleModif">

            <span v-show="!isUpdated" class="flexCenter time-stamp">Publié le : <h3>{{ createdTime }}</h3></span>
            <span v-show="isUpdated" class="flexCenter time-stamp">Modifié le: <h3>{{ updatedTime }}</h3></span>
        </div>

        <p v-show="!isEditingPost" class="content">{{ post.textContent }}</p>
        <textarea v-show="isEditingPost" name="textContent" class="modif-content" type="text" v-model="textModif"></textarea>

        <figure v-if="hasPicture()" class="file-pict">
            <img v-show="!isEditingPost" :src="post.imageUrl" alt="image de publication">
            <img v-show="isEditingPost" :src="pictureSrc" class="modif-imagePreview">
        </figure>
        
        <div v-show="isEditingPost" class="flexCenter add-file-container">
            <input type="file" name="image" accept="image/*" @change="modifyPreview()" ref="modifAddFile_Ref">
            <button class="btn modif-image-btn" @click="$refs.modifAddFile_Ref.click()" type="button">Ajouter une image</button>
            <button class="btn green-btn repost-btn" @click.prevent="postModifsPublish()" type="submit">Re-publier</button>
        </div>
           
        <div :key="com" v-show="isComment" class="flexCenter comment-flow">

            <Comment v-for="com in comments" :key="com.id"
                :comment="com"
                @hasNoComment="hasNoComment = !hasNoComment"
                @getComments="getPublishComments()"
            />

            <span v-show="hasNoComment" class="flexCenter has-no-coment">
                <p>{{ hasNoComsMsg }}</p>
            </span>
        </div>

        <form class="flexCenter commentate" method="POST">
            <button class="btn toggle-comment-btn" @click.prevent="isComment=!isComment">Afficher les commentaires</button>
            
            <UserCaption class="userCaption"/>

            <div class="flexCenter comment-container">
                <label for="textContent">Espace commentaires</label>
                <textarea name="textContent" type="text" placeholder="Laissr un commentaire" v-model="commentText"></textarea>
            </div>
            
            <button class="btn green-btn add-comment-btn" @click.prevent="postOneComment()" type="submit">Publier</button>

            <transition name="fade">
                <p class="flexCenter form-alert" v-show="isEmpty">{{ emptyMsg }}</p>
            </transition>
        </form>
        
    </li>
</template>


<script>
    import UserCaption from "./UserCaption.vue"    
    import PostUserInfos from "./PostUserInfos.vue"
    import Comment from "./Comment.vue"

    export default {
        name: "Publication",

        components: {
            UserCaption,
            PostUserInfos,
            Comment,
        },

        props: {
            post: Object,
            allPostsReceived: Boolean,
        },

        beforeMount() {
            if(this.createdTime !== this.updatedTime) this.isUpdated = true;
        },

        data() {
            if(this.$parent.allPostsReceived) this.getPublishComments();

            return {
                isPostOwner: false,
                isEditingPost: false,
                isComment: false,
                hasNoComment: true,
                isEmpty: false,
                isUpdated: false,
                
                titleModif: "",
                textModif: "",
                commentText: "",
                pictureSrc: "",
                modifiedPicture: "",
                emptyMsg: "Vous devez écrire du texte !",
                hasNoComsMsg: "Cette publication n'as pas encore de commentaires",
                
                com: {},
                comments: {},

                createdTime: new Date(this.post.createdAt).toLocaleString(),
                updatedTime: new Date(this.post.updatedAt).toLocaleString(),
                token: window.localStorage.getItem("Token"),
            };
        },

        methods: {
            editPost() {
                this.isEditingPost = !this.isEditingPost;
                this.pictureSrc = this.post.imageUrl;
                this.titleModif = this.post.title;
                this.textModif = this.post.textContent;
            },


            hasPicture() {
                if(this.post.imageUrl || this.pictureSrc) return true;
            },


            modifyPreview() {
                const file = this.$refs.modifAddFile_Ref.files;
                
                if(file.length > 0) {
                    const fileReader = new FileReader();
                    fileReader.onload = (event) => this.pictureSrc = event.target.result;
                    fileReader.readAsDataURL(file[0]);
                } this.modifiedPicture = this.$refs.modifAddFile_Ref.files[0];
            },


            async postModifsPublish() {
                let formData = new FormData();

                formData.set("id", this.post.id);
                formData.set("title", this.titleModif);
                formData.set("textContent", this.textModif);
                formData.set("image", this.modifiedPicture);

                formData.forEach((key, value) => formData[value] = key);

                const response = await fetch("http://localhost:3000/api/publish/modify", {
                    headers: { "Authorization": `Bearer ${this.token}` },
                    method: "PUT",
                    body: formData
                });
                
                try {
                    await response;
                    this.isEditingPost = !this.isEditingPost;
                    this.$emit("refresh");
                }
                catch(error) { console.log("error", error) }
            },


            async deletePost() {
                const response = await fetch("http://localhost:3000/api/publish/delete", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.token}`
                    },
                    method: "DELETE",
                    body: JSON.stringify({ id: this.post.id })
                });
                
                try {
                    await response.json();
                    this.$emit("refresh");
                }
                catch(error) { console.log("error", error) }
            },


            async postOneComment() {

                if(this.commentText === "") {
                    this.isEmpty = true;
                    this.emptyMsg;
                    setTimeout(() => this.isEmpty = false, 2000);
                }

                else {
                    const commentate = document.querySelector(".commentate");
                    const formData = new FormData(commentate);
    
                    formData.set("postId", this.post.id);
                    formData.set("textContent", this.commentText);
                    formData.forEach((key, value) => formData[value] = key);
    
                    const response = await fetch("http://localhost:3000/api/comment/create", {
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                            "Authorization": `Bearer ${this.token}`
                        },
                        method: "POST",
                        body: JSON.stringify(formData)
                    });
                    
                    try {
                        await response.json();
                        this.getPublishComments();
                        this.commentText = "";
                        this.isComment = true;
                    }
                    catch(error) { console.log("error", error) }
                }
            },


            async getPublishComments() {
                const response = await fetch("http://localhost:3000/api/comment", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.token}`
                    },
                    method: "POST",
                    body: JSON.stringify({ id: this.post.id })
                });
                
                try {
                    const allComments = await response.json();
                    this.comments = allComments.sort();
                }
                catch(error) { console.log("error", error) }
            },
        },
    }
</script>


<style scoped lang="scss">
    .post {
        overflow: hidden;
        height: auto;
        width: 96%;
        margin-bottom: 30px;
        border-radius: 15px;
        background-color: white;
    }


    /* ========== USER INFOS ========== */
    .caption {
        height: auto;
        width: 100%;
        background: linear-gradient(to bottom right, rgb(245, 245, 245), rgb(110, 110, 110));
        border-bottom: double rgb(0, 100, 200) 5px;
    }

    .post-btn {
        justify-content: space-between;
        height: auto;
        width: 90%;
    }

    .time-stamp {
        font-family: "Raleway-Medium";
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

    .post-btn,
    .time-stamp,
    .comment-container {
        margin: 15px;
        margin-bottom: 8px;
    }

    .time-stamp {
        margin-left: 0px;
        margin-right: 0px;
    }

    .comment-container {
        width: 90%;
    }


    /* ========== TITLE ========== */
    .post-title,
    .modif-title {
        margin: 10px;
        margin-bottom: 0px;
        padding: 10px;
        height: auto;
        width: 80%;
        border-radius: 8px;
        border: solid black 1px;
        background: white;
        font-size: 110%;
    }


    /* ========== PICTURE ========== */
    .file-pict {
        margin: 0;
        margin-bottom: 20px;
        width: 90%;
    }

    .file-pict img,
    .modif-imagePreview {
        object-fit:scale-down;
        height: 100%;
        width: 100%;
        border-radius: 10px;
    }


    /* ========== TEXT CONTENT ========== */
    .content {
        margin: 20px;
        font-size: 100%;
    }


    /* ========== COMMENT CONTENT ========== */
    .has-no-coment {
        height: auto;
        width: 90%;
        margin-bottom: 10px;
        border: solid 1px black;
        border-radius: 15px;
        background: linear-gradient(to bottom right, white, darkviolet);
    }

    .has-no-coment p {
        width: 100%;
        margin: 10px;
        padding: 10px;
        font-size: 100%;
        line-height: 110%;
        border-radius: 10px;
        background: white;
    }

    .commentate {
        position: relative;
        padding-bottom: 15px;
        border-top: double rgb(0, 100, 200) 5px;
        background: linear-gradient(to bottom right, rgb(245, 245, 245), rgb(110, 110, 110));
    }

    label {
        text-align: left;
        width: 100%;

        font-family: "Roboto-Medium";
        line-height: 100%;
        font-weight: 400;
        font-size: 100%;
    }
    
    .comment-flow {
        height: auto;
        padding-top: 10px;
    }

    /* ========== Buttons ========== */
    .edit-btn,
    .cancel-btn,
    .delete-btn {
        height: 40px;
        width: 47%;
    }
    
    .repost-btn {
        margin: 10px;
        height: 40px;
        width: 70%;
    }

    .user-pict,
    .toggle-comment-btn,
    .add-comment-btn,
    .comment-container {
        margin-top: 15px;
        margin-bottom: 0px;
    }

    .toggle-comment-btn {
        width: 85%;
        font-size: 105%;
    }
    
    .add-comment-btn {
        width: 55%;
    }


    /* ========== Alert Message ========== */
    .form-alert {
        position: absolute;
        margin: 0;
        bottom: 55px;
    }
    

    /* ======================================= */
    /* --- MODIFY POST --- */
    /* ======================================= */
    .modif-title {
        font-family: "Roboto-Medium";
        line-height: 100%;
        font-weight: 600;
    }

    .modif-content {
        margin: 15px;
        font-size: 100%;
    }

    .modif-image-btn {
        width: 75%;
        margin: 10px;
        margin-top: 0px;
    }

    .repost-btn {
        width: 55%;
        margin-top: 0;
    }




    /* =============================================================================== */
    /*      Tablet Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 421px) and (max-width : 992px) {

        .edit-btn,
        .cancel-btn,
        .delete-btn,
        .toggle-comment-btn,
        .add-comment-btn,
        .modif-image-btn,
        .repost-btn {
            height: 60px;
            font-size: 145%;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .modif-content {
            margin: 20px;
        }

        .time-stamp {
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .post-btn {
            width: 80%;
        }

        .toggle-comment-btn {
            width: 55%;
            margin-top: 15px;
            margin-bottom: 5px;
        }

        .add-comment-btn {
            width: 45%;
        }

        .post-title,
        .modif-title {
            width: 75%;
            height: 30px;
            font-size: 125%;
        }

        .time-stamp,
        .content,
        .modif-content,
        p,
        .comment-container label,
        .comment-container textarea {
            font-size: 110% !important;
        }

        .content {
            width: 100%;
            margin: 25px;
            line-height: 130%;
        }

        .comment-container {
            margin-top: 20px;
        }

        .modif-content,
        .comment-container textarea {
            height: 80px;
        }

        .form-alert {
            height: 45px;
            width: 70% !important;
            bottom: 60px;
        }
    }


    /* =============================================================================== */
    /*      Laptop Big Size      */
    /* =============================================================================== */
    @media screen and (min-width: 993px) and (max-width : 1366px) {
        
        .comment-flow {
            width: 80%;
        }

        .file-pict img {
            max-width: 700px;
        }

        .edit-btn,
        .cancel-btn,
        .delete-btn,
        .toggle-comment-btn,
        .add-comment-btn,
        .modif-image-btn,
        .repost-btn {
            height: 70px;
            font-size: 160%;
        }

        .modif-image-btn,
        .repost-btn {
            width: 40%;
            margin: 20px;
            margin-bottom: 30px;
        }

        .modif-content {
            margin: 30px;
            margin-left: 50px;
            margin-right: 50px;
        }

        .time-stamp {
            margin-top: 15px;
            margin-bottom: 15px;
        }

        .post-btn {
            width: 70%;
        }

        .toggle-comment-btn {
            width: 40%;
            margin-top: 15px;
            margin-bottom: 5px;
        }

        .add-comment-btn {
            width: 25%;
            margin-top: 20px;
            margin-bottom: 10px;
        }

        .post-title,
        .modif-title {
            height: 30px;
            width: 68%;
            font-size: 130%;
        }

        .time-stamp,
        .content,
        .modif-content,
        p,
        .comment-container label,
        .comment-container textarea {
            font-size: 120% !important;
        }

        .content {
            margin: 40px;
            line-height: 130%;
        }

        .comment-container {
            width: 65%;
            margin-left: 100px;
            margin-right: 100px;
        }

        .modif-content,
        .comment-container textarea {
            height: 80px;
        }

        .form-alert {
            height: 60px;
            width: 50% !important;
            bottom: 70px;
        }
    }


    /* =============================================================================== */
    /*      Screen Normal Size && Over      */
    /* =============================================================================== */
    @media screen and (min-width: 1367px) {

        .comment-flow {
            width: 80%;
        }

        .file-pict img {
            max-width: 800px;
        }

        .edit-btn,
        .cancel-btn,
        .delete-btn,
        .toggle-comment-btn,
        .add-comment-btn,
        .modif-image-btn,
        .repost-btn {
            height: 70px;
            font-size: 160%;
        }

        .modif-image-btn,
        .repost-btn {
            width: 40%;
            margin: 20px;
            margin-bottom: 30px;
        }

        .modif-content {
            margin: 30px;
            margin-left: 50px;
            margin-right: 50px;
        }

        .time-stamp {
            margin-top: 25px;
            margin-bottom: 25px;
        }

        .post-btn {
            width: 50%;
            margin-bottom: 20px;
        }

        .edit-btn,
        .cancel-btn,
        .delete-btn {
            width: 40%;
        }

        .toggle-comment-btn {
            z-index: 4;
            width: 30%;
            margin-top: 15px;
            margin-bottom: 5px;
        }

        .add-comment-btn {
            width: 25%;
            margin-top: 20px;
            margin-bottom: 10px;
            margin-left: 100px;
            margin-right: 100px;
            transform: translateY(-115px);
        }

        .post-title,
        .modif-title {
            height: 30px;
            width: 48%;
            font-size: 130%;
        }

        .time-stamp,
        .content,
        .modif-content,
        p,
        .comment-container label,
        .comment-container textarea {
            font-size: 120% !important;
        }

        .content {
            width: 50%;
            margin: 40px;
            line-height: 130%;
        }

        .commentate {
            height: 400px;
        }

        .comment-container {
            width: 50%;
            margin-left: 100px;
            margin-right: 100px;
            transform: translateY(-110px);
        }

        .userCaption {
            transform: translateY(-90px);
        }

        .modif-content,
        .comment-container textarea {
            height: 120px;
            width: 100%;
        }

        .form-alert {
            height: 60px;
            width: 30% !important;
            bottom: 70px;
        }
    }
</style>