<template>
  <router-link
    :to="path"
    class="linkBtn"
    >
    {{text}}
  </router-link>
</template>

<script>
export default {
  props: {
    path: "",
    text: ""
  }
}
</script>

<style lang="scss">
.linkBtn{
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid $black;
  color: white;
  background-color: $orange;
  text-decoration: none;
  font-size: 1.8rem;
  box-shadow: -4px -4px 0 0 $black;
  transition-property: transform box-shadow;
  transition-duration: 0.3s;
  &:hover{
    box-shadow: none;
    transform: translate(-4px, -4px);
  }
}
</style>