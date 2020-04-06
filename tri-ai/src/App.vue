<template>
  <div id="app" class="container mx-auto px-4">
    <div class="icon flex items-center">
      <img src="@/assets/logo.svg" alt="logo" />
      <p class="ml-2 text-yellow-600 text-xl">Tri-AI</p>
    </div>

    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background-color: #2d3748;
  /* background-image: url('https://res.cloudinary.com/busayyyo/image/upload/v1585926477/tri-ai/undraw_nakamoto_2iv6_1.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat; */
}
</style>
