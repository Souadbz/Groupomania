<template>
  <nav class="navbar navbar-light bg-light expand-lg">
    <a class="navbar-brand" href="#" alt="logo du site" title="logo du site"
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
            alt="voir son compte"
            title="voir son compte"
            type="button"
            class="nav-link"
            to="/account"
          >
            <i class="fas fa-user"></i
          ></router-link>
        </li>
        <router-link
          v-if="isAdmin == 'true'"
          class="nav-link"
          aria-label="Gérer le site groupomania"
          alt="Gérer le site goupomania"
          title="Gérer le site goupomania"
          type="button"
          to="/administrateur"
        >
          <li class="nav-item" type="button" arial-label="voir son compte">
            Admin <i class="fas fa-cogs"></i>
          </li>
        </router-link>
        <li class="nav-item">
          <button
            type="button"
            aria-label="Se déconnecter"
            alt="se déconnecter"
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
