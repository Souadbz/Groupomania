<template>
  <div class="container" id="content">
    <div><Nav /></div>
    <p class="title">Bienvenue sur Groupomania</p>
    <h1 class="title">Inscription</h1>
    <form class="form-row" @submit.prevent="dataSignup()" method="post">
      <div v-if="error" class="alert alert-danger" role="altert">
        {{ error }}
      </div>
      <div class="form-group col-md-6">
        <label for="firstName" class="white">Prénom</label>
        <input
          type="text"
          v-model="firstName"
          class="form-control"
          id="firstName"
          placeholder="Prénom"
          required
        />
      </div>
      <div class="form-group col-md-6">
        <label for="lastName" class="white">Nom</label>
        <input
          type="text"
          v-model="lastName"
          class="form-control"
          id="lastName"
          placeholder="Nom"
          required
        />
      </div>
      <div class="form-group col-md-6">
        <label for="email" class="white">Email</label>
        <input
          type="email"
          v-model="email"
          class="form-control"
          id="email"
          placeholder="email"
          required
        />
      </div>
      <div class="form-group col-md-6">
        <label for="password" class="white">Mot de passe*</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          id="password"
          placeholder="password"
          required
        />
      </div>
      <div class="row justify-content-center">
        <button
          type="submit"
          @click.prevent="dataSignup"
          class="btn btn-primary"
        >
          S'inscrire
        </button>
      </div>
    </form>
    <p class="info">
      *Votre mot de passe doit contenir des majuscules, des minisules, deux
      chiffres minimum et pas d'espaces
    </p>
    <p class="connect">
      Déjà inscrit ?
      <router-link
        to="/"
        class="toconnect"
        role="button"
        aria-label="se connecter"
        >Se connecter</router-link
      >
    </p>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import axios from "axios";
export default {
  name: "Signup",
  components: {
    Nav,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    dataSignup() {
      if (
        this.firstName !== "" ||
        this.lastName !== "" ||
        this.email !== "" ||
        this.password !== ""
      )
        axios
          .post("http://localhost:3000/api/auth/signup", {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("isAdmin", response.data.isAdmin);
            this.$router.push("/posts");
          })
          .catch(
            () => (this.error = "Veuillez remplir les bons coordonnées !")
          );
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
h1 {
  text-align: center;
  font-size: 2rem;
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
    background-color: red;
    border-color: red;
  }
  .btn:hover {
    border-color: green;
    background-color: green;
  }
}
.info {
  text-align: center;
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
