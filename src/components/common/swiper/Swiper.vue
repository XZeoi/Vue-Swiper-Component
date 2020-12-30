<template>
  <!-- <div class="swiper">
    <div class="swiper-container">
      <slot></slot>
    </div>
  </div> -->
  <div class="swiper">
    <div
      class="img-box"
      @touchstart="touchHandle"
      @touchmove="touchHandle"
      @touchend="touchHandle"
    >
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indicator">
        <span
          class="indicator-item"
          v-for="(item, index) in liCount"
          :key="index"
          :class="{ active: index === currentIndex - 1 }"
        ></span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    intervalTime: {
      type: Number,
      default: 3000,
    },
    animationTime: {
      type: Number,
      default: 300,
    },
    moveRadio: {
      type: Number,
      default: 0.5,
    },
  },
  data() {
    return {
      imgList: [],
      startX: 0,
      X1: 0, //第一次触摸时的位置
      X2: 0, //第二次触摸时的位置
      curOffset: 0,
      ulStyle: {}, //自定义ul的样式，将引用ul.style
      liCount: 0, //元素的个数
      currentIndex: 1, //当前的index
      scrolling: false, //是否正在滚动
    };
  },
  mounted() {
    setTimeout(() => {
      this.domNodeAdd();
      this.startTimer();
    }, 300);
  },
  methods: {
    /**
     * 操作DOM，前后各加一个节点
     */
    domNodeAdd() {
      let ulNode = document.querySelector(".img-box");
      let liNode = ulNode.getElementsByClassName("img-container");

      this.liCount = liNode.length;
      this.ulWidth = ulNode.offsetWidth;
      this.ulStyle = ulNode.style;

      if (this.liCount > 1) {
        let cloneFirst = liNode[0].cloneNode(true);
        let cloneLast = liNode[this.liCount - 1].cloneNode(true);

        ulNode.insertBefore(cloneLast, liNode[0]);
        ulNode.appendChild(cloneFirst);
      }

      // 由于前面添加了一张“最后面的图片”，因此需重新布局第一张的位置
      this.translateMove(-this.ulWidth);
    },

    /**
     * 设置touch事件处理函数
     * 根据ev.type来判断是touchstart, touchmove 还是touchend事件
     */
    touchHandle(ev) {
      switch (ev.type) {
        case "touchstart":
          if (this.scrolling) return;
          // 关掉定时器
          this.stopTimer();
          // this.startX = this.ulStyle.transform.translateX || 0;
          this.startX = -this.currentIndex * this.ulWidth;
          this.X1 = ev.changedTouches[0].pageX;
          break;
        case "touchmove":
          this.X2 = ev.changedTouches[0].pageX;
          this.distance = this.X2 - this.X1;
          this.curOffset = this.startX + this.distance;
          this.translateMove(this.curOffset);
          break;
        case "touchend":
          let offset = Math.abs(this.distance);
          if (this.distance === 0) {
            return;
          } else if (
            this.distance > 0 &&
            offset > this.ulWidth * this.moveRadio
          ) {
            this.currentIndex--;
          } else if (
            this.distance < 0 &&
            offset > this.ulWidth * this.moveRadio
          ) {
            this.currentIndex++;
          }
          this.transformHandle(-this.currentIndex * this.ulWidth);

          //开启定时器
          this.startTimer();
          break;
      }
    },

    /**
     * 设置滚动
     */
    transformHandle(offset) {
      this.scrolling = true;

      this.ulStyle.transition = `transform${this.animationTime}ms`;
      this.translateMove(offset);

      this.positionCheck();

      this.scrolling = false;
    },

    /**
     *  设置移动距离
     */
    translateMove(offset) {
      this.ulStyle.transform = `translateX(${offset}px)`;
    },

    /**
     * 两个极端位置判断及处理
     */
    positionCheck() {
      setTimeout(() => {
        this.ulStyle.transition = "0ms";
        if (this.currentIndex >= this.liCount + 1) {
          this.currentIndex = 1;
          this.translateMove(-this.currentIndex * this.ulWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.liCount;
          this.translateMove(-this.currentIndex * this.ulWidth);
        }
      }, this.intervalTime);
    },

    /**
     * 设置定时器
     */
    startTimer() {
      this.playTimer = setInterval(() => {
        this.currentIndex++;
        this.transformHandle(-this.ulWidth * this.currentIndex);
      }, 3000);
    },

    /**
     * 设置清除定时器
     */
    stopTimer() {
      window.clearInterval(this.playTimer);
    },
  },
};
</script>

<style scoped>
.swiper {
  overflow: hidden;
  position: relative;
}
.swiper .img-box {
  display: flex;
  /* background-color: red; */
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 8px;
  width: 100%;
}
.indicator-item {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  margin: 0 5px;
}
.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>