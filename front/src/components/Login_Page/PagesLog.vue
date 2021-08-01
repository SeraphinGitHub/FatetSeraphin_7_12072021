<template>
    <section class="flexCenter pages-container">

        <Login/>
        <Signin/>

    </section>
</template>


<script>    
    import Login from "./Login.vue"
    import Signin from "./Signin.vue"

    export default {
        name: "PagesLog",
        
        components: {
            Login,
            Signin,
        },    
    }
</script>


<style>
    .field-container {
        position: relative;
        width: 80% !important;
    }

    /* ======== Pages Log => Buttons ======== */
    .login-btn,
    .signin-btn {
        width: 49%;
    }

    /* ========== Input Fields ========== */
    label,
    input {
        width: 100%;
    }

    label {
        text-align: left;

        font-family: "Roboto-Medium";
        line-height: 100%;
        font-weight: 600;
        font-size: 100%;
    }

    input {
        text-align: left;
        height: 30px;
        margin-top: 3px;
        padding-left: 15px;
        border-radius: 8px;
        border: solid black 1px;

        font-family: "Roboto-Light";
        line-height: 100%;
        font-weight: 600;
        font-size: 90%;
    }
</style>