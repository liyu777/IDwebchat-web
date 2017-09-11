<template>
  <div class="cropper" :style="{
      'cursor': dragImageInfo.isDrag ? 'move' : 'default'
    }"
    @mousedown="startDrag"
    @mouseup="stopDrag"
    @mousemove="onDraging"
    @mousewheel="zoom"
    @DOMMouseScroll="zoom">
    <div class="box" ref="box">
      <img :src="img" ref="image" :style="{
        'position': 'absolute',
        'left': boxSize.width / 2 + imageOffset.x * scale + 'px',
        'top': boxSize.height / 2 + imageOffset.y * scale + 'px',
        'margin-left':srcSize.width * scale * -1 / 2  + 'px',
        'margin-top': srcSize.height * scale * -1 / 2  + 'px',
        'width': srcSize.width * scale + 'px',
        'height': srcSize.height * scale + 'px'
      }" ondragstart="return false" @load="initImage" />
    </div>
    <!-- 切图框附近的上下左右四块遮罩层 -->
    <div class="cover" :style="{
      'top': '0px',
      'left': '0px',
      'width': cropperPosition.x + cropperPosition.width + 'px',
      'height': cropperPosition.y + 'px'
    }"></div>
    <div class="cover" :style="{
      'top': cropperPosition.y + 'px',
      'left': '0px',
      'width': cropperPosition.x + 'px',
      'height': cropperPosition.y + cropperPosition.height + 'px'
    }"></div>
    <div class="cover" :style="{
      'top': cropperPosition.y + cropperPosition.height + 'px',
      'left': cropperPosition.x + 'px',
      'width': cropperPosition.x + cropperPosition.width + 'px',
      'height': cropperPosition.y + 'px'
    }"></div>
    <div class="cover" :style="{
      'top': '0px',
      'left': cropperPosition.x + cropperPosition.width + 'px',
      'width': cropperPosition.x +'px',
      'height': cropperPosition.y + cropperPosition.height + 'px'
    }"></div>
    <!-- 改变切图框大小的按钮 -->
    <div class="change-size-button" id="leftTop" :style="{
      'top': cropperPosition.y + 'px',
      'left': cropperPosition.x + 'px',
      'cursor': 'nw-resize'
    }"></div>
    <div class="change-size-button" id="rightTop" :style="{
      'top': cropperPosition.y + 'px',
      'left': cropperPosition.x + cropperPosition.width + 'px',
      'cursor': 'ne-resize'
    }"></div>
    <div class="change-size-button" id="leftBottom" :style="{
      'top': cropperPosition.y + cropperPosition.height + 'px',
      'left': cropperPosition.x + 'px',
      'cursor': 'sw-resize'
    }"></div>
    <div class="change-size-button" id="rightBottom" :style="{
      'top': cropperPosition.y + cropperPosition.height + 'px',
      'left': cropperPosition.x + cropperPosition.width + 'px',
      'cursor': 'se-resize'
    }"></div>
    <canvas class="canvas" ref="canvas" v-show="false"></canvas>
  </div>
</template>
<script>
  export default {
    props: ['img'],
    data () {
      return {
        // 图片加载完毕标志
        inited: false,
        // 图片地址
        imageUrl: '',
        // 原始图片大小
        srcSize: {
          width: 0,
          height: 0
        },
        // 容器大小
        boxSize: {
          width: 0,
          height: 0
        },
        // 缩放比例
        scale: 1,
        // 图片位置偏移量
        imageOffset: {
          x: 0,
          y: 0
        },
        // 截取范围
        cropperPosition: {
          x: 0,
          y: 0,
          width: 300,
          height: 300
        },
        // 拖拽相关属性
        dragImageInfo: {
          isDrag: false,
          // 开始位置
          startX: null,
          startY: null,
          // 偏移量
          offsetX: 0,
          offsetY: 0
        },
        // 拖动截取框相关属性
        dragChangeCropper: {
          way: null,
          isDrag: false,
          // 开始位置
          startX: null,
          startY: null,
          // 当前截取框信息
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }
      }
    },
    mounted () {
      // 计算容器大小
      this.boxSize.width = this.$refs.box.offsetWidth
      this.boxSize.height = this.$refs.box.offsetHeight
      // 计算截取范围
      this.cropperPosition.x = this.boxSize.width / 2 - this.cropperPosition.width / 2
      this.cropperPosition.y = this.boxSize.height / 2 - this.cropperPosition.height / 2
    },
    methods: {
      initImage (event) {
        // 获得原始图片大小
        this.srcSize.width = event.target.naturalWidth
        this.srcSize.height = event.target.naturalHeight
        // 计算缩放比例
        let scaleX, scaleY
        if (this.srcSize.width < this.boxSize.width) {
          scaleX = 1
        } else {
          scaleX = this.boxSize.width / this.srcSize.width
        }
        if (this.srcSize.height < this.boxSize.height) {
          scaleY = 1
        } else {
          scaleY = this.boxSize.height / this.srcSize.height
        }
        this.scale = scaleX > scaleY ? scaleY : scaleX
      },
      // 开始拖动
      startDrag (event) {
        if (event.target.className === 'change-size-button') {
          // 开始拖拽选择框
          this.dragChangeCropper.isDrag = true
          // 记录当前位置
          this.dragChangeCropper.startX = event.clientX
          this.dragChangeCropper.startY = event.clientY
          // 记录当前截取框信息
          this.dragChangeCropper.x = this.cropperPosition.x
          this.dragChangeCropper.y = this.cropperPosition.y
          this.dragChangeCropper.width = this.cropperPosition.width
          this.dragChangeCropper.height = this.cropperPosition.height
          this.dragChangeCropper.way = event.target.id
        } else {
          // 开始拖拽图片
          this.dragImageInfo.isDrag = true
          // 记录当前位置
          this.dragImageInfo.startX = event.clientX
          this.dragImageInfo.startY = event.clientY
          // 初始偏移量
          this.dragImageInfo.offsetX = this.imageOffset.x * this.scale
          this.dragImageInfo.offsetY = this.imageOffset.y * this.scale
        }
      },
      // 结束拖动
      stopDrag (event) {
        if (this.dragImageInfo.isDrag) {
          // 重置拖动相关参数
          this.dragImageInfo.isDrag = false
        }
        if (this.dragChangeCropper.isDrag) {
          // 重置相关参数
          this.dragChangeCropper.isDrag = false
        }
      },
      // 拖动中事件
      onDraging (event) {
        if (this.dragImageInfo.isDrag) {
          // 拖动图片
          this.imageOffset.x = (this.dragImageInfo.offsetX + event.clientX - this.dragImageInfo.startX) / this.scale
          this.imageOffset.y = (this.dragImageInfo.offsetY + event.clientY - this.dragImageInfo.startY) / this.scale
        } else if (this.dragChangeCropper.isDrag) {
          // 拖动截图框
          if (this.dragChangeCropper.way === 'leftTop') {
            const offsetX = event.clientX - this.dragChangeCropper.startX
            const offsetY = event.clientY - this.dragChangeCropper.startY
            const offset = offsetX > offsetY ? offsetY : offsetX
            this.cropperPosition.width = this.dragChangeCropper.width - offset * 2
            this.cropperPosition.height = this.dragChangeCropper.height - offset * 2
            this.cropperPosition.x = this.dragChangeCropper.x + offset
            this.cropperPosition.y = this.dragChangeCropper.y + offset
            checkMaxAndMinSize(this.cropperPosition, this.boxSize)
          } else if (this.dragChangeCropper.way === 'rightTop') {
            const offsetX = event.clientX - this.dragChangeCropper.startX
            const offsetY = this.dragChangeCropper.startY - event.clientY
            const offset = offsetX > offsetY ? offsetY : offsetX
            this.cropperPosition.width = this.dragChangeCropper.width + offset * 2
            this.cropperPosition.height = this.dragChangeCropper.height + offset * 2
            this.cropperPosition.x = this.dragChangeCropper.x - offset
            this.cropperPosition.y = this.dragChangeCropper.y - offset
            checkMaxAndMinSize(this.cropperPosition, this.boxSize)
          } else if (this.dragChangeCropper.way === 'leftBottom') {
            const offsetX = this.dragChangeCropper.startX - event.clientX
            const offsetY = event.clientY - this.dragChangeCropper.startY
            const offset = offsetX > offsetY ? offsetY : offsetX
            this.cropperPosition.width = this.dragChangeCropper.width + offset * 2
            this.cropperPosition.height = this.dragChangeCropper.height + offset * 2
            this.cropperPosition.x = this.dragChangeCropper.x - offset
            this.cropperPosition.y = this.dragChangeCropper.y - offset
            checkMaxAndMinSize(this.cropperPosition, this.boxSize)
          } else if (this.dragChangeCropper.way === 'rightBottom') {
            const offsetX = this.dragChangeCropper.startX - event.clientX
            const offsetY = this.dragChangeCropper.startY - event.clientY
            const offset = offsetX > offsetY ? offsetY : offsetX
            this.cropperPosition.width = this.dragChangeCropper.width - offset * 2
            this.cropperPosition.height = this.dragChangeCropper.height - offset * 2
            this.cropperPosition.x = this.dragChangeCropper.x + offset
            this.cropperPosition.y = this.dragChangeCropper.y + offset
            checkMaxAndMinSize(this.cropperPosition, this.boxSize)
          }
        }

        // 检查拖动框范围，最小100, 最大不超过盒子的高或者宽 - 10px
        function checkMaxAndMinSize (cropperPosition, boxSize) {
          if (cropperPosition.width < 100) {
            cropperPosition.width = 100
            cropperPosition.height = 100
            cropperPosition.x = boxSize.width / 2 - cropperPosition.width / 2
            cropperPosition.y = boxSize.height / 2 - cropperPosition.height / 2
          } else if (boxSize.width < boxSize.height && cropperPosition.width > boxSize.width - 10) {
            cropperPosition.width = boxSize.width - 10
            cropperPosition.height = boxSize.width - 10
            cropperPosition.x = boxSize.width / 2 - cropperPosition.width / 2
            cropperPosition.y = boxSize.height / 2 - cropperPosition.height / 2
          } else if (boxSize.height < boxSize.width && cropperPosition.height > boxSize.height - 10) {
            cropperPosition.width = boxSize.height - 10
            cropperPosition.height = boxSize.height - 10
            cropperPosition.x = boxSize.width / 2 - cropperPosition.width / 2
            cropperPosition.y = boxSize.height / 2 - cropperPosition.height / 2
          }
        }
      },
      // 图片缩放
      zoom (event) {
        if (event.detail) { // 火狐
          if (event.detail < 0) {
            // 放大
            this.scale += 0.1
            if (this.scale > 2) {
              this.scale = 2
            }
          } else {
            // 缩小
            this.scale -= 0.1
            if (this.scale < 0.3) {
              this.scale = 0.3
            }
          }
        } else { // 其他浏览器
          if (event.wheelDelta > 0) {
            // 放大
            this.scale += 0.1
            if (this.scale > 2) {
              this.scale = 2
            }
          } else {
            // 缩小
            this.scale -= 0.1
            if (this.scale < 0.3) {
              this.scale = 0.3
            }
          }
        }
      },
      // 获得URL类型数据
      getUrlData () {
        return new Promise((resolve, reject) => {
          try {
            const position = {
              x: (this.cropperPosition.x - this.$refs.image.offsetLeft) / this.scale,
              y: (this.cropperPosition.y - this.$refs.image.offsetTop) / this.scale,
              width: this.cropperPosition.width / this.scale,
              height: this.cropperPosition.height / this.scale
            }
            this.$refs.canvas.width = 120
            this.$refs.canvas.height = 120
            const ctx = this.$refs.canvas.getContext('2d')
            ctx.drawImage(this.$refs.image,
              position.x, position.y, position.width, position.height,
              0, 0, 120, 120)
            resolve(this.$refs.canvas.toDataURL())
          } catch (err) {
            reject(err)
          }
        })
      },
      // 获取blob类型数据
      getBlobData () {
        return new Promise((resolve, reject) => {
          try {
            const position = {
              x: (this.cropperPosition.x - this.$refs.image.offsetLeft) / this.scale,
              y: (this.cropperPosition.y - this.$refs.image.offsetTop) / this.scale,
              width: this.cropperPosition.width / this.scale,
              height: this.cropperPosition.height / this.scale
            }
            this.$refs.canvas.width = 120
            this.$refs.canvas.height = 120
            const ctx = this.$refs.canvas.getContext('2d')
            ctx.drawImage(this.$refs.image,
              position.x, position.y, position.width, position.height,
              0, 0, 120, 120)
            this.$refs.canvas.toBlob(blob => {
              resolve(blob)
            })
          } catch (e) {
            reject(e)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .cropper{
    height: 500px;
    width: 100%;
    user-select: none;
    cursor: default;
    overflow:hidden;
    position: relative;
  }
  .box{
    height: 500px;
    width: 100%;
    position: absolute;
  }
  .cover{
    background-color: #000;
    opacity: 0.3;
    position: absolute;
  }
  .change-size-button{
    width: 8px;
    height: 8px;
    margin-left: -4px;
    margin-top: -4px;
    border-radius: 4px;
    background-color: #20A0FF;
    position: absolute;
  }
  .canvas{
    position: absolute;
    background-color: #fff;
  }
</style>
