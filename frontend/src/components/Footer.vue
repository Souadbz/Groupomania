<template>
  <footer>
    <div class="text-center p-3">
      <span>© 2021 Copyright : </span>
      <a
        href="#"
        id="lien"
        role="button"
        aria-label="se connecter au site groupomania"
        >Groupomania.com</a
      >
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
<style scoped lang="scss">
footer {
  height: auto;
  width: 100%;
  background-color: #122441;
  margin-top: 15rem;

  span,
  #lien {
    color: white;
  }
}
</style>
