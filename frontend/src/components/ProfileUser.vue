<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="col-12 col-gestion">
          <h1 class="my-2 btn btn-block btn-info font-weight-bold">
            Gérer votre compte :
          </h1>
        </div>
        <section class="row">
          <div class="col-12">
            <div
              class="card bg-light my-3 class=center-block"
              style="float:none;"
            >
              <div class="card-header">
                <div class="row justify-content-around" v-bind="user">
                  <div class="card-header-info">Vos informations</div>
                  <p class="text">
                    Prénom:
                    <span class="text_color">{{ user.firstName }}</span>
                  </p>
                  <p class="text">
                    Nom:
                    <span class="text_color">{{ user.lastName }}</span>
                  </p>
                  <p class="text">
                    Email:
                    <span class="text_color">{{ user.email }}</span>
                  </p>
                </div>
              </div>

              <div>
                <form
                  id="form"
                  class="mt-5"
                  enctype="multipart/form-data"
                  @submit.prevent="updatePicture()"
                >
                  <div class="card-body text-center" v-bind="user">
                    <div
                      v-if="user.imageUrl == null"
                      class="dropdown text-center"
                    >
                      <img
                        :src="'https://picsum.photos/300/200?random'"
                        alt="photo de profil"
                        class=" rouned-circle mr-1 avatar"
                      />
                    </div>
                    <div v-else class="dropdown text-center">
                      <img
                        :src="user.imageUrl"
                        alt="photo de profil"
                        class=" rouned-circle mr-1 avatar"
                        id="avatar"
                      />
                    </div>
                  </div>
                  <div class="mx-auto w-50 mb-3">
                    <label for="image"></label>
                    <input
                      type="file"
                      class="form-control-file form-control-sm"
                      name="image"
                      id="image"
                      accept="image/*"
                      ref="image"
                      @change="filePictureToUpload()"
                    />
                    <div class="card-body mx-auto">
                      <button
                        type="submit"
                        class="form-control btn btn-primary"
                        name="pictueUpdate"
                        id="pictureUpdate"
                        @click.prevent="updatePicture"
                      >
                        Confirmer
                      </button>
                    </div>
                  </div>
                </form>
                <div>
                  <button
                    class="form-control btn btn-danger"
                    v-bind="user"
                    @click.prevent="deleteMyAccount(user.id)"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileUser",
  data() {
    return {
      user: {
        id: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
        firtName: "",
        lastName: "",
        email: "",
        imageUrl: "",
      },
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      image: "",
    };
  },

  created() {
    axios
      .get(`http://localhost:3000/api/users/${this.userId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
      .then((response) => {
        this.user = response.data.user;
        console.log(this.user);
        this.image = response.data.image;
      });
  },

  methods: {
    filePictureToUpload() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    updatePicture() {
      const formData = new FormData();
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("image", this.image);
      formData.append("imageUrl", this.imageUrl);

      console.log(this.image);
      console.log(this.imageUrl);
      console.log("test-récup", formData.get("imageUrl"));

      axios
        .put(`http://localhost:3000/api/users/${this.userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "multipart/form-data",
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          this.user = response.data.user;
          this.image = response.data.image;
        });
    },
    deleteMyAccount(id) {
      axios
        .delete(`http://localhost:3000/api/users/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => {
          localStorage.clear();
          this.$router.push("/");
        });
    },
  },
};
</script>

<style>
.col-gestion {
  text-align: center;
}
.card-header-info {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}
.avatar {
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  object-fit: cover;
}
.text {
  padding-top: 0.5rem;
  font-weight: bold;
}
.text_color {
  margin-left: 0.5rem;
  color: blue;
  font-weight: 400;
}
</style>
