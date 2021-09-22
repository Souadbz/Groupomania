<template>
<div class="mx-auto w-50 mb-3" v-bind="comment">
        <form class="mt-3">
                <input
                v-bind="comment"
                    class="form-control content"
                    name="content"
                    ref="content"
                    placeholder="Tapez un commentaire !"
               />
            <button
            v-bind="comment"
                type="submit"
                class="btn btn-primary mb-3"
                @click="postComment()"
                ref="comment"
            >Publier</button>
        </form>
       </div> 
</template>
<script>
import axios from "axios"
export default {
    name: "createComment",
    data() {
        return {
            post: {},
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            postId: "",
            content: "",
            comment:""
        }
    },
    methods: {
        postComment() {
            axios
                .post('http://localhost:3000/api/comments', {
                    postId: this.$refs.comment.id,
                    userId: localStorage.getItem('userId'),
                    content: this.$refs.content.value,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                   
                })
                .then(() => this.$router.go())
              
       },
    }
   
}
</script>
<style>
</style>