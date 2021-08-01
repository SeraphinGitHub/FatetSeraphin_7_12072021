<template>
    <figure class="flexCenter user-pict">

        <img class="circle-user-img" :src="userPhoto" alt="photo de profile">

        <figcaption class="flexCenter user-infos">
            <h2>{{ userName }}</h2>
            <p>{{ position }}</p>
            <p>{{ service }}</p>
        </figcaption>

    </figure>
</template>


<script>
    export default {
        name: "UserCaption",

        props: {
            userId: Number,
        },
        
        data() {
            // this.getLoggedUserInfos();

            return {
                user: "",
                userPhoto: require("../../../../public/Onin_Pecker.jpg"), 
                userName: "Fatet séraphin",                         // ==> Infos of logged User
                position: "Développeur web",
                service: "Recherche et développement",
            };
        },

        methods: {
            async getLoggedUserInfos() {
                const token = window.localStorage.getItem("Token");
                
                const response = await fetch("http://localhost:3000/api/auth/user", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": "Bearer" + token
                    },
                    method: "POST",
                    body: JSON.stringify({ id: this.userId })
                });
                
                try {
                    const resObj = await response.json();
                    this.user = resObj;
                }
                catch(error) { console.log("error", error) }
                return {}
            },
        },
    }
</script>


<style scoped>
    .circle-user-img {
        border-radius: 50% !important;
    }

    .user-pict {
        margin: 15px;
        margin-bottom: 8px;
    }
</style>