<template>

    <section class="flexCenter signin">
        <button class="signin-btn" @click="showSignin()">Inscription</button>
        
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
                <label for="password">Confirmer le mot de passe</label>
                <input name="password" id="password" type="password" placeholder="Confirmer votre mot de passe" value="">
            </div>

            <div class="flexCenter">
                <label for="userName">Nom et Prénom</label>
                <input name="userName" id="userName" type="text" placeholder="Entrer votre nom et prénom" value="">
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
    </section>

</template>


<script>
export default {
    name: 'Signin',
    
    methods: {
        showSignin: function() {
            document.querySelector(".signin").style.zIndex = "10";
            document.querySelector(".login").style.zIndex = "1";
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
        height: 92%;
    }
</style>