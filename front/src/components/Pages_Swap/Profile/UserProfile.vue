<template>
    <section class="flexCenter profile">
        
        <button class="profile-btn" @click="toggleProfile()">Profile</button>

        <div class="flexCenter main-container">
            <figure class="flexCenter user-photo">
                <input type="file" name="image" id="photo" accept="image/*" @change="preview()" ref="addPhoto">
                <img class="photoPreview" :src="user.imageUrl" alt="photo du profile">
            </figure>

            <form class="flexCenter profile-infos">
                <h2 v-show="!isEditingInfos" class="paragraphes">{{ user.userName }}</h2>
                <input v-show="isEditingInfos" class="userName-input" name="userName" type="text" v-model="userName">

                <p v-show="!isEditingInfos" class="paragraphes">{{ user.position }}</p>
                <input v-show="isEditingInfos" name="position" type="text" v-model="position">
                
                <p v-show="!isEditingInfos" class="paragraphes">{{ user.department }}</p>
                <input v-show="isEditingInfos" name="department" type="text" v-model="department">
            </form>

            <button v-show="!isEditingPhoto" class="btn caption-btn" @click="$refs.addPhoto.click()">Changer image</button>
            <button v-show="isEditingPhoto" class="btn green-btn caption-btn" @click="postModifyPhoto()">Valider</button>
            
            <button v-show="!isEditingInfos" class="btn caption-btn" @click="toggleModifyInfos()">Modifier profil</button>
            <button v-show="isEditingInfos" class="btn green-btn caption-btn" @click="postModifyInfos()">Valider</button>
        </div>

        <div class="flexCenter main-container">
            <h2 v-if="user.isAdmin" class="paragraphes admin">*** Compte Administrateur ***</h2>
            <span v-if="!user.isAdmin" class="empty-space"></span>
            <p class="paragraphes email-p">{{ email }}</p>
            <p class="paragraphes psw-p">Créé le : {{ createdTime }}</p>
            
            <button class="btn caption-btn" @click="toggleModifyEmail()">Changer E-mail</button>
            <button class="btn caption-btn" @click="toggleModifyPassword()">Changer mot de passe</button>
        </div>

        <button v-if="user.isAdmin" class="btn red-btn delete-btn" @click="toggleDeleteAccount()">Supprimer le compte</button>

        <section v-show="toggleResetPage()" class="flexCenter reset-page">
            <form class="flexCenter reset-form">

                <div class="flexCenter label-input">
                    <label for="oldData">{{ oldDataLabel }}</label>
                    <input name="oldData" :type="inputType" v-model="oldData">

                    <transition name="fade">
                        <p class="flexCenter form-alert" v-show="oldDataAlert">{{ oldDataMsg }}</p>
                    </transition>
                </div>

                <div v-show="!isDeletingAccount" class="flexCenter label-input">
                    <label for="newData">{{ newDataLabel }}</label>
                    <input name="newData" :type="inputType" v-model="newData">

                    <transition name="fade">
                        <p class="flexCenter form-alert" v-show="newDataAlert">{{ newDataMsg }}</p>
                    </transition>
                </div>

                <div v-show="isEditingPsw" class="flexCenter label-input">
                    <label for="confirmPsw">Confirmer le mot de passe</label>
                    <input name="confirmPsw" type="password" @input="matchingPsw()" v-model="confirmPsw">

                    <transition name="fade">
                        <p class="flexCenter form-alert" v-show="confirmPswAlert">{{ confirmPswMsg }}</p>
                    </transition>
                </div>

                <button class="btn cancel-btn" @click.prevent="cancelResetPage()">Annuler</button>
                <button class="btn green-btn send-btn" @click.prevent="sendReseted()">Envoyer</button>

                <transition name="slideSide">
                    <h3 class="flexCenter form-alert server-alert-form" v-show="serverAlertForm">{{ serverMsgForm }}</h3>
                </transition>

            </form>
        </section>

        <transition name="slideSide">
            <h3 class="flexCenter form-alert server-alert" v-show="serverAlert">{{ serverMsg }}</h3>
        </transition>

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
                timeOutDuration: 2500, // <== miliseconds

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
                email: "",
                createdTime: "",

                oldDataLabel: "",
                newDataLabel: "",
                oldData: "",
                newData: "",
                confirmPsw: "",

                oldDataValid: false,
                oldDataAlert: false,
                oldDataMsg: "",

                newDataValid: false,
                newDataAlert: false,
                newDataMsg: "",

                confirmPswValid: false,
                confirmPswAlert: false,
                confirmPswMsg: "",

                emptyField: "Le champ est vide !",
                wrongRegEx: "Champ invalide !",
                wrongRegExPsw: "Mot de passe invalide !",
                pswUnderRegEx: "Champ invalide ou moins de 10 caractères !",
                dismatchPswMsg: "Les mots de passe ne correspondent pas !",
                
                passwordMatched: false,

                serverAlert: false,
                serverMsg: "",

                serverAlertForm: false,
                serverMsgForm: "",

                token: window.localStorage.getItem("Token"),
            }
        },

        async beforeMount() {
            await this.getUserProfile();
            this.email = window.localStorage.getItem("Email");
            this.createdTime = new Date(this.user.createdAt).toLocaleString();
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


            async postModifyPhoto() {
                this.isEditingPhoto = !this.isEditingPhoto;

                let formData = new FormData();
                formData.set("image", this.userPhoto);
                formData.forEach((key, value) => formData[value] = key);

                const response = await fetch("http://localhost:3000/api/auth/updateUser", {
                    headers: { "Authorization": `Bearer ${this.token}` },
                    method: "PUT",
                    body: formData
                });
                
                try { return await response }
                catch(error) { console.log("error", error) }
            },


            toggleModifyInfos() {
                this.isEditingInfos = !this.isEditingInfos;
                this.userName = this.user.userName;
                this.position = this.user.position;
                this.department = this.user.department;
            },


            async postModifyInfos() {
                this.isEditingInfos = !this.isEditingInfos;

                const profileInfos = document.querySelector(".profile-infos");
                let formData = new FormData(profileInfos);
                formData.forEach((key, value) => formData[value] = key);

                const response = await fetch("http://localhost:3000/api/auth/updateUser", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.token}`
                    },
                    method: "PUT",
                    body: JSON.stringify(formData)
                });
                
                try {
                    await response.json();
                    await this.getUserProfile();
                }
                catch(error) { console.log("error", error) }
            },


            matchingPsw() {
                if(this.isEditingPsw) {

                    if(this.confirmPsw !== this.newData) {
                        this.confirmPswAlert = true;
                        this.confirmPswMsg = this.dismatchPswMsg;
                    }
    
                    else {
                        this.passwordMatched = true;
                        this.confirmPswAlert = false;
                    } 
                }
            },


            formValid(formData, inputField, regEx, elemString) {
                // If input field is empty
                if (inputField === "") {

                    if(elemString === "oldData"
                    || elemString === "password") {this.oldDataAlert = true; this.oldDataMsg = this.emptyField}
                    if(elemString === "newData") {this.newDataAlert = true; this.newDataMsg = this.emptyField}
                    if(elemString === "confirmPsw") {this.confirmPswAlert = true; this.confirmPswMsg = this.emptyField}
                }

                // If regEx is wrong
                else if (!regEx.test(inputField)) {

                    if(elemString === "oldData") {this.oldDataAlert = true; this.oldDataMsg = this.wrongRegEx}
                    if(elemString === "newData") {this.newDataAlert = true; this.newDataMsg = this.wrongRegEx}
                    if(elemString === "password") {this.oldDataAlert = true; this.oldDataMsg = this.wrongRegExPsw}
                    if(elemString === "confirmPsw") {this.confirmPswAlert = true; this.confirmPswMsg = this.pswUnderRegEx}
                }
                
                // If all informations are corrects
                else {
                    formData.set(elemString, inputField);

                    if(elemString === "oldData"
                    || elemString === "password") this.oldDataValid = true;
                    if(elemString === "newData") this.newDataValid = true;
                    if(elemString === "confirmPsw") this.confirmPswValid = true;
                }
            },


            async resetResponse(response) {
                this.$parent.$emit("loading");
                const resObj = await response.json();

                this.oldDataValid = false;
                this.newDataValid = false;
                this.confirmPswValid = false;

                if(resObj.message.includes("avec succès")) {

                    if(resObj.message.includes("e-mail")) {
                        localStorage.setItem("Email", this.newData);
                        this.email = this.newData;
                    }
                    
                    const popup = document.querySelector(".server-alert");
                    popup.classList.add("green-popup");

                    this.serverAlert = true;
                    this.serverMsg = resObj.message;
                    setTimeout(() => this.serverAlert = false, this.timeOutDuration);
                    setTimeout(() => popup.classList.remove("green-popup"), this.timeOutDuration * 2);
                    
                    this.cancelResetPage();
                }

                else {
                    this.serverAlertForm = true;
                    this.serverMsgForm = resObj.message;
                    setTimeout(() => this.serverAlertForm = false, this.timeOutDuration);
                }
            },


            toggleModifyEmail() {
                this.isEditingEmail = !this.isEditingEmail;
                this.inputType = "text";
                this.oldDataLabel = "Ancienne adresse E-mail";
                this.newDataLabel = "Nouvelle adresse E-mail";
            },


            async postModifsEmail() {
                // Have to contain: 
                //  LETTER || letter || number || dot || under score || dash
                //  && at (@) &&
                //  LETTER || letter || number && dot && LETTER || letter
                const emailRegEx = new RegExp(/^[A-Za-z0-9._-]+[@]+[A-Za-z0-9]+[.]+[A-Za-z]+$/);
                
                let formData = new FormData();
                this.formValid(formData, this.oldData, emailRegEx, "oldData");
                this.formValid(formData, this.newData, emailRegEx, "newData");
                formData.forEach((key, value) => formData[value] = key);

                if(this.oldDataValid && this.newDataValid) {

                    this.$parent.$emit("loading");

                    const response = await fetch("http://localhost:3000/api/auth/updateUser/email", {
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                            "Authorization": `Bearer ${this.token}`
                        },
                        method: "PUT",
                        body: JSON.stringify(formData)
                    });
                    
                    try { this.resetResponse(response) }
                    catch(error) { console.log("error", error) }
                }
            },


            toggleModifyPassword() {
                this.isEditingPsw = !this.isEditingPsw;
                this.inputType = "password";
                this.oldDataLabel = "Ancien mot de passe";
                this.newDataLabel = "Nouveau mot de passe";
            },


            async postModifsPassword() {
                // Have to contain: LETTER || letter || number || accent letters || number
                const passwordRegExLogin = new RegExp(/^[A-Za-zÜ-ü0-9!@#$%^&*]+$/);

                // Have to contain: LETTER || letter || number || accent letters || number && minimum 10 characters 
                const passwordRegExSignin = new RegExp(/^[A-Za-zÜ-ü0-9!@#$%^&*].{9,}$/);
                
                let formData = new FormData();
                this.formValid(formData, this.oldData, passwordRegExLogin, "oldData");
                this.formValid(formData, this.newData, passwordRegExSignin, "newData");
                this.formValid(formData, this.confirmPsw, passwordRegExSignin, "confirmPsw");
                formData.forEach((key, value) => formData[value] = key);

                if(this.oldDataValid && this.newDataValid && this.confirmPswValid) {

                    this.$parent.$emit("loading");

                    const response = await fetch("http://localhost:3000/api/auth/updateUser/password", {
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                            "Authorization": `Bearer ${this.token}`
                        },
                        method: "PUT",
                        body: JSON.stringify(formData)
                    });
                    
                    try { this.resetResponse(response) }
                    catch(error) { console.log("error", error) }
                }
            },


            toggleDeleteAccount() {
                this.isDeletingAccount = !this.isDeletingAccount;
                this.inputType = "password";
                this.oldDataLabel = "Entrer votre mot de passe";
            },


            async deleteAccount() {
                // Have to contain: LETTER || letter || number || accent letters || number && minimum 10 characters 
                const passwordRegExSignin = new RegExp(/^[A-Za-zÜ-ü0-9!@#$%^&*].{9,}$/);
                
                let formData = new FormData();
                this.formValid(formData, this.oldData, passwordRegExSignin, "password");
                formData.forEach((key, value) => formData[value] = key);

                if(this.oldDataValid) {
                    
                    this.$parent.$emit("loading");

                    const response = await fetch("http://localhost:3000/api/auth/delete", {
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                            "Authorization": `Bearer ${this.token}`
                        },
                        method: "DELETE",
                        body: JSON.stringify(formData)
                    });

                    try {
                        this.$parent.$emit("loading");
                        const resObj = await response.json();

                        if(resObj.message.includes("avec succès")) {
                            localStorage.clear();
                            
                            this.$parent.$emit("logPages");
                            this.$parent.$emit("swapPages");
                            this.$parent.$emit("swapPageAlert");
                            this.$parent.$emit("swapPageMsg", resObj.message);

                            setTimeout(() => this.$parent.$emit("swapPageAlert"), this.timeOutDuration);
                        }

                        else {
                            this.serverAlertForm = true;
                            this.serverMsgForm = resObj.message;
                            setTimeout(() => this.serverAlertForm = false, this.timeOutDuration);
                        }
                    }
                    catch(error) { console.log("error", error) }
                }
            },


            toggleResetPage() {
                if(this.isEditingEmail || this.isEditingPsw || this.isDeletingAccount) return true;
            },


            cancelResetPage() {
                if(this.isEditingEmail || this.isEditingPsw || this.isDeletingAccount) {
                    this.isEditingEmail = false;
                    this.isEditingPsw = false;
                    this.isDeletingAccount = false;

                    this.oldData = "";
                    this.newData = "";
                    this.confirmPsw = "";

                    this.oldDataAlert = false;
                    this.newDataAlert = false;
                    this.confirmPswAlert = false;
                }
            },


            sendReseted() {
                if(this.isEditingEmail) this.postModifsEmail();
                if(this.isEditingPsw) this.postModifsPassword();
                if(this.isDeletingAccount) this.deleteAccount();

                setTimeout(() => {
                    this.oldDataAlert = false;
                    this.newDataAlert = false;
                    this.confirmPswAlert = false;
                }, this.timeOutDuration);
            },
        }
    }
</script>


<style scoped lang="scss">

    // -----------------------------------
    $pageColor: rgb(179, 0, 255);
    // -----------------------------------


    .profile {
        z-index: 1;
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

    .reset-form {
        position: relative;
        align-content: space-around;
        height: 330px;
        width: 85%;
        padding-top: 15px;
        padding-bottom: 15px;
        border-radius: 15px;
        background: linear-gradient(to top left, violet, lightskyblue);
    }

    .label-input {
        position: relative;
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


    /* --- Alert Message --- */
    .form-alert {
        z-index: 3;
        height: 30px;
        bottom: -35px;
        width: 85% !important;
    }

    .server-alert,
    .server-alert-form {
        position: absolute;
        padding-left: 10px;
        padding-right: 10px;
        width: 75% !important;
        margin: 0px;
        left: 50%;
        font-size: 110%;
        font-weight: 400;
        line-height: 130%;
        transform: translateX(-50%);
    }

    .server-alert {
        top: 20px;
        height: 80px;
        
    }
    
    .server-alert-form {
        top: -40px;
        height: 60px;
    }

    .green-popup {
        border: double green 5px !important;
        background: lightgreen !important;
    }
</style>