<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .slider {
    min-height: 1px;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a {
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .dots {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $color-text-l;
        &.active {
          width: 20px;
          border-radius: 5px;
          background: $color-text-ll;
        }
      }
    }
  }
</style>
<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex===index}">&nbsp;</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {addClass} from 'common/js/dom';
  export default{
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      };
    },
    props: {
      /**
       * 是否循环播放
       * 默认： 是
       * */
      loop: {
        type: Boolean,
        default: true
      },
      /**
       * 是否循环播放
       * 默认： 是
       * */
      autoPlay: {
        type: Boolean,
        default: true
      },
      /**
       * 自动轮播间隔
       * 默认： 是
       * */
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      /**
       * 也可以用this.$nextTick()，但更推荐用setTimeout
       * 浏览器刷新为17ms一次，20ms刷新完成（20ms为经验值）
       * */
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        this._initSlider();
        if (this.autoPlay) {
          this._play();
        }
      }, 20);
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return;
        }
        this._setSliderWidth(true);
        this.slider.refresh();
      });
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children;
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider-item');
          child.style.width = sliderWidth + 'px';
          width += sliderWidth;
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initDots() {
        this.dots = new Array(this.children.length);
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          // 横线滚动条可用
          scrollX: true,
          // 纵向滚动条不可用
          scrollY: false,
          // 是否开启动量动画，关闭可以提升效率
          momentum: false,
          // 自动分割容器，用于制作走马灯效果等
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
          /* snap: true,
           snapLoop: this.loop,
           snapThreshold: 0.3,
           snapSpeed: 400 */
        });
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;
          if (this.loop) {
            pageIndex -= 1;
          }
          this.currentPageIndex = pageIndex;
          if (this.autoPlay) {
            clearTimeout(this.timer);
            this._play();
          }
        });
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1;
        if (this.loop) {
          pageIndex += 1;
        }
        this.timer = setTimeout(() => {
          /**
           *  参数说明：
           *  pageIndex: X轴的页数
           *  0：Y轴的页数
           *  400：动画执行的时间
           * */
          this.slider.goToPage(pageIndex, 0, 400);
        }, this.interval);
      }
    }
  };
</script>
