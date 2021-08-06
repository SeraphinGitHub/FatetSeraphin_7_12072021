<template>
    <section class="flexCenter profile">
        
        <button class="profile-btn" @click="toggleProfile()">Profile</button>

        <div class="flexCenter main-container">
            <figure class="flexCenter user-photo">
                <input type="file" name="image" id="photo" accept="image/*" @change="preview()" ref="addPhoto">
                <img class="photoPreview" :src="user.imageUrl" alt="photo du profile">
            </figure>

            <div class="flexCenter profile-infos">
                <h2 v-show="!isEditingInfos" class="paragraphes">{{ user.userName }}</h2>
                <input v-show="isEditingInfos" class="userName-input" name="userName" type="text" v-model="userName">

                <p v-show="!isEditingInfos" class="paragraphes">{{ user.position }}</p>
                <input v-show="isEditingInfos" name="position" type="text" v-model="position">
                
                <p v-show="!isEditingInfos" class="paragraphes">{{ user.department }}</p>
                <input v-show="isEditingInfos" name="department" type="text" v-model="department">
            </div>

            <button v-show="!isEditingPhoto" class="btn caption-btn" @click="$refs.addPhoto.click()">Changer image</button>
            <button v-show="isEditingPhoto" class="btn green-btn caption-btn" @click="confirmPhoto()">Valider</button>
            
            <button v-show="!isEditingInfos" class="btn caption-btn" @click="modifyInfos()">Modifier profil</button>
            <button v-show="isEditingInfos" class="btn green-btn caption-btn" @click="confirmInfos()">Valider</button>
        </div>

        <div class="flexCenter main-container">
            <h2 v-if="user.isAdmin" class="paragraphes admin">*** Compte Administrateur ***</h2>
            <span v-if="!user.isAdmin" class="empty-space"></span>
            <!-- <p class="paragraphes email-p">{{ user.email }}</p> -->
            <!-- <p class="paragraphes psw-p">{{ user.password }}</p> -->
            <p class="paragraphes email-p">{{ email }}</p>
            <p class="paragraphes psw-p">{{ password }}</p>
            
            <button class="btn caption-btn" @click="modifyEmail()">Changer E-mail</button>
            <button class="btn caption-btn" @click="modifyPassword()">Changer mot de passe</button>
        </div>

        <button class="btn red-btn delete-btn" @click="deleteAccount()">Supprimer le compte</button>

        <section v-show="toggleResetPage()" class="flexCenter reset-page">
            <form method="POST" class="flexCenter">

                <div v-show="!isDeletingAccount" class="flexCenter label-input">
                    <label for="oldData">{{ oldDataLabel }}</label>
                    <input name="oldData" :type="inputType" v-model="oldData">
                </div>

                <div class="flexCenter label-input">
                    <label for="newData">{{ newDataLabel }}</label>
                    <input name="newData" :type="inputType" v-model="newData">
                </div>
                
                <button class="btn cancel-btn" @click.prevent="cancelResetPage()">Annuler</button>
                <button class="btn green-btn send-btn" @click.prevent="sendReseted()">Envoyer</button>

            </form>
        </section>

    </section>
</template>


<script>
    import generic from "../../../generic-methods.js"

    export default {
        name: "Profile",

        mixins: [
            generic,
        ],

        data() {
            return {
                user: {},

                isEditingPhoto: false,
                isEditingInfos: false,
                isEditingEmail: false,
                isEditingPsw: false,
                isDeletingAccount: false,

                userName: "",
                position: "",
                department: "",

                inputType: "",
                userPhoto: "",
                email: "seraphin@hotmail.com",
                password: "***************",

                oldDataLabel: "",
                newDataLabel: "",
                oldData: "",
                newData: "",

                token: window.localStorage.getItem("Token"),
            }
        },

        async beforeMount() {
            await this.getUserProfile();
        },

        methods: {
            toggleProfile() {
                this.$emit("profile");
            },


            async getUserProfile() {
                this.user = await fetch("http://localhost:3000/api/auth/profile", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.token}`
                    },
                    method: "GET",
                })
                .then(response => response.json())
                .then(data => { return data });
            },


            preview() {
                const photo = document.getElementById("photo").files;

                if(photo.length > 0) {
                    this.isEditingPhoto = !this.isEditingPhoto;
                    const fileReader = new FileReader();
                    
                    fileReader.onload = (event) => {
                        const photoPreview = document.querySelector(".photoPreview");
                        photoPreview.setAttribute("src", event.target.result);
                    }

                    fileReader.readAsDataURL(photo[0]);
                } this.userPhoto = this.$refs.addPhoto.files[0];
            },


            confirmPhoto() {
                this.isEditingPhoto = !this.isEditingPhoto;
            },


            modifyInfos() {
                this.isEditingInfos = !this.isEditingInfos;
                this.userName = this.user.userName;
                this.position = this.user.position;
                this.department = this.user.department;
            },


            confirmInfos() {
                this.isEditingInfos = !this.isEditingInfos;
            },


            modifyEmail() {
                this.isEditingEmail = !this.isEditingEmail;
                this.inputType = "text";
                this.oldDataLabel = "Ancienne adresse E-mail";
                this.newDataLabel = "Nouvelle adresse E-mail";
            },


            modifyPassword() {
                this.isEditingPsw = !this.isEditingPsw;
                this.inputType = "password";
                this.oldDataLabel = "Ancien mot de passe";
                this.newDataLabel = "Nouveau mot de passe";
            },


            toggleResetPage() {
                if(this.isEditingEmail || this.isEditingPsw || this.isDeletingAccount) return true;
            },


            deleteAccount() {
                this.isDeletingAccount = !this.isDeletingAccount;
                this.inputType = "password";
                this.newDataLabel = "Entrer votre mot de passe";
            },


            cancelResetPage() {
                if(this.isEditingEmail || this.isEditingPsw || this.isDeletingAccount) {
                    this.isEditingEmail = false;
                    this.isEditingPsw = false;
                    this.isDeletingAccount = false;

                    this.oldData = "";
                    this.newData = "";
                }
            },


            sendReseted() {
                
                this.cancelResetPage(); // <== After fullfilled promise
            },
        }
    }
</script>


<style scoped lang="scss">

    // -----------------------------------
    $pageColor: rgb(179, 0, 255);
    // -----------------------------------


    .profile {
        // z-index: 1;
        
        
        // *********************************************************************************
        // *********************************************************************************
        // *********************************************************************************
        
        z-index: 100;
        
        // *********************************************************************************
        // *********************************************************************************
        // *********************************************************************************


        align-content: flex-start;
        border-radius: 20px 0 20px 20px;
        background: linear-gradient(to top, lightgray, $pageColor);
    }

    .profile,
    .profile-btn {
        border: solid $pageColor 3px;
    }

    .profile-btn {
        right: -3px;
        background-color: $pageColor;
    }


    $margin_Base: 10px;

    // ========== Main Container ==========
    .main-container {
        justify-content: space-between;
        height: auto;
        margin: $margin_Base;
        margin-bottom: 0px;
    }


    // ========== User Photo ==========
    .user-photo {
        height: 150px;
        width: 40%;
    }

    .photoPreview {
        object-fit: cover;
        height: 100%;
        width: 100%;
        border-radius: $margin_Base;
    }

    .user-photo input[type=file] {
        display: none;
    }


    // ========== User Infos ==========
    .profile-infos {
        height: 120px;
        width: 55%;
        justify-content: flex-start;
        align-content: space-between;
        text-align: left;
    }

    .profile-infos input {
        height: 25px;
        border-radius: 5px;
        margin: 0px;
        padding-left: 5px;

        font-family: "Raleway-Medium";
        font-weight: 400;
        font-size: 95%;
    }

    .userName-input {
        font-family: "Roboto-Medium" !important;
        font-weight: 600 !important;
    }

    .paragraphes {
        width: 100%;
        margin: 0;
        padding: 6px;
        font-size: 95%;
        border-radius: 5px;
        border: solid 1px black;
        background: white;
    }


    // ========== User Fields ==========
    .admin {
        margin-bottom: $margin_Base;
        font-size: 105%;
        border: none;
        background: linear-gradient(to bottom, rgb(212, 244, 255), dodgerblue);
    }

    .empty-space {
        height: $margin_Base + 30px;
        width: 100%;
    }

    .email-p,
    .psw-p {
        font-family: "Roboto-Light";
        font-size: 100%;
        font-weight: 600;
    }

    .email-p {
        margin-bottom: $margin_Base;
    }


    // ========== Reset Page ==========
    .reset-page {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        background-color: rgba(80, 80, 80, 0.85);
    }

    .reset-page form {
        align-content: space-around;
        height: 55%;
        width: 85%;
        padding-top: 15px;
        padding-bottom: 15px;
        border-radius: 15px;
        background: linear-gradient(to top left, violet, lightskyblue);
    }

    .label-input {
        justify-content: flex-start;
        width: 80%;
    }

    .label-input label,
    .label-input input {
        width: 100%;
    }

    .label-input input {
        margin-top: 7px;
    }


    // ========== Buttons ==========
    .caption-btn {
        height: 50px;
        width: 47%;
        margin-top: $margin_Base;
        padding: 5px;
        font-size: 120%;
    }

    .delete-btn {
        margin-top: 30px;
        width: 80%;
    }
</style>