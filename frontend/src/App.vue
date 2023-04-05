<script>
import MainLayout from "@/layouts/MainLayout.vue";
// import {parseCookie} from "@/utils/myFunctions";
export default {
  components: {MainLayout},
  setup() {

    if (process.env.NODE_ENV === 'development') {
      // document.cookie = "API=" + import.meta.env.VITE_API_KEY + ";";
      // console.log(parseCookie(import.meta.env.VITE_COOKIE_STRING));
    }

  }
};

</script>

<template>
  <main-layout/>
</template>

<style>
</style>
