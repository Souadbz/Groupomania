<template>
        <div>    
            <!-- Répondre  -->
            <div class="blocanswer">
                <textarea type="text" id="content" name="content" rows="2" class="form-control" v-model="content" 
                placeholder="Insérer votre nom puis votre commentaire svp..."></textarea>
                <a v-on:click="createAnswer()"><i class="far fa-paper-plane" title="Envoyer"></i></a>          
            </div>

        <!-- Liste des réponses  -->
                <div> 
                    <div v-for="comment in comments" :key="comment.id" class="blocanswers" >                        
                        <p> {{ comment.content }} </p>           
                    </div>
                </div>
        </div>
</template>


<script >
export default {
    name: "Answers",
    data() {
        return {
            comment: "",
            comments: [],
        }
    },
    //Passer des données aux composants enfants avec les props//
    props: {
        postId: Number,
        UserId: Number,
    },
    mounted() {
        ///////////////////GET ANSWERS/////////////////////
        let url = "http://localhost:3000/api/:id/comment/";
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.comments = data;
                console.log(this.comments)
            })
            .catch(error => console.log(error))
    },
    methods: {
        ///////////////////CREATE ANSWER///////////////////// 
        createAnswer() {
            let inputContent = {
                "content": this.content,
                "post_id": this.post_id
            }
            let url = "http://localhost:3000/api/:id/comment"
            let options = {
                method: "POST",
                body: JSON.stringify(inputContent),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    if (res.ok) {
                        this.content = {}
                    } else {
                        alert("Commentaire envoyé 🖅");
                    }
                })
                .then(window.location.reload())
                .catch(error => console.log(error))
        }
    },
}
</script>

<style lang="css">
h4 {
  text-transform: uppercase;
}
.blocanswer {
  width: 100%;
  margin: 0;
  border-radius: 30px; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
.blocanswer a {
  width: 10%;
}
.blocanswers {
  text-align: center;
  width: 90%;
  margin: auto;
  margin-top: 10px;
  border-radius: 30px; 
  border: 6px solid  #d44c5c;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.blocanswers i {
  color: #0c2444;
}
.blocanswers p {
  font-style: italic;
}
.blocanswer i {
  color: white;
  font-size: 1.75em;
  padding-right: 25px;
  text-shadow: -3px 0 3px #d44c5c, 0 3px 3px  #d44c5c, 3px 0 3px  #d44c5c, 0 -3px 15px  #d44c5c;
}
.blocanswer textarea:focus {
  border-color: white;
  box-shadow: 0px 0px 20px grey;
}
</style>