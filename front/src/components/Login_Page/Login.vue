<template>

    <section class="flexCenter login">
        <button class="login-btn" @click="showLogin()">Connexion</button>
        
        <form class="flexCenter login-form" method="POST">
            <div class="flexCenter field-container">
                <label for="email">E-mail</label>
                <input name="email" id="email" type="email" placeholder="Entrer votre E-mail" value="">

                <!-- <p class="flexCenter form-alert" v-if="empty">{{ emptyMsg }}</p>
                <p class="flexCenter form-alert" v-if="wrongRegEx">{{ wrongRegExMsg }}</p> -->
            </div>

            <div class="flexCenter field-container">
                <label for="password">Mot de passe</label>
                <input name="password" id="password" type="password" placeholder="Entrer votre mot de passe" value="">
            
                <!-- <p class="flexCenter form-alert" v-if="empty">{{ emptyMsg }}</p> -->
                <!-- <p class="flexCenter form-alert" v-if="wrongRegEx">{{ wrongRegExMsg }}</p> -->
            </div>

            <button class="btn" @click.prevent="login()" type="submit">Se Connecter</button>
        </form>
    </section>

</template>


<script>
    export default {
        name: 'Login',
        
        methods: {
            showLogin() {
                document.querySelector(".login").style.zIndex = "10";
                document.querySelector(".signin").style.zIndex = "1";
            },

            async login() {

                // const email = document.getElementById("email").value;
                // const password = document.getElementById("password").value
                
                // const response = await fetch("http://localhost:3000/api/auth/login", {
                    
                //     headers: {"Content-Type": "application/json; charset=UTF-8"},
                //     method: "POST",
                //     body: JSON.stringify({email, password})
                // });
                
                // try {return await response.json()}
                // catch(error) {console.log("error", error)}
                // return {}
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
        height: 30px;
    }
    
    /* --- Alert Message --- */
    .form-alert {
        height: 30px;
        bottom: -38px;
    }
</style>