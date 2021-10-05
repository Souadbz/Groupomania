<template>
  <div class="container" id="content">
    <div><Nav /></div>
    <h1 class="title">Bienvenue sur Groupomania</h1>
    <h2 class="title">Votre Compte</h2>
    <form class="form-row" @submit.prevent="loginAccount()" method="post">
      <div v-if="error" class="alert alert-danger" role="altert">
        {{ error }}
      </div>
      <div class="form-group col-md-6">
        <label for="exampleFormControlInput1" class="white">Email</label>
        <input
          v-model="dataLogin.email"
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="email"
          required
        />
      </div>
      <div class="form-group col-md-6">
        <label for="password" class="white">Mot de passe</label>
        <input
          v-model="dataLogin.password"
          type="password"
          name="password"
          class="form-control"
          id="password"
          placeholder="password"
          required
        />
      </div>
      <div class="row justify-content-center">
        <button
          @click.prevent="loginAccount"
          type="submit"
          class="btn btn-primary"
        >
          Se connecter
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import axios from "axios";

export default {
  name: "Login",
  components: {
    Nav,
  },

  data() {
    return {
      dataLogin: {
        email: "",
        password: "",
      },
      error: "",
    };
  },

  methods: {
    loginAccount() {
      axios
        .post("http://localhost:3000/api/auth/login", this.dataLogin)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          this.$router.push("/posts");
        })
        .catch(() => (this.error = "email/password invalide !"));
    },
  },
};
</script>
<style scoped lang="scss">
.title {
  margin: 1rem;
  text-align: center;
  font-size: 2rem;
}
h1,
h2 {
  text-align: center;
}
h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.5rem;
}
form {
  max-width: 50rem;
  margin: auto;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 5px black;
  background-color: #122441;
  .col-md-6 {
    width: 100%;
  }
  .white {
    color: white;
  }
  .btn-primary {
    margin: 1rem;
    width: 50%;
    background-color: #8b0000;
    border-color: #8b0000;
  }
  .btn:hover {
    border-color: #006400;
    background-color: #006400;
  }
}
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
