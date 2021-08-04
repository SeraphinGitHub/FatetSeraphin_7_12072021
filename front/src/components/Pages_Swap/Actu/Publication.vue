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
            <input v-show="isEditingPost" name="title" class="flexCenter modif-title" type="text" :value="titleModif" ref="titleModif_Ref">

            <span class="flexCenter time-stamp">Publié le : <h3>{{ publishedTime }}</h3></span>
        </div>

        <p v-show="!isEditingPost" class="content">{{ post.textContent }}</p>
        <textarea v-show="isEditingPost" name="textContent" class="modif-content" type="text" :value="textModif" ref="textModif_Ref"></textarea>

        <figure v-if="hasPicture()" class="file-pict">
            <img v-show="!isEditingPost" :src="post.imageUrl" alt="image de publication">
            <img v-show="isEditingPost" :src="pictureSrc" class="modif-imagePreview">
        </figure>
        
        <div v-show="isEditingPost" class="flexCenter add-file-container">
            <input type="file" name="image" accept="image/*" @change="modifyPreview()" ref="modifAddFile_Ref">
            <button class="btn modif-image-btn" @click="$refs.modifAddFile_Ref.click()" type="button">Ajouter une image</button>
            <button class="btn green-btn repost-btn" @click.prevent="postModifsPublish()" type="submit">Re-publier</button>
        </div>


        <!-- ************************************************************************** -->
       
        <div :key="com" v-if="toggleComment" class="flexCenter comment-flow">

            <Comment v-for="com in comments" :key="com.id"
                :comment="com"
            />

        </div>

        <!-- ************************************************************************** -->
        

        <form class="flexCenter commentate" method="POST">
            <button class="btn add-comment-btn" @click.prevent="toggleComment=!toggleComment">Commentaires</button>
            
            <UserCaption/>

            <div class="flexCenter comment-container">
                <label for="textContent">Espace commentaires</label>
                <textarea name="textContent" type="text" placeholder="Laissr un commentaire" ref="comment_Ref"></textarea>
            </div>
            
            <button class="btn green-btn add-comment-btn" @click.prevent="postOneComment()" type="submit">Publier</button>
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

        data() {
            if(this.$parent.allPostsReceived) this.getPublishComments();

            return {
                isPostOwner: false,
                isEditingPost: false,
                toggleComment: false,

                titleModif: "",
                textModif: "",
                pictureSrc: "",
                modifiedPicture: "",
                
                com: {},
                comments: {},

                publishedTime: new Date(this.post.createdAt).toLocaleString(),
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


            postModifsPublish() {
                let formData = new FormData();

                formData.set("id", this.post.id);
                formData.set("title", this.$refs.titleModif_Ref.value);
                formData.set("textContent", this.$refs.textModif_Ref.value);
                formData.set("image", this.modifiedPicture);

                formData.forEach((key, value) => formData[value] = key);
                this.sendModifsPublish(formData);
            },


            async sendModifsPublish(formData) {
                this.$parent.$parent.isLoading = true;

                const response = await fetch("http://localhost:3000/api/publish/modify", {
                    headers: { "Authorization": `Bearer ${this.token}` },
                    method: "PUT",
                    body: formData
                });
                
                try {
                    await response;
                    this.$parent.$parent.isLoading = false;
                    this.isEditingPost = !this.isEditingPost;
                    this.$parent.refreshPosts();
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
                    this.$parent.refreshPosts();
                }
                catch(error) { console.log("error", error) }
            },


            async postOneComment() {
                const commentate = document.querySelector(".commentate");
                const formData = new FormData(commentate);

                formData.set("postId", this.post.id);
                formData.set("textContent", this.$refs.comment_Ref.value);
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
                    this.$refs.comment_Ref.value = "";
                    this.getPublishComments();
                }
                catch(error) { console.log("error", error) }
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


<style scoped>
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
        margin-bottom: 10px;
        width: 90%;
    }

    .file-pict img,
    .modif-imagePreview {
        object-fit: cover;
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
    .commentate {
        padding-bottom: 10px;
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
        margin-top: 10px;
    }

    /* ========== Buttons ========== */
    .edit-btn,
    .cancel-btn,
    .delete-btn {
        height: 40px;
        width: 47%;
    }
    
    .add-comment-btn,
    .repost-btn {
        margin: 10px;
        height: 40px;
        width: 70%;
    }
    

    /* ================================================================================ */
    /* --- MODIFY POST --- */
    /* ================================================================================ */
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
</style>