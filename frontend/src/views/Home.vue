<template>
  <div class="home">
    <Login />
    <h3 class="connect">
      Vous n'avez pas un compte ?
      <router-link
        to="/signup"
        class="toconnect"
        role="button"
        aria-label="s'inscrire"
        >S'inscrire</router-link
      >
    </h3>
  </div>
</template>

<script>
import Login from "../components/Login";

export default {
  name: "Home",
  components: {
    Login,
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
    };
  },
};
</script>
<style scoped lang="scss">
.connect {
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}
@media screen and(max-width: 340) {
  .connect {
    font-size: 1rem;
  }
}
.toconnect {
  cursor: pointer;
  text-decoration: none;
  color: red;
}
</style>
