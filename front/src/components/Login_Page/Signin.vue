<template>
    <section class="flexCenter signin">

        <button class="signin-btn" @click="showSignin()">Inscription</button>
        
        <form class="flexCenter signin-form" method="POST">
            
            <div class="flexCenter field-container">
                <label for="email">E-mail</label>
                <input class="log-input" name="email" type="email" placeholder="Entrer votre E-mail" v-model="email">
                
                <transition name="fade">
                    <p class="flexCenter form-alert" v-show="emailAlert">{{ emailMsg }}</p>
                </transition>
            </div>

            <div class="flexCenter field-container">
                <label for="password">Mot de passe</label>
                <input class="log-input" name="password" type="password" placeholder="Entrer votre mot de passe" v-model="password">
                
                <transition name="fade">
                    <p class="flexCenter form-alert" v-show="pswAlert">{{ pswMsg }}</p>
                </transition>
            </div>

            <div class="flexCenter field-container">
                <label for="confirmPsw">Confirmer le mot de passe</label>
                <input class="log-input" name="confirmPsw" type="password" @input="matchingPsw()" placeholder="Confirmer votre mot de passe" v-model="confirmPsw">
                
                <transition name="fade">
                    <p class="flexCenter form-alert" v-show="pswConfirmAlert">{{ pswConfirmMsg }}</p>
                </transition>
            </div>

            <div class="flexCenter field-container">
                <label for="userName">Nom et Prénom</label>
                <input class="log-input"  name="userName" type="text" placeholder="Entrer votre nom et prénom" v-model="userName">
                
                <transition name="fade">
                    <p class="flexCenter form-alert" v-show="userNameAlert">{{ userNameMsg }}</p>
                </transition>
            </div>

            <div class="flexCenter field-container">
                <label for="position">Poste occupé</label>
                <input class="log-input" name="position" type="text" placeholder="Votre poste dans l'entreprise" v-model="position">
                
                <transition name="fade">
                    <p class="flexCenter form-alert" v-show="positionAlert">{{ positionMsg }}</p>
                </transition>
            </div>

            <div class="flexCenter field-container">
                <label for="department">Service</label>
                <input class="log-input" name="department" type="text" placeholder="Votre service dans l'entreprise" v-model="department">
                
                <transition name="fade">
                    <p class="flexCenter form-alert" v-show="departmentAlert">{{ departmentMsg }}</p>
                </transition>
            </div>

            <transition name="slideSide">
                <h3 class="flexCenter form-alert server-alert" v-show="serverAlert">{{ serverMsg }}</h3>
            </transition>
            
            <button class="btn" @click.prevent="signin()" type="submit">S'inscrire</button>
        </form>

    </section>
</template>


<script>
    import generic from "../../generic-methods.js"

    export default {
        name: "Signin",

        mixins: [
            generic,
        ],

        props: {
            isLoading: Boolean,
            isLogPages: Boolean,
        },

        data() {
            return {
                timeOutDuration: 2500,  // <== miliseconds

                serverAlert: false,
                serverMsg: "",

                email: "",
                password: "",
                confirmPsw: "",
                userName: "",
                position: "",
                department: "",

                emailValid: false,
                emailAlert: false,
                emailMsg: "",

                passwordValid: false,
                pswAlert: false,
                pswMsg: "",

                confirmPswValid: false,
                pswConfirmAlert: false,
                pswConfirmMsg: "",
                
                userNameValid: false,
                userNameAlert: false,
                userNameMsg: "",
                
                positionValid: false,
                positionAlert: false,
                positionMsg: "",
                
                departmentValid: false,
                departmentAlert: false,
                departmentMsg: "",

                emptyField: "Le champ est vide !",
                wrongRegEx: "Champ invalide !",
                pswUnderRegEx: "Champ invalide ou moins de 10 caractères !",
                dismatchPsw: "Les mots de passe ne correspondent pas !",

                passwordMatched: false,
            }
        },
        
        methods: {
            showSignin() {
                this.$emit("signin");
            },


            matchingPsw() {
                if(this.confirmPsw !== this.password) {
                    this.pswConfirmAlert = true;
                    this.pswConfirmMsg = this.dismatchPsw;
                }

                else {
                    this.passwordMatched = true;
                    this.pswConfirmAlert = false;
                } 
            },


            formValid(formData, inputField, regEx, elemString) {
                // If input field is empty
                if (inputField === "") {
                    if(elemString === "email") {this.emailAlert = true; this.emailMsg = this.emptyField}
                    if(elemString === "password") {this.pswAlert = true; this.pswMsg = this.emptyField}
                    if(elemString === "confirmPsw") {this.pswConfirmAlert = true; this.pswConfirmMsg = this.emptyField}
                    if(elemString === "userName") {this.userNameAlert = true; this.userNameMsg = this.emptyField}
                    if(elemString === "position") {this.positionAlert = true; this.positionMsg = this.emptyField}
                    if(elemString === "department") {this.departmentAlert = true; this.departmentMsg = this.emptyField}
                }

                // If regEx is wrong
                else if (!regEx.test(inputField)) {
                    if(elemString === "email") {this.emailAlert = true; this.emailMsg = this.wrongRegEx}
                    if(elemString === "password") {this.pswAlert = true; this.pswMsg = this.pswUnderRegEx}
                    if(elemString === "confirmPsw") {this.pswConfirmAlert = true; this.pswConfirmMsg = this.pswUnderRegEx}
                    if(elemString === "userName") {this.userNameAlert = true; this.userNameMsg = this.wrongRegEx}
                    if(elemString === "position") {this.positionAlert = true; this.positionMsg = this.wrongRegEx}
                    if(elemString === "department") {this.departmentAlert = true; this.departmentMsg = this.wrongRegEx}
                }
                
                // If all informations are corrects
                else {
                    formData.set(elemString, inputField);
                    
                    if(elemString === "email") this.emailValid = true;
                    if(elemString === "password") this.passwordValid = true;
                    if(elemString === "confirmPsw") this.confirmPswValid = true;
                    if(elemString === "userName") this.userNameValid = true;
                    if(elemString === "position") this.positionValid = true;
                    if(elemString === "department") this.departmentValid = true;
                }
            },


            getPersonInfos() {
                // Have to contain: 
                //  LETTER || letter || number || dot || under score || dash
                //  && at (@) &&
                //  LETTER || letter || number && dot && LETTER || letter
                const emailRegEx = new RegExp(/^[A-Za-z0-9._-]+[@]+[A-Za-z0-9]+[.]+[A-Za-z]+$/);

                // Have to contain: LETTER || letter || accent letters || spaces || dash
                const normalTextRegEx = new RegExp(/^[A-Za-zÜ-ü\s-]+$/);

                // Have to contain: LETTER || letter || number || accent letters || number && minimum 10 characters 
                const passwordRegEx = new RegExp(/^[A-Za-zÜ-ü0-9!@#$%^&*].{9,}$/);
                
                const postForm = document.querySelector(".signin-form");
                const formData = new FormData(postForm)

                this.formValid(formData, this.email, emailRegEx, "email");
                this.formValid(formData, this.password, passwordRegEx, "password");
                this.formValid(formData, this.confirmPsw, passwordRegEx, "confirmPsw");
                this.formValid(formData, this.userName, normalTextRegEx, "userName");
                this.formValid(formData, this.position, normalTextRegEx, "position");
                this.formValid(formData, this.department, normalTextRegEx, "department");
                
                return formData;
            },


            async postDataSignin(formData) {
                this.$parent.$emit("loading");

                const response = await fetch("http://localhost:3000/api/auth/signin", {
                    headers: {"Content-Type": "application/json; charset=UTF-8"},
                    method: "POST",
                    body: JSON.stringify(formData)
                });
                
                try {
                    this.$parent.$emit("loading");
                    const session = await response.json();
                    this.log_Base(session, "déjà pris", this.timeOutDuration, "signin");
                }
                catch(error) { console.log("error", error) }
            },


            clearInputFields() {
                const allFields = document.querySelectorAll(".log-input");
                allFields.forEach( field => field.value = "");
            },


            signin() {
                const formData = this.getPersonInfos();
                formData.forEach((key, value) => formData[value] = key);
                
                if(this.emailValid
                && this.passwordValid
                && this.confirmPswValid
                && this.userNameValid
                && this.positionValid
                && this.departmentValid
                && this.passwordMatched) {

                    this.postDataSignin(formData);
                }
                
                setTimeout(() => {
                    this.emailAlert = false;
                    this.pswAlert = false;
                    this.pswConfirmAlert = false;
                    this.userNameAlert = false;
                    this.positionAlert = false;
                    this.departmentAlert = false;
                }, this.timeOutDuration);
            },
        }
    }
</script>


<style lang="scss">
    
    /* --- Alert Message --- */
    .form-alert {
        position: absolute;
        height: 30px;
        width: 80% !important;
        bottom: -30px;
        left: center;

        font-size: 90%;
        text-align: center;
        border: solid red 1.5px;
        background-color: rgb(255, 210, 210);
        border-radius: 5px;
    }
</style>


<style scoped lang="scss">
    
    $pageColor: rgb(197, 61, 255);

    .signin {
        z-index: 1;
        border-radius: 15px 0 15px 15px;
        background: linear-gradient(to top, lightgray, $pageColor);
    }

    .signin,
    .signin-btn {
        border: solid $pageColor 3px;
    }

    .signin-btn {
        right: -3px;
        background-color: $pageColor;
    }

    .signin-form {
        align-content: space-between;
        height: 95%;
    }

    /* --- Alert Message --- */
    .form-alert {
        height: 30px;
        bottom: -38px;
    }

    .server-alert {
        position: absolute;
        top: 0;
        left: 50%;
        height: 40px;
        margin-top: 30px;
        font-size: 100%;
        font-weight: 400;
        transform: translateX(-50%);
    }
</style>