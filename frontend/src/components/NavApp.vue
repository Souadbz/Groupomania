<template>
  <nav class="navbar navbar-light bg-light expand-lg">
    <a class="navbar-brand" href="#"
      ><img
        src="../assets/icon-left-font-monochrome-black.svg"
        width="130"
        height="60"
        alt="le logo de gropomania"
        title="logo groupomania"
        id="logo"
    /></a>

    <div>
      <ul class="nav">
        <li class="nav-item active">
          <router-link
            aria-label="voir son compte"
            title="voir son compte"
            type="button"
            class="nav-link"
            to="/account"
          >
            <i class="fas fa-user-cog"></i
          ></router-link>
        </li>
        <router-link class="nav-link" to="/admin">
          <li
            class="nav-item"
            v-if="isAdmin === 'true'"
            type="button"
            arial-label="voir son compte"
          >
            Amnistration
          </li>
        </router-link>
        <li class="nav-item">
          <button
            type="button"
            aria-label="Se déconnecter"
            title="Se déconnecter"
            class="btn btn-danger"
            id="btn-logout"
            @click="logout"
          >
            <i class="fas fa-power-off"></i>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavApp",

  data() {
    return {
      isAdmin: localStorage.getItem("isAdmin"),
    };
  },
  methods: {
    logout: function() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
#logo {
  margin-left: 1rem;
}
.fa-user-cog {
  font-size: 1.5em;
}
#btn-logout {
  margin: 0 0.5rem;
}
</style>
