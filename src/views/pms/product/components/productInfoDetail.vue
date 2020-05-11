<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" size="small" label-width="120px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="subTitle">
        <el-input v-model="value.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌" prop="brandId">
        <el-select v-model="value.brandId" placeholder="请选择品牌">
          <el-option
            v-for="item in selectBrand"
            :key="item.id"
            :value="item.id"
            :label="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品货号">
        <el-input v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="商品售价">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价">
        <el-input v-model="value.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input v-model="value.stock"></el-input>
      </el-form-item>
      <el-form-item label="计量单位">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品重量">
        <el-input v-model="value.weight" style="width: 300px"></el-input>
        <span style="margin-left: 20px">克</span>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="value.sort"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name:"ProductInfoDetail",
    props:{
      value:Object,
      isEdit:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        selectBrand:[
          {
            id:1,
            name:'小米'
          },
          {
            id:2,
            name:'华为'
          }
        ],
        rules:{
          name:[
            {required:true,message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          subTitle: [{required: true, message: '请输入商品副标题', trigger: 'blur'}],
          productCategoryId: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
          brandId: [{required: true, message: '请选择商品品牌', trigger: 'blur'}],
          description: [{required: true, message: '请输入商品介绍', trigger: 'blur'}],
          requiredProp: [{required: true, message: '该项为必填项', trigger: 'blur'}]
        }
      }
    },
    methods:{
      handleNext(form){
        this.$refs[form].validate((valid)=>{
          if(valid){
            this.$emit('nextStep')
          }else{
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
