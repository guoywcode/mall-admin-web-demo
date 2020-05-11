<template>
  <div>
    <el-upload class="avatar-uploader" action="http://guoyw-mall.oss-cn-shanghai.aliyuncs.com" :data="dataObj" list-type="picture" :multiple="false" :show-file-list="showFileList" :file-list="fileList" :before-upload="beforeUpload" :on-remove="handleRemove" :on-success="handleUploadSuccess" :on-preview="handlePreview">
      <el-button size="small" :disabled="isDisabled" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {policy} from '@/api/oss'
  
  export default {
    name:'SingleUpload',
    props:{
      value:String
    },
    data(){
      return {
        dataObj:{
          policy:'',
          signature:'',
          key:'',
          ossaccessKeyId:'',
          dir:'',
          host:''
          // callback:'',
        },
        dialogVisible:false
      }
    },
    computed:{
      showFileList:{
        get:function(){
          return this.value != null && this.value !== '' && this.value !== undefined
        },
        set:function(newValue){
        
        }
      },
      imageName(){
        if(this.value != null && this.value !== ''){
          return this.value.substr(this.value.lastIndexOf('/') + 1)
        }else{
          return null
        }
      },
      imageUrl(){
        return this.value
      },
      fileList(){
        return [{
          name:this.imageName,
          url:this.imageUrl
        }]
      },
      isDisabled(){
        if(this.fileList.length > 0 && this.fileList[0].name !== null && this.fileList[0].name !== undefined){
          return true;
        }
        return false;
      },
    },
    methods:{
      emitInput(val){
        this.$emit('input', val)
      },
      handleRemove(file, fileList){
        this.emitInput('')
      },
      handlePreview(file){
        this.dialogVisible = true
      },
      beforeUpload(file){
        let _self = this;
        return new Promise((resolve, reject) => {
          policy().then(response => {
            _self.dataObj.policy = response.data.policy;
            _self.dataObj.signature = response.data.signature;
            _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
            _self.dataObj.key = response.data.dir + '/${filename}';
            _self.dataObj.dir = response.data.dir;
            _self.dataObj.host = response.data.host;
            // _self.dataObj.callback = response.data.callback;
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      handleUploadSuccess(res, file){
        this.showFileList = true
        this.fileList.pop()
        this.fileList.push({
          name:file.name,
          url:this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name
        })
        this.emitInput(this.fileList[0].url)
      }
    }
  }
</script>

<style scoped>

</style>
