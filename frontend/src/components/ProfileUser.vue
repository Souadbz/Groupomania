<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="col-12 col-gestion">
          <h1 class="col-titleprofile">
            Gérer votre compte
          </h1>
        </div>
        <section class="row">
          <div class="col-12">
            <div
              class="card bg-light my-3 class=center-block"
              style="float:none;"
            >
              <div class="card-header">
                <div v-bind="user" class="row justify-content-around">
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
                  enctype="multipart/form-data"
                  @submit.prevent="updatePicture()"
                >
                  <div class="card-body text-center" v-bind="user">
                    <div
                      v-if="user.imageUrl == null"
                      class="dropdown text-center"
                    >
                      <img
                        src="../assets/icon-profil.png"
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
                  <div
                    class="card-body d-flex flex-column justify-content-between"
                  >
                    <label class="text-center label" for="image"
                      ><strong>Choisir ma photo de profil</strong></label
                    >
                    <input
                      type="file"
                      class="form-control"
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

  async created() {
    await axios
      .get(`http://localhost:3000/api/users/${this.userId}`, {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
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
    async updatePicture() {
      const formData = new FormData();
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("image", this.image);
      formData.append("imageUrl", this.imageUrl);

      console.log(this.image);
      console.log(this.imageUrl);
      console.log("test-récup", formData.get("imageUrl"));

      await axios
        .put(`http://localhost:3000/api/users/${this.userId}`, formData, {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.user = response.data.user;
          this.image = response.data.image;
        });
    },
    async deleteMyAccount(id) {
      let confirmDeleteUser = confirm(
        " la suppresion du compte est irréversible, voulez-vous vraiment supprimer le compte ?"
      );
      if (confirmDeleteUser == true) {
        await axios
          .delete(`http://localhost:3000/api/users/${id}`, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            localStorage.clear();
            this.$router.push("/");
          });
      } else {
        return;
      }
    },
  },
};
</script>

<style>
.col-gestion {
  text-align: center;
}
.col-titleprofile {
  margin-top: 1rem !important;
  margin-bottom: 0.5rem !important;
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-size: 1.5rem !important;
  border-radius: 0.25rem;
  font-weight: 600;
  line-height: 1.5;
  background-color: #0dcaf0;
  border-color: #0dcaf0;
  text-align: center;
  vertical-align: middle;
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
.label {
  margin-bottom: 1rem;
}
</style>
