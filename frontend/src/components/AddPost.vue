<template>
  <div class="card">
    <div class="card-body col d-flex justify-content-center">
      <main>
        <form
          class="container text-center form-group"
          @submit.prevent="addPost()"
          enctype="multipart/form-data"
          method="post"
        >
          <div class="card-textarea">
            <label for="content" class="form-label form-control-sm"
              >Exprimez vos émotions
            </label>
            <textarea
              class="form-control form-control-sm "
              rows="5"
              cols="20"
              type="text"
              v-model="content"
              placeholder="Postez!"
              name="content"
              id="content"
              required
            ></textarea>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <label for="image" class="form-control-label"
              ><strong>Choisissez votre image</strong></label
            ><br />
            <input
              type="file"
              class="form-control"
              name="image"
              id="image"
              ref="image"
              aria-describedby="image"
              @change="selectFile()"
            />
          </div>
          <div class="card-body mx-auto">
            <button
              type="submit"
              id="btnP"
              class="btn btn-primary"
              @click.prevent="addPost"
            >
              publiez
            </button>
          </div>
        </form>
      </main>
    </div>
    <div v-if="error" class="alert alert-danger" role="altert" id="msgError">
      {{ error }}
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AddPost",

  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      image: "",
      content: "",
      imageUrl: "",
      error: "",
    };
  },
  methods: {
    selectFile() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    /*** Créer une nouvelle publication ***/
    async addPost() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("content", document.getElementById("content").value);
      console.log("test", formData.get("image"));
      console.log("test", formData.get("content"));

      if (formData.get("content") == "") {
        this.error = "Message vide";
      } else {
        await axios
          .post("http://localhost:3000/api/posts", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            this.$emit("postResponse");
          })
          .catch((error) => (this.msgError = error));
        this.image = "";
        this.content = "";
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
.card-textarea {
  margin-bottom: 1rem;
  margin-right: auto;
  margin-left: auto;
}
@media screen and (max-width: 523px) {
  .card-textarea {
    width: 50%;
  }
}
.form-label {
  font-weight: 600;
}

@media screen and (min-width: 768px) {
  #btnP {
    margin-left: 5rem;
  }
}
</style>
