<template>
<div class="card">
  <div class="card-body col d-flex justify-content-center">
   <main class="card-body"> 
        <h2 class="card-title">partagez vos intérêts avec votre communauté </h2>    
                <form class="container text-center form-group"  @submit.prevent="addPost()" enctype="multipart/form-data" method="post">
                        <div class="mx-auto w-50 mb-3">
                            <label for="content" class="form-label form-control-sm">Postez vos articles :  </label>
                                    <input 
                                        type="text" 
                                         v-model="content"
                                        class="form-control form-control-sm "
                                        placeholder="Postez!"
                                        name="content"
                                        id="content"/>               
                           
                        </div>
                        <div class="mx-auto w-50 mb-3" >
                             <input 
                                       type="file" 
                                       class="form-controle"
                                       name="image"
                                       id="image"
                                       ref='image'
                                      aria-describedby="addFiles"
                                      @change="selectFile()"/>   
                                      <div class="card-body mx-auto" >
                                       <button type="submit" id="btnP" class="btn btn-primary" @click.prevent="addPost">Postez</button>
                                      </div>
                                   </div>
                       </form> 
                 </main>
             </div>
           </div>
</template>
<script>

import axios from "axios";

export default {
    name: "AddPost",
    
  data() {
        return {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
             image: "",
             content: "",
            imageUrl : "", 
          
        }
    },
 
  methods: {
   selectFile() {
    this.image = this.$refs.image.files[0];
    this.imageUrl = URL.createObjectURL(this.image)
},
addPost(){
 const formData = new FormData();
       formData.append("image", this.image)
       formData.append("userId", parseInt(localStorage.getItem('userId')))
      formData.append("content", document.getElementById('content').value)
      console.log("test-récup", formData.get("image"));
      console.log("test-récup", formData.get("content"))
    axios
     .post('http://localhost:3000/api/posts',
                    formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
                .then(() => this.$router.go())


}
    
}
    
}



</script>
<style scoped lang="scss">
.card{
  width: 50%;
  margin: auto;
  float: none;
  margin-top: 1rem ;

}
h2{
  margin: 2rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
}
/*label{
  display:block;
 float:left;
  width:150px;
}
input{
 
}*/
#btnP{
  margin-left: 5rem;
}


</style>
