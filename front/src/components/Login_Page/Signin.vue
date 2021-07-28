<template>

    <section class="flexCenter signin">
        <button class="signin-btn" @click="showSignin()">Inscription</button>
        
        <form class="flexCenter signin-form" method="POST">
            
            <div class="flexCenter field-container">
                <label for="email">E-mail</label>
                <input name="email" id="email" type="email" placeholder="Entrer votre E-mail">
                
                <!-- <p class="flexCenter form-alert" v-if="empty">{{ emptyMsg }}</p> -->
                <!-- <p class="flexCenter form-alert" v-if="wrongRegEx">{{ wrongRegExMsg }}</p> -->
            </div>

            <div class="flexCenter field-container">
                <label for="password">Mot de passe</label>
                <input name="password" id="password" type="password" placeholder="Entrer votre mot de passe">
                
                <!-- <p class="flexCenter form-alert" v-if="empty">{{ emptyMsg }}</p> -->
                <!-- <p class="flexCenter form-alert" v-if="wrongRegEx">{{ wrongRegExMsg }}</p> -->
            </div>

            <div class="flexCenter field-container">
                <label for="confirmPassword">Confirmer le mot de passe</label>
                <input name="confirmPassword" id="confirmPassword" type="password" placeholder="Confirmer votre mot de passe">
                
                <!-- <p class="flexCenter form-alert" v-if="empty">{{ emptyMsg }}</p> -->
                <!-- <p class="flexCenter form-alert" v-if="wrongRegEx">{{ wrongRegExMsg }}</p> -->
                <!-- <p class="flexCenter form-alert" v-if="dismatchPsw">{{ dismatchPswMsg }}</p> -->
            </div>

            <div class="flexCenter field-container">
                <label for="userName">Nom et Prénom</label>
                <input name="userName" id="userName" type="text" placeholder="Entrer votre nom et prénom">
                
                <!-- <p class="flexCenter form-alert" v-if="empty">{{ emptyMsg }}</p> -->
                <!-- <p class="flexCenter form-alert" v-if="wrongRegEx">{{ wrongRegExMsg }}</p> -->
                <!-- <p class="flexCenter form-alert" v-if="wrongRegEx">{{ wrongRegExMsg }}</p> -->
            </div>

            <div class="flexCenter field-container">
                <label for="position">Poste occupé</label>
                <input name="position" id="position" type="text" placeholder="Votre poste dans l'entreprise">
                
                <!-- <p class="flexCenter form-alert" v-if="empty">{{ emptyMsg }}</p> -->
                <!-- <p class="flexCenter form-alert" v-if="wrongRegEx">{{ wrongRegExMsg }}</p> -->
            </div>

            <div class="flexCenter field-container">
                <label for="department">Service</label>
                <input name="department" id="department" type="text" placeholder="Votre service dans l'entreprise">
                
                <!-- <p class="flexCenter form-alert" v-if="empty">{{ emptyMsg }}</p> -->
                <!-- <p class="flexCenter form-alert" v-if="wrongRegEx">{{ wrongRegExMsg }}</p> -->
            </div>
                
            <button class="btn" @click.prevent="signin()" type="submit">S'inscrire</button>

        </form>
    </section>

</template>


<script>
export default {
    name: 'Signin',
    
    methods: {
        showSignin() {
            document.querySelector(".signin").style.zIndex = "10";
            document.querySelector(".login").style.zIndex = "1";
        },

        async signin() {
            
            // const email = document.getElementById("email").value;
            // const password = document.getElementById("password").value;
            // const confirmPassword = document.getElementById("confirmPassword").value;
            // const userName = document.getElementById("userName").value;
            // const position = document.getElementById("position").value;
            // const department = document.getElementById("department").value;

            // Have to contain: 
            //  LETTER || letter || number || dot || under score || dash
            //  && at (@) &&
            //  LETTER || letter || number && dot && LETTER || letter
        // const emailRegEx = new RegExp(/^[A-Za-z0-9\._-]+[@]+[A-Za-z0-9]+[\.]+[A-Za-z]+$/);

            // Have to contain: LETTER || letter || number || accent letters || number && minimum 10 characters 
        // const passwordRegEx = new RegExp(/^[A-Za-zÜ-ü0-9].{9,}$/);

            // const response = await fetch("http://localhost:3000/api/auth/signin", {
                
            //     headers: {"Content-Type": "application/json; charset=UTF-8"},
            //     method: "POST",
            //     body: JSON.stringify({email, password, confirmPassword, userName, position, department})
            // });
            
            // try {return await response.json()}
            // catch(error) {console.log("error", error)}
            // return {}
        }
    }
}
</script>


<style lang="scss">
    
    /* --- Alert Message --- */
    .form-alert {
        position: absolute;
        height: 20px;
        width: 85%;
        bottom: -28px;
        left: center;

        font-size: 90%;
        text-align: center;
        border: solid red 1.5px;
        background-color: rgb(255, 210, 210);
        border-radius: 5px;
    }
</style>


<style scoped lang="scss">
    
    $pageColor: violet;

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
</style>