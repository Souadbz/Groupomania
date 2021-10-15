<template>
  <div>
    <!-- On récupére les posts des plus récents aux plus anciens -->
    <div class="card" :key="post.id" v-for="post in posts.slice().reverse()">
      <div
        class="card-header"
        v-for="user in users.filter((user) => {
          return user.id == post.userId;
        })"
        :key="user.id"
      >
        <img
          :src="user.imageUrl || 'https://picsum.photos/300/200?random'"
          class="avatar"
          title="photo de profil"
          alt="profile picture"
        />
        <span class="card-title">{{ user.firstName }} {{ user.lastName }}</span>
      </div>
      <p v-if="post.content !== 'null'" class="card-text">{{ post.content }}</p>
      <div v-if="post.imageUrl">
        <img
          class="card-img"
          :src="post.imageUrl"
          alt="image de la publication"
          title="image du post d'un utilisateur"
        />
      </div>
      <span class="btn-end" v-if="user.id == post.userId">
        <button
          class=" btn btn-danger"
          v-bind="post"
          @click.prevent="deletePublication(post.id)"
        >
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </span>
      <button class="btn btn-primary" @click="showComments = !showComments">
        Commentaires <i class="fas fa-comment"></i>
      </button>
      <div v-if="showComments">
        <div v-if="comments">
          <div
            class="card-comment"
            v-for="comment in comments.filter((comment) => {
              return comment.postId == post.id;
            })"
            :key="comment.id"
          >
            <p
              v-for="user in users.filter((user) => {
                return user.id == comment.userId;
              })"
              :key="user.id"
            >
              <img
                v-if="user.imageUrl == null"
                :src="'https://picsum.photos/300/200?random'"
                alt="photo de profil provisoire"
                class=" rouned-circle mr-1 avatar"
              />
              <img
                v-else
                :src="user.imageUrl"
                class="avatar"
                alt="profile picture"
              />
              <span class="card-title"
                >{{ user.firstName }} {{ user.lastName }}</span
              >
            </p>
            <p class="card-description comment">{{ comment.content }}</p>
            <div v-if="comment.userId == user.id" id="btn-trash">
              <button
                class=" btn-secondary "
                @click.prevent="deleteComment(comment.id)"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <CreateComment v-bind="post" />
      </div>
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
  data() {
    return {
      showComments: false,
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      users: [],
      user: {
        id: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
      },
      post: {},
      posts: [],
      comment: {},
      comments: [],
    };
  },
  async created() {
    await axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
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
          "Content-Type": "application/json",
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

    await axios
      .get("http://localhost:3000/api/comments", {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.comments = response.data;
        console.log(this.comments);
      })
      .catch(function(error) {
        alert(error);
        console.log(error);
      });
  },

  methods: {
    async deletePublication(id) {
      let confirmDeletePost = confirm(
        "voulez-vous vraiment supprimer votre publication ?"
      );
      if (confirmDeletePost == true) {
        await axios
          .delete(`http://localhost:3000/api/posts/${id}`, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            let i = this.posts.map((data) => data.id).indexOf(id);
            this.posts.splice(i, 1);
          });
      } else {
        return;
      }
    },
    async deleteComment(id) {
      let confirmDeleteComment = confirm(
        "voulez-vous vraiment supprimer votre commentaire ?"
      );
      if (confirmDeleteComment == true) {
        await axios
          .delete(`http://localhost:3000/api/comments/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            let i = this.comments.map((data) => data.id).indexOf(id);
            this.comments.splice(i, 1);
          });
      } else {
        return;
      }
    },
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
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.5rem;
  border-radius: 50%;
}
.card-text {
  margin: 1rem;
}
.card-title {
  font-weight: 600;
  color: blue;
}
.card-paragraph {
  height: 1.7rem;
  margin-bottom: 0;
  text-align: center;
  color: #fff;
  background-color: #0d6efd;
}
.btn-end {
  display: block;
  text-align: end;
}
.card-comment {
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid #ced4da;
}
#btn-trash {
  text-align: end;
}
input {
  margin-bottom: 0;
}
.comment {
  margin-left: 0.5rem;
}
</style>
