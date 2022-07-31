<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :class="{disabled:fileList.length>0}"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="预览"
      :visible="isShowDialog"
      @close="isShowDialog=false"
    >
      <el-row type="flex" justify="center">
        <img :src="imgSrc" alt="">
      </el-row>
    </el-dialog>
    <el-progress
      :text-inside="true"
      :stroke-width="26"
      :percentage="processPercentage"
      :class="{'process':true,'processShow':processShow}"
    />
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')
var cos = new COS({
  SecretId: 'AKIDnQq35vYwDSbYHm36umPo0zlKfmgLmy96',
  SecretKey: 'nPo0zjEXdXEhx2EHEzb7TfeQ5arvlNmy'
})
export default {
  data() {
    return {
      fileList: [],
      isShowDialog: false,
      imgSrc: '',
      processPercentage: 0,
      processShow: true
    }
  },
  methods: {
    onPreview(file) {
      this.isShowDialog = true
      this.imgSrc = file.url
    },
    // 删除图片
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    // 新增图片
    onChange(file, fileList) {
      this.fileList = fileList
    },
    // 上传前校验
    beforeUpload(file) {
      // 文件大小的校验
      const maxSize = 10 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.warning('文件大小不能超过2M')
        return false
      }
      // 文件类型的校验
      const whiteList = ['image/jpeg', 'image/png']
      const isPicture = whiteList.includes(file.type)
      !isPicture && this.$message.warning('只支持图片类型文件')
    },
    // 覆盖掉原来的默认行为
    httpRequest(params) {
      // 使用腾讯云的SDK上传图片
      cos.putObject({
        Bucket: 'hr-1304735612', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: params.file, // 上传文件对象
        onProgress: (progressData) => {
          console.log('progressData', progressData)
          this.processShow = false
          this.processPercentage = progressData.percent * 100
        }
      }, (err, data) => {
        console.log(err || data)
        this.fileList[0].status = 'success'
        this.fileList[0].url = 'http://' + data.Location
        setTimeout(() => {
          this.processShow = true
        }, 100)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled{
  ::v-deep .el-upload--picture-card{
    display: none;
  }
}
.process{
  width:148px
}
.processShow{
  display: none;
}
</style>
