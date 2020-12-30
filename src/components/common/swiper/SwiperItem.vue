<template>
  <div class="img-container">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.img-container {
  width: 100%;
  flex-shrink: 0;
}
.img-container img {
  width: 100%;
}
</style>