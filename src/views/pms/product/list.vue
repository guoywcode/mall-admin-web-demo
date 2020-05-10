<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i> <span>筛选搜索</span>
        <el-button style="float:right" size="small" type="primary" @click="handleSearchList()">
          查询结果
        </el-button>
        <el-button style="float:right;margin-right:12px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
      </div>
      <div class="form-container">
        <el-form :inlist="true" :model="productQuery" size="small">
          <el-form-item label="商品名称">
            <el-input :model="productQuery.keyword" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品货号">
            <el-input :model="productQuery.productSn" placeholder="商品货号"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascadr
              clearable>
              <el-option>手机</el-option>
            </el-cascadr>
          </el-form-item>
        </el-form>
      </div>
    
    </el-card>
  </div>
</template>

<script>
  const defaultProductQuery = {
    keyword:null,
    pageNum:1,
    pageSize:5,
    publishStatus:null,
    verifyStatus:null,
    productSn:null,
    productCategoryId:null,
    brandId:null
  }
  
  export default {
    name:"",
    data(){
      return {
        productQuery:Object.assign({}, defaultProductQuery)
      }
    }
  }
</script>

<style scoped>

</style>
