<template>
    <figure class="flexCenter user-pict">

        <img class="circle-user-img" :src="user.imageUrl" alt="photo du profile">

        <figcaption class="flexCenter user-infos">
            <h2>{{ user.userName }}</h2>
            <p>{{ user.position }}</p>
            <p>{{ user.department }}</p>
        </figcaption>

    </figure>
</template>


<script>
    export default {
        name: "UserCaption",

        props: {
            userId: Number,
            user: Object,
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