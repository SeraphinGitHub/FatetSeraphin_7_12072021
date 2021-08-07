<template>
  <section class="flexCenter main">
    
    <figure class="logo">
      <img alt="logo" src="./assets/grp-black.png">
    </figure>
    
    <transition name="slideSide" id="popupTrans">
      <h3 class="flexCenter swap-pages-alert" v-show="swapPageAlert">{{ swapPageMsg }} <br> {{ isAdminMsg }}</h3>
    </transition>

    <LogoutBtn
      v-if="isSwapPages"
      @logPages="isLogPages = !isLogPages"
      @swapPages="isSwapPages = !isSwapPages"
      @swapPageAlert="swapPageAlert = !swapPageAlert"
      @swapPageMsg="swapPageMsg = $event"
    />

    <PagesLog v-if="isLogPages" @loading="isLoading = !isLoading"/>

    <PagesSwap v-if="isSwapPages"
      @loading="isLoading = !isLoading"
      @logPages="isLogPages = !isLogPages"
      @swapPages="isSwapPages = !isSwapPages"
      @swapPageAlert="swapPageAlert = !swapPageAlert"
      @swapPageMsg="swapPageMsg = $event"
      @adminPopup="adminPopup()"
      @userAdmin="isAdminMsg = $event"
    />

    <LoadingSpinner v-show="isLoading"/>

  </section>
</template>


<script>
  import LogoutBtn from "./components/LogoutBtn.vue"
  import PagesLog from "./components/Login_Page/PagesLog.vue"
  import PagesSwap from "./components/Pages_Swap/PagesSwap.vue"
  import LoadingSpinner from "./components/LoadingSpinner.vue"
 
  export default {
    created() {document.title = "Groupomania"},
    
    name: "App",
    
    components: {
      LogoutBtn,
      PagesLog,
      PagesSwap,
      LoadingSpinner,
    },

    data() {
      return {
        isLogPages: true,
        isSwapPages: false,
        isLoading: false,

        swapPageAlert: false,
        swapPageMsg: "",
        
        isAdminMsg: "",

        token: window.localStorage.getItem("Token"),
        popupDuration: 1000, // milliseconds
      }
    },

    beforeMount() {
      this.checkUserToken();
    },

    methods: {
      checkUserToken() {
        if(this.token) {
          this.isLogPages = false;
          this.isSwapPages = true;
        }
      },

      adminPopup() {
        const popup = document.querySelector(".swap-pages-alert");
        popup.classList.add("gold-popup");
        
        setTimeout(() => {
          this.isAdminMsg = "";
          popup.classList.remove("gold-popup")
        }, 3500);
      },
    },
  }
</script>


<style lang="scss">
  .logo {
    position: relative;
    margin: 12px;
    width: 100%;
    height: 30px;
  }

  .logo img {
    position: absolute;
    left: 0;
    object-fit: cover;
    width: 180px;
    height: 100%;
  }


  /* ======== Pages ======== */
  .pages-log,
  .pages-swap {
    position: relative;
    height: 500px;
    margin: 5px;
    margin-top: 0;
    margin-bottom: 20px;
  }

  /* ======== Pages Buttons ======== */
  .login-btn,
  .signin-btn,
  .actu-btn,
  .user-wall-btn,
  .profile-btn {
    position: absolute;
    height: 40px;
    top: -40px;
    border-radius: 20px 20px 0 0;

    font-family: "Roboto-Medium";
    line-height: 100%;
    font-weight: 400;
    font-size: 120%;
  }

  /* ======== Pages ======== */
  .login,
  .signin,
  .actu,
  .user-wall,
  .profile {
    position: absolute;
    height: 100%;
    width: 96% !important;
    top: 43px;
    left: 0;
  }

  .main {
    margin-bottom: 50px;
  }

  #app {   
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  body,
  ul,
  figure {
    margin: 0;
    padding: 0;
  }
  
  li {
    list-style: none;
  }
  
  .flexCenter {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  /* Raleway Medium */
  @font-face {
    font-family: "Raleway-Medium";
    font-display: auto;
    src: url("./fonts/Raleway-Medium.ttf");
  }

  /* Roboto Light */
  @font-face {
    font-family: "Roboto-Light";
    font-display: auto;
    src: url("./fonts/Roboto-Light.ttf");
  }

  /* Roboto Medium */
  @font-face {
    font-family: "Roboto-Medium";
    font-display: auto;
    src: url("./fonts/Roboto-Medium.ttf");
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Roboto-Medium";
    line-height: 100%;
    font-weight: 600;
    font-size: 130%;
  }

  p {
    font-family: "Raleway-Medium";
    line-height: 100%;
    font-weight: 400;
    font-size: 110%;
  }

  .btn {
    border: none;
    border-radius: 10px;
    height: 40px;
    width: 60%;
    background: linear-gradient(to bottom right, rgb(255, 217, 0), rgb(255, 94, 0));
    transition-duration: 0.5s;
    
    font-family: "Roboto-Medium";
    line-height: 100%;
    font-weight: 400;
    font-size: 130%;
  }

  .red-btn {
    background: linear-gradient(to bottom right, pink, red);
  }

  .green-btn {
    background: linear-gradient(to bottom right, greenyellow, rgb(0, 170, 0));
  }

  .cancel-btn {
    background: linear-gradient(to top left, rgb(255, 217, 0), rgb(255, 94, 0));
  }

  .btn:hover {
    box-shadow: rgb(50, 50, 50) 5px 5px 5px;
  }

  .btn:active {
    border-top: solid grey 5px;
    border-left: solid grey 5px;
    transition-duration: 0s;
  }

  /* --- Alert Message --- */
  .swap-pages-alert {
    z-index: 30;
    position: absolute;
    top: 70px;
    left: 50%;
    height: 90px;
    width: 70%;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0px;

    font-size: 120%;
    font-weight: 400;
    line-height: 140%;

    border-radius: 10px;
    transform: translateX(-50%);
    border: double green 5px;
    background: lightgreen;
  }

  .gold-popup {
    border: double rgb(255, 136, 0) 5px !important;
    background: rgb(255, 228, 76) !important;
  }


  // ****************************************
  // ==>      Transitions     <==
  // ****************************************
  
  // ========== Fade ==========
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.8s;
  }

  .fade-enter-from,
  .fade-leave-to { 
    opacity: 0%;
  }

  .fade-leave-from,
  .fade-enter-to {
    opacity: 100%;
  }


  // ========== Slide ==========
  .slideSide-enter-active {
    animation: slide 1s linear;
    animation-timing-function: ease-in-out;
  }

  .slideSide-leave-active {
    animation: slide 1s linear reverse;
    animation-timing-function: ease-in-out;
  }

  @keyframes slide {
    0% {transform: translateX(-200%)}
    50% {transform: translateX(-38%)}
    70% {transform: translateX(-54%)}
    90% {transform: translateX(-48%)}
    100% {transform: translateX(-50%)}
  }
</style>


<style>
  /* =============================================================================== */
  /*      Tablet Small Size       */
  /* =============================================================================== */
  @media screen and (min-width: 421px) and (max-width : 576px) {

    .logo {
      height: 40px;
    }

    .logo img {
      width: 220px;
    }

    .pages-log,
    .pages-swap {
      height: 660px;
      margin-bottom: 20px;
    }

    .login,
    .signin,
    .actu,
    .user-wall,
    .profile {
      width: 97% !important;
    }

    .login-btn,
    .signin-btn,
    .actu-btn,
    .user-wall-btn,
    .profile-btn {
      height: 50px;
      top: -50px;
      font-size: 130%;
    }

    input {
      height: 40px;
      font-size: 110%;
    }

    .btn {
      height: 45px;
      width: 40%;
      font-size: 140%;
    }
  }


  /* =============================================================================== */
  /*      Tablet Big Size       */
  /* =============================================================================== */
  @media screen and (min-width: 577px) and (max-width : 768px) {

    .logo {
      height: 40px;
    }

    .logo img {
      width: 240px;
    }

    .pages-log,
    .pages-swap {
      height: 770px;
      margin-bottom: 20px;
    }

    .login,
    .signin,
    .actu,
    .user-wall,
    .profile {
      width: 98% !important;
    }

    .login-btn,
    .signin-btn,
    .actu-btn,
    .user-wall-btn,
    .profile-btn {
      height: 50px;
      top: -50px;
      font-size: 140%;
    }

    .signin-form {
      height: 90% !important;
    }

    .form-alert {
      font-size: 110%;
    }

    .field-container {
      width: 70% !important;
    }

    label {
      font-size: 120%;
    }

    input {
      height: 40px;
      font-size: 120%;
    }

    .btn {
      height: 50px;
      width: 40%;
      font-size: 160%;
    }
  }


  /* =============================================================================== */
  /*      Laptop Small Size       */
  /* =============================================================================== */
  @media screen and (min-width: 769px) and (max-width : 992px) {
    
    .logo {
      height: 50px;
    }

    .logo img {
      width: 270px;
      margin-left: 50px;
    }

    .pages-log,
    .pages-swap {
      height: 900px;
      margin-bottom: 30px;
    }

    .login,
    .signin,
    .actu,
    .user-wall,
    .profile {
      width: 98% !important;
    }

    .login-btn,
    .signin-btn,
    .actu-btn,
    .user-wall-btn,
    .profile-btn {
      height: 50px;
      top: -50px;
      font-size: 140%;
    }

    .signin-form {
      height: 90% !important;
    }

    .form-alert {
      font-size: 110%;
    }

    .field-container {
      width: 70% !important;
    }

    label {
      font-size: 120%;
    }

    input {
      height: 40px;
      font-size: 120%;
    }

    .btn {
      height: 50px;
      width: 40%;
      font-size: 160%;
    }
  }


  /* =============================================================================== */
  /*      Laptop Big Size      */
  /* =============================================================================== */
  @media screen and (min-width: 993px) and (max-width : 1366px) {
   
   .logo {
      position: absolute;
      height: 50px;
      width: 90%;
      margin: 0px;
      top: 15px;
      left: 1%;
    }

    .logo img {
      width: 20%;
    }

    .pages-log,
    .pages-swap {
      height: 850px;
      top: 70px;
      margin-bottom: 60px;
    }

    .login,
    .signin,
    .actu,
    .user-wall,
    .profile {
      width: 95% !important;
      top: 0px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 20px !important;
    }

    .login-btn,
    .signin-btn,
    .actu-btn,
    .user-wall-btn,
    .profile-btn {
      height: 60px;
      width: 19%;
      top: -60px;
      font-size: 150%;
    }

    .actu-btn {
      left: 19% !important;
    }

    .profile-btn {
      right: 19% !important;
    }

    .signin-form {
      height: 90% !important;
    }

    .form-alert {
      font-size: 110%;
    }

    .field-container {
      width: 70% !important;
    }

    label {
      font-size: 120%;
    }

    input {
      height: 40px;
      font-size: 120%;
    }

    .btn {
      height: 45px;
      width: 40%;
      font-size: 160%;
    }
  }


  /* =============================================================================== */
  /*      Screen Normal Size && Over      */
  /* =============================================================================== */
  @media screen and (min-width: 1367px) {
    
    .logo {
      position: absolute;
      height: 50px;
      width: 75%;
      margin: 0px;
      top: 15px;
      left: 1%;
    }

    .logo img {
      width: 20%;
    }

    .pages-log,
    .pages-swap {
      height: 1000px;
      top: 75px;
      margin-bottom: 60px;
    }

    .login,
    .signin,
    .actu,
    .user-wall,
    .profile {
      width: 95% !important;
      top: 0px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 20px !important;
    }

    .login-btn,
    .signin-btn,
    .actu-btn,
    .user-wall-btn,
    .profile-btn {
      height: 65px;
      width: 19%;
      top: -65px;
      font-size: 160%;
    }

    .actu-btn {
      left: 19% !important;
    }

    .profile-btn {
      right: 19% !important;
    }

    .signin-form {
      height: 90% !important;
    }

    .form-alert {
      font-size: 110%;
    }

    .field-container {
      width: 70% !important;
    }

    label {
      font-size: 120%;
    }

    input {
      height: 40px;
      font-size: 120%;
    }

    .btn {
      height: 45px;
      width: 40%;
      font-size: 160%;
    }
  }
</style>