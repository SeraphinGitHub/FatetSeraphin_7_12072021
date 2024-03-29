<template>

    <section class="flexCenter login">
        <button class="login-btn" @click="showLogin()">Connexion</button>
        
        <form class="flexCenter login-form" method="POST">
            <transition name="slideSide">
                <h3 class="flexCenter form-alert server-alert" v-show="serverAlert">{{ serverMsg }}</h3>
            </transition>

            <div class="flexCenter field-container">
                <label for="email">E-mail</label>
                <input class="log-input" name="email" id="email" type="email" placeholder="Entrer votre E-mail" v-model="email">

                <transition name="fade">
                    <p class="flexCenter form-alert" v-show="emailAlert">{{ emailMsg }}</p>
                </transition>
            </div>

            <div class="flexCenter field-container">
                <label for="password">Mot de passe</label>
                <input class="log-input" name="password" id="password" type="password" placeholder="Entrer votre mot de passe" v-model="password">
                
                <transition name="fade">
                    <p class="flexCenter form-alert" v-show="pswAlert">{{ pswMsg }}</p>
                </transition>
            </div>

            <button class="btn log-btn" @click.prevent="login()" type="submit">Se Connecter</button>
        </form>
    </section>

</template>

<script>
    import generic from "../../generic-methods.js"

    export default {
        name: "Login",

        mixins: [
            generic,
        ],

        props: {
            isLoading: Boolean,
            isSwapPages: Boolean,
            swapPageAlert: Boolean,
            swapPageMsg: String,
        },

        data() {
            return {
                timeOutDuration: 2500, // <== miliseconds

                email: "",
                password: "",

                emailValid: false,
                emailAlert: false,
                emailMsg: "",
                
                passwordValid: false,
                pswAlert: false,
                pswMsg: "",

                isInfosCorrects: false,

                emptyField: "Le champ est vide !",
                wrongRegEx: "Champ invalide !",

                serverAlert: false,
                serverMsg: "",
            }
        },
        
        methods: {
            showLogin() {
                this.$emit("login");
            },


            formValid(formData, inputField, regEx, elemString) {
                // If input field is empty
                if (inputField === "") {
                    if(elemString === "email") {this.emailAlert = true; this.emailMsg = this.emptyField}
                    if(elemString === "password") {this.pswAlert = true; this.pswMsg = this.emptyField}
                }

                // If regEx is wrong
                else if (!regEx.test(inputField)) {
                    if(elemString === "email") {this.emailAlert = true; this.emailMsg = this.wrongRegEx}
                    if(elemString === "password") {this.pswAlert = true; this.pswMsg = this.wrongRegEx}
                }
                
                // If all informations are corrects
                else {
                    formData.set(elemString, inputField);

                    if(elemString === "email") this.emailValid = true;
                    if(elemString === "password") this.passwordValid = true;
                }
            },


            getPersonInfos() {
                // Have to contain: 
                //  LETTER || letter || number || dot || under score || dash
                //  && at (@) &&
                //  LETTER || letter || number && dot && LETTER || letter
                const emailRegEx = new RegExp(/^[A-Za-z0-9._-]+[@]+[A-Za-z0-9]+[.]+[A-Za-z]+$/);

                // Have to contain: LETTER || letter || number || accent letters || number
                const passwordRegEx = new RegExp(/^[A-Za-zÜ-ü0-9!@#$%^&*]+$/);
                
                const postForm = document.querySelector(".login-form");
                const formData = new FormData(postForm)

                this.formValid(formData, this.email, emailRegEx, "email");
                this.formValid(formData, this.password, passwordRegEx, "password");

                if(this.emailValid && this.passwordValid) this.isInfosCorrects = true;

                return formData;
            },
            

            async postDataLogin(formData) {
                this.$parent.$emit("loading");

                const response = await fetch("http://localhost:3000/api/auth/login", {
                    headers: {"Content-Type": "application/json; charset=UTF-8"},
                    method: "POST",
                    body: JSON.stringify(formData)
                });
                
                try {
                    this.$parent.$emit("loading");
                    const session = await response.json();
                    this.log_Base(session, "invalide", this.timeOutDuration, "");
                }
                catch(error) { console.log("error", error) }
            },


            clearInputFields() {
                const allFields = document.querySelectorAll(".log-input");
                allFields.forEach( field => field.value = "");
            },


            login() {
                const formData = this.getPersonInfos();
                formData.forEach((key, value) => formData[value] = key);

                if(this.isInfosCorrects) this.postDataLogin(formData);
                
                setTimeout(() => {
                    this.emailAlert = false;
                    this.pswAlert = false;
                }, this.timeOutDuration);
            },
        }
    }
</script>


<style scoped lang="scss">
    
    $pageColor: skyblue;

    .login {
        z-index: 10;
        border-radius: 0 15px 15px 15px;
        background: linear-gradient(to top, lightgray, $pageColor);
    }

    .login,
    .login-btn {
        border: solid $pageColor 3px;
    }

    .login-btn {
        left: -3px;
        background-color: $pageColor;
    }

    .login-form {
        height: 70%;
    }

    input {
        margin-top: 8px;
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



    /* =============================================================================== */
    /*      Tablet Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 421px) and (max-width : 768px) {

        .field-container {
            width: 70% !important;
            height: 80px;
        }

        label {
            font-size: 125%;
        }

        input {
            height: 40px;
            font-size: 110%;
        }

        .log-btn {
            height: 60px;
        }

        .form-alert {
            height: 35px;
            font-size: 110%;
        }

        .server-alert {
            height: 60px;
            width: 70% !important;
            font-size: 130%;
        }
    }


    /* =============================================================================== */
    /*      Laptop Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 769px) and (max-width : 992px) {
        
        .field-container {
            width: 50% !important;
            height: 80px;
            margin-left: 100px;
            margin-right: 100px;
        }

        label {
            font-size: 125%;
        }

        input {
            height: 60px;
            font-size: 120%;
        }

        .log-btn {
            height: 80px;
        }

        .form-alert {
            height: 40px;
            font-size: 120%;
            bottom: -60px;
        }

        .server-alert {
            top: 20px;
            height: 80px;
            width: 50% !important;
            font-size: 140%;
        }
    }


    /* =============================================================================== */
    /*      Laptop Big Size      */
    /* =============================================================================== */
    @media screen and (min-width: 993px) and (max-width : 1366px) {
        
        .field-container {
            width: 50% !important;
            height: 80px;
            margin-left: 100px;
            margin-right: 100px;
        }

        label {
            font-size: 125%;
        }

        input {
            height: 60px;
            font-size: 120%;
        }

        .log-btn {
            height: 80px;
        }

        .form-alert {
            height: 40px;
            font-size: 120%;
            bottom: -60px;
        }

        .server-alert {
            top: 20px;
            height: 80px;
            width: 50% !important;
            font-size: 140%;
        }
    }


    /* =============================================================================== */
    /*      Screen Normal Size && Over      */
    /* =============================================================================== */
    @media screen and (min-width: 1367px) {
        
        .field-container {
            width: 35% !important;
            height: 80px;
            margin-left: 200px;
            margin-right: 200px;
        }

        label {
            font-size: 125%;
        }

        input {
            height: 60px;
            font-size: 120%;
        }

        .log-btn {
            height: 100px;
            width: 25%;
            margin-left: 200px;
            margin-right: 200px;
        }

        .form-alert {
            height: 40px;
            font-size: 120%;
            bottom: -60px;
        }

        .server-alert {
            top: 40px;
            height: 80px;
            width: 40% !important;
            font-size: 140%;
        }
    }
</style>