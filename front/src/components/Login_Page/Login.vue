<template>

    <section class="flexCenter login">
        <button class="login-btn" @click="showLogin()">Connexion</button>
        
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
    </section>

</template>


<script>
    export default {
        name: 'Login',
        
        

        methods: {
            showLogin: function() {
                document.querySelector(".login").style.zIndex = "10";
                document.querySelector(".signin").style.zIndex = "1";
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
        height: 60%;
    }
</style>