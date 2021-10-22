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
          <h2 class="card-title-profiles">1-Les comptes personnels</h2>
          <div>
            <div
              class=" card-profilesList"
              :key="user.id"
              v-for="user in users"
            >
              <ProfilesList
                v-bind="user"
                @deleteProfileUser="getDeleteUser()"
              />
            </div>
          </div>
          <h2 class="card-title-profiles">
            2-Publications
          </h2>
          <div>
            <!-- On récupére les posts des plus récents aux plus anciens -->
            <div
              :key="post.id"
              class="card-postsList"
              v-for="post in posts.slice().reverse()"
            >
              <div
                class="card-header"
                v-for="user in users.filter((user) => {
                  return user.id == post.userId;
                })"
                :key="user.id"
              >
                <img
                  v-if="user.imageUrl == null"
                  src="../assets/icon-profil.png"
                  alt="photo de profil provisoire"
                  title="photo de profil"
                  class="avatar"
                />
                <img
                  v-else
                  :src="user.imageUrl"
                  class="avatar"
                  alt="profile picture"
                  title="picture profile"
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
      users: [],
      user: {},
      posts: [],
      post: {},
    };
  },
  async created() {
    await axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
      .then((response) => {
        this.users = response.data.users;
        console.log(this.users);
      })
      .catch(function(error) {
        alert(error);
        console.log(error);
      });

    await axios
      .get("http://localhost:3000/api/posts", {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
      .then((response) => {
        this.posts = response.data.posts;
        console.log(this.posts);
      })
      .catch(function(error) {
        alert(error);
        console.log(error);
      });
  },

  methods: {
    async deletePost(id) {
      await axios
        .delete(`http://localhost:3000/api/admin/delete/posts/${id}`, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => {
          let i = this.posts.map((data) => data.id).indexOf(id);
          this.posts.splice(i, 1);
        });
    },
    getDeleteUser() {
      axios
        .get("http://localhost:3000/api/users", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          this.users = response.data.users;
          console.log(this.users);
        })
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
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
  color: #8b0000;
}
.card-profilesList,
.card-postsList {
  margin: 1rem auto;
}
.card-title-profiles {
  margin-left: 0.5rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  text-decoration: underline;
  background-color: #ffd700;
  border: 1px solid #ffd700;
}
.card-profilesList,
.card-postsList {
  display: flex;
  flex-direction: column;
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
