<template>
<div class="home">
<Login/>
 <p class="connect">
      Vous n'avez pas un compte ?
      <router-link
        to="/signup"
        class="toconnect"
        role="button"
        aria-label="s'inscrire"
        >S'inscrire</router-link>
    </p>
    <div>
      <Footer />
    </div>
</div>

</template>

<script>
import Footer from "../components/Footer"
import Login from "../components/Login"

export default {
  name: "Home",
  components: {
   Login,
   Footer,  
  },
data() {
        return {
            userId: localStorage.getItem("userId")
        }
    },

}
</script>
<style scoped lang="scss">
.connect{
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}
@media screen and(max-width: 340){
  .connect{
    font-size: 1rem;
  }
}
.toconnect{
  cursor: pointer;
  text-decoration: none;
  color: red;

}
</style>