 <template>
  <nav class="navbar navbar-light bg-light navbar-expand-lg" id="navExpand">
  <a class="navbar-brand" href="#"><img src="../assets/icon-left-font-monochrome-black.svg" width="130" height="60" alt="le logo de gropomania" title="logo groupomania" id="logo" /></a>

  <div>
    <ul class="nav">
      <li class="nav-item active">
        <router-link class="nav-link" to="/profile">Profil</router-link>
      </li>
      <router-link class="nav-link" to="/admin">
      <li class="nav-item" v-if="isAdmin ==='true' " type="button" >Amnistration</li>
        </router-link>
      <li class="nav-item">
       <button type="button" class="btn btn-danger" @click="deconnexion">Déconnexion</button>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
//import { mapState } from "vuex";
export default {
  name: "NavApp",
/*  computed: {
  //  ...mapState(["user"])
  },*/

  data() {
    return {
      isAdmin: localStorage.getItem('isAdmin')
    }
  },
  methods: {
    deconnexion() {
      localStorage.clear();
      this.$router.push("/");
    }
  }


};
</script>

<style scoped lang='scss'>
#logo {
  margin-left: 1rem
}

@media (min-width: 992px){
#navExpend {
    flex-wrap: nowrap;
    justify-content: flex-end;
}
}


</style>