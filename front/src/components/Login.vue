<template>
    <div class="flexCenter log-system">
        
        <div class="flexCenter signin">
            <button class="register" @click="showSignin()">Inscription</button>
            
            <form class="flexCenter signin-form" method="POST">
                <div class="flexCenter">
                    <label for="email">E-mail</label>
                    <input name="email" id="email" type="email" placeholder="Entrer votre E-mail" value="">
                </div>

                <div class="flexCenter">
                    <label for="password">Mot de passe</label>
                    <input name="password" id="password" type="password" placeholder="Entrer votre mot de passe" value="">
                </div>

                <div class="flexCenter">
                    <label for="userName">Nom d'utilisateur</label>
                    <input name="userName" id="userName" type="text" placeholder="Entrer votre nom d'utilisateur" value="">
                </div>

                <div class="flexCenter">
                    <label for="position">Poste occupé</label>
                    <input name="position" id="position" type="text" placeholder="Votre poste dans l'entreprise" value="">
                </div>

                <div class="flexCenter">
                    <label for="department">Service</label>
                    <input name="department" id="department" type="text" placeholder="Votre service dans l'entreprise" value="">
                </div>

                <button class="btn" @click.prevent="signin()" type="submit">S'inscrire</button>
            </form>
        </div>


        <div class="flexCenter login">
            <button class="connect" @click="showLogin()">Connexion</button>
            
            <form class="flexCenter login-form" method="POST">
                <div class="flexCenter">
                    <label for="email">E-mail</label>
                    <input name="email" id="email" type="email" placeholder="Entrer votre E-mail" value="">
                </div>

                <div class="flexCenter">
                    <label for="password">Mot de passe</label>
                    <input name="password" id="password" type="password" placeholder="Entrer votre mot de passe" value="">
                </div>

                <button class="btn" @click.prevent="login()" type="submit">Se Connecter</button>
            </form>
        </div>        

    </div>
</template>


<script>
export default {
    name: 'Login',
    
    methods: {
        showLogin: function() {
            document.querySelector(".login").style.zIndex = "10";
            document.querySelector(".signin").style.zIndex = "5";
        },

        showSignin: function() {
            document.querySelector(".signin").style.zIndex = "10";
            document.querySelector(".login").style.zIndex = "5";
        },

        login: async function() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value
            
            const response = await fetch("http://localhost:3000/api/auth/login", {
                
                headers: {"Content-Type": "application/json; charset=UTF-8"},
                method: "POST",
                body: JSON.stringify({email, password})
            });
            
            try {return await response.json()}
            catch(error) {console.log("error", error)}
            return {}
        },

        signin: async function() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value
            const userName = document.getElementById("userName").value
            const position = document.getElementById("position").value
            const department = document.getElementById("department").value
            
            const response = await fetch("http://localhost:3000/api/auth/signin", {
                
                headers: {"Content-Type": "application/json; charset=UTF-8"},
                method: "POST",
                body: JSON.stringify({email, password, userName, position, department})
            });
            
            try {return await response.json()}
            catch(error) {console.log("error", error)}
            return {}
        }
    }
}
</script>


<style scoped>
    .log-system {
        position: relative;
        height: 550px;
    }

    .login {
        left: 48%;
        border-radius: 0 15px 15px 15px;
        background: linear-gradient(to top, lightgray, skyblue);
    }

    .signin {
        left: 52%;
        border-radius: 15px 0 15px 15px;
        background: linear-gradient(to top, lightgray, violet);
    }

    .login,
    .connect {
        border: solid skyblue 3px;
    }

    .signin,
    .register {
        border: solid violet 3px;
    }

    .login,
    .signin {
        position: absolute;
        height: 500px;
        height: 90%;
        width: 95%;
        top: 53%;
        transform: translate(-50%, -50%);
    }
    
    .connect,
    .register {
        position: absolute;
        height: 40px;
        width: 50%;
        top: -43px;
        padding-top: 10px;
        padding-bottom: 30px;
        border-bottom: transparent;
        border-radius: 15px 15px 0 0;

        font-family: "Roboto-Medium";
        line-height: 100%;
        font-weight: 400;
        font-size: 120%;
    }

    .connect {
        left: -3px;
        background-color: skyblue;
    }

    .register {
        right: -3px;
        background-color: violet;
    }

    .login-form {
        height: 60%;
    }

    .signin-form {
        height: 100%;
    }

    label,
    input {
        width: 77%;
    }

    label {
        text-align: left;

        font-family: "Roboto-Medium";
        line-height: 100%;
        font-weight: 600;
        font-size: 110%;
    }

    input {
        text-align: left;
        height: 30px;
        margin-top: 8px;
        padding-left: 15px;
        border-radius: 8px;
        border: solid black 1px;

        font-family: "Raleway-Medium";
        line-height: 100%;
        font-weight: 400;
        font-size: 95%;
    }
</style>