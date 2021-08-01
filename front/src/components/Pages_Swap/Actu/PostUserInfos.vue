<template>

    <figure class="flexCenter user-pict">
        <img :src="user.imageUrl" alt="photo de profile">

        <figcaption class="flexCenter user-infos">
            <h2>{{ user.userName }}</h2>
            <p>{{ user.position }}</p>
            <p>{{ user.department }}</p>
        </figcaption>
    </figure>

</template>


<script>
    export default {
        name: "PostUserInfos",

        props: {
            userId: Number,
            allPostReceived: Boolean,
        },
        
        data() {
            if(this.$parent.$parent.allPostReceived) this.getPostUserInfos();

            return {
                user: "",
            };
        },

        methods: {
            async getPostUserInfos() {
                const token = window.localStorage.getItem("Token");
                
                const response = await fetch("http://localhost:3000/api/auth/user", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": "Bearer" + token,
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
    .user-pict img {
        border-radius: 10px;
    }

    .user-pict {
        margin: 15px;
        margin-bottom: 8px;
    }
</style>