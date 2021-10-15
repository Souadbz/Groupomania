<template>
  <div class="blocComment">
    <form class="mt-3">
      <input
        v-bind="$attrs"
        class="content"
        name="content"
        ref="content"
        placeholder="Tapez un commentaire !"
      />
      <span id="btn-publication">
        <button
          type="submit"
          class="btn btn-primary"
          v-bind="$attrs"
          @click="postComment()"
          ref="comment"
        >
          <i class="far fa-paper-plane"></i>
        </button>
      </span>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "createComment",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      postId: "",
      content: "",
      comment: "",
    };
  },
  methods: {
    postComment() {
      axios
        .post("http://localhost:3000/api/comments", {
          userId: localStorage.getItem("userId"),
          postId: this.$refs.comment.id,
          content: this.$refs.content.value,

          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style scoped lang="css">
.blocComment input {
  border: none;
}
@media screen and (min-width: 768px) {
  input {
    width: 20.5rem;
  }
}
@media screen and (max-width: 410px) {
  input {
    width: 8.5rem;
  }
}
input:focus {
  outline: none;
}
#btn-publication {
  display: block;
  text-align: end;
}
</style>
