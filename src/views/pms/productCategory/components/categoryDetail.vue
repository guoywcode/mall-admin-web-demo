<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productCategory" :rules="rules" label-width="150px" ref="productCateFrom">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="productCategory.name"></el-input>
      </el-form-item>
      <el-form-item label="上级分类">
        <el-select v-model="productCategory.parentId" placeholder="请选择分类">
          <el-option v-for="item in selectProductCategoryList" :key="item.id" :lable="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量单位">
        <el-input v-model="productCategory.productUnit"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="productCategory.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-radio-group v-model="productCategory.navStatus">
          <el-radio :lable="1">是</el-radio>
          <el-radio :lable="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示在导航栏">
        <el-radio-group v-model="productCategory.showStatus">
          <el-radio :lable="1">是</el-radio>
          <el-radio :lable="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类图标">
        <SingleUpload
          v-model="productCategory.icon">
        </SingleUpload>
      </el-form-item>
      <el-form-item
        v-for="(filterProductAttr,index) in filterProductAttrList"
        :lable="index | filterLabelFilter"
        :key="filterProductAttr.key">
        <el-cascader
          clearable
          v-model="filterProductAttr.value"
          :options="filterAttrs">
        </el-cascader>
        <el-button style="margin-left: 20px" @click.prevent="removeFilterAttr(filterProductAttr)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="handleAddFilterAttr()">新增</el-button>
      </el-form-item>
      <el-form-item label="关键词：">
        <el-input v-model="productCategory.keywords"></el-input>
      </el-form-item>
      <el-form-item label="分类描述：">
        <el-input type="textarea" :autosize="true" v-model="productCategory.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productCateFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('productCateFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  
  </el-card>
</template>

<script>
  import SingleUpload from '@/components/Upload/singleUpload';
  import {getDetail} from '@/api/productCategory'
  import {getListByCategoryId} from "@/api/productAttribute";

  const defaultProductCate = {
    description: '',
    icon: '',
    keywords: '',
    name: '',
    navStatus: 0,
    parentId: 0,
    productUnit: '',
    showStatus: 0,
    sort: 0,
    productAttributeIdList: []
  };
  
  export default {
    name:"ProductCategoryDetail",
    components: {SingleUpload},
    props:{
      isEdit:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        productCategory:Object.assign({},defaultProductCate),
        selectProductCategoryList:[],
        filterProductAttrList:[],
        filterAttrs:[],
        rules:{
          name:[
            {require:true,message:'请输入品牌名称',trigger:'blur'},
            {min:2,max:100,message:'长度在2到100个字符',trigger:'blur'}
          ]
        }
      }
    },
    created(){
      if(this.isEdit){
        getDetail(this.$route.query.id).then(response=>{
          this.productCategory = response.data
        })
        getListByCategoryId(this.$route.query.id).then(response=>{
          this.filterProductAttrList= response.data
        })
      }
    }
  }
</script>

<style scoped>
  .form-container{
    width:800px;
  }
</style>
