<template>
  <div>
    <NavApp />
    <div class="container">
      <div class="card">
        <h1 class="card-title">Administration du site</h1>
        <p class="card-description">
          Vous avez la possiblité de supprimer les utilisateurs et les
          publications pour non-respect du règlement de la communauté
        </p>
        <p class="card-description description">FAITES LE BON CHOIX</p>
        <div class="card-btn">
          <button
            class="btn btn-secondary btn-profils"
            @click="profilesUsers = !profilesUsers"
          >
            Comptes
          </button>
          <div v-if="profilesUsers">
            <div
              class=" card-profilesList"
              v-for="user in users"
              :key="user.id"
            >
              <ProfilesList v-bind="user" />
            </div>
          </div>
          <button
            class="btn btn-secondary btn-posts"
            @click="postUsers = !postUsers"
          >
            Publications
          </button>
          <div v-if="postUsers">
            <div
              class="card-postsList"
              v-for="post in posts.slice().reverse()"
              :key="post.id"
            >
              <div
                class="card-header"
                v-for="user in users.filter((user) => {
                  return user.id == post.userId;
                })"
                :key="user.id"
              >
                <img
                  :src="user.imageUrl"
                  class="avatar"
                  alt="profile picture"
                />
                <span class="card-title2"
                  >{{ user.firstName }} {{ user.lastName }}</span
                >
              </div>
              <p v-if="post.content !== 'null'" class="card-text">
                {{ post.content }}
              </p>
              <div v-if="post.imageUrl">
                <img class="card-img" :src="post.imageUrl" alt="post" />
              </div>
              <button
                class="btn btn-danger"
                id="btn-card"
                v-bind="post"
                @click.prevent="deletePost(post.id)"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="retour">
      <router-link to="/posts"
        ><i class="fas fa-hand-point-left"></i> Retour à l'Acceuil</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavApp from "../components/NavApp.vue";
import ProfilesList from "../components/ProfilesList.vue";

export default {
  name: "Administrateur",
  components: {
    NavApp,
    ProfilesList,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      postUsers: false,
      profilesUsers: false,
      users: [],
      user: {},
      posts: [],
      post: {},
      // content: {},
    };
  },
  async created() {
    await axios
      .get("http://localhost:3000/api/users", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
      .then((response) => {
        this.users = response.data.users;
        console.log(this.users);
      })
      .catch((error) => {
        console.log(error);
      });
    await axios
      .get("http://localhost:3000/api/posts", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
      .then((response) => {
        this.posts = response.data.posts;
        console.log(this.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    async deletePost(id) {
      await axios
        .delete(`http://localhost:3000/api/admin/delete/posts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => this.$router.go(0));
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  margin-top: 3rem;
}
.card-title {
  margin: 1.2rem;
  font-size: 2rem;
  background-color: #ffc0cb;
  text-align: center;
}
.card-btn {
  display: flex;
  flex-direction: column;
}
.card-description {
  text-align: center;
  font-weight: 600;
}
.description {
  margin: 1rem 0;
  color: red;
}
.btn-profils,
.btn-posts,
.card-profilesList,
.card-postsList {
  margin: 1rem auto;
}
.card-profilesList,
.card-postsList {
  display: flex;
  flex-direction: column;
}
a {
  display: block;
  text-align: center;
  margin: 1.5rem;
  text-decoration: none;
  font-weight: 600;
}
.card-text {
  margin: 1rem;
}
.card-title2 {
  margin: 1rem;
  font-weight: 600;
  color: blue;
}
#btn-card {
  width: 50%;
  margin: 1rem auto;
}
</style>
