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
                <button class="btn modify-btn" @click.prevent="modifyComment()" type="submit">Modifier</button>
                <button class="btn red-btn delete-btn" @click.prevent="deleteComment()" type="submit">Supprimer</button>
            </div>

            <h2 class="flexCenter post-title">{{ title }}</h2>

            <span class="flexCenter time-stamp">Publié le : <h3>{{ publishedTime }}</h3></span>
        </div>

        <figure class="file-pict">
            <img :src="filePicture" alt="image de publication">
        </figure>

        <p class="content">{{ textContent }}</p>

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

    export default {
        name: "Publication",

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
            return {
                isOwner: true,
            };
        },

        methods: {
            postComment() {

            },

            modifyComment() {

            },

            deleteComment() {

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
    .post-title {
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

    .file-pict img {
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
    
    .add-comment-btn {
        margin: 10px;
        height: 40px;
        width: 70%;
    }
</style>