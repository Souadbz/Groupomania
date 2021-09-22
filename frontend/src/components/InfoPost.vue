<template>
  <div>
    <div class="card" :key="post.id" v-for="post in posts.slice().reverse()">
      <div
        v-for="user in users.filter((user) => {
          return user.id == post.userId;
        })"
        :key="user.id"
      >
        <img :src="user.imageUrl" class="avatar" alt="profile picture" />
        <strong>{{ user.firstName }} {{ user.lastName }}</strong>
      </div>
      <div v-if="post.imageUrl">
        <img class="mw-75 picture-post" :src="post.imageUrl" alt="post" />
      </div>
      <p v-if="post.content !== 'null'">{{ post.content }}</p>
      <span>
        <button
          class="mb-3 btn btn-secondary rounded"
          v-bind="post"
          @click.prevent="deletePost(post.id)"
        >
          supprimer
        </button>
      </span>
      <div v-if="comments">
        <div
          v-for="comment in comments.filter((comment) => {
            return comment.postId == post.id;
          })"
          :key="comment.id"
          class="bg-light rounded"
        >
          <p class="mb-2">
            "{{ comment.content }}"
            <span
              v-for="user in users.filter((user) => {
                return user.id == comment.userId;
              })"
              :key="user.id"
            >
              par
              <strong>{{ user.firstName }} {{ user.lastName }}</strong>
            </span>
          </p>
          <span v-if="userId == user.id">
            <button
              class="btn btn-danger"
              @click.prevent="deleteComment(comment.id)"
            >
              Effacer
            </button>
          </span>
        </div>
      </div>
      <CreateComment v-bind="post" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CreateComment from "../components/CreateComment.vue";
export default {
  name: "infoPost",
  components: {
    CreateComment,
  },
  created() {
    axios
      .get("http://localhost:3000/api/posts", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
      .then((res) => {
        this.posts = res.data.posts;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:3000/api/comments", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
      .then((res) => {
        this.comments = res.data;
      })
      .catch((err) => {
        console.log(err + "Utilisateur inconnu ou commentaires indisponibles");
      });
    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
      .then((res) => {
        this.users = res.data.users;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      posts: [],
      post: {},
      comments: [],
      comment: {},
      content: {},
      userId: localStorage.getItem("userId"),
      users: [],
      user: {
        id: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
      },
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    deletePost(id) {
      axios
        .delete(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => this.$router.go());
    },
    /*deleteComment(id) {
            axios
                .delete(`http://localhost:3000/api/comments/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + this.token
                        }
                    })
                .then(() => this.$router.go())
        }*/
  },
};
</script>

<style scoped lang="scss">
.card {
  width: 50%;
  margin: auto;
  float: none;
  margin-top: 1rem;
}
.avatar {
  width: 2rem;
  height: 2rem;
}
.picture-post {
  width: 5rem;
  height: 5rem;
}
</style>
