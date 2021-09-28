<template>
  <div id="profile">
    <NavApp />
    <ProfileUser />
    <div class="retour">
      <router-link to="/posts"> Retour à l'Acceuil</router-link>

      <Footer />
    </div>
  </div>
</template>

<script>
import ProfileUser from "../components/ProfileUser.vue";
import NavApp from "../components/NavApp.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Profile",
  components: {
    NavApp,
    ProfileUser,
    Footer,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
    };
  },
};
</script>
<style scoped lang="scss">
a {
  display: block;
  text-align: center;
  text-decoration: none;
}
</style>
