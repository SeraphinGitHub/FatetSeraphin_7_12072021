<template>
  <section class="flexCenter">
    
    <figure class="logo">
      <img alt="logo" src="./assets/grp-black.png">
    </figure>
    
    <LogoutBtn/>
    <PagesLog/>
    <!-- <PagesSwap/> -->

  </section>
</template>


<script>
  import LogoutBtn from "./components/LogoutBtn.vue"
  import PagesLog from './components/Login_Page/PagesLog.vue'
  // import PagesSwap from './components/Pages_Swap/PagesSwap.vue'
 
  export default {
    created() {document.title = "Groupomania"},
    
    name: "App",
    
    components: {
      LogoutBtn,
      PagesLog,
      // PagesSwap,
    }
  }
</script>


<style>
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

  /* ======== Pages Log => Buttons ======== */
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

  /* ======== Pages Log => Pages ======== */
  .login,
  .signin,
  .actu,
  .private-wall,
  .profile {
    position: absolute;
    height: 90%;
    width: 96% !important;
    top: 43px;
    left: 0;
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

  .btn:hover {
    box-shadow: gray 5px 5px 8px;
  }

  .btn:active {
    border-top: solid grey 5px;
    border-left: solid grey 5px;
    transition-duration: 0s;
  }
</style>
