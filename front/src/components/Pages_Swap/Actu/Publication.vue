<template>
    <li class="flexCenter post" :id="postId">

        <div class="flexCenter caption">
            <figure class="flexCenter user-pict">
                <img :src="userPhoto" alt="photo de profile">

                <figcaption class="flexCenter user-infos">
                    <h2>{{ userName }}</h2>
                    <p>{{ position }}</p>
                    <p>{{ service }}</p>
                </figcaption>
            </figure>
            
            <div v-if="isOwner" class="flexCenter post-btn">
                <button v-show="!isModifying" class="btn modify-btn" @click="onMofifyBtn()">Modifier</button>
                <button v-show="isModifying" class="btn modify-btn" @click="isModifying = !isModifying">Annuler</button>
                <button class="btn red-btn delete-btn" @click.prevent="deletePost()" type="submit">Supprimer</button>
            </div>

            <h2 v-show="!isModifying" class="flexCenter post-title">{{ title }}</h2>
            <input v-show="isModifying" class="flexCenter modif-title" type="text" :value="titleModif" ref="titleModif_Ref">

            <span class="flexCenter time-stamp">Publié le : <h3>{{ publishedTime }}</h3></span>
        </div>

        <figure v-if="filePicture" class="file-pict">
            <img v-show="!isModifying" :src="filePicture" alt="image de publication">
            <img v-show="isModifying" :src="pictureSrc" class="modif-imagePreview">
        </figure>

        <p v-show="!isModifying" class="content">{{ textContent }}</p>
        <textarea v-show="isModifying" class="modif-content" type="text" :value="textModif" ref="textModif_Ref"></textarea>
        
        <div v-show="isModifying" class="flexCenter add-file-container">
            <input type="file" name="file" accept="image/*" @change="modifyPreview()" ref="modifAddFile">
            <button class="btn modif-image-btn" @click="$refs.modifAddFile.click()" type="button">Changer l'image</button>
            <button class="btn green-btn repost-btn" @click.prevent="postModifs()" type="submit">Re-publier</button>
        </div>
        
        <form class="flexCenter commentate" method="POST">
            <UserCaption/>
            
            <div class="flexCenter comment-container">
                <label for="comment">Espace commentaires</label>
                <textarea name="comment" id="comment" type="text" placeholder="Laissr un commentaire" value=""></textarea>
            </div>
            
            <button class="btn green-btn add-comment-btn" @click.prevent="postComment()" type="submit">Publier</button>
        </form>
        
    </li>
</template>


<script>
    import UserCaption from "../UserCaption.vue"    
    import routesAPI from "../../../routesAPI.js"

    export default {
        name: "Publication",

        mixins: [
            routesAPI,
        ],

        components: {
            UserCaption,
        },

        props: {
            postId: Number,
            userPhoto: String,
            userName: String,
            position: String,
            service: String,
            title: String,
            publishedTime: String,
            filePicture: String,
            textContent: String,
        },

        data() {

            // console.log(this.filePicture);
            
            return {
                isOwner: true,
                isModifying: false,
                titleModif: "",
                textModif: "",
                pictureSrc: "",
                modifiedPicture: "",
            };
        },

        methods: {
            onMofifyBtn() {
                this.isModifying = !this.isModifying;
                this.pictureSrc = this.filePicture;
                this.titleModif = this.title;
                this.textModif = this.textContent;
            },

            modifyPreview() {
                const file = this.$refs.modifAddFile.files;
                
                if(file.length > 0) {
                    const fileReader = new FileReader();

                    fileReader.onload = (event) => this.pictureSrc = event.target.result;
                    fileReader.readAsDataURL(file[0]);
                } this.modifiedPicture = this.$refs.modifAddFile.files[0];
            },

            postModifs() {
                const formatedFile = {
                    name: this.modifiedPicture.name,
                    lastModified: this.modifiedPicture.lastModified,
                    webkitRelativePath: this.modifiedPicture.webkitRelativePath,
                    size: this.modifiedPicture.size,
                    type: this.modifiedPicture.type
                };

                const formData = {
                    id: this.postId,
                    title: this.$refs.titleModif_Ref.value,
                    textContent: this.$refs.textModif_Ref.value,

                    file: formatedFile,
                    // file: this.modifiedPicture,
                };

                this.modifyPublish_API(formData);
                this.isModifying = !this.isModifying;
                setTimeout(() => this.$parent.callAPI(), 100);
            },

            async deletePost() {
                this.deletePublish_API({ id: this.postId });
                setTimeout(() => this.$parent.callAPI(), 100);
            },

            postComment() {
                
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

    .user-pict img {
        border-radius: 10px;
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

    .user-pict,
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
        margin-top: 15px;
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

    /* ========== Buttons ========== */
    .modify-btn,
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
        margin-top: 5px;
        margin-bottom: 0px;
        font-size: 100%;
    }

    .modif-image-btn {
        width: 75%;
        margin: 10px;
    }

    .repost-btn {
        width: 55%;
        margin-top: 0;
    }
</style>