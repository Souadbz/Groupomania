<template>
  <div>
    <NavApp />
    <ProfileUser />
    <div class="retour">
      <router-link
        to="/posts"
        alt="retour à la page acceuil"
        title="retour à la page acceuil"
        ><i class="fas fa-hand-point-left"></i> Retour à l'Acceuil</router-link
      >
    </div>
  </div>
</template>

<script>
import ProfileUser from "../components/ProfileUser.vue";
import NavApp from "../components/NavApp.vue";
export default {
  name: "Profile",
  components: {
    NavApp,
    ProfileUser,
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
