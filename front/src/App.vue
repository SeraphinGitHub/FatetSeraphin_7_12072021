<template>
  <div class="flexCenter">

    <img class="logo" alt="logo" src="./assets/grp-black.png">
    <Login/>
    <PagesSwap/>

  </div>
</template>


<script>
  // import Login from "./components/Login"
  import PagesSwap from './components/PagesSwap.vue'
 
  export default {
    created() {document.title = "Groupomania"},
    
    name: "App",
    
    components: {
      // Login,
      PagesSwap,
    }
  }
</script>


<style>
  #app {   
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  /* Raleway Medium */
  @font-face {
    font-family: "Raleway-Medium";
    font-display: auto;
    src: url("./fonts/Raleway-Medium.ttf");
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

  .flexCenter {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
  }
  
  li {
    list-style: none;
  }

  .btn {
    border: none;
    border-radius: 10px;
    height: 50px;
    width: 80%;
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

  .logo {
    object-fit: cover;
    width: 250px;
    height: 50px;
  }
</style>
