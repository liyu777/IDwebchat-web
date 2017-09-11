<template>
  <div class="warper">
    <p class="top-title">| 头像设置</p>
    <div class="line"></div>
    <div class="button-warper">
      <el-button type="info" class="button-width" @click="save">保 存</el-button>
    </div>
    <div class="image-view">
      <div class="current">
        <p class="area-title">当前头像</p>
        <div class="avatar-preview">
          <img v-if="!!userInfo.path" :src="userInfo.path" class="avatar-large"></img>
          <img v-else src="../../../assets/images/main/default-avatar.jpg" class="avatar-large"></img>
        </div>
      </div>
      <div class="preview" v-if="!!currentChooseAvatar">
        <p class="area-title" style="width:100%">头像预览</p>
        <div class="avatar-preview">
          <span></span>
          <img :src="currentChooseAvatar.path" class="avatar-large"></img>
        </div>
        <div class="avatar-preview">
          <span></span>
          <img :src="currentChooseAvatar.path" class="avatar-normal"></img>
        </div>
        <div class="avatar-preview">
          <span></span>
          <img :src="currentChooseAvatar.path" class="avatar-small"></img>
        </div>
      </div>
    </div>
    <div class="sys-avatar">
      <p class="area-title">系统头像</p>
      <span class="area-desc">从系统头像库里选择一张作为头像</span>
      <div class="list-wapper">
        <ul class="image-list">
          <li v-for="(item, index) in sysAvatar" :key="item.id">
            <img :src="item.path" @click="chooseAvatar(item)"></img>
          </li>
        </ul>
      </div>
    </div>
    <div class="custom-avatar">
      <p class="area-title">用户头像</p>
      <span class="area-desc">从电脑里选择一张作为头像</span>
      <el-upload
        ref="upload"
        class="upload-button"
        action="http://192.168.13.34:10011/user/upload"
        :show-file-list="false"
        :on-change="addAvatar"
        :auto-upload="false"
        :on-success="uploadSuccess"
        :with-credentials="true"
        :on-error="uploadError">
        <el-button icon="picture" type="info" size="small"> 选择图片</el-button>
      </el-upload>
      <div class="list-wapper">
        <ul class="image-list">
          <li v-for="(item, index) in customAvatar" :key="item.id">
            <img :src="item.path" @click="chooseAvatar(item)"></img>
            <i class="el-icon-circle-close delete-avatar-button" @click="removeAvatar(item.id)"></i>
          </li>
        </ul>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog ref="dialog"
      title="截取头像"
      :lock-scroll="false"
      :close-on-click-modal="false"
      :visible.sync="cropperVisible">
      <span slot="footer" class="dialog-footer">
        <el-button @click="cropperVisible = false">取 消</el-button>
        <el-button @click="preview">预览</el-button>
        <el-button v-if="!isUploading" type="primary" @click="upload" icon="upload">上 传</el-button>
        <el-button v-if="isUploading" type="primary" icon="loading" disabled>上传中</el-button>
      </span>
      <image-cropper ref="cropper" v-if="cropperVisible" :img="img"></image-cropper>
    </el-dialog>
    <el-dialog 
      title="预览"
      :lock-scroll="false"
      size="tiny"
      :visible.sync="previewVisible">
      <div class="preview-content">
        <img :src="previewImage"/>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ImageCropper from '@/components/commons/ImageCropper'
  import api from '@/api/my-account'
  import * as userInfoTypes from '@/types/user-info-types'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      'image-cropper': ImageCropper
    },
    data () {
      return {
        // 是否显示裁剪弹框
        cropperVisible: false,
        // 是否显示裁剪预览弹框
        previewVisible: false,
        // 用户上传的图片
        img: null,
        // 用户预览的图片
        previewImage: null,
        // 系统头像列表
        sysAvatar: [],
        // 用户头像列表
        customAvatar: [],
        // 当前选中的头像
        currentChooseAvatar: null,
        // 上传中
        isUploading: false
      }
    },
    computed: {
      ...mapGetters({
        userInfo: userInfoTypes.GET_CURRENT_USER
      })
    },
    mounted () {
      // 获取头像信息
      api.getAvatar().then(data => {
        this.sysAvatar = data.system ? data.system : []
        this.customAvatar = data.used ? data.used : []
      })
    },
    methods: {
      // 选择添加文件时
      addAvatar (file, fileList) {
        if (fileList.length === 0) {
          return
        }
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }
        if (file) {
          const isJPG = file.raw.type.substring(0, file.raw.type.lastIndexOf('/')) === 'image'
          const isLt2M = file.raw.size / 1024 / 1024 < 2
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
            this.$refs.upload.clearFiles()
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
            this.$refs.upload.clearFiles()
          }
          if (isJPG && isLt2M) {
            const reader = new FileReader()
            reader.readAsDataURL(file.raw)
            reader.onload = (e) => {
              this.img = e.target.result
              // 显示图片
              this.cropperVisible = true
              this.isUploading = false
            }
          }
        }
      },
      // 上传成功
      uploadSuccess () {
        // 清空文件列表
        this.$refs.upload.clearFiles()
      },
      // 上传失败
      uploadError () {
        // 清空文件列表
        this.$refs.upload.clearFiles()
      },
      upload () {
        this.isUploading = true
        this.$refs.cropper.getBlobData().then(blob => {
          api.uploadAvatar(blob).then(data => {
            // 重新获取头像
            api.getAvatar().then(data => {
              this.sysAvatar = data.system ? data.system : []
              this.customAvatar = data.used ? data.used : []
            })
            this.$message.success('上传成功！')
            this.cropperVisible = false
          }).catch(() => {
            this.isUploading = false
          })
        }).catch(() => {
          this.$message.error('图片损坏或异常！')
          this.isUploading = false
        })
      },
      preview () {
        this.$refs.cropper.getUrlData().then(url => {
          this.previewImage = url
          this.previewVisible = true
        }).catch(() => {
          this.$message.error('图片损坏或异常！')
        })
      },
      // 删除头像
      removeAvatar (id) {
        this.$confirm('删除该头像？', {
          title: '确认删除',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteAvatar(id).then(() => {
            this.$message.success('删除成功！')
            // 重新获取头像
            api.getAvatar().then(data => {
              this.sysAvatar = data.system ? data.system : []
              this.customAvatar = data.used ? data.used : []
            })
          })
        })
      },
      // 选中头像
      chooseAvatar (avatar) {
        this.currentChooseAvatar = avatar
      },
      // 保存头像
      save () {
        if (!this.currentChooseAvatar) {
          this.$message.error('请选择或上传一个头像')
        } else {
          api.saveAvatar(this.currentChooseAvatar.id).then(() => {
            this.$message.success('保存成功')
            // 重新获取用户信息
            this.$store.dispatch(userInfoTypes.GET_CURRENT_USER)
          })
        }
      }
    }
  }
</script>
<style scoped>
  .warper{
    margin-left: 23px;
  }
  .top-title{
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
  }
  .line{
    width: 98%;
    border-top: solid 1px #ddd;
  }
  .button-warper{
    margin-top: 20px;
  }
  .button-width{
    width: 100px;
  }
  .image-view{
    float: left;
    width: 100%;
  }
  .current{
    width:200px;
    height: 200px;
    margin-top: 30px;
    float: left;
  }
  .preview{
    width:600px;
    height: 200px;
    margin-top: 30px;
    float: left;
    vertical-align: middle;
  }
  .title{
    margin-left: 50px;
  }
  .avatar-preview{
    float:left;
    height: 120px;
    margin-left: 20px;
    margin-top: 20px;
  }
  .avatar-preview span{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .avatar-large{
    height: 120px;
    width: 120px;
    border-radius: 60px;
    vertical-align: middle;
  }
  .avatar-normal{
    height: 60px;
    width: 60px;
    border-radius: 30px;
    vertical-align: middle;
  }
  .avatar-small{
    height: 30px;
    width: 30px;
    border-radius: 15px;
    vertical-align: middle;
  }
  .preview-content{
    width: 100%;
    text-align: center;
  }
  .area-title{
    width: 100px;
    float: left;
    margin: 0;
    font-weight: bold;
  }
  .area-desc{
    color: #aaa;
  }
  .list-wapper{
    width: 900px;
    height: 170px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    text-align: justify;
  }
  .image-list{
    padding: 10px 0;
    height: 120px;
    background-color: #F6F5FA;
  }
  .image-list li {
    display: inline-block;
    list-style: none;
    position: relative;
    cursor: pointer;
  }
  .image-list li img{
    height: 120px;
    width: 120px;
    border-radius: 5px;
    margin-left: 12px;
  }
  .image-list li img:hover{
    border: #243BB2;
    box-shadow: 0px 0px 10px #243BB2;
    background-color: #243BB2;
  }
  .custom-avatar{
    margin-top: 10px;
    line-height: 35px;
  }
  .upload-button{
    width: 100px;
    display: inline-block;
    margin-left: 20px
  }
  .delete-avatar-button{
    opacity: 0.8;
    position: absolute;
    margin-left: -10px;
    margin-top: -8px;
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
  }
  .delete-avatar-button:hover{
    color: red;
  }
</style>
