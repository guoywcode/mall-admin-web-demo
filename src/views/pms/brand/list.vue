<template>
  <div class="app-container">
    <el-card shadow="never" class="filter-container">
      <div>
        <i class="el-icon-search"></i> <span>筛选搜索</span>
        <el-button @click="searchBrandList()" type="primary" size="small" style="float:right">
          查询结果
        </el-button>
      </div>
      <div style="margin-top:20px">
        <el-form :inlist="true" :model="brandQuery" ref="brand">
          <el-form-item label="品牌" size="small" label-witch="100px">
            <el-input style="width: 203px" :model="brandQuery.name" placeholder="请输入品牌名"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    
    <div class="table-container">
      <el-table :data="brandList">
        <el-table-column label="编号">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="品牌名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="品牌首字母">
          <template slot-scope="scope">{{scope.row.firstLetter}}</template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="品牌制造商">
          <template slot-scope="scope">
            <el-switch :model="scope.row.factoryStatus" :active-value="1" :inactive-value="0" @change="handleFactoryStatus(scope.$index,scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示">
          <template slot-scope="scope">
            <el-switch :model="scope.row.showStatus" :active-value="1" :inactive-value="0" @change="handleShowStatus(scope.$index,scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="相关">
          <template slot-scope="scope"><span>商品：</span>
            <el-button size="mini" type="text" @click="getProductList(scope.$index, scope.row)">100
            </el-button>
            <span>评价：</span>
            <el-button size="mini" type="text" @click="getProductCommentList(scope.$index, scope.row)">1000
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name:"",
    data(){
      return {
        brandQuery:{},
        brandList:[]
      }
    },
    methods:{
      searchBrandList(){
        this.$message('筛选结果')
      },
      handleFactoryStatus(index, row){
        if(row.factoryStatus === 0){
          row.factoryStatus = 1;
        }else{
          row.factoryStatus = 0;
        }
      },
      handleShowStatus(index, row){
        if(row.factoryStatus === 0){
          row.factoryStatus = 1;
        }else{
          row.factoryStatus = 0;
        }
      }
    }
  }
</script>

<style scoped>

</style>
