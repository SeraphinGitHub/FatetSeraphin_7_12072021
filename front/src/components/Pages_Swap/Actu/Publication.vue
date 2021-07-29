<template>
    <!-- <li class="flexCenter post" :id="postInfos.postId">

        <div class="flexCenter caption">
            <figure class="flexCenter user-pict">
                <img :src="postInfos.userPhoto" alt="photo de profile">

                <figcaption class="flexCenter user-infos">
                    <h2>{{ postInfos.userName }}</h2>
                    <p>{{ postInfos.position }}</p>
                    <p>{{ postInfos.service }}</p>
                </figcaption>
            </figure>
            
            <div v-if="isOwner" class="flexCenter post-btn">
                <button class="btn modify-btn" @click.prevent="modifyComment()" type="submit">Modifier</button>
                <button class="btn red-btn delete-btn" @click.prevent="deleteComment()" type="submit">Supprimer</button>
            </div>

            <span class="flexCenter time-stamp">Publié le <h3>{{ postInfos.publishedTime }}</h3></span>
        </div>

        <figure class="file-pict">
            <img :src="filePicture" alt="image de publication">
        </figure>

        <p class="content">{{ postInfos.textContent }}</p>

        <form class="flexCenter commentate" method="POST">
            <UserCaption/>
            
            <div class="flexCenter comment-container">
                <label for="comment">Espace commentaires</label>
                <textarea name="comment" id="comment" type="text" placeholder="Laissr un commentaire" value=""></textarea>
            </div>
            
            <button class="btn green-btn add-comment-btn" @click.prevent="postComment()" type="submit">Publier</button>
        </form>
        
    </li> -->

    <li class="flexCenter post">

        <p class="content">{{ post }}</p>

    </li>


</template>


<script>
    // import UserCaption from "../UserCaption.vue"

    export default {
        name: "Publication",

        components: {
            // UserCaption,
        },

        props:  {
            post: Object,
        },

        data() {

            // console.log(this.post);

            return {

                isOwner: true,

                // postId: 123,
                // userPhoto: require("../../../../public/Onin_Pecker.jpg"),
                // userName: "Fatet séraphin",
                // position: "Développeur web",                                    // ==> Infos of publish Owner
                // service: "Recherche et développement",
                // publishedTime: "19/05/2021 à 14:37",
                // filePicture: require("../../../../public/stone_pit.jpg"),
                // textContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            };
        },

        methods: {
            postComment() {

            },

            modifyComment() {

            },

            deleteComment() {

            },
        }
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
        margin-bottom: 15px;
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


    /* ========== PICTURE ========== */
    .file-pict {
        margin: 0;
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