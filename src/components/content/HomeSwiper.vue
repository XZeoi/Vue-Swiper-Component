<template>
  <div>
    <swiper>
      <swiper-item 
      v-for="(item, index) in imgList"
      :key="index">
        <!-- <a :href="item.link"> -->
          <img :src="item.images" alt="" />
        <!-- </a> -->
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from 'common/swiper/Swiper'
import SwiperItem from 'common/swiper/SwiperItem'

export default {
  name: "HomeSwiper",
  data() {
    return {
      imgList: []
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  created() {
    this.getBannersList();
  },
  methods: {
    /**
     * 获取数据
     */
    async getBannersList() {
      const { data: res } = await this.$axios.get(
        // "http://152.136.185.210:8000/api/w6/home/multidata"
        "/home/datalist"
      );
      this.imgList = res.list
      console.log(res.list)
    }
  }
}
</script>

<style>

</style>