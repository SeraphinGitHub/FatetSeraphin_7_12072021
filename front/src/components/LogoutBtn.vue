<template>

    <button class="flexCenter btn red-btn logout-btn" @click.prevent="logout()" type="submit">
        <figure class="flexCenter">
            <i class="fas fa-power-off"></i>
        </figure>
    </button>

</template>


<script>
    export default {
        name: "LogoutBtn",

        props: {
            isLogPages: Boolean,
            isSwapPages: Boolean,
            swapPageAlert: Boolean,
            swapPageMsg: String,
            popupDuration: Number,
        },

        methods: {
            async logout() {
                const token = window.localStorage.getItem("Token");
                
                const response = await fetch("http://localhost:3000/api/auth/logout", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "POST",
                });
                
                try {
                    const resObj = await response.json();
                    window.localStorage.clear();

                    this.$emit("logPages");
                    this.$emit("swapPages");
                    this.$emit("swapPageAlert");
                    this.$emit("swapPageMsg", resObj.message);

                    const popup = document.querySelector(".swap-pages-alert");
                    popup.classList.add("red-popup");

                    setTimeout(() => this.$emit("swapPageAlert"), this.$parent.popupDuration * 2 );
                    setTimeout(() => popup.classList.remove("red-popup"), this.$parent.popupDuration * 3);
                }
                catch(error) { console.log("error", error) }
            }
        }
    }
</script>


<style>
    .red-popup {
        border-color: red !important;
        background: rgb(255, 210, 210) !important;
    }
</style>


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



    /* =============================================================================== */
    /*      Tablet Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 421px) and (max-width : 576px) {
        .logout-btn {
            height: 45px;
            width: 45px;
            top: 8px;
        }
    }


    /* =============================================================================== */
    /*      Tablet Big Size       */
    /* =============================================================================== */
    @media screen and (min-width: 577px) and (max-width : 768px) {

        .logout-btn {
        height: 50px;
        width: 50px;
        top: 5px;
        }
    }


    /* =============================================================================== */
    /*      Laptop Small Size       */
    /* =============================================================================== */
    @media screen and (min-width: 769px) and (max-width : 992px) {

        .logout-btn {
        height: 55px;
        width: 55px;
        top: 8px;
        }
    }


    /* =============================================================================== */
    /*      Laptop Big Size      */
    /* =============================================================================== */
    @media screen and (min-width: 993px) and (max-width : 1366px) {

        .logout-btn {
            height: 50px;
            width: 100px;
            top: 10px;
            right: 5%;
            border-radius: 13px;
        }
    }


    /* =============================================================================== */
    /*      Screen Normal Size && Over      */
    /* =============================================================================== */
    @media screen and (min-width: 1367px) {

        .logout-btn {
            height: 50px;
            width: 150px;
            top: 13px;
            right: 5%;
            border-radius: 13px;
        }
    }
</style>