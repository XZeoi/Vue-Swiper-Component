<template>
  <div id="app">
    <home-swiper>
      <!-- <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.img" alt="">
        </a>
      </swiper-item> -->
      
    </home-swiper>
  </div>
</template>

<script>
import HomeSwiper from 'content/HomeSwiper'

export default {
  name: 'App',
  components: {
    HomeSwiper
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
