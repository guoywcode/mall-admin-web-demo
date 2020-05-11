<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品促销"></el-step>
      <el-step title="填写商品属性"></el-step>
      <el-step title="选择商品关联"></el-step>
    </el-steps>
    <product-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit">
    </product-info-detail>
    
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </el-card>
</template>

<script>
  import ProductInfoDetail from './productInfoDetail';
  
  export default {
    name:"ProductDetail",
    components:{ProductInfoDetail},
    props:{
      isEdit:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        active:0,
        productParam:{},
        showStatus: [true, false, false, false]
      }
    },
    methods:{
      next(){
        this.$message('下一步')
      }
    }
  }
</script>

<style scoped>

</style>
