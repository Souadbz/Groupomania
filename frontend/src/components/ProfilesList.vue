<template>
  <div>
    <div v-bind="$attrs" class="card">
      <div class="card-header-info">Informations personnelles</div>
      <p class="text">
        Prénom:
        <span class="text_color">{{ $attrs.firstName }}</span>
      </p>
      <p class="text">
        Nom:
        <span class="text_color">{{ $attrs.lastName }}</span>
      </p>
      <p class="text">
        Email:
        <span class="text_color">{{ $attrs.email }}</span>
      </p>
      <div>
        <img
          v-if="$attrs.imageUrl == null"
          src="../assets/icon-profil.png"
          alt="photo de profil provisoire"
          title="photo de profil"
          class=" rouned-circle mr-1 avatar"
        />
        <img
          v-else
          :src="$attrs.imageUrl"
          class="avatar"
          alt="profile picture"
          title="picture profile"
        />
      </div>
      <button
        class="btn btn-danger"
        id="btn-card"
        v-bind="user"
        @click.prevent="deleteUser($attrs.id)"
      >
        Supprimer <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProfilesList",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      users: [],
      user: {
        id: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
      },
    };
  },
  methods: {
    async deleteUser(id) {
      let confirmDeleteUser = confirm(
        " la suppresion du compte est irréversible, voulez-vous vraiment supprimer le compte ?"
      );
      if (confirmDeleteUser == true) {
        await axios
          .delete(`http://localhost:3000/api/admin/delete/${id}`, {
            headers: {
              Authorization: "Bearer " + this.token,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            this.$emit("deleteProfileUser");
          });
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card-header-info {
  background-color: #ffe4b5;
}
.text {
  margin-left: 0.5rem;
  padding-top: 0.5rem;
  font-weight: bold;
}
.text_color {
  margin-left: 0.5rem;
  color: blue;
  font-weight: 400;
}
.text-center {
  display: block;
}
.avatar {
  margin: 0 1rem 1rem 1rem;
}
#btn-card {
  width: 50%;
  margin: 1rem auto;
}
</style>
