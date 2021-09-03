 <template>
<footer>
 <div class="text-center p-3">
      <span>© 2021 Copyright : </span>
      <a href="#" id="lien" role="button" aria-label="se connecter au site groupomania">Groupomania.com</a>
    </div>
</footer>
   
</template>

<script>
export default {
  name: 'Footer',
  }
</script>
<style scoped lang="scss">
footer{
  background-color: #122441;
  margin-top: 13rem;

  span, #lien{
    color: white;
  }
}
</style>