<template>

    <figure class="flexCenter user-pict">
        <img :src="postUser.imageUrl" alt="photo de profile">

        <figcaption class="flexCenter user-infos">
            <h2>{{ postUser.userName }}</h2>
            <p>{{ postUser.position }}</p>
            <p>{{ postUser.department }}</p>
        </figcaption>
    </figure>

</template>


<script>
    export default {
        name: "PostUserInfos",

        props: {
            userId: Number,
        },
        
        data() {
            return {
                postUser: {},
                token: window.localStorage.getItem("Token"),
            };
        },

        async beforeMount() {
            await this.getPostUserInfos();
        },

        methods: {
            async getPostUserInfos() {
                const response = await fetch("http://localhost:3000/api/auth/postUser", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${this.token}`
                    },
                    method: "POST",
                    body: JSON.stringify({ id: this.userId })
                });
                
                try {
                    const resObj = await response.json();
                    this.postUser = resObj;
                }
                catch(error) { console.log("error", error) }
                return {}
            },
        },
    }
</script>


<style scoped>
    .user-pict {
        justify-content: flex-start !important;
        height: 80px;
        width: 100%;
        margin: 15px;
        margin-bottom: 8px;
    }

    .user-pict img {
        object-fit: cover;
        height: 100%;
        width: 80px;
        border-radius: 10px;
        box-shadow: black 5px 5px 5px;
    }
</style>