<template>
    <div class="col">
        <div v-for="comment in comments" :key="comment.id" v-bind="comment">
            <div class="col-10 mx-auto border border-dark rounded shadow mt-3">
                <p>Commentaire - gif n° {{ comment.postId }}</p>
                <p class="mb-2">
                    "{{ comment.content }}"
                    <span
                        v-for="(user) in users.filter((user) => { return user.id == comment.userId })" :key="user.id"
                    >
                        par
                        <strong>{{ user.firstName }} {{ user.lastName }}</strong>
                    </span>
                </p>
                <button @click.prevent="adminDeleteComment(comment.id)">Supprimer</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name: "AllComments",
    props: {
        content: {
            type: Text,
            required: true
        }
    },
    data() {
        return {
            token: localStorage.getItem('token'),
            users: [],
            user: {
                id: localStorage.getItem('userId'),
                isAdmin: localStorage.getItem('isAdmin'),
            },
            comments: []
        }
    },
    created() {
        axios.get('http://localhost:3000/api/comments',
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": 'Bearer ' + this.token
                }
            })
            .then(res => { this.comments = res.data })
            .catch(err => {
                console.log(err + "Utilisateur inconnu ou commentaires indisponibles");
            });
        axios
            .get('http://localhost:3000/api/users',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
            .then(res => { this.users = res.data.users })
            .catch(err => {
                console.log(err + "Utilisateur inconnu ou profils indisponibles");
            });
    },
    methods: {
        adminDeleteComment(id) {
            axios
                .delete(`http://localhost:3000/api/admin/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + this.token
                        }
                    })
                .then(() => this.$router.go())
        }
    }
}
</script>

<style>
</style>