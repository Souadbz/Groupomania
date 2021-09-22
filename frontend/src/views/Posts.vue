<template>
  <div>
   <NavApp />
    <AddPost />
    <InfoPost/>
        <Footer />
  </div>
</template>

<script>

import NavApp from "../components/NavApp.vue"
import Footer from "../components/Footer"
import AddPost from "../components/AddPost.vue";
import InfoPost from "../components/InfoPost.vue";



export default {
  name: "Posts",
 components: {
    NavApp, 
    AddPost,
    InfoPost,
     Footer
    
  },
 
  data() {
    return {
      Posts: []
     }
     
     },
  } 
     
</script>

<style lang="scss">

</style>