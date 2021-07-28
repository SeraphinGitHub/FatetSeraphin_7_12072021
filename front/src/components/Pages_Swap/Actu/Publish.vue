<template>
    <form class="flexCenter post-form" method="POST">
        
        <UserCaption/>
        
        <div class="flexCenter textarea-container">
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
</template>


<script>
    import UserCaption from "../UserCaption.vue"

    export default {
        name: "Publish",

        components: {
            UserCaption,            
        },

        methods: {
            preview() {
                const file = document.getElementById("file").files;
                if(file.length > 0) {
                    const fileReader = new FileReader();
                    fileReader.onload = (event) => document.querySelector(".imagePreview").setAttribute("src", event.target.result);
                    fileReader.readAsDataURL(file[0]);
                }
            },

            postArticle() {
                
            },
        }
    }
</script>


<style scoped>
    .post-form {
        display: none;
        height: auto;
        border-radius: 20px;
    }

    .post-form,
    .user-pict {
        margin: 8px;
    }

    .textarea-container {
        justify-content: space-between;
        width: 90%;
    }

    .textarea-container label {
        margin-top: 5px;
        text-align: center;
    }

    .textarea-container textarea {
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