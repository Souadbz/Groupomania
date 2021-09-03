 <template>
<header>
   <div class="row">
        <div class="col">
          <nav class="navbar navbar-expand-lg navbar-light">
            <a href="#" class="navbar-brand">
             <img src="../assets/icon-left-font-monochrome-white.png" width="150" height="150" alt="le logo de gropomania" title="logo groupomania" id="logo" />
            </a>
            <ul  class="navbar-nav">
              <li class="nav-item active">
                <a href="#" id="lien1" class="nav-link">S'inscrire</a>
              </li>
              <li class="nav-item">
                <a href="#" id="lien2" class="nav-link">Se connecter</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
          
</header>
        
</template>


<script>
export default {
  name: 'NavProfile',
  }
</script>

<style lang="scss">
 header{
 display: flex;
  align-items: center;
  height: 5rem;
 background-color: #122441;
#logo{
    margin: 0.5rem
}
#lien1, #lien2{
    color: white;
}
 }



</style>