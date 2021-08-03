<template>
    <section class="flexCenter publish-flow">
        
        <form class="flexCenter post-form" method="POST">
            
            <UserCaption/>
            
            <div class="flexCenter post-container">
                <input name="title" id="title" type="text" placeholder="Titre de la publication">
                <textarea name="textContent" id="textContent" type="text" placeholder="Écrivez quelque chose"></textarea>
                <img class="imagePreview">
            </div>

            <div class="flexCenter add-file-container">
                <input type="file" name="image" id="file" accept="image/*" @change="preview()" ref="addFile">
                <button class="btn add-image-btn" @click="$refs.addFile.click()" type="button">Ajouter une image</button>
                <button class="btn green-btn publish-btn" @click.prevent="postArticle()" type="submit">Publier</button>
            </div>

            <transition name="fade">
                <p class="flexCenter form-alert" v-if="isEmpty">{{ emptyMsg }}</p>
            </transition>
        </form>

    </section>
</template>


<script>
    import UserCaption from "./UserCaption.vue"

    export default {
        name: "Publish",

        components: {
            UserCaption,            
        },

        props: {
            isLoading: Boolean,
        },

        data() {
            return {
                file: "",
                isPublish: false,
                isEmpty: false,
            }
        },

        methods: {            
            preview() {
                const file = document.getElementById("file").files;

                if(file.length > 0) {
                    const fileReader = new FileReader();
                    
                    fileReader.onload = (event) => {
                        const imagePreview = document.querySelector(".imagePreview");
                        imagePreview.setAttribute("src", event.target.result);
                    }

                    fileReader.readAsDataURL(file[0]);
                } this.file = this.$refs.addFile.files[0];
            },


            postArticle() {
                const title = document.getElementById("title").value;
                const textContent = document.getElementById("textContent").value;

                const postForm = document.querySelector(".post-form");
                let formData = new FormData(postForm);
                formData.forEach((key, value) => formData[value] = key);

                if(title !== "" && textContent !== "") {
                    this.createPublish(formData);
                    this.$emit("posted", this.isPublish);
                }

                else {
                    this.isEmpty = true;
                    this.emptyMsg = "Vous devez renseigner un titre et écrire du texte !";
                    setTimeout(() => this.isEmpty = false , 2000);
                }
            },


            async createPublish(formData) {
                this.$parent.$parent.isLoading = true;
                const token = window.localStorage.getItem("Token");

                const response = await fetch("http://localhost:3000/api/publish/create", {
                    headers: { "Authorization": `Bearer ${token}` },
                    method: "POST",
                    body: formData
                });
                
                try {
                    await response;
                    this.$parent.$parent.isLoading = false;
                    this.isPublish = !this.isPublish;
                    this.$parent.getAllPost();
                }
                catch(error) { console.log("error", error) }
                return {}
            },
        }
    }
</script>


<style lang="scss">

    .add-file-container input[type=file] {
        display: none;
    }
</style>


<style scoped lang="scss">
    .publish-flow {
        overflow: hidden;
        align-items: flex-start;
        height: 90%; 
    }

    .post-form {        
        position: relative;
        height: auto;
        border-radius: 20px;
    }

    #title {
        height: 20px;
    }

    /* ========== Alert message ========== */
    .form-alert {
        position: absolute;
        height: 40px;
        width: 85%;
        margin: 0;
        padding: 5px;
        bottom: 45px;
        font-size: 100%;
        line-height: 120%;
    }

    .post-form,
    .user-pict {
        margin: 8px;
    }

    .post-container {
        justify-content: space-between;
        width: 90%;
    }

    .post-container textarea {
        margin-top: 5px;
        height: 50px;
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


    // ****************************************************************************************************
    // ==>      Transitions     <==
    // ****************************************************************************************************
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.8s;
    }


    // ========== Fade ==========
    .fade-enter-from,
    .fade-leave-to { 
        opacity: 0%;
    }

    .fade-leave-from,
    .fade-enter-to {
        opacity: 100%;
    }
</style>