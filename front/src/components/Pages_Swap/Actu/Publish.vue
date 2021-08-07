<template>
    <section class="flexCenter publish-flow">
        
        <form class="flexCenter post-form" method="POST">
            
            <UserCaption/>
            
            <div class="flexCenter post-container">
                <input name="title" id="title" type="text" placeholder="Titre de la publication" v-model="title">
                <textarea name="textContent" id="textContent" type="text" placeholder="Écrivez quelque chose" v-model="textContent"></textarea>
                <img class="imagePreview">
            </div>

            <div class="flexCenter add-file-container">
                <input type="file" name="image" id="file" accept="image/*" @change="preview()" ref="addFile">
                <button class="btn add-image-btn" @click="$refs.addFile.click()" type="button">Ajouter une image</button>
                <button class="btn green-btn publish-btn" @click.prevent="postArticle()" type="submit">Publier</button>
            </div>

            <transition name="fade">
                <p class="flexCenter form-alert" v-show="isEmpty">{{ emptyMsg }}</p>
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
                title: "",
                textContent: "",
                emptyMsg: "Vous devez renseigner un titre et écrire du texte !",
                
                isPublish: false,
                isEmpty: false,

                token: window.localStorage.getItem("Token"),
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
                const postForm = document.querySelector(".post-form");
                let formData = new FormData(postForm);
                formData.forEach((key, value) => formData[value] = key);

                if(this.title !== "" && this.textContent !== "") {
                    this.createPublish(formData);
                    this.$emit("posted", this.isPublish);
                }

                else {
                    this.isEmpty = true;
                    this.emptyMsg;
                    setTimeout(() => this.isEmpty = false, 2000);
                }
            },


            async createPublish(formData) {
                const response = await fetch("http://localhost:3000/api/publish/create", {
                    headers: { "Authorization": `Bearer ${this.token}` },
                    method: "POST",
                    body: formData
                });
                try {
                    await response;
                    this.isPublish = !this.isPublish;
                    this.$parent.refreshPosts();
                }
                catch(error) { console.log("error", error) }
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



    /* =============================================================================== */
    /*      Tablet Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 421px) and (max-width : 576px) {

        input {
            height: 30px !important;
            font-size: 110%;
        }

        textarea {
            height: 80px !important;
            font-size: 110%;
        }

        .imagePreview {
            width: 100%;
            max-height: 200px;
            max-width: 300px;
        }
     
        .add-image-btn,
        .publish-btn {
            width: 55%;
        }

        .form-alert {
            width: 60% !important;
            font-size: 120%;
            bottom: 50px;
        }
    }


    /* =============================================================================== */
    /*      Tablet Big Size       */
    /* =============================================================================== */
    @media screen and (min-width: 577px) and (max-width : 768px) {

        .publish-flow {
            width: 80%;
        }

        input {
            height: 30px !important;
            font-size: 110%;
        }

        textarea {
            height: 80px !important;
            font-size: 110%;
        }

        .imagePreview {
            width: 100%;
            max-height: 280px;
            max-width: 300px;
        }

        .add-image-btn,
        .publish-btn {
            width: 55%;
        }

        .form-alert {
            width: 60% !important;
            font-size: 120%;
            bottom: 50px;
        }
    }


    /* =============================================================================== */
    /*      Laptop Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 769px) and (max-width : 992px) {
        
        .publish-flow {
            width: 80%;
        }

        input {
            height: 30px !important;
            margin-bottom: 5px;
            font-size: 110%;
        }

        textarea {
            height: 100px !important;
            margin-bottom: 5px;
            font-size: 110%;
        }

        .imagePreview {
            width: 100%;
            max-height: 370px;
            max-width: 400px;
        }
        
        .add-image-btn,
        .publish-btn {
            height: 60px;
            width: 35%;
            margin: 20px;
            margin-left: 30px;
            margin-right: 30px;
        }

        .form-alert {
            width: 60% !important;
            font-size: 120%;
            bottom: 60px;
        }
    }


    /* =============================================================================== */
    /*      Laptop Big Size      */
    /* =============================================================================== */
    @media screen and (min-width: 993px) and (max-width : 1366px) {
        
        .publish-flow {
            width: 72%;
        }
        
        input {
            height: 30px !important;
            margin-bottom: 5px;
            font-size: 110%;
        }

        textarea {
            height: 80px !important;
            margin-bottom: 5px;
            font-size: 110%;
        }

        .imagePreview {
            width: 100%;
            max-height: 380px;
            max-width: 400px;
        }
        
        .add-image-btn,
        .publish-btn {
            width: 35%;
            margin: 20px;
            margin-left: 30px;
            margin-right: 30px;
        }

        .form-alert {
            width: 60% !important;
            font-size: 130%;
            bottom: 60px;
        }
    }


    /* =============================================================================== */
    /*      Screen Normal Size && Over      */
    /* =============================================================================== */
    @media screen and (min-width: 1367px) {
        .publish-flow {
            width: 80%;
        }

        .post-form {
            width: 65%;
            padding-left: 8%;
            padding-right: 8%;
        }
        
        input {
            height: 35px !important;
            margin-bottom: 5px;
            font-size: 110%;
        }

        textarea {
            height: 100px !important;
            margin-bottom: 5px;
            font-size: 110%;
        }

        .imagePreview {
            width: 100%;
            max-height: 420px;
            max-width: 450px;
        }
        
        .add-image-btn,
        .publish-btn {
            height: 60px;
            width: 35%;
            margin: 30px;
            margin-left: 50px;
            margin-right: 50px;
        }

        .form-alert {
            width: 60% !important;
            font-size: 130%;
            bottom: 80px;
        }
    }
</style>