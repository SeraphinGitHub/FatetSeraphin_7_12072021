<template>
    <li class="flexCenter post">

        <div class="flexCenter caption">
            <figure class="flexCenter user-pict">
                <img src="../../../../public/Onin_Pecker.jpg" alt="">

                <figcaption class="flexCenter user-infos">
                    <h2>{{ userName }}</h2>
                    <p>{{ position }}</p>
                    <p>{{ service }}</p>
                </figcaption>
            </figure>
            
            <div class="flexCenter post-btn">
                <button class="btn modify" @click.prevent="modifyComment()" type="submit">Modifier</button>
                <button class="btn delete" @click.prevent="deleteComment()" type="submit">Supprimer</button>
            </div>

            <span class="flexCenter time-stamp">Publié le <h3>{{ publishedTime }}</h3></span>
        </div>

        <figure class="file-pict">
            <img src="../../../../public/stone_pit.jpg" alt="">
        </figure>

        <p class="content">{{ textContent }}</p>

        <form class="flexCenter commentate">
            <figure class="flexCenter user-pict">
                <img class="circle-user-img" src="../../../../public/Onin_Pecker.jpg" alt="">

                <figcaption class="flexCenter user-infos">
                    <h2>{{ userName }}</h2>
                    <p>{{ position }}</p>
                    <p>{{ service }}</p>
                </figcaption>
            </figure>
            
            <div class="flexCenter field-container">
                <label for="comment">Espace commentaires</label>
                <textarea name="comment" id="comment" type="text" placeholder="Laissr un commentaire" value=""></textarea>
            </div>
            
            <button class="btn add-comment" @click.prevent="postComment()" type="submit">Publier</button>
        </form>
        
    </li>
</template>


<script>
    export default {
        name: 'Publication',

        data() {
            return {
                // userPhoto: null,
                // userName: null,
                // position: null,
                // service: null,
                // publishedTime: null,
                // filePicture: null,
                // textContent: null,

                userPhoto: "../../../../public/Onin_Pecker.jpg",
                userName: "Fatet séraphin",
                position: "Développeur web",
                service: "Recherche et développement",
                publishedTime: "19/05/2021 à 14:37",
                filePicture: "../../../../public/stone_pit.jpg",
                textContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            };
        },

        // created() {
        //     fetch("https://api.npms.io/v2/search?q=vue")
        //     .then(response => response.json())
        //     .then(data => (this.userPhoto = data.userPhoto));
        // },

        methods: {
            postComment: function() {

            },

            modifyComment: function() {

            },

            deleteComment: function() {

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

    .user-pict {
        justify-content: space-between;
        height: 80px;
        width: 100%;
    }
    
    .user-pict img,
    .circle-user-img {
        object-fit: cover;
        height: 100%;
        width: 80px;
        box-shadow: black 5px 5px 5px;
    }

    .user-pict img {
        border-radius: 10px;
    }

    .circle-user-img {
        border-radius: 50% !important;
    }

    .user-infos {
        height: 90%;
        width: 57%;
        justify-content: flex-start;
        align-content: space-between;
        text-align: left;
    }

    .user-infos h2,
    .user-infos p,
    .time-stamp {
        margin: 0;
        font-size: 95%;
        width: 100%;
    }

    .post-btn {
        justify-content: space-between;
        height: auto;
        width: 90%;
    }

    .delete {
        background: linear-gradient(to bottom right, pink, red);
    }

    .modify,
    .delete {
        height: 40px;
        width: 47%;
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
    .field-container {
        margin: 15px;
        margin-bottom: 8px;
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

    textarea {
        text-align: left;
        resize: none;
        height: 80px;
        width: 100%;
        margin-top: 8px;
        padding: 15px;
        padding-top: 5px;
        border-radius: 8px;
        border: solid black 1px;

        font-family: "Raleway-Medium";
        line-height: 100%;
        font-weight: 400;
        font-size: 95%;
    }

    .add-comment {
        margin: 10px;
        height: 40px;
        width: 70%;
    }
</style>