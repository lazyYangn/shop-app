<template>
  <div ref="content" class="my-content">
    <div v-if="loading" class="loading" :style="loadingStyle"><span class="iconfont icon-Loading my-loading"></span>{{ resMsg }}</div>
    <div v-else class="loading" :style="loadingStyle">{{ msg }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MyContent',
  data() {
    return {
      loading: false,
      touchstart: 0, //手机触摸屏幕的起点
      distance: 0, //手指滑动的距离
      msg: '',
      tmpheight: 0,
      resMsg: '正在加载',
    }
  },
  props: {
    pull: Boolean,
    refreshFunc: {
      type: Function,
      default: function() {},
    },
  },
  computed: {
    loadingStyle() {
      return {
        marginBottom: this.tmpheight + 'px',
      }
    },
  },
  mounted() {
    if (this.pull) {
      const content = this.$refs.content
      content.addEventListener('touchstart', (e) => {
        if (this.loading) {
          e.preventDefault()
          e.stopPropagation() //阻止冒泡事件
          return
        }
        //获取手指第一次触碰屏幕所在的位置
        this.touchstart = e.targetTouches[0].clientY
      })

      content.addEventListener('touchmove', (e) => {
        if (this.touchstart <= 0) {
          return
        }
        if (this.loading) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
        const touch = e.targetTouches[0]
        const scrollTop = content.scrollTop
        if (scrollTop === 0) {
          this.distance = touch.clientY - this.touchstart
          if (this.distance > 0) {
            e.preventDefault()
            e.stopPropagation()

            if (this.distance < 35) {
              this.tmpheight = this.distance
              content.style.transform = 'translate3D(0px,' + this.distance + 'px,0px)'
              this.msg = '下拉刷新'
            }
          }
        }
      })

      content.addEventListener('touchend', (e) => {
        if (this.distance == 0) {
          return
        }
        if (this.loading) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
        if (this.distance > 0) {
          this.loading = true
          this.refreshFunc().then((res) => {
            res ? '' : (this.resMsg = '获取数据失败')
            setTimeout(() => {
              this.loading = false
              content.style.transform = 'translate3D(0px,0px,0px)'
              this.msg = ''
              this.tmpheight = 0
              this.distance = 0
            }, 800)
          })
        }
      })
    }
  },
}
</script>

<style scoped>
.my-content {
  padding: 24px;
  height: 100vh;
  overflow-x: hidden;
  margin-bottom: 55px;
  transition: all 0.3s linear;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: none;
}
.loading {
  display: flex;
  justify-content: center;
  color: rgb(0 0 0 / 0.5);
  font-size: 16px;
  position: relative;
  z-index: -1;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

.my-loading {
  color: #b620e0;
  font-size: 16px;
  margin-right: 6px;
  transform: rotate(360deg);
  animation: rotation 3s linear infinite;
  -moz-animation: rotation 3s linear infinite;
  -webkit-animation: rotation 3s linear infinite;
  -o-animation: rotation 3s linear infinite;
}
</style>
