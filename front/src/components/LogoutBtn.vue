<template>

    <button class="flexCenter btn red-btn logout-btn" @click.prevent="logOut()" type="submit">
        <figure class="flexCenter">
            <i class="fas fa-power-off"></i>
        </figure>
    </button>

</template>


<script>
    export default {
        name: 'LogoutBtn',

        methods: {
            async logOut() {

                const fakeUser = {
                    email: "test@gmail.com",
                    password: "azerty1234"
                }

                const response = await fetch("http://localhost:3000/api/auth/login", {
                    headers: {"Content-Type": "application/json; charset=UTF-8"},
                    credentials: 'include',
                    method: "POST",
                    body: JSON.stringify( fakeUser )
                });
                
                try { return await response.json() }
                catch(error) { console.log("error", error) }
                return {}
            },
        }
    }
</script>


<style scoped>
    .logout-btn {
        position: absolute;
        top: 10px;
        right: 10%;
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }

    .svg-inline--fa {
        font-size: 110%;
    }
</style>