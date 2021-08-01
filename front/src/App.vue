<template>
  <section class="flexCenter main">
    
    <figure class="logo">
      <img alt="logo" src="./assets/grp-black.png">
    </figure>
    
    <transition name="slideSide" id="popupTrans">
      <h3 class="flexCenter swap-pages-alert" v-show="swapPageAlert">{{ swapPageMsg }}</h3>
    </transition>

    <LogoutBtn/>
    <PagesLog v-show="isLogPages"/>
    <PagesSwap v-show="isSwapPages"/>
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

        publications: {},

        popupDuration: 1000, // milliseconds
      }
    },

    // beforeMount() {
    //   this.getAllPost();
    // },

    methods: {
      async getAllPost() {
        const token = window.localStorage.getItem("Token");

        const allPosts = await fetch("http://localhost:3000/api/publish", {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              "Authorization": "Bearer" + token
            },
            method: "GET",
        })
        .then(response => response.json())
        .then(data => { return data });

        this.publications = allPosts.sort().reverse();
        this.isLoading = false;
      },
    }
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
  .pages-container {
    position: relative;
    height: 500px;
    margin: 5px;
    margin-top: 0;
  }

  /* ======== Pages Buttons ======== */
  .login-btn,
  .signin-btn,
  .actu-btn,
  .private-wall-btn,
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
  .private-wall,
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
    background: linear-gradient(to top left, rgb(255, 94, 0), rgb(255, 217, 0));
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

  .btn:hover {
    box-shadow: gray 5px 5px 8px;
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
    top: 50px;
    left: 50%;
    height: 90px;
    width: 77%;
    margin: 0px;

    font-size: 120%;
    font-weight: 400;
    line-height: 140%;

    border-radius: 10px;
    border: double green 5px;
    transform: translateX(-50%);
    background: lightgreen;
  }


  // ****************************************************************************************************
  // ==>      Transitions     <==
  // ****************************************************************************************************
  
  // ========== Fade ==========
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.5s;
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
