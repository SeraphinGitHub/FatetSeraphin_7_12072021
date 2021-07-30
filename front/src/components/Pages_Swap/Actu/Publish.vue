<template>
    <section class="flexCenter publish-flow">

        <form class="flexCenter post-form" method="POST">
            
            <UserCaption/>
            
            <div class="flexCenter post-container">
                <label for="post">Ajouter une publication</label>
                <textarea name="post" id="post" type="text" placeholder="Écrivez quelque chose" value=""></textarea>
                <img class="imagePreview">
            </div>

            <div class="flexCenter add-file-container">
                <input type="file" name="file" id="file" accept="image/*" @change="preview()" ref="addFile">
                <button class="btn add-image-btn" @click="$refs.addFile.click()" type="button">Ajouter une image</button>
                <button class="btn green-btn publish-btn" @click.prevent="postArticle()" type="submit">Publier</button>
            </div>

        </form>

    </section>
</template>


<script>
    import UserCaption from "../UserCaption.vue"
    import routesAPI from "../../../routesAPI.js"

    export default {
        name: "Publish",

        mixins: [
            routesAPI,
        ],

        components: {
            UserCaption,            
        },

        data(){
            return {
                file: "",
            }
        },

        methods: {
            preview() {
                const file = document.getElementById("file").files;

                if(file.length > 0) {
                    const fileReader = new FileReader();
                    fileReader.onload = (event) => document.querySelector(".imagePreview").setAttribute("src", event.target.result);
                    fileReader.readAsDataURL(file[0]);
                }

                this.file = this.$refs.addFile.files[0];
            },

            postArticle() {
                const postForm = document.querySelector(".post-form");
                let formData = new FormData(postForm);

                formData.set("file", this.file);
                formData.forEach((key, value) => formData[value] = key);

                console.log(formData);

                this.createPublish_API(formData);
            },
        }
    }
</script>


<style scoped>
    .publish-flow {
        overflow: hidden;
        align-items: flex-start;
        height: 90%; 
    }
    .post-form {
        height: auto;
        border-radius: 20px;
    }

    .post-form,
    .user-pict {
        margin: 8px;
    }

    .post-container {
        justify-content: space-between;
        width: 90%;
    }

    .post-container label {
        margin-top: 5px;
        text-align: center;
    }

    .post-container textarea {
        height: 50px;
    }

    .add-file-container input[type=file] {
        display: none;
    }


    /* ========== File Preview ==========*/
    .imagePreview {
        margin: auto;
        margin-top: 5px;
        object-fit: cover;
        width: 50%;
        max-height: 120px;
        max-width: 150px;
    }


    /* ========== Buttons ========== */
    .publish-btn {
        width: 50%;
    }

    .add-image-btn,
    .publish-btn {
        margin-top: 8px;
    }

    .add-image-btn {
        width: 72%;
    }

    .publish-btn {
        margin-bottom: 10px;
    }
</style>