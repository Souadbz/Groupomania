 <template>
 
 <header>
      <img src="../assets/icon-left-font-monochrome-white.png" width="240" height="240" alt="le logo de gropomania" title="logo groupomania" id="logo" />
 </header>
</template>


<script>
export default {
  name: 'Nav',
  }
</script>

<style scoped lang="scss">
header{
  display: flex;
  align-items: center;
  height: 5rem;
 background-color: #122441;


#logo{
      display: block;
    margin-left: auto;
    margin-right: auto;
}
}
</style>